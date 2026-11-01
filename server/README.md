# Late Fees of the Dead — room server

A Cloudflare Worker plus one Durable Object per room. The Durable Object runs the same `game-core.js` the browser uses, at 60 ticks a second, and streams snapshots to every player 20 times a second.

## Deploy

```
cd server
npm install
npx wrangler login      # first time only
npx wrangler deploy
```

The deploy prints an address like `https://latefees.<your-subdomain>.workers.dev`. Paste it into the **Room server address** box under the game, pick **Online** on the title screen, and host a room.

Durable Objects with SQLite storage work on the Workers Free plan. A room costs nothing while empty.

## Routes

- `POST /rooms` → `{ "code": "ABCD" }`
- `GET /rooms/ABCD/status` → who is in the room
- `wss://.../rooms/ABCD/ws` → join; first message must be `{ "t": "join" }`

## Run locally

```
npm run dev
```
Then paste `http://localhost:8787` as the server address.
