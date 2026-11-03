// The Last Video Store — room server.
// A Worker hands out room codes; one Durable Object per room runs the shared game core
// at 60 ticks a second and streams snapshots to every connected player over WebSockets.
import "../../game-core.js";
const C = globalThis.LFCore;

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const TICK_MS = 1000 / 60;
const SNAP_EVERY = 2;          // 30 snapshots a second (deltas after the first, so it costs less than 20 full ones did)
const AWAY_MS = 15_000;        // a dropped player keeps their slot this long, then the game goes on without them
const LOBBY_COUNT = 180;       // ticks of countdown once everyone is ready
const START_DELAY_MS = 3000;   // intro text on the clients
const MAX_PLAYERS = 4;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", ...CORS } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (url.pathname === "/" || url.pathname === "/health") return json({ ok: true, game: "The Last Video Store", core: C.CORE_VERSION, rooms: "POST /rooms, then wss://.../rooms/CODE/ws" });

    if (url.pathname === "/rooms" && request.method === "POST") {
      for (let i = 0; i < 8; i++) {
        const code = Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
        const stub = env.ROOM.get(env.ROOM.idFromName(code));
        const r = await stub.fetch("https://room/create", { method: "POST" });
        const st = await r.json();
        if (st.ok) return json({ code });
      }
      return json({ error: "no free room code, try again" }, 503);
    }

    const m = url.pathname.match(/^\/rooms\/([A-Z]{4})(\/ws|\/status)?$/i);
    if (m) {
      const code = m[1].toUpperCase();
      const stub = env.ROOM.get(env.ROOM.idFromName(code));
      if (m[2] === "/ws") {
        if (request.headers.get("Upgrade") !== "websocket") return json({ error: "expected a WebSocket upgrade" }, 426);
        return stub.fetch(new Request("https://room/ws?code=" + code, request));
      }
      const r = await stub.fetch("https://room/status");
      return json(await r.json());
    }
    return json({ error: "not found" }, 404);
  },
};

export class Room {
  constructor(state, env) {
    this.state = state;
    this.code = "";
    this.players = new Map();   // slot -> {ws, token, hero, locked, name, st, look, away, awayAt, held, pressed}
    this.status = "lobby";      // lobby | play | over | win
    this.G = null;
    this.timer = null;
    this.count = 0;
    this.stage = 1;
    this.diff = "normal";
    this.tick = 0;
    this.evBuf = [];
    this.startAt = 0;
    this.created = 0;
    // Survive eviction between "host created the room" and "host's socket arrives".
    if (state.blockConcurrencyWhile && state.storage) state.blockConcurrencyWhile(async () => { this.created = (await state.storage.get("created")) || 0; });
  }
  async setCreated(ts) { this.created = ts; try { if (this.state.storage) { if (ts) await this.state.storage.put("created", ts); else await this.state.storage.delete("created"); } } catch {} }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/status") {
      return json({ active: this.players.size > 0 || this.created > 0, status: this.status, players: this.players.size, code: this.code });
    }
    if (url.pathname === "/create") {
      // A code is free when nobody is in it and it was never created, or its host never showed up within two minutes.
      const stale = this.created && !this.players.size && Date.now() - this.created > 120_000;
      if (this.players.size || (this.created && !stale)) return json({ ok: false });
      await this.setCreated(Date.now()); this.status = "lobby"; this.G = null; this.players.clear();
      return json({ ok: true });
    }
    if (url.pathname === "/ws") {
      this.code = url.searchParams.get("code") || this.code;
      if (!this.created) {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        server.accept(); server.send(JSON.stringify({ t: "err", msg: "ROOM NOT FOUND" })); server.close(1000, "no room");
        return new Response(null, { status: 101, webSocket: client });
      }
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      server.accept();
      let slot = -1;
      server.addEventListener("message", (ev) => {
        let d; try { d = JSON.parse(ev.data); } catch { return; }
        if (!d || typeof d !== "object") return;
        if (slot < 0) { if (d.t === "join") slot = this.join(server, d); return; }
        this.onMessage(slot, d);
      });
      const drop = () => { if (slot >= 0) this.disconnect(slot, server); };
      server.addEventListener("close", drop);
      server.addEventListener("error", drop);
      return new Response(null, { status: 101, webSocket: client });
    }
    return json({ error: "not found" }, 404);
  }

  send(ws, o) { try { ws.send(JSON.stringify(o)); } catch {} }
  broadcast(o) { const s = JSON.stringify(o); for (const p of this.players.values()) if (p.ws) { try { p.ws.send(s); } catch {} } }

  join(ws, d) {
    // A returning player (same token) gets their old slot back.
    for (const [slot, p] of this.players) {
      if (d.token && p.token === d.token) {
        if (p.ws && p.ws !== ws) { try { p.ws.close(1000, "replaced"); } catch {} }
        p.ws = ws; p.away = false; p.held = 0; p.pressed = 0; p.q = []; p.last = 0; p.full = true;
        if (this.G) { const gp = this.G.ps.find(q => q.slot === slot); if (gp) { gp.away = false; gp.in = {}; } }
        this.send(ws, { t: "welcome", slot, token: p.token, code: this.code, core: C.CORE_VERSION });
        this.sendLobby();
        return slot;
      }
    }
    if (this.players.size >= MAX_PLAYERS) { this.send(ws, { t: "err", msg: "ROOM IS FULL" }); try { ws.close(1000, "full"); } catch {} return -1; }
    let slot = 0; while (this.players.has(slot)) slot++;
    let hero = 0; const taken = new Set([...this.players.values()].map(p => p.hero)); while (taken.has(hero) && hero < 3) hero++;
    const token = crypto.randomUUID();
    const p = { ws, token, hero, locked: false, name: String(d.name || "P").slice(0, 8), st: C.cleanStats(d.st), look: C.cleanLook(d.look), away: false, awayAt: 0, held: 0, pressed: 0, q: [], ack: 0, last: 0, full: true };
    this.players.set(slot, p);
    this.send(ws, { t: "welcome", slot, token, code: this.code, core: C.CORE_VERSION });
    if (this.status === "play" && this.G) {
      // Drop in mid-game as an unused hero.
      const gp = C.addPlayer(this.G, { slot, hero, st: p.st, look: p.look });
      if (gp) p.hero = C.HEROES.indexOf(gp.ch);
      p.locked = true;
    }
    this.sendLobby();
    return slot;
  }

  disconnect(slot, ws) {
    const p = this.players.get(slot);
    if (!p || (p.ws && p.ws !== ws)) return;
    p.ws = null; p.held = 0; p.pressed = 0;
    if (this.status === "play" && this.G) {
      p.away = true; p.awayAt = Date.now();
      const gp = this.G.ps.find(q => q.slot === slot); if (gp) { gp.away = true; gp.in = {}; }
    } else {
      this.players.delete(slot);
    }
    this.sendLobby();
    this.maybeIdle();
  }

  removePlayer(slot, why) {
    const p = this.players.get(slot);
    this.players.delete(slot);
    if (this.G) C.removePlayer(this.G, slot);
    if (p && why) this.broadcast({ t: "gone", slot, msg: `P${slot + 1} ${why}` });
    this.sendLobby();
    this.maybeIdle();
  }

  onMessage(slot, d) {
    const p = this.players.get(slot); if (!p) return;
    switch (d.t) {
      case "hero": {
        if (this.status !== "lobby" || p.locked) return;
        const h = d.h | 0; if (h < 0 || h > 3) return;
        if ([...this.players.values()].some(q => q !== p && q.locked && q.hero === h)) return;
        p.hero = h; this.sendLobby(); break;
      }
      case "lock": {
        if (this.status !== "lobby") return;
        const v = !!d.v;
        if (v && [...this.players.values()].some(q => q !== p && q.locked && q.hero === p.hero)) return;
        p.locked = v;
        if (d.st) p.st = C.cleanStats(d.st);
        if (d.look) p.look = C.cleanLook(d.look);
        this.count = 0; this.sendLobby(); this.checkCountdown(); break;
      }
      case "stage": {
        // Only the host (lowest slot) picks the stage, and only before the countdown.
        if (this.status !== "lobby" || this.count > 0) return;
        if (slot !== Math.min(...this.players.keys())) return;
        const v = d.v | 0; if (v < 1 || v > C.NSTAGES) return;
        this.stage = v; this.sendLobby(); break;
      }
      case "diff": {
        if (this.status !== "lobby" || this.count > 0) return;
        if (slot !== Math.min(...this.players.keys())) return;
        if (!C.DIFFS.includes(d.v)) return;
        this.diff = d.v; this.sendLobby(); break;
      }
      case "drop": {
        // A player whose bag was already full hands back a just-looted item; it goes back on the ground.
        if (this.G) { const gp = this.G.ps.find(q => q.slot === slot); if (gp) C.dropBack(this.G, gp, d.item); }
        break;
      }
      case "gear": {
        p.st = C.cleanStats(d.st); p.look = C.cleanLook(d.look);
        if (this.G) { const gp = this.G.ps.find(q => q.slot === slot); if (gp) C.setStats(gp, p.st, p.look, true); }
        break;
      }
      case "in": {
        // New clients send every tick's buttons with a sequence number; the room plays one per tick and reports
        // back the last one it used, so the client can replay the rest on top of the server's state.
        if (Array.isArray(d.b)) {
          const s0 = d.s | 0;
          for (let i = 0; i < d.b.length && i < 8; i++) p.q.push({ s: s0 + i, b: d.b[i] | 0 });
          while (p.q.length > 8) p.q.shift();
        } else { p.held = d.h | 0; p.pressed |= d.p | 0; }
        break;
      }
      case "full": p.full = true; break;
      case "again": {
        if (this.status === "over" || this.status === "win") this.toLobby();
        break;
      }
      case "leave": {
        try { if (p.ws) p.ws.close(1000, "left"); } catch {}
        this.removePlayer(slot, this.status === "play" ? "LEFT THE GAME" : null); break;
      }
      case "ping": this.send(p.ws, { t: "pong", n: d.n }); break;
    }
  }

  lobbyMsg() {
    return { t: "lobby", code: this.code, status: this.status, count: this.count, stage: this.stage, diff: this.diff,
      players: [...this.players].map(([s, p]) => ({ s, h: p.hero, lk: p.locked, nm: p.name, on: !!p.ws, look: p.look })) };
  }
  sendLobby() { this.broadcast(this.lobbyMsg()); }

  checkCountdown() {
    const ps = [...this.players.values()].filter(p => p.ws);
    const ready = ps.length > 0 && ps.every(p => p.locked);
    if (ready && !this.timer) this.startTimer();
  }

  startTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => this.onTick(), TICK_MS);
  }
  stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  onTick() {
    if (this.status === "lobby") {
      const ps = [...this.players.values()].filter(p => p.ws);
      if (!ps.length || !ps.every(p => p.locked)) { this.count = 0; this.stopTimer(); this.sendLobby(); return; }
      this.count++;
      if (this.count % 20 === 0) this.sendLobby();
      if (this.count >= LOBBY_COUNT) this.startGame();
      return;
    }
    if (this.status !== "play" || !this.G) { this.stopTimer(); return; }
    if (Date.now() < this.startAt) return;
    const g = this.G;
    for (const [slot, p] of this.players) {
      const gp = g.ps.find(q => q.slot === slot); if (!gp) continue;
      let bits;
      if (p.q.length || p.ack) {
        while (p.q.length > 4) p.q.shift();          // client running ahead of the room: drop the oldest instead of lagging
        if (p.q.length) { const e = p.q.shift(); bits = e.b; p.ack = e.s; p.last = e.b; } else bits = p.last;
        gp.ack = p.ack;
      } else bits = p.held | p.pressed;
      const o = {};
      o.up = !!(bits & 1); o.down = !!(bits & 2); o.left = !!(bits & 4); o.right = !!(bits & 8);
      o.atk = !!(bits & 16); o.jump = !!(bits & 32); o.spec = !!(bits & 64); o.start = !!(bits & 128);
      gp.in = o; p.pressed = 0;
      if (p.away && Date.now() - p.awayAt > AWAY_MS) this.removePlayer(slot, "DROPPED OUT");
    }
    C.step(g);
    this.tick++;
    if (g.ev.length) { this.evBuf.push(...g.ev); g.ev.length = 0; }
    if (this.tick % SNAP_EVERY === 0 || g.status === "over" || g.status === "win") {
      this.sendSnap(g);
      this.evBuf = [];
    }
    if (g.status === "over" || g.status === "win") { this.status = g.status; if (g.status === "over") this.stage = g.level || 1; this.stopTimer(); this.sendLobby(); }
  }

  // Everyone gets what changed since the last snapshot; a player who just arrived (or asked) gets the whole thing.
  sendSnap(g) {
    const str = JSON.stringify(C.snapshot(g)), cur = JSON.parse(str), ev = JSON.stringify(this.evBuf);
    let delta = null;
    if (this.prevSnap) { const d = C.snapDiff(this.prevSnap, cur); delta = '{"t":"snap","d":' + JSON.stringify(d && typeof d === "object" && !Object.keys(d).length && !Array.isArray(d) ? {} : d) + ',"ev":' + ev + "}"; }
    const full = '{"t":"snap","s":' + str + ',"ev":' + ev + "}";
    for (const p of this.players.values()) {
      if (!p.ws) continue;
      try { if (p.full || !delta) { p.ws.send(full); p.full = false; } else p.ws.send(delta); } catch {}
    }
    this.prevSnap = cur;
  }

  startGame() {
    const specs = [...this.players].filter(([, p]) => p.ws).map(([slot, p]) => ({ slot, hero: p.hero, st: p.st, look: p.look }));
    this.G = C.newGame(specs, this.stage, this.diff);
    this.status = "play"; this.count = 0; this.tick = 0; this.evBuf = []; this.prevSnap = null;
    this.startAt = Date.now() + START_DELAY_MS;
    for (const p of this.players.values()) { p.held = 0; p.pressed = 0; p.q = []; p.ack = 0; p.last = 0; p.full = true; }
    this.broadcast({ t: "start", delay: START_DELAY_MS });
    this.sendLobby();
  }

  toLobby() {
    this.stopTimer();
    this.G = null; this.status = "lobby"; this.count = 0;
    for (const [slot, p] of [...this.players]) { if (!p.ws) this.players.delete(slot); else p.locked = false; }
    this.sendLobby();
  }

  maybeIdle() {
    if ([...this.players.values()].some(p => p.ws)) return;
    // Nobody connected: close the room so the code can be reused.
    this.stopTimer(); this.G = null; this.status = "lobby"; this.count = 0; this.players.clear();
    this.setCreated(0);
  }
}
