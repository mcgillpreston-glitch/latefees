/* Late Fees of the Dead — shared simulation core.
   Runs unchanged in the browser (local co-op) and inside the Cloudflare Durable Object (online rooms).
   No canvas, audio, DOM or storage in here: anything a client should show or play is pushed to g.ev. */
(()=>{
const W=384,H=216,TOP=134,BOT=206,LEVEL_END=3300;
const PCOL=['#ff5a4a','#3ad6c0','#c8f05a','#ffc93c'];
const clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t, rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- data ---------- */
const HEROES=[
 {id:'dex',first:'DEX',name:'DEX MORENO',job:'VIDEO CLERK',spd:1.5,dmg:9,reach:30,atk:16,sp:'REWIND SPIN',cost:8,stats:[3,3,3],quote:'Be kind. Rewind their skulls.'},
 {id:'rae',first:'RAE',name:'RAE KOWALSKI',job:'BASSIST',spd:1.2,dmg:13,reach:38,atk:20,sp:'POWER CHORD',cost:10,stats:[5,2,5],quote:'This town needs more feedback.'},
 {id:'benny',first:'BENNY',name:'BENNY TRAN',job:'PIZZA GUY',spd:1.75,dmg:7,reach:25,atk:13,sp:'HOT DELIVERY',cost:6,stats:[2,4,2],quote:"30 minutes or it's free. Or dead."},
 {id:'jules',first:'JULES',name:'JULES OKAFOR',job:'BLADER',spd:1.95,dmg:8,reach:30,atk:14,sp:'BLADE RUSH',cost:8,stats:[3,5,3],quote:"Totally bogus. Let's roll."},
];
const POW={
 jolt:{name:'JOLT SODA',desc:'SPEED UP',col:'#ff5a4a',dur:600},
 boombox:{name:'BOOMBOX',desc:'DOUBLE DAMAGE',col:'#ff9a3c',dur:600},
 pog:{name:'POG SLAMMER',desc:'THROW POGS',col:'#3ad6c0',dur:600},
 troll:{name:'TROLL DOLL',desc:'INVINCIBLE',col:'#ff5fa8',dur:480},
 beeper:{name:'BEEPER',desc:'FREE SPECIALS',col:'#c8f05a',dur:600},
};
const POWKEYS=Object.keys(POW);
const EN={
 sh:{hp:22,speed:.45,dmg:8,reach:20,windup:26,atk:10,recover:24,cd:50,score:100},
 mummy:{hp:44,speed:.4,dmg:12,reach:22,windup:32,atk:12,recover:30,cd:60,score:200},
 wolf:{hp:28,speed:1.15,dmg:10,reach:18,windup:18,atk:18,recover:30,cd:70,score:250},
 pod:{hp:18,speed:.6,dmg:8,reach:0,windup:30,atk:10,recover:30,cd:110,score:150},
 chainsaw:{hp:70,speed:.7,dmg:18,reach:22,windup:42,atk:48,recover:50,cd:100,score:600},
 gremlin:{hp:20,speed:1.4,dmg:7,reach:16,windup:14,atk:16,recover:26,cd:60,score:200},
 tape:{hp:30,speed:.7,dmg:9,reach:32,windup:24,atk:12,recover:28,cd:60,score:250},
 cook:{hp:36,speed:.55,dmg:10,reach:24,windup:26,atk:12,recover:26,cd:55,score:250},
 cop:{hp:64,speed:.5,dmg:14,reach:26,windup:34,atk:14,recover:34,cd:70,score:400},
 blob:{hp:380,score:5000},
};
const WAVES=[
 {x:120,list:['sh','sh']},
 {x:420,list:['sh','sh','gremlin']},
 {x:720,list:['wolf','sh','sh']},
 {x:960,list:['chainsaw','sh','sh']},
 {x:1330,list:['cook','pod','sh']},
 {x:1600,list:['tape','mummy','pod','sh']},
 {x:1880,list:['wolf','gremlin','cook','tape'],max:4},
 {x:2150,list:['chainsaw','cop','pod','tape'],max:4},
 {x:2520,list:['wolf','mummy','cop','gremlin','sh'],max:4},
 {x:LEVEL_END-W,list:['blob'],boss:true,max:6},
];
const SURV=[
 {x:300,y:150,name:'GRILL DAD',skin:'#e8b890',hair:null,shirt:'#ffe9c2',pants:'#1f9e8e',hat:null},
 {x:640,y:190,name:'PAPER ROUTE KID',skin:'#c98d5e',hair:'#2a1a12',shirt:'#3ad6c0',pants:'#5e2f22',hat:'#e8453c',small:true},
 {x:1110,y:160,name:'AEROBICS MOM',skin:'#f0c8a8',hair:'#a0522d',shirt:'#ff5fa8',pants:'#3ad6c0',big:true},
 {x:1450,y:180,name:'FOOD COURT TEEN',skin:'#d9a878',hair:'#1a1a1a',shirt:'#e8453c',pants:'#5e2f22',hat:'#ffc93c'},
 {x:1760,y:150,name:'ARCADE CHAMP',skin:'#8a5a3a',hair:'#1a1a1a',shirt:'#ff9a3c',pants:'#1f9e8e',hat:null},
 {x:2050,y:192,name:'NIGHT GUARD',skin:'#e8b890',hair:'#555',shirt:'#5e2f22',pants:'#5e2f22',hat:'#ffc93c'},
 {x:2360,y:160,name:'MALL WALKER',skin:'#f0c8a8',hair:'#e8e8e8',shirt:'#ff5fa8',pants:'#c8f05a',big:true},
 {x:2720,y:175,name:'CART WRANGLER',skin:'#c98d5e',hair:'#2a1a12',shirt:'#ff9a3c',pants:'#5e2f22',hat:'#1f9e8e'},
];
const FIXED_PICKS=[
 {x:250,y:185,kind:'jolt'},{x:500,y:170,kind:'tape'},{x:880,y:190,kind:'pizza'},{x:1050,y:150,kind:'boombox'},
 {x:1520,y:190,kind:'pog'},{x:1650,y:145,kind:'tape'},{x:1990,y:170,kind:'pizza'},{x:2080,y:150,kind:'beeper'},
 {x:2300,y:195,kind:'tape'},{x:2600,y:150,kind:'troll'},{x:2820,y:160,kind:'pizza'},{x:2860,y:195,kind:'jolt'}];

/* ---------- gear data ---------- */
const CATS=['hat','glasses','shirt','jacket','belt','pants','shoes','bracelet','ring'];
const CAT_NAME={hat:'HAT',glasses:'GLASSES',shirt:'SHIRT',jacket:'JACKET',belt:'BELT',pants:'PANTS',shoes:'SHOES',bracelet:'BRACELET',ring:'RING'};
const RAR={c:{name:'COMMON',col:'#f0dcb8',k:1,o:3},r:{name:'RARE',col:'#3ad6c0',k:2,o:2},u:{name:'ULTRA RARE',col:'#ff5fa8',k:3.4,o:0},s:{name:'SET',col:'#c8f05a',k:2.2,o:1}};
const STAT={
 HP:{lo:5,hi:12,short:'HP',long:v=>'+'+v+' MAX HP'},
 POW:{lo:2,hi:5,short:'DMG',long:v=>'+'+v+'% DAMAGE'},
 DEF:{lo:2,hi:4,short:'ARM',long:v=>'+'+v+'% ARMOR'},
 SPD:{lo:2,hi:5,short:'SPD',long:v=>'+'+v+'% SPEED'},
 CRIT:{lo:1,hi:3,short:'CRT',long:v=>'+'+v+'% CRIT CHANCE'},
 LUCK:{lo:3,hi:8,short:'LCK',long:v=>'+'+v+'% LOOT LUCK'},
 SPC:{lo:5,hi:10,short:'SPC',long:v=>'-'+v+'% SPECIAL COST'},
 LEECH:{lo:1,hi:2,short:'LCH',long:v=>'+'+v+'% LIFE STEAL'},
 REGEN:{lo:1,hi:1.4,short:'RGN',long:v=>'+'+v+' HP EVERY 2 SEC'},
};
const STAT_KEYS=Object.keys(STAT);
const CAP={DEF:60,SPD:40,CRIT:50,SPC:100,LEECH:20};
const POOL={hat:['LUCK','DEF','HP','CRIT'],glasses:['CRIT','LUCK','POW','SPC'],shirt:['HP','POW','DEF','REGEN'],jacket:['DEF','HP','SPC','POW'],
 belt:['HP','SPC','DEF','LUCK'],pants:['DEF','SPD','HP','POW'],shoes:['SPD','DEF','CRIT','HP'],bracelet:['POW','CRIT','LEECH','SPD'],ring:['LUCK','CRIT','SPC','LEECH']};
const SETS=[
 {id:'night',name:'NIGHT SHIFT',short:'NIGHT',col:'#1f9e8e',bonus:[[2,{HP:15}],[3,{POW:10}],[5,{SPC:100,LUCK:25}]]},
 {id:'tour',name:"TOUR '94",short:"TOUR",col:'#e8453c',bonus:[[2,{DEF:8}],[3,{POW:15}],[5,{CRIT:25,LEECH:4}]]},
 {id:'skate',name:'SKATE CREW',short:'SKATE',col:'#ff5fa8',bonus:[[2,{SPD:10}],[4,{SPD:15,CRIT:12,HP:20}]]},
 {id:'mall',name:'MALL SECURITY',short:'MALL',col:'#ffc93c',bonus:[[2,{HP:20}],[4,{DEF:20,REGEN:3}]]},
];
const SET_OF={hat:['night','skate'],glasses:['night','mall'],shirt:['night','tour'],jacket:['tour','skate'],belt:['night','mall'],
 pants:['tour','skate'],shoes:['tour','skate'],bracelet:['tour','mall'],ring:['night','mall']};
// Each list: 17 commons, 8 rares, 3 ultra rares, 2 set pieces.
const NAMES={
hat:"Backwards Cap|Bucket Hat|Trucker Cap|Beanie|Visor|Snapback|Painter's Cap|Newsboy Cap|Fishing Hat|Headband|Bandana|Earflap Hat|Paper Crown|Hard Hat|Sweatband|Golf Cap|Foam Visor|Propeller Beanie|Fry Cook Hat|Lifeguard Visor|Raver Bucket Hat|Rodeo Hat|Slime-Dipped Cap|Neon Snapback|Grandpa's Fedora|Prom King Crown|Meteor Shard Helm|Arcade Legend Cap|Night Shift Visor|Skate Crew Lid",
glasses:"Shades|Aviators|Nerd Specs|Safety Goggles|Swim Goggles|Clip-Ons|Reading Glasses|Round Specs|Wraparounds|Sport Shades|3D Glasses|Tinted Lenses|Cat-Eye Frames|Gas Station Shades|Snow Goggles|Monocle|Lab Goggles|Laser Eye Shades|Mirror Aviators|X-Ray Specs|Slap-Wrap Shades|Blacklight Goggles|Neon Squares|Night Vision Goggles|Hypno Specs|Third Eye Visor|Moonbeam Lenses|Blob-Proof Goggles|Rewind Readers|Mall Cop Mirrors",
shirt:"Plain Tee|Band Tee|Flannel|Polo|Tank Top|Ringer Tee|Henley|Hawaiian Shirt|Rugby Shirt|Thermal|Bowling Shirt|Tie-Dye Tee|Jersey|Turtleneck|Pocket Tee|Work Shirt|Mesh Tank|Glow-Paint Tee|Bootleg Concert Tee|Heat-Shift Tee|Pizza Grease Tee|Varsity Jersey|Rave Tee|Lucky Bowling Shirt|Wrestling Tee|Tee of Infinite Merch|Meteor-Dyed Shirt|Signed Tour Shirt|Rental Clerk Vest|Tour '94 Flannel",
jacket:"Denim Jacket|Windbreaker|Bomber|Varsity Jacket|Hoodie|Fleece|Puffer|Track Jacket|Rain Slicker|Corduroy Jacket|Team Jacket|Army Jacket|Leather Jacket|Cardigan|Zip Hoodie|Overshirt|Puffy Vest|Glow Windbreaker|Studded Leather|Eight-Ball Jacket|Reflective Vest|Satin Tour Jacket|Arcade Jacket|Camo Parka|Patchwork Denim|Coat of 1000 Pins|Meteor Shard Parka|Prom Night Tux Coat|Tour '94 Denim|Skate Crew Hoodie",
belt:"Leather Belt|Web Belt|Braided Belt|Canvas Belt|Studded Belt|Fanny Pack|Tool Belt|Chain Belt|Rope Belt|Bike Chain Belt|Elastic Belt|Weight Belt|Wallet Chain|Suspenders|Snap Belt|Rodeo Buckle|Ribbon Belt|Pager Holster|Glow Belt|Lucky Buckle|Champion Buckle|Utility Belt|Bandolier of Pogs|Walkman Clip|Arcade Coin Belt|Belt of the Blob|Title Belt|Infinite Pocket Pack|Night Shift Keychain|Mall Cop Duty Belt",
pants:"Jeans|Cargo Shorts|Sweatpants|Khakis|Track Pants|Overalls|Corduroys|Board Shorts|Carpenter Jeans|Parachute Pants|Bike Shorts|Zip-Off Pants|Gym Shorts|Painter Pants|Stonewash Jeans|Flannel PJs|Camo Pants|Ripped Jeans|Phat Raver Pants|Glow Joggers|Patch Jeans|Genie Pants|Zip-Leg Jeans|Snap Pants|Sweat-Proof Shorts|Pants of Holding|Meteor-Washed Jeans|Legendary Overalls|Tour '94 Jeans|Skate Crew Shorts",
shoes:"Sneakers|High-Tops|Skate Shoes|Combat Boots|Loafers|Sandals|Flip-Flops|Hiking Boots|Jelly Shoes|Slip-Ons|Running Shoes|Moon Boots|Work Boots|Canvas Low-Tops|Cowboy Boots|Platform Shoes|Bowling Shoes|Light-Up Sneakers|Pump-Up Kicks|Inline Skates|Steel-Toe Boots|Velcro Kicks|Turbo Runners|Wheel Heels|Spring Shoes|Rocket Boots|Kicks of the Meteor|Golden High-Tops|Tour '94 Boots|Skate Crew Kicks",
bracelet:"Slap Bracelet|Friendship Band|Wrist Sweatband|Digital Watch|Rubber Band|Hemp Bracelet|Bead Bracelet|Bangle|Charm Bracelet|Wristband|ID Bracelet|Mood Band|Leather Cuff|Chain Bracelet|Shell Bracelet|Hair Tie|Glow Stick Band|Calculator Watch|Spiked Cuff|Color-Change Band|Lucky Charm Chain|Virtual Pet Strap|Power Band|Pager Strap|Glow Cuff|Bangle of Rewind|Meteor Charm|Gauntlet of Pogs|Tour '94 Wristband|Mall Cop Watch",
ring:"Mood Ring|Class Ring|Plastic Ring|Silver Band|Spoon Ring|Toe Ring|Candy Ring|Puzzle Ring|Skull Ring|Heart Ring|Turquoise Ring|Pinky Ring|Signet Ring|Washer Ring|Bubblegum Ring|Pop-Tab Ring|Cereal Box Ring|Decoder Ring|Glow Ring|Lucky Dice Ring|Championship Ring|Pizza Ring|Spider Ring|Smiley Ring|Opal Ring|Ring of the Late Fee|Meteor Signet|Prom Queen Ring|Night Shift Ring|Mall Cop Badge Ring",
};
const ITEMCOL=['#e8453c','#1f9e8e','#ffc93c','#3ad6c0','#b8426a','#ff9a3c','#7a4a2e','#ffe9c2','#c8f05a','#ff5fa8','#a0623a','#4a2418','#f08a5a','#d9771e'];
const BASES={},BASE_LIST=[];
CATS.forEach((cat,ci)=>{const names=NAMES[cat].split('|'),pool=POOL[cat];
  names.forEach((nm,i)=>{let rar,stats,set=null,col=ITEMCOL[(i*5+ci*3)%ITEMCOL.length];
    if(i<17){rar='c';stats=[pool[i%4]];}
    else if(i<25){const j=i-17;rar='r';stats=[pool[j%4],pool[(j+(j<4?1:2))%4]];}
    else if(i<28){const j=i-25;rar='u';const ex=['LEECH','REGEN','CRIT'][j];stats=[pool[j%4],pool[(j+1)%4]];stats.push(stats.includes(ex)?pool[(j+2)%4]:ex);col=['#ffcf4a','#c8f05a','#c77dff'][j];}
    else{const j=i-28;rar='s';set=SET_OF[cat][j];stats=j?[pool[2],pool[3]]:[pool[0],pool[1]];col=SETS.find(s=>s.id===set).col;}
    const b={key:cat+i,cat,name:nm.toUpperCase(),rar,stats,set,col};BASES[b.key]=b;BASE_LIST.push(b);});});
const BAG_MAX=24;
const uid=()=>Math.random().toString(36).slice(2,9);
function makeItem(rar,il,cat){const list=BASE_LIST.filter(b=>b.rar===rar&&(!cat||b.cat===cat)),b=pick(list),k=RAR[rar].k*(1+(il-1)*.15),st={};
  for(const s of b.stats){const S=STAT[s];st[s]=Math.max(1,Math.round(rnd(S.lo,S.hi)*k));}return {k:b.key,st,il,u:uid()};}
// min: null = anything, 'r' = rare or better, 'u' = ultra rare or set. Luck makes the good stuff likelier.
function rollRarity(luck,min){const L=1+luck/100,w={c:min?0:70,r:min==='u'?0:22*L,u:5*L*L,s:3.5*L*L};
  let x=Math.random()*(w.c+w.r+w.u+w.s);for(const k of ['c','r','u','s']){x-=w[k];if(x<0)return k;}return 'c';}
function emptyGear(){return {eq:Object.fromEntries(CATS.map(c=>[c,null])),bag:[]};}
function cleanItem(it){if(!it||!BASES[it.k])return null;const b=BASES[it.k],st={};
  for(const s of b.stats){const v=it.st&&it.st[s];st[s]=Number.isFinite(v)?Math.max(1,Math.min(999,Math.round(v))):1;}
  return {k:it.k,st,il:clamp((it.il|0)||1,1,4),u:String(it.u||uid())};}

/* ---------- gear helpers that work on a plain gear object {eq,bag} ---------- */
const setSize=id=>BASE_LIST.filter(b=>b.set===id).length;
function calcStatsFor(g){const t=Object.fromEntries(STAT_KEYS.map(k=>[k,0])),sets={};
  for(const c of CATS){const it=g.eq[c];if(!it)continue;const b=BASES[it.k];for(const s in it.st)t[s]+=it.st[s];if(b.set)sets[b.set]=(sets[b.set]||0)+1;}
  for(const S of SETS){const n=sets[S.id]||0;for(const [need,bon] of S.bonus)if(n>=need)for(const s in bon)t[s]+=bon[s];}
  for(const s in CAP)t[s]=Math.min(CAP[s],t[s]);t.sets=sets;return t;}
function gearLookFor(g){const o={};for(const c of CATS)if(g.eq[c])o[c]=BASES[g.eq[c].k].col;return o;}
function cleanStats(st){const t=Object.fromEntries(STAT_KEYS.map(k=>[k,0]));if(st&&typeof st==='object')for(const k of STAT_KEYS){const v=+st[k];if(Number.isFinite(v))t[k]=Math.max(0,Math.min(k in CAP?CAP[k]:400,v));}
  t.sets={};if(st&&st.sets&&typeof st.sets==='object')for(const S of SETS){const n=st.sets[S.id]|0;if(n>0)t.sets[S.id]=Math.min(n,setSize(S.id));}return t;}
function cleanLook(lk){const o={};if(lk&&typeof lk==='object')for(const c of CATS){const v=lk[c];if(typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v))o[c]=v;}return o;}
function bonusTxt(k,v){return STAT[k].short+(k==='SPC'?'-':'+')+v+(k==='HP'||k==='REGEN'?'':'%');}
const zoneIl=x=>x<1250?1:x<2450?2:3;

/* ---------- events: everything a client needs to show or play, never read back by the sim ---------- */
function ev(g,e){g.ev.push(e);}
const beep=(g,f,d,type='square',vol=.05,slide=0,delay=0)=>ev(g,{t:'beep',f,d,ty:type,v:vol,sl:slide,dl:delay});
const rumble=(g,slot,str=.5,ms=120)=>ev(g,{t:'rumble',slot,str,ms});
const toast=(g,s,c='#ffe9c2')=>ev(g,{t:'toast',s,c});
const floatText=(g,x,y,s,c='#ffc93c',z=40)=>ev(g,{t:'text',x:r1(x),y:r1(y),z,s,c});
const sparks=(g,x,y,z,n=6,cols=null)=>ev(g,{t:'fx',k:'sparks',x:r1(x),y:r1(y),z:r1(z),n,c:cols});
const goo=(g,x,y,z,n=8)=>ev(g,{t:'fx',k:'goo',x:r1(x),y:r1(y),z:r1(z),n});
const smoke=(g,x,y,z)=>ev(g,{t:'fx',k:'smoke',x:r1(x),y:r1(y),z:r1(z)});
const part=(g,x,y,z,c,o)=>ev(g,{t:'fx',k:'part',x:r1(x),y:r1(y),z:r1(z),c,...o});
const shake=(g,v)=>ev(g,{t:'shake',v});
const r1=v=>Math.round(v*10)/10;

/* ---------- input: each player carries in/pin (this tick, last tick) ---------- */
const held=(p,a)=>!!p.in[a];
const hit=(p,a)=>!!p.in[a]&&!p.pin[a];
const hasPow=(p,k)=>!!(p.pow&&p.pow.k===k);

/* ---------- game setup ---------- */
function mkPlayer(g,spec){
  const hero=HEROES[spec.hero]||HEROES[0];
  const p={slot:spec.slot,ch:hero,x:spec.x??g.cam+30,y:spec.y??(TOP+BOT)/2,z:0,vz:0,vx:0,face:1,hp:100,maxhp:100,lives:2,inv:120,state:'idle',timer:0,atk:null,comboN:0,comboW:0,
    buffer:false,walk:0,moving:false,combo:0,comboT:0,sp:null,score:0,saved:0,pow:null,out:false,away:false,in:{},pin:{},st:null,look:{},gearHint:false};
  setStats(p,spec.st,spec.look,true);return p;
}
function setStats(p,st,look,quiet){
  const ratio=p.maxhp?p.hp/p.maxhp:1;
  p.st=cleanStats(st);p.maxhp=100+p.st.HP;p.hp=Math.max(p.hp>0?1:0,Math.round(p.maxhp*ratio));p.look=cleanLook(look);
}
function newGame(specs){
  const g={cam:0,lock:null,waveI:0,waves:WAVES.map(w=>({...w,on:false})),queue:[],spawnT:0,maxAlive:3,enemies:[],proj:[],pid:0,
    pick:FIXED_PICKS.map(p=>({...p,t:Math.floor(Math.random()*60),id:0})),surv:SURV.map(s=>({x:s.x,y:s.y,name:s.name,saved:false,fade:40,t:Math.floor(Math.random()*200)})),
    ps:[],score:0,saved:0,stop:0,go:0,banner:{txt:'SAVE YOUR NEIGHBORS!',t:150},boss:null,winT:0,time:0,eid:0,att:0,bonus:0,ctT:0,status:'play',ev:[],kid:0};
  g.pick.forEach(k=>k.id=++g.kid);
  (specs||[]).forEach((s,i)=>g.ps.push(mkPlayer(g,{...s,x:40+i*14,y:150+i*16})));
  return g;
}
function addPlayer(g,spec){
  if(g.ps.length>=4||g.ps.some(q=>q.slot===spec.slot))return null;
  let hero=spec.hero;if(hero==null||g.ps.some(q=>q.ch===HEROES[hero])){hero=0;while(g.ps.some(q=>q.ch===HEROES[hero]))hero++;}
  const np=mkPlayer(g,{...spec,hero});g.ps.push(np);
  floatText(g,np.x,np.y,'P'+(np.slot+1)+' '+np.ch.first+' JOINS!',PCOL[np.slot],46);beep(g,523,.1);beep(g,784,.15,'square',.05,0,90);rumble(g,np.slot,.5,160);
  return np;
}
function removePlayer(g,slot){const i=g.ps.findIndex(q=>q.slot===slot);if(i<0)return;const p=g.ps[i];g.ps.splice(i,1);floatText(g,p.x,p.y,'P'+(slot+1)+' LEFT','#d9a87c',46);}
const active=g=>g.ps.filter(p=>!p.out);
function addScore(g,p,n){if(p)p.score+=n;g.score+=n;}
function spawn(g,type,x,y){
  const d=EN[type];let side=Math.random()<.5?-1:1;if(g.cam<30)side=1;
  const e={type,id:g.eid++,x:x??(side>0?g.cam+W+24:g.cam-24),y:y??rnd(TOP+8,BOT-8),z:0,vz:0,vx:0,face:-side,hp:d.hp,max:d.hp,state:'walk',timer:0,
    cd:50+Math.random()*60,walk:Math.random()*10,flash:0,slot:(g.eid%3)-1,gone:false,dying:false,tgt:null,killer:null};
  if(type==='blob'){e.x=g.cam+W*.68;e.y=(TOP+BOT)/2;e.z=170;e.state='intro';e.r=26;e.max=e.hp=Math.round(d.hp*(1+.5*(g.ps.length-1)));g.boss=e;}
  g.enemies.push(e);return e;
}
function dropGear(g,x,y,luck,min,il){
  const it=makeItem(rollRarity(luck||0,min),il||zoneIl(x)),b=BASES[it.k];
  g.pick.push({x:clamp(x+rnd(-12,12),g.cam+12,g.cam+W-12),y:clamp(y+rnd(-6,6),TOP+2,BOT),kind:'gear',item:it,t:0,id:++g.kid});
  if(b.rar==='u'||b.rar==='s'){toast(g,(b.rar==='u'?'ULTRA RARE':'SET ITEM')+' DROPPED!',RAR[b.rar].col);[784,988,1318].forEach((f,i)=>beep(g,f,.15,'triangle',.06,0,i*90));}
  else if(b.rar==='r')beep(g,988,.12,'triangle',.04);
}
function pickGear(g,p,k){
  const b=BASES[k.item.k],R=RAR[b.rar];
  k.got=true;ev(g,{t:'loot',slot:p.slot,item:k.item,x:r1(k.x),y:r1(k.y)});
  floatText(g,k.x,k.y,b.name,R.col,46);beep(g,b.rar==='c'?660:990,.08,'square',.04);
  if(!p.gearHint){p.gearHint=true;ev(g,{t:'gearhint',slot:p.slot});}
}

/* ---------- players ---------- */
function startAtk(g,p,n){const h=p.ch,base=h.atk+(n===3?6:0);
  p.atk={n,t:0,len:Math.round(base*(hasPow(p,'jolt')?.65:1)),reach:h.reach+(n===3?4:0),dmg:n===3?Math.round(h.dmg*1.6):h.dmg,hits:new Set(),air:false};
  p.buffer=false;beep(g,n===3?520:420,.06,'triangle',.04,.6);
  if(hasPow(p,'pog'))g.proj.push({id:++g.pid,from:'p',owner:p,x:p.x+p.face*10,y:p.y,z:16,vx:p.face*4.4,vy:0,dmg:6,life:70,hits:new Set(),kind:'pog'});}
function trySpecial(g,p){
  const cost=hasPow(p,'beeper')?0:Math.round(p.ch.cost*(1-(p.st?p.st.SPC:0)/100));
  if(p.hp>cost){p.hp-=cost;p.state='special';p.sp={t:0,hits:new Set(),r:0};p.inv=Math.max(p.inv,40);p.atk=null;beep(g,220,.3,'sawtooth',.05,3);}
  else floatText(g,p.x,p.y,'TOO HURT!','#ff7a5a',44);
}
function endSp(p){p.state='idle';p.sp=null;}
function canHit(e){if(e.gone||e.state==='down')return false;if(e.type==='blob')return e.state!=='intro'&&e.state!=='dead'&&e.z<30;return true;}
function strike(g,p,reach,dmg,knock,hits){
  for(const e of g.enemies){if(!canHit(e)||hits.has(e))continue;const er=e.r||0,dx=(e.x-p.x)*p.face,dy=Math.abs(e.y-p.y);
    if(dx>-6-er&&dx<reach+er&&dy<11+er*.5&&Math.abs(e.z-p.z)<(p.z>0?36:20)){hits.add(e);dmgEnemy(g,e,dmg,knock,p.face,p);}}
}
function strikeR(g,p,rad,dmg,hits){
  for(const e of g.enemies){if(!canHit(e)||hits.has(e))continue;const er=e.r||0,dx=e.x-p.x,dy=(e.y-p.y)*2;
    if(dx*dx+dy*dy<(rad+er)*(rad+er)&&Math.abs(e.z-p.z)<30){hits.add(e);dmgEnemy(g,e,dmg,true,Math.sign(dx)||p.face,p);}}
}
function dmgEnemy(g,e,dmg,knock,dir,p){
  if(p&&hasPow(p,'boombox')){dmg*=2;knock=true;part(g,e.x,e.y,30,'#ff9a3c',{vx:rnd(-.5,.5),vy:0,vz:.8,l:30,s:3,gv:0});}
  if(p&&p.st){dmg*=1+p.st.POW/100;if(Math.random()*100<p.st.CRIT){dmg*=2;floatText(g,e.x,e.y,'CRIT!','#ff4a3c',34);}
    if(p.st.LEECH&&p.hp>0)p.hp=Math.min(p.maxhp,p.hp+dmg*p.st.LEECH/100);}
  if(e.type==='cook'&&!knock&&e.face===-dir&&(e.state==='walk'||e.state==='recover')){dmg*=.35;floatText(g,e.x,e.y,'BLOCKED','#3ad6c0',36);beep(g,900,.05,'square',.04);}
  dmg=Math.round(dmg);
  e.hp-=dmg;e.flash=8;addScore(g,p,10);if(p){p.combo++;p.comboT=100;rumble(g,p.slot,e.type==='blob'?.35:.2,45);}g.stop=3;
  sparks(g,e.x-dir*4,e.y,18+(e.type==='blob'?12:0));beep(g,170+Math.random()*80,.08,'square',.06,.45);
  if(e.type==='blob'){if(e.hp<=0)killBoss(g,e,p);return;}
  if(e.type==='chainsaw'&&e.state==='attack'&&e.hp>0&&!(p&&hasPow(p,'boombox')))return;
  if(e.hp<=0||knock){e.state='down';e.vx=dir*2.8;e.vz=3.2;e.z=Math.max(e.z,.01);e.dying=e.hp<=0;if(e.dying)e.killer=p;e.timer=e.dying?70:46;e.face=-dir;
    if(e.dying){const s=EN[e.type].score;addScore(g,p,s);floatText(g,e.x,e.y,'+'+s,p?PCOL[p.slot]:'#ffc93c');goo(g,e.x,e.y,16);}}
  else{e.state='hurt';e.timer=16;e.vx=dir*1.3;e.face=-dir;}
}
function killBoss(g,e,p){
  e.state='dead';e.timer=150;e.hp=0;
  {const luck=p&&p.st?p.st.LUCK:0;dropGear(g,e.x-24,e.y,luck,'r',4);dropGear(g,e.x,e.y+6,luck,'u',4);dropGear(g,e.x+24,e.y,luck,'r',4);if(g.ps.length>2)dropGear(g,e.x,e.y-8,luck,'r',4);}
  addScore(g,p,EN.blob.score);floatText(g,e.x,e.y,'+5000','#ffc93c',70);g.queue=[];
  g.proj=g.proj.filter(q=>q.from==='p');shake(g,14);for(const q of g.ps)rumble(g,q.slot,1,600);beep(g,80,1,'sawtooth',.09,.3);
  for(const o of g.enemies)if(o!==e&&!o.gone&&o.state!=='down'){o.state='down';o.dying=true;o.vz=3;o.z=.01;o.vx=0;o.timer=60;}
}
function hurtPlayer(g,p,dmg,dir,knock){
  if(p.out||p.inv>0||p.state==='down'||p.state==='special'||hasPow(p,'troll'))return false;
  dmg=Math.max(1,Math.round(dmg*(1-(p.st?p.st.DEF:0)/100)));p.hp=Math.max(0,p.hp-dmg);shake(g,4);rumble(g,p.slot,knock||p.hp<=0?1:.7,knock?260:140);beep(g,110,.18,'sawtooth',.06,.5);p.atk=null;p.buffer=false;p.combo=0;
  sparks(g,p.x,p.y,18,6,['#ffffff','#ff7a5a']);
  if(p.hp<=0||knock){p.state='down';p.vx=dir*2.4;p.vz=3;p.z=Math.max(p.z,.01);p.timer=p.hp<=0?90:50;}
  else{p.state='hurt';p.timer=16;p.vx=dir*1.6;p.inv=24;}
  return true;
}
function hurtAny(g,test,dmg,dir,knock){let any=false;for(const p of g.ps)if(!p.out&&test(p)&&hurtPlayer(g,p,dmg,typeof dir==='function'?dir(p):dir,knock))any=true;return any;}
function loseLife(g,p){
  p.z=0;p.vz=0;p.pow=null;
  if(p.lives>0){p.lives--;p.hp=p.maxhp;p.state='idle';p.inv=150;floatText(g,p.x,p.y,'BACK FROM THE DEAD!',PCOL[p.slot],50);beep(g,330,.4,'triangle',.06,2);
    for(const e of g.enemies)if(e.type!=='blob'&&!e.gone&&e.state!=='down'&&Math.abs(e.x-p.x)<130&&Math.abs(e.y-p.y)<40){e.state='down';e.vx=Math.sign(e.x-p.x||1)*3;e.vz=3;e.z=.01;e.timer=40;e.dying=false;}}
  else{p.out=true;p.state='idle';beep(g,200,.8,'sawtooth',.05,.3);}
}
function revive(g,p){p.out=false;p.lives=2;p.hp=p.maxhp;p.inv=150;p.state='idle';p.atk=null;p.x=g.cam+30;p.y=(TOP+BOT)/2;p.z=0;p.vz=0;
  floatText(g,p.x,p.y,'P'+(p.slot+1)+' IS BACK!',PCOL[p.slot],46);beep(g,523,.1);beep(g,784,.15,'square',.05,0,90);}
function clampP(g,p){p.x=clamp(p.x,g.cam+10,g.cam+W-10);p.y=clamp(p.y,TOP,BOT);}
function grav(o,gv=.26){if(o.z>0||o.vz>0){o.vz-=gv;o.z+=o.vz;if(o.z<=0){o.z=0;o.vz=0;return true;}}return false;}
function doSpecial(g,p){
  const s=p.sp,id=p.ch.id;s.t++;
  if(id==='dex'){strikeR(g,p,38,10,s.hits);if(s.t%6===0)beep(g,600,.05,'triangle',.04,.5);if(s.t>=32)endSp(p);}
  else if(id==='rae'){s.r=Math.min(80,s.t*4);if(s.t>=5)strikeR(g,p,s.r,16,s.hits);if(s.t===5){shake(g,7);beep(g,55,.6,'sawtooth',.09,1.02);beep(g,82,.6,'square',.05,1.01);}if(s.t>=36)endSp(p);}
  else if(id==='benny'){if(s.t===7){g.proj.push({id:++g.pid,from:'p',owner:p,x:p.x+p.face*10,y:p.y,z:14,vx:p.face*4.6,vy:0,dmg:14,life:80,hits:new Set(),kind:'pizza',pierce:true});beep(g,700,.12,'square',.04,.5);}if(s.t>=20)endSp(p);}
  else if(id==='jules'){p.x+=p.face*4.4;strike(g,p,22,10,true,s.hits);if(s.t%2===0)part(g,p.x-p.face*10,p.y,rnd(6,26),'#3ad6c0',{vx:-p.face*2,vy:0,vz:0,l:10,s:2,gv:0});if(s.t>=22)endSp(p);}
}
function updPlayer(g,p){
  const h=p.ch;if(p.inv>0)p.inv--;if(p.comboT>0&&--p.comboT===0)p.combo=0;if(p.comboW>0)p.comboW--;
  if(p.pow&&--p.pow.t<=0){floatText(g,p.x,p.y,POW[p.pow.k].name+' WORE OFF','#d9a87c',46);p.pow=null;}
  if(hasPow(p,'troll')&&g.time%12===0)strikeR(g,p,16,6,new Set());
  if(p.st&&p.st.REGEN&&g.time%120===0&&p.hp>0&&p.hp<p.maxhp)p.hp=Math.min(p.maxhp,p.hp+p.st.REGEN);
  if(p.state==='down'){p.x+=p.vx;if(p.z===0)p.vx*=.85;grav(p);clampP(g,p);if(--p.timer<=0&&p.z===0){if(p.hp<=0)return loseLife(g,p);p.state='idle';p.inv=70;}return;}
  if(p.state==='hurt'){p.x+=p.vx;p.vx*=.8;grav(p);if(--p.timer<=0)p.state='idle';clampP(g,p);return;}
  if(p.state==='special'){doSpecial(g,p);clampP(g,p);return;}
  const mx=(held(p,'right')?1:0)-(held(p,'left')?1:0),my=(held(p,'down')?1:0)-(held(p,'up')?1:0);
  const air=p.z>0||p.vz>0;
  if(p.atk&&!p.atk.air){
    const a=p.atk;a.t++;const pr=a.t/a.len;
    if(pr>=.28&&pr<=.6)strike(g,p,a.reach,a.dmg,a.n===3,a.hits);
    if(hit(p,'atk')&&pr>.3)p.buffer=true;
    if(hit(p,'spec')){p.atk=null;trySpecial(g,p);return;}
    if(a.t>=a.len){p.atk=null;if(a.n<3){p.comboN=a.n;p.comboW=16;}else{p.comboN=0;p.comboW=0;}
      if(p.buffer&&a.n<3)startAtk(g,p,a.n+1);p.buffer=false;}
    clampP(g,p);return;
  }
  if(mx)p.face=mx;
  const sp=h.spd*(1+(p.st?p.st.SPD:0)/100)*(air?.9:1)*(hasPow(p,'jolt')?1.45:1);p.x+=mx*sp;p.y+=my*sp*.62;p.moving=!!(mx||my);if(p.moving&&!air)p.walk+=hasPow(p,'jolt')?1.5:1;
  if(hasPow(p,'jolt')&&p.moving&&g.time%3===0)part(g,p.x-p.face*6,p.y,rnd(4,24),'#ff4a3c',{vx:-p.face,vy:0,vz:0,l:8,s:2,gv:0});
  if(air){
    if(p.atk&&p.atk.air)strike(g,p,22,h.dmg+3,true,p.atk.hits);
    else if(hit(p,'atk')){p.atk={air:true,hits:new Set(),n:0,t:0,len:1};beep(g,380,.08,'triangle',.04,.6);}
    if(grav(p))p.atk=null;
  }else{
    if(hit(p,'jump')){p.vz=4.2;p.z=.01;beep(g,300,.1,'square',.03,2);}
    else if(hit(p,'spec'))trySpecial(g,p);
    else if(hit(p,'atk'))startAtk(g,p,p.comboW>0?p.comboN+1:1);
  }
  clampP(g,p);
}

/* ---------- enemies ---------- */
function nearest(g,e){let best=null,bd=1e9;for(const p of g.ps){if(p.out)continue;const d=Math.abs(p.x-e.x)+Math.abs(p.y-e.y)*2+(p.state==='down'?120:0);if(d<bd){bd=d;best=p;}}return best;}
function eHit(g,e,reach,dmg,knock){return hurtAny(g,p=>{const dx=(p.x-e.x)*e.face;return dx>-6&&dx<reach&&Math.abs(p.y-e.y)<10&&p.z<18;},dmg,e.face,knock);}
function updEnemy(g,e){
  const d=EN[e.type];if(e.flash>0)e.flash--;if(e.cd>0)e.cd--;
  if(!e.tgt||e.tgt.out||!g.ps.includes(e.tgt)||(g.time+e.id*7)%40===0)e.tgt=nearest(g,e);
  if(e.type==='blob')return updBlob(g,e);
  if(e.type==='tape'&&e.state!=='down'){e.z=6+Math.sin((g.time+e.id*13)*.06)*3;e.vz=0;}
  else if(e.state!=='down')grav(e,.3);
  const p=e.tgt;
  switch(e.state){
  case 'walk':{
    if(!p)break;
    const side=e.x<p.x?-1:1,pd=p.state==='down';
    let tx=e.type==='pod'?p.x+side*100:p.x+side*(d.reach*.8+(pd?30:0));
    if(e.type==='chainsaw')tx=p.x+side*(pd?70:110);if(e.type==='wolf'||e.type==='gremlin')tx=p.x+side*(pd?70:e.type==='gremlin'?40:50);
    tx=clamp(tx,g.cam+16,g.cam+W-16);
    let ty=p.y;if(Math.abs(e.x-p.x)>50)ty+=e.slot*14;ty=clamp(ty,TOP,BOT);
    const off=e.x<g.cam||e.x>g.cam+W,sp=d.speed*(off?2.2:1),dx=tx-e.x,dy=ty-e.y;
    if(Math.abs(dx)>2)e.x+=Math.sign(dx)*Math.min(sp,Math.abs(dx));
    if(Math.abs(dy)>1.5)e.y+=Math.sign(dy)*Math.min(sp*.7,Math.abs(dy));
    e.face=p.x>e.x?1:-1;if(Math.abs(dx)>2||Math.abs(dy)>1.5)e.walk++;
    const aligned=Math.abs(e.y-p.y)<7,ad=Math.abs(e.x-p.x);
    if(!off&&e.cd<=0&&aligned&&!pd&&g.att<Math.min(4,1+active(g).length)){
      let go;if(e.type==='pod')go=ad>40&&ad<170;else if(e.type==='chainsaw')go=ad<190;else if(e.type==='wolf'||e.type==='gremlin')go=ad<80;else go=ad<d.reach+8;
      if(go){e.state='windup';e.timer=d.windup;g.att++;if(e.type==='chainsaw')beep(g,90,.6,'sawtooth',.04,1.6);if(e.type==='wolf')beep(g,260,.25,'sawtooth',.03,1.8);if(e.type==='gremlin')beep(g,700,.15,'square',.03,1.6);if(e.type==='cop')beep(g,140,.2,'square',.04,.8);}
    }
    break;}
  case 'windup':
    if(e.type==='chainsaw'&&g.time%5===0)smoke(g,e.x+e.face*14,e.y,22);
    if(--e.timer<=0){e.state='attack';e.timer=d.atk;e.hitDone=false;if(e.type==='wolf'||e.type==='gremlin'){e.vx=e.face*(e.type==='gremlin'?4.2:3.6);e.vz=e.type==='gremlin'?2.8:2;e.z=.01;}}
    break;
  case 'attack':
    if(e.type==='sh'||e.type==='mummy'||e.type==='cook'||e.type==='cop'||e.type==='tape'){if(e.timer===d.atk-3)eHit(g,e,d.reach+6,d.dmg,e.type==='mummy'||e.type==='cop');}
    else if(e.type==='wolf'||e.type==='gremlin'){e.x+=e.vx;e.vx*=.95;if(!e.hitDone&&eHit(g,e,16,d.dmg,false))e.hitDone=true;}
    else if(e.type==='chainsaw'){e.x+=e.face*2.7;if(!e.hitDone&&eHit(g,e,26,d.dmg,true))e.hitDone=true;if(g.time%3===0)sparks(g,e.x+e.face*24,e.y,18,1);if(g.time%8===0)beep(g,120,.08,'sawtooth',.03);
      if(e.x<g.cam+10||e.x>g.cam+W-10)e.timer=1;}
    else if(e.type==='pod'){if(e.timer===d.atk-1){g.proj.push({id:++g.pid,from:'e',x:e.x+e.face*8,y:e.y,z:24,vx:e.face*2.4,vy:0,dmg:d.dmg,life:170,kind:'slime'});beep(g,240,.15,'square',.03,.4);}}
    if(--e.timer<=0){e.state='recover';e.timer=d.recover;e.cd=d.cd+Math.random()*40;}
    break;
  case 'recover':if(--e.timer<=0)e.state='walk';break;
  case 'hurt':e.x+=e.vx;e.vx*=.8;if(--e.timer<=0){e.state='walk';e.cd=Math.max(e.cd,24);}break;
  case 'down':
    e.x+=e.vx;if(e.z>0||e.vz>0){e.vz-=.28;e.z+=e.vz;if(e.z<=0){e.z=0;e.vz=0;sparks(g,e.x,e.y,2,3,['#8a8496','#5a5468']);}}else e.vx*=.8;
    if(--e.timer<=0&&e.z===0){if(e.dying){e.gone=true;goo(g,e.x,e.y,8,10);dropFrom(g,e);}else{e.state='walk';e.cd=40;}}
    break;
  }
  e.y=clamp(e.y,TOP,BOT);if(e.state!=='walk')e.x=clamp(e.x,g.cam+6,g.cam+W-6);
}
const GEAR_CH={sh:.10,pod:.14,wolf:.18,mummy:.25,chainsaw:.65,gremlin:.15,tape:.2,cook:.2,cop:.35};
function dropFrom(g,e){
  const luck=e.killer&&e.killer.st?e.killer.st.LUCK:0;
  if(Math.random()<(GEAR_CH[e.type]||0)*(1+luck/100))dropGear(g,e.x,e.y,luck,e.type==='chainsaw'?'r':null);
  const r=Math.random(),big=e.type==='chainsaw'||e.type==='mummy'||e.type==='cop';
  if(big?r<.5:r<.08)g.pick.push({x:e.x,y:e.y,kind:pick(POWKEYS),t:0,id:++g.kid});
  else if(r<(big?.65:.2))g.pick.push({x:e.x,y:e.y,kind:'pizza',t:0,id:++g.kid});
}
function updBlob(g,e){
  const p=e.tgt,enr=e.hp<e.max/2;e.cd2=(e.cd2||0)-1;
  const contact=()=>{if(e.cd2>0)return;if(hurtAny(g,q=>{const dx=q.x-e.x,dy=(q.y-e.y)*2;return dx*dx+dy*dy<28*28&&q.z<20;},8,q=>Math.sign(q.x-e.x)||1,false))e.cd2=40;};
  switch(e.state){
  case 'intro':e.z=Math.max(0,e.z-2.5);if(e.z===0){e.state='drift';e.timer=80;shake(g,10);g.banner={txt:'THE BLOB FROM AISLE 9',t:120};beep(g,70,.6,'sawtooth',.08,.5);goo(g,e.x,e.y,4,20);}break;
  case 'drift':{if(p){const sp=enr?.75:.5,dx=p.x-e.x,dy=p.y-e.y,dd=Math.hypot(dx,dy)||1;if(dd>20){e.x+=dx/dd*sp;e.y+=dy/dd*sp*.6;}e.face=Math.sign(dx)||1;}contact();
    if(--e.timer<=0){const r=Math.random(),adds=g.enemies.filter(o=>o!==e&&!o.gone).length;
      if(r<.4)e.state='rise';else if(r<.75||adds>=2+g.ps.length){e.state='spit';e.timer=enr?64:48;}else{e.state='summon';e.timer=50;}}
    break;}
  case 'rise':e.z+=3.5;if(e.z>=120){e.state='hang';e.timer=enr?34:50;}break;
  case 'hang':if(p){e.x+=(p.x-e.x)*.07;e.y+=(p.y-e.y)*.07;}if(--e.timer<=0)e.state='fall';break;
  case 'fall':e.z-=8;if(e.z<=0){e.z=0;shake(g,12);beep(g,60,.4,'sawtooth',.09,.4);goo(g,e.x,e.y,4,22);
    hurtAny(g,q=>{const dx=q.x-e.x,dy=(q.y-e.y)*2;return dx*dx+dy*dy<56*56&&q.z<10;},18,q=>Math.sign(q.x-e.x)||1,true);e.state='recover';e.timer=enr?30:50;}break;
  case 'spit':contact();if(p&&e.timer%16===0){const base=Math.atan2(p.y-e.y,p.x-e.x);for(const k of [-.35,0,.35]){const a=base+k;
      g.proj.push({id:++g.pid,from:'e',x:e.x,y:e.y,z:24,vx:Math.cos(a)*2.2,vy:Math.sin(a)*1.3,dmg:7,life:150,kind:'slime'});}beep(g,200,.15,'square',.04,.5);}
    if(--e.timer<=0){e.state='drift';e.timer=70+Math.random()*60;}break;
  case 'summon':if(e.timer===25){for(const s of [-1,1]){const m=spawn(g,'sh',clamp(e.x+s*34,g.cam+12,g.cam+W-12),clamp(e.y+s*6,TOP,BOT));m.cd=60;}goo(g,e.x,e.y,20,16);beep(g,150,.3,'square',.05,.5);}
    if(--e.timer<=0){e.state='drift';e.timer=80;}break;
  case 'recover':contact();if(--e.timer<=0){e.state='drift';e.timer=60+Math.random()*60;}break;
  case 'dead':if(g.time%4===0)goo(g,e.x+rnd(-20,20),e.y,rnd(5,40),4);if(--e.timer<=0){e.gone=true;g.winT=1;}break;
  }
  e.x=clamp(e.x,g.cam+30,g.cam+W-30);e.y=clamp(e.y,TOP+4,BOT-2);
}

/* ---------- one tick ---------- */
function step(g){
  if(g.status!=='play')return;
  g.time++;
  if(g.stop>0){g.stop--;endTick(g);return;}
  for(const p of g.ps){if(p.out){if(hit(p,'start')||hit(p,'atk'))revive(g,p);continue;}updPlayer(g,p);}
  const act=active(g);
  if(!act.length){if(++g.ctT>600){g.status='over';}endTick(g);return;}else g.ctT=0;
  const maxCam=LEVEL_END-W,lim=g.lock!==null?g.lock:maxCam;
  const maxX=Math.max(...act.map(p=>p.x)),minX=Math.min(...act.map(p=>p.x));
  g.cam=Math.max(g.cam,Math.min(maxX-W*.42,g.cam+3,minX-12,lim));
  const w=g.waves[g.waveI],n=g.ps.length;
  if(w&&!w.on&&g.cam>=w.x-.01){w.on=true;g.lock=w.x;g.cam=Math.min(g.cam,w.x);
    g.queue=w.list.slice();if(!w.boss)for(let i=0;i<(n-1)*2;i++)g.queue.push(['chainsaw','cop'].includes(w.list[i%w.list.length])?'sh':w.list[i%w.list.length]);
    g.spawnT=0;g.maxAlive=(w.max||3)+n-1;g.go=0;}
  if(w&&w.on){g.spawnT--;const alive=g.enemies.filter(e=>!e.gone).length;
    if(g.queue.length&&g.spawnT<=0&&alive<g.maxAlive){spawn(g,g.queue.shift());g.spawnT=Math.max(20,45-n*6);}
    if(!g.queue.length&&alive===0){g.waveI++;g.lock=null;if(!w.boss){g.go=180;beep(g,880,.08,'square',.04);}}}
  g.att=g.enemies.filter(e=>!e.gone&&(e.state==='windup'||e.state==='attack')).length;
  for(const e of g.enemies)if(!e.gone)updEnemy(g,e);
  g.enemies=g.enemies.filter(e=>!e.gone);
  for(const q of g.proj){q.x+=q.vx;q.y+=q.vy;q.life--;
    if(q.from==='e'){if(hurtAny(g,p=>Math.abs(q.x-p.x)<9&&Math.abs(q.y-p.y)<8&&p.z<22,q.dmg,Math.sign(q.vx)||1,false))q.life=0;}
    else for(const e of g.enemies){const er=e.r||0;if(q.life>0&&canHit(e)&&!q.hits.has(e)&&Math.abs(e.x-q.x)<12+er&&Math.abs(e.y-q.y)<12+er*.5){
      q.hits.add(e);dmgEnemy(g,e,q.dmg,q.kind==='pizza',Math.sign(q.vx),g.ps.includes(q.owner)?q.owner:null);if(!q.pierce)q.life=0;}}
    if(q.x<g.cam-30||q.x>g.cam+W+30||q.y<TOP-6||q.y>BOT+6)q.life=0;}
  g.proj=g.proj.filter(q=>q.life>0);
  for(const k of g.pick){k.t++;if(k.got)continue;
    // Loot never gets left behind: anything that falls off the left edge slides along with the screen.
    const minX=g.cam+16;if(k.x<minX)k.x=Math.min(minX,k.x+Math.max(1.5,(minX-k.x)*.25));
    for(const p of act){if(Math.abs(k.x-p.x)<12&&Math.abs(k.y-p.y)<9&&p.z<12&&p.state!=='down'){if(k.kind==='gear'){pickGear(g,p,k);break;}k.got=true;
      if(k.kind==='pizza'){p.hp=Math.min(p.maxhp,p.hp+30);floatText(g,k.x,k.y,'+30 HP','#c8f05a');}
      else if(k.kind==='tape'){addScore(g,p,1000);floatText(g,k.x,k.y,'RARE TAPE +1000','#ffc93c');}
      else{const P=POW[k.kind];p.pow={k:k.kind,t:P.dur};rumble(g,p.slot,.6,300);floatText(g,k.x,k.y,P.name+'! '+P.desc,P.col,46);sparks(g,p.x,p.y,20,10,[P.col,'#ffffff']);
        [392,523,659].forEach((f,i)=>beep(g,f,.08,'square',.05,0,i*60));}
      beep(g,660,.08,'square',.04);beep(g,990,.1,'square',.04,0,70);break;}}}
  g.pick=g.pick.filter(k=>!k.got);
  for(const s of g.surv){s.t++;if(s.saved){if(s.fade>0)s.fade--;continue;}
    const p=act.find(p=>Math.abs(s.x-p.x)<15&&Math.abs(s.y-p.y)<10&&p.z<14);
    if(p){s.saved=true;g.saved++;p.saved++;addScore(g,p,500);dropGear(g,s.x,s.y,p.st?p.st.LUCK:0,'r');floatText(g,s.x,s.y,s.name+' SAVED!','#3ad6c0',46);
      sparks(g,s.x,s.y,20,10,['#3ad6c0','#ffffff','#ffc93c']);[523,659,784,1046].forEach((f,i)=>beep(g,f,.1,'square',.04,0,i*70));}}
  if(g.go>0)g.go--;if(g.banner&&g.banner.t>0)g.banner.t--;
  if(g.winT>0&&++g.winT>100){g.bonus=g.saved*1000;for(const p of g.ps)addScore(g,p,p.saved*1000);g.status='win';
    [392,523,659,784,1046].forEach((f,i)=>beep(g,f,.18,'square',.05,0,i*120));}
  endTick(g);
}
function endTick(g){for(const p of g.ps)p.pin={...p.in};}

/* ---------- snapshots: what a client needs to draw the world ---------- */
function snapshot(g){
  return {tm:g.time,cam:r1(g.cam),lock:g.lock,wi:g.waveI,sc:g.score,sv:g.saved,go:g.go,ban:g.banner&&g.banner.t>0?[g.banner.txt,g.banner.t]:0,st:g.status,ct:g.ctT,bn:g.bonus,
    boss:g.boss&&!g.boss.gone?g.boss.id:-1,
    ps:g.ps.map(p=>({s:p.slot,h:HEROES.indexOf(p.ch),x:r1(p.x),y:r1(p.y),z:r1(p.z),f:p.face,hp:Math.round(p.hp),mh:p.maxhp,lv:p.lives,st:p.state,inv:p.inv,
      atk:p.atk?[p.atk.n,p.atk.t,p.atk.len,p.atk.air?1:0]:0,sp:p.sp?[p.sp.t,r1(p.sp.r)]:0,w:Math.round(p.walk),mv:p.moving?1:0,cb:p.combo,pw:p.pow?[p.pow.k,p.pow.t]:0,
      out:p.out?1:0,aw:p.away?1:0,sc:p.score,sav:p.saved,lk:p.look})),
    en:g.enemies.map(e=>({t:e.type,id:e.id,x:r1(e.x),y:r1(e.y),z:r1(e.z),f:e.face,hp:Math.round(e.hp),mx:e.max,st:e.state,tm:e.timer,w:Math.round(e.walk),fl:e.flash,dy:e.dying?1:0,tg:e.tgt?e.tgt.slot:-1})),
    pj:g.proj.map(q=>({id:q.id,k:q.kind,x:r1(q.x),y:r1(q.y),z:r1(q.z),vx:r1(q.vx)})),
    pk:g.pick.map(k=>({id:k.id,k:k.kind,x:r1(k.x),y:r1(k.y),t:k.t,it:k.item||0})),
    su:g.surv.map(s=>[s.saved?1:0,s.fade,s.t])};
}
// Rebuilds g from a snapshot, keeping existing objects so client-side fields (dev, lostPad, interpolation) survive.
function applySnapshot(g,s){
  if(!g)g={ps:[],enemies:[],proj:[],pick:[],surv:SURV.map(q=>({x:q.x,y:q.y,name:q.name,saved:false,fade:40,t:0})),waves:[],ev:[],net:true};
  Object.assign(g,{time:s.tm,cam:s.cam,lock:s.lock,waveI:s.wi,score:s.sc,saved:s.sv,go:s.go,banner:s.ban?{txt:s.ban[0],t:s.ban[1]}:null,status:s.st,ctT:s.ct,bonus:s.bn});
  const keep=(list,key,rows,make,upd)=>{const out=[];for(const r of rows){let o=list.find(q=>q[key]===r[key==='slot'?'s':'id']);if(!o)o=make(r);upd(o,r);out.push(o);}return out;};
  const tgt=(o,x,y,z)=>{if(o._nx===undefined){o.x=x;o.y=y;o.z=z;}else{o._fx=o.x;o._fy=o.y;o._fz=o.z;}o._nx=x;o._ny=y;o._nz=z;o._t0=g.now||0;};
  g.ps=keep(g.ps,'slot',s.ps,r=>({slot:r.s,in:{},pin:{},look:{},x:r.x,y:r.y,z:r.z}),(p,r)=>{p.ch=HEROES[r.h]||HEROES[0];tgt(p,r.x,r.y,r.z);p.face=r.f;p.hp=r.hp;p.maxhp=r.mh;p.lives=r.lv;p.state=r.st;p.inv=r.inv;
    p.atk=r.atk?{n:r.atk[0],t:r.atk[1],len:r.atk[2],air:!!r.atk[3]}:null;p.sp=r.sp?{t:r.sp[0],r:r.sp[1]}:null;p.walk=r.w;p.moving=!!r.mv;p.combo=r.cb;p.pow=r.pw?{k:r.pw[0],t:r.pw[1]}:null;
    p.out=!!r.out;p.away=!!r.aw;p.score=r.sc;p.saved=r.sav;p.look=r.lk||{};});
  g.enemies=keep(g.enemies,'id',s.en,r=>({id:r.id,x:r.x,y:r.y,z:r.z}),(e,r)=>{e.type=r.t;tgt(e,r.x,r.y,r.z);e.face=r.f;e.hp=r.hp;e.max=r.mx;e.state=r.st;e.timer=r.tm;e.walk=r.w;e.flash=r.fl;e.dying=!!r.dy;e.r=r.t==='blob'?26:0;
    e.tgt=r.tg>=0?g.ps.find(p=>p.slot===r.tg)||null:null;});
  g.proj=keep(g.proj,'id',s.pj,r=>({id:r.id,x:r.x,y:r.y,z:r.z}),(q,r)=>{q.kind=r.k;tgt(q,r.x,r.y,r.z);q.vx=r.vx;});
  g.pick=keep(g.pick,'id',s.pk,r=>({id:r.id}),(k,r)=>{k.kind=r.k;k.x=r.x;k.y=r.y;k.t=r.t;k.item=r.it||null;});
  s.su.forEach((r,i)=>{const o=g.surv[i];if(o){o.saved=!!r[0];o.fade=r[1];o.t=r[2];}});
  g.boss=s.boss>=0?g.enemies.find(e=>e.id===s.boss)||null:null;
  return g;
}
// Moves every networked object toward its latest snapshot position over `ms` milliseconds.
function interpolate(g,now,ms){
  const f=o=>{if(o._nx===undefined)return;const a=o._fx===undefined?1:Math.min(1,(now-o._t0)/ms);
    o.x=o._fx===undefined?o._nx:o._fx+(o._nx-o._fx)*a;o.y=o._fy===undefined?o._ny:o._fy+(o._ny-o._fy)*a;o.z=o._fz===undefined?o._nz:o._fz+(o._nz-o._fz)*a;};
  for(const p of g.ps)f(p);for(const e of g.enemies)f(e);for(const q of g.proj)f(q);
}

const LFCore={W,H,TOP,BOT,LEVEL_END,PCOL,HEROES,POW,POWKEYS,EN,WAVES,SURV,FIXED_PICKS,
  CATS,CAT_NAME,RAR,STAT,STAT_KEYS,CAP,POOL,SETS,SET_OF,BASES,BASE_LIST,BAG_MAX,ITEMCOL,setSize,makeItem,rollRarity,emptyGear,cleanItem,calcStatsFor,gearLookFor,cleanStats,cleanLook,bonusTxt,
  clamp,lerp,rnd,pick,spawn,newGame,addPlayer,removePlayer,revive,setStats,step,snapshot,applySnapshot,interpolate,hasPow,active};
globalThis.LFCore=LFCore;
})();
