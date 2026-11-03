/* The Last Video Store — shared simulation core.
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
 {id:'julia',first:'JULIA',name:'JULIA OKAFOR',job:'BLADER',spd:1.95,dmg:8,reach:30,atk:14,sp:'BLADE RUSH',cost:8,stats:[3,5,3],quote:"Totally bogus. Let's roll."},
];
const POW={
 jolt:{name:'JOLT SODA',desc:'SPEED UP',col:'#ff5a4a',dur:600},
 boombox:{name:'BOOMBOX',desc:'DOUBLE DAMAGE',col:'#ff9a3c',dur:600},
 pog:{name:'POG SLAMMER',desc:'THROW POGS',col:'#3ad6c0',dur:600},
 troll:{name:'TROLL DOLL',desc:'INVINCIBLE',col:'#ff5fa8',dur:480},
 beeper:{name:'BEEPER',desc:'FREE SPECIALS',col:'#c8f05a',dur:600},
};
const POWKEYS=Object.keys(POW);

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
 {x:LEVEL_END-W,list:['blob'],boss:true,end:true,max:6},
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

// Enemy behavior is data: ai = melee | lunge | ranged | charge, plus flags (knock, float, block, armor).
// look = stand-in drawing until the real art exists: s = shape, then skin / top / bottom / accent colors.
const EN={
 sh:{name:'SHAMBLER',ai:'melee',hp:22,speed:.45,dmg:8,reach:20,windup:26,atk:10,recover:24,cd:50,score:100,gear:.10},
 mummy:{name:'MUMMY',ai:'melee',knock:true,big:true,hp:44,speed:.4,dmg:12,reach:22,windup:32,atk:12,recover:30,cd:60,score:200,gear:.25},
 wolf:{name:'WEREWOLF',ai:'lunge',lv:3.6,hop:2,keep:50,hp:28,speed:1.15,dmg:10,reach:18,windup:18,atk:18,recover:30,cd:70,score:250,gear:.18},
 pod:{name:'POD PERSON',ai:'ranged',shot:{spd:2.4,kind:'slime',c:'#c8f05a'},hp:18,speed:.6,dmg:8,reach:0,windup:30,atk:10,recover:30,cd:110,score:150,gear:.14},
 chainsaw:{name:'CHAINSAW MANIAC',ai:'charge',armor:true,big:true,gearMin:'r',cspd:2.7,hp:70,speed:.7,dmg:18,reach:22,windup:42,atk:48,recover:50,cd:100,score:600,gear:.65},
 gremlin:{name:'ARCADE GREMLIN',ai:'lunge',lv:4.2,hop:2.8,keep:40,hp:20,speed:1.4,dmg:7,reach:16,windup:14,atk:16,recover:26,cd:60,score:200,gear:.15},
 tape:{name:'TAPE WRAITH',ai:'melee',float:true,hp:30,speed:.7,dmg:9,reach:32,windup:24,atk:12,recover:28,cd:60,score:250,gear:.2},
 cook:{name:'FRY COOK',ai:'melee',block:true,hp:36,speed:.55,dmg:10,reach:24,windup:26,atk:12,recover:26,cd:55,score:250,gear:.2},
 cop:{name:'MALL COP',ai:'melee',knock:true,big:true,hp:64,speed:.5,dmg:14,reach:26,windup:34,atk:14,recover:34,cd:70,score:400,gear:.35},
 // Stage 2: Hollow Pines High
 jock:{name:'ZOMBIE JOCK',ai:'charge',cspd:3.2,hp:50,speed:.8,dmg:14,reach:22,windup:34,atk:40,recover:44,cd:90,score:350,gear:.3,look:{s:'human',skin:'#9ccf6a',top:'#e8453c',bot:'#ffe9c2',acc:'#ffc93c',k:1.1}},
 hallmon:{name:'HALL MONITOR',ai:'ranged',shot:{spd:3,kind:'wave',c:'#ffe9c2'},hp:24,speed:.7,dmg:8,reach:0,windup:26,atk:10,recover:30,cd:100,score:200,gear:.15,look:{s:'human',skin:'#c9b8a0',top:'#ff9a3c',bot:'#5e2f22',acc:'#ffc93c'}},
 lunch:{name:'LUNCH LADY',ai:'melee',knock:true,big:true,hp:60,speed:.45,dmg:15,reach:26,windup:34,atk:12,recover:32,cd:70,score:350,gear:.3,look:{s:'human',skin:'#a8c890',top:'#ffe9c2',bot:'#3ad6c0',acc:'#e8453c',k:1.15}},
 // Stage 3: Camp Tall Pines
 bog:{name:'BOG BEAST',ai:'melee',knock:true,big:true,hp:76,speed:.38,dmg:16,reach:28,windup:36,atk:12,recover:34,cd:70,score:400,gear:.35,look:{s:'beast',skin:'#4a7a3a',top:'#3a5a2a',bot:'#2b3a1a',acc:'#c8f05a',k:1.2}},
 skeeter:{name:'MEGA SKEETER',ai:'lunge',float:true,lv:4.6,hop:0,keep:44,hp:16,speed:1.3,dmg:6,reach:16,windup:14,atk:16,recover:24,cd:55,score:150,gear:.12,look:{s:'float',skin:'#7a4a2e',top:'#e8453c',bot:'#3a1a12',acc:'#ffe9c2',k:.8}},
 // Stage 4: Skate Galaxy
 derby:{name:'DERBY DEMON',ai:'lunge',lv:4.8,hop:1,keep:56,hp:34,speed:1.5,dmg:10,reach:18,windup:16,atk:18,recover:28,cd:60,score:250,gear:.2,look:{s:'human',skin:'#c87aa0',top:'#ff5fa8',bot:'#2b150f',acc:'#ffc93c'}},
 rinkrat:{name:'RINK RAT',ai:'lunge',lv:4.4,hop:2.4,keep:36,hp:14,speed:1.7,dmg:6,reach:14,windup:12,atk:14,recover:22,cd:50,score:120,gear:.1,look:{s:'beast',skin:'#8a8496',top:'#ff9a3c',bot:'#5e2f22',acc:'#ff5fa8',k:.7}},
 // Stage 5: Starlight Drive-In
 martian:{name:'MARTIAN INVADER',ai:'ranged',shot:{spd:4,kind:'laser',c:'#c8f05a'},hp:26,speed:.65,dmg:9,reach:0,windup:24,atk:10,recover:30,cd:95,score:250,gear:.18,look:{s:'human',skin:'#9cff5a',top:'#c0c8d0',bot:'#7a8090',acc:'#e8453c'}},
 greaser:{name:'GREASER GHOUL',ai:'melee',block:true,hp:40,speed:.6,dmg:11,reach:24,windup:24,atk:12,recover:26,cd:55,score:280,gear:.22,look:{s:'human',skin:'#b0c8a0',top:'#2b150f',bot:'#3a5a8a',acc:'#ffe9c2'}},
 // Stage 6: Strike Zone Lanes
 pinhead:{name:'PINHEAD',ai:'lunge',lv:4,hop:3,keep:44,hp:22,speed:1.2,dmg:8,reach:16,windup:16,atk:18,recover:26,cd:60,score:180,gear:.15,look:{s:'float',skin:'#ffe9c2',top:'#e8453c',bot:'#ffe9c2',acc:'#e8453c',k:.9}},
 clawcrab:{name:'CLAW CRAB',ai:'melee',knock:true,big:true,hp:84,speed:.4,dmg:16,reach:30,windup:36,atk:12,recover:36,cd:75,score:450,gear:.38,look:{s:'beast',skin:'#e8453c',top:'#c0c8d0',bot:'#3a1a12',acc:'#ffc93c',k:1.2}},
 // Stage 7: Rewind Video Warehouse
 mannequin:{name:'MANNEQUIN',ai:'melee',block:true,hp:50,speed:.5,dmg:12,reach:24,windup:24,atk:12,recover:26,cd:55,score:300,gear:.25,look:{s:'human',skin:'#f0dcb8',top:'#3ad6c0',bot:'#f0dcb8',acc:'#2b150f'}},
 usher:{name:'ZOMBIE USHER',ai:'ranged',shot:{spd:3.2,kind:'flash',c:'#ffe9a0'},hp:30,speed:.65,dmg:9,reach:0,windup:24,atk:10,recover:30,cd:95,score:250,gear:.2,look:{s:'human',skin:'#9ccf6a',top:'#b8261e',bot:'#2b150f',acc:'#ffc93c'}},
 // Stage 8: Splash Kingdom
 lifeguard:{name:'LIFEGUARD LURKER',ai:'lunge',lv:4.4,hop:2.2,keep:50,hp:40,speed:1.1,dmg:12,reach:18,windup:16,atk:18,recover:28,cd:60,score:300,gear:.24,look:{s:'human',skin:'#7ab0a0',top:'#e8453c',bot:'#e8453c',acc:'#ffe9c2'}},
 poolshark:{name:'POOL SHARK',ai:'charge',armor:true,big:true,cspd:3.4,hp:64,speed:.7,dmg:18,reach:22,windup:36,atk:44,recover:46,cd:95,score:500,gear:.45,look:{s:'beast',skin:'#7a8a9a',top:'#3ad6c0',bot:'#ffe9c2',acc:'#ffffff',k:1.15}},
 // Stage 9: Channel 9 Studios
 static:{name:'STATIC SPECTER',ai:'ranged',float:true,shot:{spd:3.6,kind:'bolt',c:'#c8e8ff'},hp:30,speed:.8,dmg:9,reach:0,windup:22,atk:10,recover:28,cd:90,score:280,gear:.22,look:{s:'float',skin:'#c8e8ff',top:'#8a8496',bot:'#45221a',acc:'#ffffff'}},
 weather:{name:'WEATHERMAN',ai:'ranged',shot:{spd:3,kind:'bolt',c:'#ffc93c',n:3},hp:40,speed:.6,dmg:10,reach:0,windup:30,atk:10,recover:32,cd:110,score:350,gear:.3,look:{s:'human',skin:'#a8c890',top:'#3a4a8a',bot:'#45221a',acc:'#ffc93c'}},
 // Stage 10: The Crater
 spawn:{name:'METEOR SPAWN',ai:'lunge',lv:4.8,hop:2.6,keep:36,hp:18,speed:1.8,dmg:8,reach:14,windup:12,atk:14,recover:22,cd:45,score:150,gear:.12,look:{s:'beast',skin:'#c8f05a',top:'#7a4a2e',bot:'#3a1a12',acc:'#ff5fa8',k:.75}},
 brute:{name:'ALIEN BRUTE',ai:'melee',knock:true,big:true,hp:120,speed:.45,dmg:20,reach:32,windup:36,atk:12,recover:36,cd:70,score:600,gear:.45,look:{s:'human',skin:'#7ab06a',top:'#45221a',bot:'#2b150f',acc:'#c8f05a',k:1.35}},
 abductor:{name:'GREY ABDUCTOR',ai:'ranged',float:true,shot:{spd:3.4,kind:'beam',c:'#3ad6c0',n:2},hp:44,speed:.7,dmg:11,reach:0,windup:26,atk:10,recover:30,cd:100,score:400,gear:.35,look:{s:'float',skin:'#c0c8d0',top:'#5e6a7a',bot:'#3a4050',acc:'#3ad6c0'}},
 // Bosses: moves come from slam / spit / summon / charge.
 blob:{name:'THE BLOB FROM AISLE 9',boss:true,hp:380,r:26,speed:.5,contact:8,moves:['slam','spit','summon'],adds:['sh'],shot:{spd:2.2,kind:'slime',c:'#c8f05a',n:3},score:5000},
 squatch:{name:'SASQUATCH SCOUTMASTER',boss:true,hp:520,r:24,speed:.6,contact:10,cspd:4.2,moves:['charge','slam','summon'],adds:['skeeter'],score:7000,look:{s:'beast',skin:'#7a4a2e',top:'#c8a040',bot:'#5e3a1a',acc:'#e8453c',k:1.9}},
 kingpin:{name:'KING PIN',boss:true,hp:640,r:24,speed:.55,contact:10,cspd:4.4,moves:['charge','spit','summon'],adds:['pinhead'],shot:{spd:2.6,kind:'pin',c:'#ffe9c2',n:3},score:9000,look:{s:'human',skin:'#2b2b3a',top:'#e8453c',bot:'#2b150f',acc:'#ffe9c2',k:1.9}},
 collector:{name:'THE LATE FEE COLLECTOR',boss:true,final:true,hp:1100,r:28,speed:.55,contact:12,cspd:4.6,moves:['slam','spit','charge','summon'],adds:['spawn','abductor'],shot:{spd:2.8,kind:'bolt',c:'#ff5fa8',n:5},score:20000,look:{s:'float',skin:'#c0c8d0',top:'#2b150f',bot:'#ff5fa8',acc:'#ffc93c',k:2.2}},
};
const ADD_NOISE={charge:[90,.6,'sawtooth',.04,1.6],lunge:[260,.25,'sawtooth',.03,1.8]};

// Ten stages. Stage 1 keeps its hand-built layout; 2-10 are generated from their pools.
// Each zone: [backdrop key, length, fallback palette {kind, sky, wall, acc, f1, f2}]
const LEVELS=[
 {name:'MAPLE COURT',sub:'The meteor landed here.',zones:[['suburb',1250],['mall',1200],['lot',850]],boss:'blob'},
 {name:'HOLLOW PINES HIGH',sub:'Detention never ends.',fresh:['jock','hallmon','lunch'],pool:['sh','pod','gremlin','cook'],
  zones:[['school-hall',1150,{k:'indoor',sky:'#3a2a3a',wall:'#c8a040',acc:'#e8453c',f1:'#8a7a6a',f2:'#7a6a5a'}],['school-gym',1100,{k:'indoor',sky:'#3a2a20',wall:'#b8261e',acc:'#ffc93c',f1:'#c49a62',f2:'#b48a52'}],['school-field',1050,{k:'outdoor',sky:'#2a1a3a',wall:'#3a5a2a',acc:'#ffe9c2',f1:'#3a6a2a',f2:'#2e5a22'}]]},
 {name:'CAMP TALL PINES',sub:'Lights out at the lake.',fresh:['bog','skeeter'],pool:['wolf','sh','mummy','jock'],boss:'squatch',
  zones:[['camp-cabins',1150,{k:'outdoor',sky:'#1a2a3a',wall:'#5e3a1a',acc:'#ffc93c',f1:'#4a3a22',f2:'#3e3020'}],['camp-lake',1100,{k:'outdoor',sky:'#141e3a',wall:'#1f4a6a',acc:'#c8e8ff',f1:'#6a5a3a',f2:'#5a4a2e'}],['camp-woods',1150,{k:'outdoor',sky:'#0e1a14',wall:'#1a3a22',acc:'#ff9a3c',f1:'#3a2a1a',f2:'#2e2216'}]]},
 {name:'SKATE GALAXY',sub:'Couples skate. Forever.',fresh:['derby','rinkrat'],pool:['gremlin','cook','hallmon','wolf'],
  zones:[['rink-snack',1100,{k:'neon',sky:'#1a0a2a',wall:'#3a1a4a',acc:'#ff5fa8',f1:'#4a2a5a',f2:'#3a2048'}],['rink-floor',1200,{k:'neon',sky:'#0a0a2a',wall:'#1a1a4a',acc:'#3ad6c0',f1:'#c49a62',f2:'#b48a52'}],['rink-dj',1050,{k:'neon',sky:'#2a0a1a',wall:'#4a1a2a',acc:'#ffc93c',f1:'#2b2b3a',f2:'#22222e'}]]},
 {name:'STARLIGHT DRIVE-IN',sub:'Tonight: a double feature.',fresh:['martian','greaser'],pool:['pod','chainsaw','derby','sh'],
  zones:[['drivein-stand',1100,{k:'outdoor',sky:'#1a0a2a',wall:'#b8261e',acc:'#ffc93c',f1:'#4a3a3a',f2:'#3e3030'}],['drivein-cars',1200,{k:'outdoor',sky:'#0e0a24',wall:'#2b2b3a',acc:'#ff5fa8',f1:'#3a3030',f2:'#302828'}],['drivein-screen',1150,{k:'outdoor',sky:'#0a0a1a',wall:'#e8e0d0',acc:'#3ad6c0',f1:'#3a3030',f2:'#302828'}]]},
 {name:'STRIKE ZONE LANES',sub:'Bowling, arcade, last call.',fresh:['pinhead','clawcrab'],pool:['gremlin','greaser','cop','martian'],boss:'kingpin',
  zones:[['bowl-lanes',1200,{k:'neon',sky:'#1a0a14',wall:'#5e2f22',acc:'#ff9a3c',f1:'#c49a62',f2:'#d9aa72'}],['bowl-arcade',1150,{k:'neon',sky:'#0a0a1a',wall:'#1a1a3a',acc:'#ff5fa8',f1:'#3a2a5a',f2:'#2e2248'}],['bowl-bar',1100,{k:'neon',sky:'#1a0e0a',wall:'#45221a',acc:'#ffc93c',f1:'#5e3426',f2:'#522e20'}]]},
 {name:'REWIND VIDEO WAREHOUSE',sub:'Every tape ever made. All overdue.',fresh:['mannequin','usher'],pool:['tape','cop','pinhead','chainsaw'],
  zones:[['video-shelves',1200,{k:'indoor',sky:'#1a1a2a',wall:'#2a4a7a',acc:'#ffc93c',f1:'#5a5a6a',f2:'#4e4e5e'}],['video-dock',1150,{k:'indoor',sky:'#1a1410',wall:'#7a3f26',acc:'#ffc93c',f1:'#5e5040',f2:'#524636'}],['video-office',1100,{k:'indoor',sky:'#141a14',wall:'#3a5a4a',acc:'#e8453c',f1:'#6a5a4a',f2:'#5e4e40'}]]},
 {name:'SPLASH KINGDOM',sub:'Closed for the season.',fresh:['lifeguard','poolshark'],pool:['bog','skeeter','mannequin','usher'],
  zones:[['water-wave',1200,{k:'outdoor',sky:'#0a1a2a',wall:'#1f9e8e',acc:'#ffe9c2',f1:'#c8b890',f2:'#b8a880'}],['water-slides',1150,{k:'outdoor',sky:'#140a24',wall:'#ff9a3c',acc:'#3ad6c0',f1:'#c8b890',f2:'#b8a880'}],['water-lockers',1150,{k:'indoor',sky:'#1a2a2a',wall:'#3a7a7a',acc:'#ffe9c2',f1:'#8aa0a0',f2:'#7a9090'}]]},
 {name:'CHANNEL 9 STUDIOS',sub:'We interrupt this broadcast.',fresh:['static','weather'],pool:['usher','mannequin','clawcrab','lifeguard'],
  zones:[['tv-news',1150,{k:'indoor',sky:'#0a1a2a',wall:'#2a3a6a',acc:'#e8453c',f1:'#4a4a5a',f2:'#3e3e4e'}],['tv-studio',1200,{k:'neon',sky:'#0a0a14',wall:'#1a1a2a',acc:'#ffc93c',f1:'#2b2b3a',f2:'#22222e'}],['tv-roof',1150,{k:'outdoor',sky:'#0a0a24',wall:'#5e6a7a',acc:'#e8453c',f1:'#4a4a52',f2:'#3e3e46'}]]},
 {name:'THE CRATER',sub:'Where it all began.',fresh:['spawn','brute','abductor'],pool:['static','poolshark','weather','bog'],boss:'collector',
  zones:[['crater-woods',1150,{k:'outdoor',sky:'#0e0a1a',wall:'#1a2a1a',acc:'#c8f05a',f1:'#3a2a22',f2:'#2e221a'}],['crater-hull',1200,{k:'neon',sky:'#0a0a14',wall:'#3a4050',acc:'#3ad6c0',f1:'#2b3040',f2:'#222838'}],['crater-core',1150,{k:'neon',sky:'#1a0a14',wall:'#3a1a2a',acc:'#ff5fa8',f1:'#2b1a24',f2:'#22141e'}]]},
];
const NSTAGES=LEVELS.length;
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const levelLen=L=>LEVELS[L-1].zones.reduce((a,z)=>a+z[1],0);
function levelZones(L){let a=0;return LEVELS[L-1].zones.map(z=>{const r=[z[0],a,a+z[1],z[2]||null];a+=z[1];return r;});}
function genWaves(L){
  if(L===1)return WAVES;
  const lv=LEVELS[L-1],len=levelLen(L),rng=mulberry(L*977+13),endX=len-W,n=7+Math.floor(L/2),waves=[];
  const heavy=t=>EN[t].ai==='charge'||EN[t].knock;
  const pickT=(allowHeavy)=>{for(let i=0;i<20;i++){const fromFresh=rng()<.55,arr=fromFresh?lv.fresh:lv.pool,t=arr[Math.floor(rng()*arr.length)];if(allowHeavy||!heavy(t))return t;}return 'sh';};
  for(let i=0;i<n;i++){
    const x=Math.round(120+(endX-320)*i/(n-1)),cnt=Math.min(7,2+Math.floor(i/2)+Math.floor(L/3)),list=[];
    let heavies=0;for(let j=0;j<cnt;j++){const t=pickT(i>0&&heavies<1+Math.floor(L/5));if(heavy(t))heavies++;list.push(t);}
    if(i===0)list[0]=lv.fresh[0];
    waves.push({x,list,max:Math.min(6,3+Math.floor(L/3))});
  }
  if(lv.boss)waves.push({x:endX,list:[lv.boss],boss:true,end:true,max:7});
  else{const list=[];for(let j=0;j<Math.min(9,5+Math.floor(L/2));j++)list.push(pickT(j<2));waves.push({x:endX,list,end:true,finale:true,max:Math.min(7,4+Math.floor(L/3))});}
  return waves;
}
function survFor(L){
  if(L===1)return SURV.map(s=>({x:s.x,y:s.y,name:s.name}));
  const len=levelLen(L),ys=[150,190,160,180,150,192,160,175];
  return SURV.map((s,i)=>({x:Math.round(len*(i+.6)/9.4),y:ys[i],name:s.name}));
}
function picksFor(L){
  if(L===1)return FIXED_PICKS.map(p=>({...p}));
  const len=levelLen(L),kinds=['jolt','tape','pizza','boombox','pog','tape','pizza','beeper','tape','troll','pizza','jolt'],ys=[185,170,190,150,190,145,170,150,195,150,160,195];
  return kinds.map((k,i)=>({x:Math.round(len*(i+.5)/12.4),y:ys[i],kind:k}));
}

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
  return {k:it.k,st,il:clamp((it.il|0)||1,1,10),u:String(it.u||uid())};}

/* ---------- gear helpers that work on a plain gear object {eq,bag} ---------- */
const setSize=id=>BASE_LIST.filter(b=>b.set===id).length;
function calcStatsFor(g){const t=Object.fromEntries(STAT_KEYS.map(k=>[k,0])),sets={};
  for(const c of CATS){const it=g.eq[c];if(!it)continue;const b=BASES[it.k];for(const s in it.st)t[s]+=it.st[s];if(b.set)sets[b.set]=(sets[b.set]||0)+1;}
  for(const S of SETS){const n=sets[S.id]||0;for(const [need,bon] of S.bonus)if(n>=need)for(const s in bon)t[s]+=bon[s];}
  for(const s in CAP)t[s]=Math.min(CAP[s],t[s]);t.sets=sets;return t;}
// Look = equipped colours per slot, plus out = a set worn with 3+ pieces (heroes swap to that set's outfit art when it exists).
const OUTFIT_MIN=3;
function gearLookFor(g){const o={},n={};for(const c of CATS)if(g.eq[c]){const b=BASES[g.eq[c].k];o[c]=b.col;if(b.set)n[b.set]=(n[b.set]||0)+1;}
  let best=null;for(const k in n)if(n[k]>=OUTFIT_MIN&&(!best||n[k]>n[best]))best=k;if(best)o.out=best;
  if(Array.isArray(g.bag))o.free=Math.max(0,BAG_MAX-g.bag.length);return o;}
function cleanStats(st){const t=Object.fromEntries(STAT_KEYS.map(k=>[k,0]));if(st&&typeof st==='object')for(const k of STAT_KEYS){const v=+st[k];if(Number.isFinite(v))t[k]=Math.max(0,Math.min(k in CAP?CAP[k]:400,v));}
  t.sets={};if(st&&st.sets&&typeof st.sets==='object')for(const S of SETS){const n=st.sets[S.id]|0;if(n>0)t.sets[S.id]=Math.min(n,setSize(S.id));}return t;}
function cleanLook(lk){const o={};if(lk&&typeof lk==='object'){for(const c of CATS){const v=lk[c];if(typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v))o[c]=v;}if(SETS.some(s=>s.id===lk.out))o.out=lk.out;if(Number.isInteger(lk.free))o.free=Math.max(0,Math.min(BAG_MAX,lk.free));}return o;}
function bonusTxt(k,v){return STAT[k].short+(k==='SPC'?'-':'+')+v+(k==='HP'||k==='REGEN'?'':'%');}
const zoneIl=(g,x)=>{const zs=levelZones(g.level||1);let i=zs.findIndex(z=>x<z[2]);if(i<0)i=zs.length-1;return clamp((g.level||1)+i,1,10);};

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
const pbeep=(g,p,...a)=>{beep(g,...a);g.ev[g.ev.length-1].p=p.slot;};   // a sound the player's own button press makes
const r1=v=>Math.round(v*10)/10;

/* ---------- input: each player carries in/pin (this tick, last tick) ---------- */
const held=(p,a)=>!!p.in[a];
const hit=(p,a)=>!!p.in[a]&&!p.pin[a];
const hasPow=(p,k)=>!!(p.pow&&p.pow.k===k);

/* ---------- game setup ---------- */
// Run stats per player, shown on the end screen.
const newRS=()=>({k:0,bk:0,dd:0,dt:0,ld:0,cu:0,mc:0,lt:{c:0,r:0,u:0,s:0}});
function mkPlayer(g,spec){
  const hero=HEROES[spec.hero]||HEROES[0];
  const p={slot:spec.slot,ch:hero,x:spec.x??g.cam+30,y:spec.y??(TOP+BOT)/2,z:0,vz:0,vx:0,face:1,hp:100,maxhp:100,lives:2,inv:120,state:'idle',timer:0,atk:null,comboN:0,comboW:0,
    buffer:false,walk:0,moving:false,combo:0,comboT:0,sp:null,score:0,saved:0,pow:null,out:false,away:false,in:{},pin:{},st:null,look:{},gearHint:false,rs:newRS()};
  setStats(p,spec.st,spec.look,true);return p;
}
function setStats(p,st,look,quiet){
  const ratio=p.maxhp?p.hp/p.maxhp:1;
  p.st=cleanStats(st);p.maxhp=100+p.st.HP;p.hp=Math.max(p.hp>0?1:0,Math.round(p.maxhp*ratio));p.look=cleanLook(look);
  p.gfree=Number.isInteger(p.look.free)?p.look.free:Infinity;p.gslot={};for(const c of CATS)if(p.look[c])p.gslot[c]=1;
}
/* Difficulty. Easy is the original tuning. att = monsters attacking at once: base + players, capped, +1 every `every` stages.
   tempo scales monster wind-up / recovery / cooldown from stage 1 (t1) to stage 10 (t10). */
const DIFF={
  easy:  {name:'EASY',  conts:Infinity,lives:2,carry:false,heal:1, att:[1,5,4],tempo:[1,1], coop:2,coopHp:0,  hpg:.14,dmg:.08,dmg0:1,pizza:[.12,.15]},
  normal:{name:'NORMAL',conts:3,       lives:2,carry:true, heal:.4,att:[2,6,3],tempo:[.8,.65],coop:3,coopHp:.15,hpg:.18,dmg:.12,dmg0:1.2,pizza:[.08,.10]},
  hard:  {name:'HARD',  conts:2,       lives:1,carry:true, heal:.3,att:[2,7,3],tempo:[.7,.55],coop:3,coopHp:.2, hpg:.2, dmg:.14,dmg0:1.35,pizza:[.06,.08]},
};
const DIFFS=Object.keys(DIFF);
const dif=g=>DIFF[g.diff]||DIFF.normal;
const tempo=g=>{const t=dif(g).tempo;return t[0]+(t[1]-t[0])*((g.level||1)-1)/9;};
function newGame(specs,stage,diff){
  const g={cam:0,lock:null,waveI:0,waves:[],queue:[],spawnT:0,maxAlive:3,enemies:[],proj:[],pid:0,pick:[],surv:[],
    ps:[],score:0,saved:0,stop:0,go:0,banner:null,boss:null,winT:0,time:0,eid:0,att:0,bonus:0,ctT:0,status:'play',ev:[],kid:0,level:1,len:LEVEL_END,clearT:0,hmul:1,dmul:1,diff:DIFF[diff]?diff:'normal',rs:{L0:clamp((stage|0)||1,1,NSTAGES),cleared:0,bosses:0}};
  (specs||[]).forEach((s,i)=>g.ps.push(mkPlayer(g,{...s,x:40+i*14,y:150+i*16})));
  g.ps.forEach(p=>{p.lives=dif(g).lives;p.conts=dif(g).conts;});
  loadLevel(g,clamp((stage|0)||1,1,NSTAGES),true);
  return g;
}
// Sets up a stage. Players keep score, lives and gear. On Easy everyone starts healthy; harder modes carry health over and heal part of it.
function loadLevel(g,L,first){
  const lv=LEVELS[L-1];
  Object.assign(g,{level:L,len:levelLen(L),cam:0,lock:null,waveI:0,waves:genWaves(L).map(w=>({...w,on:false})),queue:[],spawnT:0,maxAlive:3,enemies:[],proj:[],
    boss:null,winT:0,clearT:0,ctT:0,status:'play',saved:0,go:0,bonus:0,hmul:1+dif(g).hpg*(L-1),dmul:(dif(g).dmg0||1)*(1+dif(g).dmg*(L-1)),
    pick:picksFor(L).map(p=>({...p,t:Math.floor(Math.random()*60),id:++g.kid})),
    surv:survFor(L).map(s=>({...s,saved:false,fade:40,t:Math.floor(Math.random()*200)})),
    banner:{txt:'STAGE '+L+': '+lv.name,t:170}});
  g.ps.forEach((p,i)=>{Object.assign(p,{x:40+i*14,y:150+i*16,z:0,vz:0,vx:0,face:1,state:'idle',timer:0,atk:null,sp:null,inv:120,lvSaved:0});
    if(p.out){p.out=false;p.lives=Math.max(p.lives,0);p.hp=Math.round(p.maxhp*.5);}
    else p.hp=first||!dif(g).carry?p.maxhp:Math.min(p.maxhp,Math.round(p.hp+p.maxhp*dif(g).heal));});
  ev(g,{t:'stage',L});
}
function addPlayer(g,spec){
  if(g.ps.length>=4||g.ps.some(q=>q.slot===spec.slot))return null;
  let hero=spec.hero;if(hero==null||g.ps.some(q=>q.ch===HEROES[hero])){hero=0;while(g.ps.some(q=>q.ch===HEROES[hero]))hero++;}
  const np=mkPlayer(g,{...spec,hero});np.lives=dif(g).lives;np.conts=dif(g).conts;g.ps.push(np);
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
  e.max=e.hp=Math.round(d.hp*(g.hmul||1)*(1+dif(g).coopHp*Math.max(0,g.ps.length-1)));
  if(d.boss){e.x=g.cam+W*.68;e.y=(TOP+BOT)/2;e.z=170;e.state='intro';e.r=d.r;e.max=e.hp=Math.round(d.hp*(1+.5*(g.ps.length-1))*(g.hmul||1));g.boss=e;}
  g.enemies.push(e);return e;
}
function dropGear(g,x,y,luck,min,il){
  const it=makeItem(rollRarity(luck||0,min),il||zoneIl(g,x)),b=BASES[it.k];
  g.pick.push({x:clamp(x+rnd(-12,12),g.cam+24,g.cam+W-24),y:clamp(y+rnd(-6,6),TOP+2,BOT),kind:'gear',item:it,t:0,id:++g.kid});
  if(b.rar==='u'||b.rar==='s'){toast(g,(b.rar==='u'?'ULTRA RARE':'SET ITEM')+' DROPPED!',RAR[b.rar].col);[784,988,1318].forEach((f,i)=>beep(g,f,.15,'triangle',.06,0,i*90));}
  else if(b.rar==='r')beep(g,988,.12,'triangle',.04);
}
// Room for this item? An empty slot for its kind (it gets put on) or a free bag space. A full player leaves it on the ground.
function gearFits(p,item){const c=BASES[item.k].cat;return !(p.gslot&&p.gslot[c])||!(p.gfree<=0);}
function pickGear(g,p,k){
  const b=BASES[k.item.k],R=RAR[b.rar];
  if(!p.gslot)p.gslot={};if(!p.gslot[b.cat])p.gslot[b.cat]=1;else if(p.gfree>0)p.gfree--;
  (p.lootLog||(p.lootLog=[])).push(JSON.stringify(cleanItem(k.item)));if(p.lootLog.length>6)p.lootLog.shift();
  k.got=true;if(p.rs)p.rs.lt[b.rar]=(p.rs.lt[b.rar]||0)+1;ev(g,{t:'loot',slot:p.slot,item:k.item,x:r1(k.x),y:r1(k.y)});
  floatText(g,k.x,k.y,b.name,R.col,46);beep(g,b.rar==='c'?660:990,.08,'square',.04);
  if(!p.gearHint){p.gearHint=true;ev(g,{t:'gearhint',slot:p.slot});}
}

/* ---------- players ---------- */
function startAtk(g,p,n){const h=p.ch,base=h.atk+(n===3?6:0);
  p.atk={n,t:0,len:Math.round(base*(hasPow(p,'jolt')?.65:1)),reach:h.reach+(n===3?4:0),dmg:n===3?Math.round(h.dmg*1.6):h.dmg,hits:new Set(),air:false};
  p.buffer=false;pbeep(g,p,n===3?520:420,.06,'triangle',.04,.6);
  if(hasPow(p,'pog'))g.proj.push({id:++g.pid,from:'p',owner:p,x:p.x+p.face*10,y:p.y,z:16,vx:p.face*4.4,vy:0,dmg:6,life:70,hits:new Set(),kind:'pog'});}
function trySpecial(g,p){
  const cost=hasPow(p,'beeper')?0:Math.round(p.ch.cost*(1-(p.st?p.st.SPC:0)/100));
  if(p.hp>cost){p.hp-=cost;p.state='special';p.sp={t:0,hits:new Set(),r:0};p.inv=Math.max(p.inv,40);p.atk=null;pbeep(g,p,220,.3,'sawtooth',.05,3);}
  else floatText(g,p.x,p.y,'TOO HURT!','#ff7a5a',44);
}
// A client whose bag filled up before the room server heard about it hands a just-looted item back: it goes back on the ground.
function dropBack(g,p,item){
  const it=cleanItem(item);if(!it||!p||!p.lootLog)return false;const i=p.lootLog.indexOf(JSON.stringify(it));if(i<0)return false;p.lootLog.splice(i,1);
  const b=BASES[it.k];if(p.rs&&p.rs.lt[b.rar]>0)p.rs.lt[b.rar]--;p.gfree=0;
  g.pick.push({x:clamp(p.x-p.face*18,g.cam+24,g.cam+W-24),y:clamp(p.y,TOP+2,BOT),kind:'gear',item:it,t:0,id:++g.kid,skip:p.slot});
  floatText(g,p.x,p.y-30,'BAG FULL','#ff7a5a',40);return true;}
function endSp(p){p.state='idle';p.sp=null;}
function canHit(e){if(e.gone||(e.state==='down'&&!(e.z>3&&(e.juggle||0)<3)))return false;if(EN[e.type].boss)return e.state!=='intro'&&e.state!=='dead'&&e.z<30;return true;}
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
  if(EN[e.type].block&&!knock&&e.face===-dir&&(e.state==='walk'||e.state==='recover')){dmg*=.35;floatText(g,e.x,e.y,'BLOCKED','#3ad6c0',36);beep(g,900,.05,'square',.04);}
  dmg=Math.round(dmg);
  const big=!!(p&&p.atk&&p.atk.n===3)||(p&&p.state==='special'),juggle=e.state==='down'&&e.z>3;
  e.hp-=dmg;e.flash=8;addScore(g,p,10);if(p){p.combo++;p.comboT=100;if(p.rs){p.rs.dd+=dmg;if(p.combo>p.rs.mc)p.rs.mc=p.combo;}rumble(g,p.slot,EN[e.type].boss?.35:.2,45);}
  // hit-stop: the two bodies involved freeze for a few ticks (longer on a finisher); the rest of the fight keeps moving
  e.hs=big?6:4;if(p)p.hs=big?5:3;shake(g,big?3.5:1.4);
  sparks(g,e.x-dir*4,e.y,18+(EN[e.type].boss?12:0),big?10:6);beep(g,170+Math.random()*80,.08,'square',.06,.45);
  if(EN[e.type].boss){if(e.hp<=0&&e.state!=='dead')killBoss(g,e,p);return;}
  if(EN[e.type].armor&&e.state==='attack'&&e.hp>0&&!(p&&hasPow(p,'boombox')))return;
  if(juggle){ // already airborne: knock it back up instead of letting it drop
    e.juggle=(e.juggle||0)+1;e.vz=Math.max(e.vz,2.4)+.4;e.vx=dir*2.2;e.timer=Math.max(e.timer,40);e.dying=e.hp<=0;if(e.dying){e.killer=p;if(p&&p.rs)p.rs.k++;}
    if(p)addScore(g,p,25*e.juggle);floatText(g,e.x,e.y-e.z,'JUGGLE x'+e.juggle,'#ff9a3c',30);
    if(e.dying){const sc=EN[e.type].score;addScore(g,p,sc);floatText(g,e.x,e.y,'+'+sc,p?PCOL[p.slot]:'#ffc93c');goo(g,e.x,e.y,16);}return;}
  if(e.hp<=0||knock){e.state='down';e.vx=dir*(big?3.4:2.8);e.vz=big?4.1:3.2;e.z=Math.max(e.z,.01);e.bounced=false;e.juggle=0;e.dying=e.hp<=0;if(e.dying){e.killer=p;if(p&&p.rs)p.rs.k++;}e.timer=e.dying?70:46;e.face=-dir;
    if(e.dying){const sc=EN[e.type].score;addScore(g,p,sc);floatText(g,e.x,e.y,'+'+sc,p?PCOL[p.slot]:'#ffc93c');goo(g,e.x,e.y,16);}}
  else{e.state='hurt';e.timer=16;e.vx=dir*1.3;e.face=-dir;}
}
function killBoss(g,e,p){
  if(g.rs)g.rs.bosses++;if(p&&p.rs){p.rs.bk++;p.rs.k++;}
  e.state='dead';e.timer=150;e.hp=0;
  {const luck=p&&p.st?p.st.LUCK:0,il=Math.min(10,(g.level||1)+3);dropGear(g,e.x-24,e.y,luck,'r',il);dropGear(g,e.x,e.y+6,luck,'u',il);dropGear(g,e.x+24,e.y,luck,'r',il);if(g.ps.length>2)dropGear(g,e.x,e.y-8,luck,'r',il);if(EN[e.type].final)dropGear(g,e.x,e.y-14,luck,'u',10);}
  addScore(g,p,EN[e.type].score);floatText(g,e.x,e.y,'+'+EN[e.type].score,'#ffc93c',70);g.queue=[];
  g.proj=g.proj.filter(q=>q.from==='p');shake(g,14);for(const q of g.ps)rumble(g,q.slot,1,600);beep(g,80,1,'sawtooth',.09,.3);
  for(const o of g.enemies)if(o!==e&&!o.gone&&o.state!=='down'){o.state='down';o.dying=true;o.vz=3;o.z=.01;o.vx=0;o.timer=60;}
}
function hurtPlayer(g,p,dmg,dir,knock){
  if(p.out||p.away||p.inv>0||p.state==='down'||p.state==='special'||hasPow(p,'troll'))return false;
  dmg=Math.max(1,Math.round(dmg*(1-(p.st?p.st.DEF:0)/100)));p.hp=Math.max(0,p.hp-dmg);if(p.rs)p.rs.dt+=dmg;shake(g,knock?6:4);p.hs=4;rumble(g,p.slot,knock||p.hp<=0?1:.7,knock?260:140);beep(g,110,.18,'sawtooth',.06,.5);p.atk=null;p.buffer=false;p.combo=0;
  sparks(g,p.x,p.y,18,6,['#ffffff','#ff7a5a']);
  if(p.hp<=0||knock){p.state='down';p.vx=dir*2.4;p.vz=3;p.z=Math.max(p.z,.01);p.timer=p.hp<=0?90:50;}
  else{p.state='hurt';p.timer=16;p.vx=dir*1.6;p.inv=24;}
  return true;
}
function hurtAny(g,test,dmg,dir,knock){let any=false;for(const p of g.ps)if(!p.out&&test(p)&&hurtPlayer(g,p,dmg,typeof dir==='function'?dir(p):dir,knock))any=true;return any;}
function loseLife(g,p){
  if(p.rs)p.rs.ld++;p.z=0;p.vz=0;p.pow=null;
  if(p.lives>0){p.lives--;p.hp=p.maxhp;p.state='idle';p.inv=150;floatText(g,p.x,p.y,'BACK FROM THE DEAD!',PCOL[p.slot],50);beep(g,330,.4,'triangle',.06,2);
    for(const e of g.enemies)if(!EN[e.type].boss&&!e.gone&&e.state!=='down'&&Math.abs(e.x-p.x)<130&&Math.abs(e.y-p.y)<40){e.state='down';e.vx=Math.sign(e.x-p.x||1)*3;e.vz=3;e.z=.01;e.timer=40;e.dying=false;}}
  else{p.out=true;p.state='idle';beep(g,200,.8,'sawtooth',.05,.3);}
}
function revive(g,p){if(!(p.conts>0))return;if(p.rs)p.rs.cu++;if(p.conts!==Infinity)p.conts--;p.out=false;p.lives=dif(g).lives;p.hp=p.maxhp;p.inv=150;p.state='idle';p.atk=null;p.x=g.cam+30;p.y=(TOP+BOT)/2;p.z=0;p.vz=0;
  floatText(g,p.x,p.y,'P'+(p.slot+1)+' IS BACK!',PCOL[p.slot],46);beep(g,523,.1);beep(g,784,.15,'square',.05,0,90);}
function clampP(g,p){p.x=clamp(p.x,g.cam+10,g.cam+W-10);p.y=clamp(p.y,TOP,BOT);}
function grav(o,gv=.26){if(o.z>0||o.vz>0){o.vz-=gv;o.z+=o.vz;if(o.z<=0){o.z=0;o.vz=0;return true;}}return false;}
function doSpecial(g,p){
  const s=p.sp,id=p.ch.id;s.t++;
  if(id==='dex'){strikeR(g,p,38,10,s.hits);if(s.t%6===0)beep(g,600,.05,'triangle',.04,.5);if(s.t>=32)endSp(p);}
  else if(id==='rae'){s.r=Math.min(80,s.t*4);if(s.t>=5)strikeR(g,p,s.r,16,s.hits);if(s.t===5){shake(g,7);beep(g,55,.6,'sawtooth',.09,1.02);beep(g,82,.6,'square',.05,1.01);}if(s.t>=36)endSp(p);}
  else if(id==='benny'){if(s.t===7){g.proj.push({id:++g.pid,from:'p',owner:p,x:p.x+p.face*10,y:p.y,z:14,vx:p.face*4.6,vy:0,dmg:14,life:80,hits:new Set(),kind:'pizza',pierce:true});beep(g,700,.12,'square',.04,.5);}if(s.t>=20)endSp(p);}
  else if(id==='julia'){p.x+=p.face*4.4;strike(g,p,22,10,true,s.hits);if(s.t%2===0)part(g,p.x-p.face*10,p.y,rnd(6,26),'#3ad6c0',{vx:-p.face*2,vy:0,vz:0,l:10,s:2,gv:0});if(s.t>=22)endSp(p);}
}
function updPlayer(g,p){
  const h=p.ch;if(p.hs>0){p.hs--;return;}if(p.inv>0)p.inv--;if(p.comboT>0&&--p.comboT===0)p.combo=0;if(p.comboW>0)p.comboW--;
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
    if(pr>=.2&&pr<.5)p.x+=p.face*(a.n===3?1.5:.8);   // step into the swing
    if(pr>=.28&&pr<=.6)strike(g,p,a.reach,a.dmg,a.n===3,a.hits);
    if(hit(p,'atk')&&pr>.3)p.buffer=true;
    if(hit(p,'spec')){p.atk=null;trySpecial(g,p);return;}
    // a hit that connected can be cancelled out of: jump away, or chain the next swing early
    if(a.hits.size&&pr>.55&&hit(p,'jump')){p.atk=null;p.vz=4.2;p.z=.01;pbeep(g,p,300,.1,'square',.03,2);clampP(g,p);return;}
    const done=a.t>=a.len||(a.hits.size&&a.n<3&&p.buffer&&pr>=.7);
    if(done){p.atk=null;if(a.n<3){p.comboN=a.n;p.comboW=16;}else{p.comboN=0;p.comboW=0;}
      if(p.buffer&&a.n<3)startAtk(g,p,a.n+1);p.buffer=false;}
    clampP(g,p);return;
  }
  if(mx)p.face=mx;
  const sp=h.spd*(1+(p.st?p.st.SPD:0)/100)*(air?.9:1)*(hasPow(p,'jolt')?1.45:1);p.x+=mx*sp;p.y+=my*sp*.62;p.moving=!!(mx||my);if(p.moving&&!air)p.walk+=hasPow(p,'jolt')?1.5:1;
  if(hasPow(p,'jolt')&&p.moving&&g.time%3===0)part(g,p.x-p.face*6,p.y,rnd(4,24),'#ff4a3c',{vx:-p.face,vy:0,vz:0,l:8,s:2,gv:0});
  if(air){
    if(p.atk&&p.atk.air)strike(g,p,22,h.dmg+3,true,p.atk.hits);
    else if(hit(p,'atk')){p.atk={air:true,hits:new Set(),n:0,t:0,len:1};pbeep(g,p,380,.08,'triangle',.04,.6);}
    if(grav(p))p.atk=null;
  }else{
    if(hit(p,'jump')){p.vz=4.2;p.z=.01;pbeep(g,p,300,.1,'square',.03,2);}
    else if(hit(p,'spec'))trySpecial(g,p);
    else if(hit(p,'atk'))startAtk(g,p,p.comboW>0?p.comboN+1:1);
  }
  clampP(g,p);
}

/* ---------- enemies ---------- */
function nearest(g,e){let best=null,bd=1e9;for(const p of g.ps){if(p.out||p.away)continue;const d=Math.abs(p.x-e.x)+Math.abs(p.y-e.y)*2+(p.state==='down'?120:0);if(d<bd){bd=d;best=p;}}return best;}
function eHit(g,e,reach,dmg,knock){return hurtAny(g,p=>{const dx=(p.x-e.x)*e.face;return dx>-6&&dx<reach&&Math.abs(p.y-e.y)<10&&p.z<18;},dmg,e.face,knock);}
function updEnemy(g,e){
  const d=EN[e.type];if(e.flash>0)e.flash--;if(e.cd>0)e.cd--;
  if(e.hs>0){e.hs--;return;}
  if(!e.tgt||e.tgt.out||!g.ps.includes(e.tgt)||(g.time+e.id*7)%40===0)e.tgt=nearest(g,e);
  if(d.boss)return updBoss(g,e);
  if(d.float&&e.state!=='down'&&!(d.ai==='lunge'&&e.state==='attack')){e.z=6+Math.sin((g.time+e.id*13)*.06)*3;e.vz=0;}
  else if(e.state!=='down')grav(e,.3);
  const p=e.tgt,dm=Math.round(d.dmg*(g.dmul||1));
  switch(e.state){
  case 'walk':{
    if(!p)break;
    const side=e.x<p.x?-1:1,pd=p.state==='down';
    let tx=d.ai==='ranged'?p.x+side*100:d.ai==='charge'?p.x+side*(pd?70:110):d.ai==='lunge'?p.x+side*(pd?70:d.keep||50):p.x+side*(d.reach*.8+(pd?30:0));
    const edge=d.ai==='ranged'?44:26;tx=clamp(tx,g.cam+edge,g.cam+W-edge);
    let ty=p.y;if(Math.abs(e.x-p.x)>50)ty+=e.slot*14;ty=clamp(ty,TOP,BOT);
    const off=e.x<g.cam||e.x>g.cam+W,sp=d.speed*(off?2.2:1),dx=tx-e.x,dy=ty-e.y;
    if(Math.abs(dx)>2)e.x+=Math.sign(dx)*Math.min(sp,Math.abs(dx));
    if(Math.abs(dy)>1.5)e.y+=Math.sign(dy)*Math.min(sp*.7,Math.abs(dy));
    e.face=p.x>e.x?1:-1;if(Math.abs(dx)>2||Math.abs(dy)>1.5)e.walk++;
    const aligned=Math.abs(e.y-p.y)<7,ad=Math.abs(e.x-p.x);
    if(!off&&e.cd<=0&&aligned&&!pd&&g.att<Math.min(dif(g).att[1],dif(g).att[0]+active(g).length+Math.floor(((g.level||1)-1)/dif(g).att[2]))){
      const go=d.ai==='ranged'?ad>40&&ad<170:d.ai==='charge'?ad<190:d.ai==='lunge'?ad<80:ad<d.reach+8;
      if(go){e.state='windup';e.timer=Math.max(8,Math.round(d.windup*tempo(g)));g.att++;const n=ADD_NOISE[d.ai];if(n)beep(g,...n);else if(d.knock)beep(g,140,.2,'square',.04,.8);}
    }
    break;}
  case 'windup':
    if(d.ai==='charge'&&g.time%5===0)smoke(g,e.x+e.face*14,e.y,22);
    if(--e.timer<=0){e.state='attack';e.timer=d.atk;e.hitDone=false;
      if(d.ai==='lunge'){e.vx=e.face*(d.lv||3.6);if(d.hop){e.vz=d.hop;e.z=Math.max(e.z,.01);}}}
    break;
  case 'attack':
    if(d.ai==='melee'){if(e.timer===d.atk-3)eHit(g,e,d.reach+6,dm,!!d.knock);}
    else if(d.ai==='lunge'){e.x+=e.vx;e.vx*=.95;if(!e.hitDone&&eHit(g,e,16,dm,false))e.hitDone=true;}
    else if(d.ai==='charge'){e.x+=e.face*(d.cspd||2.7);if(!e.hitDone&&eHit(g,e,26,dm,true))e.hitDone=true;if(g.time%3===0)sparks(g,e.x+e.face*24,e.y,18,1);if(g.time%8===0)beep(g,120,.08,'sawtooth',.03);
      if(e.x<g.cam+10||e.x>g.cam+W-10)e.timer=1;}
    else if(d.ai==='ranged'){if(e.timer===d.atk-1){const sh=d.shot,n=sh.n||1;
      for(let i=0;i<n;i++){const a=(i-(n-1)/2)*.3;g.proj.push({id:++g.pid,from:'e',x:e.x+e.face*8,y:e.y,z:24,vx:e.face*sh.spd*Math.cos(a),vy:Math.sin(a)*sh.spd*.6,dmg:dm,life:170,kind:sh.kind,c:sh.c});}
      beep(g,sh.kind==='laser'?880:sh.kind==='bolt'?520:240,.15,'square',.03,.4);}}
    if(--e.timer<=0){e.state='recover';e.timer=Math.round(d.recover*tempo(g));e.cd=(d.cd+Math.random()*40)*tempo(g);}
    break;
  case 'recover':if(--e.timer<=0)e.state='walk';break;
  case 'hurt':e.x+=e.vx;e.vx*=.8;if(--e.timer<=0){e.state='walk';e.cd=Math.max(e.cd,24);}break;
  case 'down':
    e.x+=e.vx;if(e.z>0||e.vz>0){e.vz-=.28;e.z+=e.vz;if(e.z<=0){e.z=0;sparks(g,e.x,e.y,2,3,['#8a8496','#5a5468']);
      if(!e.bounced&&e.vz<-2.2){e.bounced=true;e.vz=-e.vz*.38;e.z=.01;e.vx*=.6;shake(g,1.2);}else e.vz=0;}}else e.vx*=.8;
    if(--e.timer<=0&&e.z===0){if(e.dying){e.gone=true;goo(g,e.x,e.y,8,10);dropFrom(g,e);}else{e.state='walk';e.cd=40;}}
    break;
  }
  e.y=clamp(e.y,TOP,BOT);
  // Once a monster has fully entered the frame it stays in it (body included, not just its centre).
  const hw=d.big?24:18;if(!e.inView&&e.x>=g.cam+hw&&e.x<=g.cam+W-hw)e.inView=true;
  if(e.inView)e.x=clamp(e.x,g.cam+hw,g.cam+W-hw);else if(e.state!=='walk')e.x=clamp(e.x,g.cam+6,g.cam+W-6);
}
function dropFrom(g,e){
  const d=EN[e.type],luck=e.killer&&e.killer.st?e.killer.st.LUCK:0;
  if(Math.random()<(d.gear??.12)*(1+luck/100))dropGear(g,e.x,e.y,luck,d.gearMin||null);
  const r=Math.random(),big=!!d.big,pz=dif(g).pizza;
  if(big?r<.5:r<.08)g.pick.push({x:clamp(e.x,g.cam+24,g.cam+W-24),y:e.y,kind:pick(POWKEYS),t:0,id:++g.kid});
  else if(r<(big?.5+pz[1]:.08+pz[0]))g.pick.push({x:clamp(e.x,g.cam+24,g.cam+W-24),y:e.y,kind:'pizza',t:0,id:++g.kid});
}
// One AI for every boss; each picks from its own move list (slam, spit, summon, charge) and gets faster below half health.
function updBoss(g,e){
  const d=EN[e.type],p=e.tgt,enr=e.hp<e.max/2,dm=g.dmul||1,n=g.ps.length;e.cd2=(e.cd2||0)-1;
  const contact=()=>{if(e.cd2>0)return;if(hurtAny(g,q=>{const dx=q.x-e.x,dy=(q.y-e.y)*2;return dx*dx+dy*dy<(e.r+2)*(e.r+2)&&q.z<20;},Math.round(d.contact*dm),q=>Math.sign(q.x-e.x)||1,false))e.cd2=40;};
  switch(e.state){
  case 'intro':e.z=Math.max(0,e.z-2.5);if(e.z===0){e.state='drift';e.timer=80;shake(g,10);g.banner={txt:d.name,t:120};beep(g,70,.6,'sawtooth',.08,.5);goo(g,e.x,e.y,4,20);}break;
  case 'drift':{if(p){const sp=d.speed*(enr?1.45:1),dx=p.x-e.x,dy=p.y-e.y,dd=Math.hypot(dx,dy)||1;if(dd>20){e.x+=dx/dd*sp;e.y+=dy/dd*sp*.6;}e.face=Math.sign(dx)||1;}contact();
    if(enr&&!e.raged){e.raged=true;g.banner={txt:d.final?'THE COLLECTOR IS FURIOUS':d.name+' IS ANGRY',t:90};shake(g,8);}
    if(--e.timer<=0){const adds=g.enemies.filter(o=>o!==e&&!o.gone).length;let mv=pick(d.moves);
      if(mv==='summon'&&adds>=2+n)mv=d.moves.find(m=>m!=='summon')||'slam';
      if(mv==='slam')e.state='rise';
      else if(mv==='spit'){e.state='spit';e.timer=enr?64:48;}
      else if(mv==='summon'){e.state='summon';e.timer=50;}
      else{e.state='cwind';e.timer=enr?28:40;}}
    break;}
  case 'rise':e.z+=3.5;if(e.z>=120){e.state='hang';e.timer=enr?34:50;}break;
  case 'hang':if(p){e.x+=(p.x-e.x)*.07;e.y+=(p.y-e.y)*.07;}if(--e.timer<=0)e.state='fall';break;
  case 'fall':e.z-=8;if(e.z<=0){e.z=0;shake(g,12);beep(g,60,.4,'sawtooth',.09,.4);goo(g,e.x,e.y,4,22);
    hurtAny(g,q=>{const dx=q.x-e.x,dy=(q.y-e.y)*2;return dx*dx+dy*dy<56*56&&q.z<10;},Math.round(18*dm),q=>Math.sign(q.x-e.x)||1,true);e.state='recover';e.timer=enr?30:50;}break;
  case 'spit':contact();if(p&&e.timer%16===0){const sh=d.shot||{spd:2.2,kind:'slime',c:'#c8f05a',n:3},k=(sh.n||3)+(enr?2:0),base=Math.atan2(p.y-e.y,p.x-e.x);
      for(let i=0;i<k;i++){const a=base+(i-(k-1)/2)*.32;g.proj.push({id:++g.pid,from:'e',x:e.x,y:e.y,z:24,vx:Math.cos(a)*sh.spd,vy:Math.sin(a)*sh.spd*.6,dmg:Math.round(7*dm),life:150,kind:sh.kind,c:sh.c});}
      beep(g,200,.15,'square',.04,.5);}
    if(--e.timer<=0){e.state='drift';e.timer=70+Math.random()*60;}break;
  case 'summon':if(e.timer===25){const k=enr&&d.final?3:2;for(let i=0;i<k;i++){const s=i%2?1:-1,m=spawn(g,pick(d.adds),clamp(e.x+s*(34+i*8),g.cam+12,g.cam+W-12),clamp(e.y+s*6,TOP,BOT));m.cd=60;}goo(g,e.x,e.y,20,16);beep(g,150,.3,'square',.05,.5);}
    if(--e.timer<=0){e.state='drift';e.timer=80;}break;
  case 'cwind':if(p){e.face=p.x>e.x?1:-1;e.y+=(p.y-e.y)*.08;}if(g.time%4===0)smoke(g,e.x-e.face*16,e.y,10);
    if(--e.timer<=0){e.state='charge';e.timer=90;e.hitDone=new Set();beep(g,110,.5,'sawtooth',.06,1.8);}break;
  case 'charge':e.x+=e.face*(d.cspd||4)*(enr?1.2:1);if(g.time%3===0)sparks(g,e.x-e.face*e.r,e.y,4,2,['#ffe9c2','#d9a87c']);
    for(const q of g.ps)if(!e.hitDone.has(q)&&!q.out&&Math.abs(q.x-e.x)<e.r+10&&Math.abs(q.y-e.y)<14&&q.z<20&&hurtPlayer(g,q,Math.round(16*dm),e.face,true))e.hitDone.add(q);
    if(--e.timer<=0||(e.face>0&&e.x>=g.cam+W-32)||(e.face<0&&e.x<=g.cam+32)){e.state='recover';e.timer=enr?36:56;shake(g,6);}break;
  case 'recover':contact();if(--e.timer<=0){e.state='drift';e.timer=60+Math.random()*60;}break;
  case 'dead':if(g.time%4===0)goo(g,e.x+rnd(-20,20),e.y,rnd(5,40),4);if(--e.timer<=0){e.gone=true;}break;
  }
  e.x=clamp(e.x,g.cam+30,g.cam+W-30);e.y=clamp(e.y,TOP+4,BOT-2);
}

/* ---------- one tick ---------- */
function step(g){
  if(g.status==='clear'){g.time++;g.clearT++;
    // Free grabs: the stage is won, monsters are gone, and whatever is still on the ground is up for grabs, first come first served.
    for(const p of g.ps){if(p.out){if(hit(p,'start')||hit(p,'atk'))revive(g,p);continue;}updPlayer(g,p);}
    pickTick(g,active(g));
    const left=g.pick.some(k=>!k.got);if(!left&&g.clearT<g.grabLen-90)g.clearT=g.grabLen-90;
    if(g.clearT>=g.grabLen){if(g.final)g.status='win';else loadLevel(g,g.level+1);}
    endTick(g);return;}
  if(g.status!=='play')return;
  g.time++;
  if(g.stop>0){g.stop--;endTick(g);return;}
  for(const p of g.ps){if(p.out){if(hit(p,'start')||hit(p,'atk'))revive(g,p);continue;}updPlayer(g,p);}
  const act=active(g);
  if(!act.length){const can=g.ps.some(p=>p.conts>0);if(++g.ctT>(can?600:150)){g.status='over';}endTick(g);return;}else g.ctT=0;
  const maxCam=g.len-W,lim=g.lock!==null?g.lock:maxCam;
  const here=act.filter(p=>!p.away),who=here.length?here:act;   // a player whose connection dropped doesn't hold the screen back
  const maxX=Math.max(...who.map(p=>p.x)),minX=Math.min(...who.map(p=>p.x));
  g.cam=Math.max(g.cam,Math.min(maxX-W*.42,g.cam+3,minX-12,lim));
  const w=g.waves[g.waveI],n=g.ps.length;
  if(w&&!w.on&&g.cam>=w.x-.01){w.on=true;g.lock=w.x;g.cam=Math.min(g.cam,w.x);
    g.queue=w.list.slice();if(!w.boss)for(let i=0;i<(n-1)*dif(g).coop;i++){const t=w.list[i%w.list.length];g.queue.push(EN[t].big?'sh':t);}
    g.spawnT=0;g.maxAlive=(w.max||3)+n-1;g.go=0;if(w.finale)g.banner={txt:'FINAL WAVE',t:100};}
  if(w&&w.on){g.spawnT--;const alive=g.enemies.filter(e=>!e.gone).length;
    if(g.queue.length&&g.spawnT<=0&&alive<g.maxAlive){spawn(g,g.queue.shift());g.spawnT=Math.max(16,45-n*6-(g.level||1)*2);}
    // count again after spawning: the last monster of a wave (or a lone boss) may have just arrived
    if(!g.queue.length&&!g.enemies.some(e=>!e.gone)){g.waveI++;g.lock=null;if(w.end)g.winT=Math.max(g.winT,1);else{g.go=180;beep(g,880,.08,'square',.04);}}}
  g.att=g.enemies.filter(e=>!e.gone&&(e.state==='windup'||e.state==='attack')).length;
  for(const e of g.enemies)if(!e.gone)updEnemy(g,e);
  g.enemies=g.enemies.filter(e=>!e.gone);
  for(const q of g.proj){q.x+=q.vx;q.y+=q.vy;q.life--;
    if(q.from==='e'){if(hurtAny(g,p=>Math.abs(q.x-p.x)<9&&Math.abs(q.y-p.y)<8&&p.z<22,q.dmg,Math.sign(q.vx)||1,false))q.life=0;}
    else for(const e of g.enemies){const er=e.r||0;if(q.life>0&&canHit(e)&&!q.hits.has(e)&&Math.abs(e.x-q.x)<12+er&&Math.abs(e.y-q.y)<12+er*.5){
      q.hits.add(e);dmgEnemy(g,e,q.dmg,q.kind==='pizza',Math.sign(q.vx),g.ps.includes(q.owner)?q.owner:null);if(!q.pierce)q.life=0;}}
    if(q.x<g.cam-30||q.x>g.cam+W+30||q.y<TOP-6||q.y>BOT+6)q.life=0;}
  g.proj=g.proj.filter(q=>q.life>0);
  pickTick(g,act);
  for(const s of g.surv){s.t++;if(s.saved){if(s.fade>0)s.fade--;continue;}
    const p=act.find(p=>Math.abs(s.x-p.x)<15&&Math.abs(s.y-p.y)<10&&p.z<14);
    if(p){s.saved=true;g.saved++;p.saved++;p.lvSaved=(p.lvSaved||0)+1;addScore(g,p,500);dropGear(g,s.x,s.y,p.st?p.st.LUCK:0,'r');floatText(g,s.x,s.y,s.name+' SAVED!','#3ad6c0',46);
      sparks(g,s.x,s.y,20,10,['#3ad6c0','#ffffff','#ffc93c']);[523,659,784,1046].forEach((f,i)=>beep(g,f,.1,'square',.04,0,i*70));}}
  if(g.go>0)g.go--;if(g.banner&&g.banner.t>0)g.banner.t--;
  if(g.winT>0&&++g.winT>100){g.bonus=g.saved*1000;for(const p of g.ps){addScore(g,p,(p.lvSaved||0)*1000);p.lvSaved=0;}
    if(g.rs)g.rs.cleared++;startClear(g);
    [392,523,659,784,1046].forEach((f,i)=>beep(g,f,.18,'square',.05,0,i*120));}
  endTick(g);
}
// Stage won. Gather what's still lying around into a tidy grid on the street for the free-grab phase; the last stage goes to the win screen after it.
function startClear(g){
  g.status='clear';g.clearT=0;g.final=g.level>=NSTAGES;
  const items=g.pick.filter(k=>!k.got),ord={gear:0,tape:1,pizza:2};items.sort((a,b)=>(ord[a.kind]??3)-(ord[b.kind]??3)||a.id-b.id);
  const cols=6,x0=g.cam+34,y0=TOP+18;items.forEach((k,i)=>{k.tx=x0+(i%cols)*34;k.ty=Math.min(BOT-2,y0+Math.floor(i/cols)*24);k.skip=null;});
  g.grabLen=items.length?600:300;
}
// Pickups: slide stragglers into view (or onto the grab grid when the stage is clear), then let players scoop them up.
function pickTick(g,act){
  for(const k of g.pick){k.t++;if(k.got)continue;
    if(g.status==='clear'&&k.tx!=null){k.x+=(k.tx-k.x)*.18;k.y+=(k.ty-k.y)*.18;}
    else{
      // Loot never gets left behind: anything that falls off the left edge slides along with the screen.
      // carried items fan out over a band near the left side instead of piling onto one spot
      const minX=g.cam+40+(k.id*37%6)*18,maxX=g.cam+W-24;if(k.x<minX)k.x=Math.min(minX,k.x+Math.max(1.5,(minX-k.x)*.25));else if(k.x>maxX)k.x=maxX;}
    for(const p of act){if(Math.abs(k.x-p.x)<12&&Math.abs(k.y-p.y)<9&&p.z<12&&p.state!=='down'){
      if(k.kind==='gear'){if(k.skip===p.slot&&k.t<90)continue;
        if(!gearFits(p,k.item)){if(!(g.time-(p.fullT??-999)<120)){p.fullT=g.time;floatText(g,k.x,k.y,'BAG FULL','#ff7a5a',40);}continue;}
        pickGear(g,p,k);break;}
      k.got=true;
      if(k.kind==='pizza'){p.hp=Math.min(p.maxhp,p.hp+30);floatText(g,k.x,k.y,'+30 HP','#c8f05a');}
      else if(k.kind==='tape'){addScore(g,p,1000);floatText(g,k.x,k.y,'RARE TAPE +1000','#ffc93c');}
      else{const P=POW[k.kind];p.pow={k:k.kind,t:P.dur};rumble(g,p.slot,.6,300);floatText(g,k.x,k.y,P.name+'! '+P.desc,P.col,46);sparks(g,p.x,p.y,20,10,[P.col,'#ffffff']);
        [392,523,659].forEach((f,i)=>beep(g,f,.08,'square',.05,0,i*60));}
      beep(g,660,.08,'square',.04);beep(g,990,.1,'square',.04,0,70);break;}}}
  g.pick=g.pick.filter(k=>!k.got);
}
function endTick(g){for(const p of g.ps)p.pin={...p.in};}

/* ---------- snapshot deltas ----------
   The server sends a full snapshot once, then only what changed. Lists of things with an id (players, monsters,
   shots, pickups) are matched by id; anything else that changed is sent whole. Both sides run on plain JSON copies. */
const NOCHG={};
const listKey=v=>Array.isArray(v)&&v.length&&v[0]&&typeof v[0]==='object'&&!Array.isArray(v[0])?('id' in v[0]?'id':'s' in v[0]?'s':null):null;
function snapDiff(a,b){
  if(a===b)return NOCHG;
  if(Array.isArray(b)){
    const key=listKey(b)||listKey(a);
    if(key&&Array.isArray(a)){const m=new Map(a.map(o=>[o[key],o]));let same=a.length===b.length;
      const l=b.map((o,i)=>{const old=m.get(o[key]);if(!old){same=false;return {$n:o};}if(a[i]!==old)same=false;const d=snapDiff(old,o);if(d===NOCHG)return o[key];same=false;return {$k:o[key],...d};});
      return same?NOCHG:{$l:l,$key:key};}
    return JSON.stringify(a)===JSON.stringify(b)?NOCHG:b;}
  if(b&&typeof b==='object'){
    if(!a||typeof a!=='object'||Array.isArray(a))return b;
    const o={};let n=0;for(const k in b){const d=snapDiff(a[k],b[k]);if(d!==NOCHG){o[k]=d;n++;}}
    const del=Object.keys(a).filter(k=>!(k in b));if(del.length){o.$x=del;n++;}
    return n?o:NOCHG;}
  return b;
}
function snapPatch(a,d){
  if(!d||typeof d!=='object'||Array.isArray(d))return d;
  if('$l' in d){const key=d.$key,m=new Map((a||[]).map(o=>[o[key],o]));
    return d.$l.map(e=>{if(e===null||typeof e!=='object'){const o=m.get(e);if(!o)throw new Error('snapshot base missing '+e);return o;}
      if('$n' in e)return e.$n;const o=m.get(e.$k);if(!o)throw new Error('snapshot base missing '+e.$k);return snapPatch(o,e);});}
  if(!a||typeof a!=='object'||Array.isArray(a))return d;
  const o={...a};for(const k in d){if(k==='$x'||k==='$k')continue;o[k]=snapPatch(a[k],d[k]);}
  if(d.$x)for(const k of d.$x)delete o[k];return o;
}

/* ---------- snapshots: what a client needs to draw the world ---------- */
function snapshot(g){
  return {rs:g.status==='over'||g.status==='win'?g.rs:undefined,df:g.diff,lv:g.level,cl:g.clearT,gl:g.grabLen||300,fin:g.final?1:0,tm:g.time,cam:r1(g.cam),lock:g.lock,wi:g.waveI,sc:g.score,sv:g.saved,go:g.go,ban:g.banner&&g.banner.t>0?[g.banner.txt,g.banner.t]:0,st:g.status,ct:g.ctT,bn:g.bonus,
    boss:g.boss&&!g.boss.gone?g.boss.id:-1,
    ps:g.ps.map(p=>({s:p.slot,h:HEROES.indexOf(p.ch),x:r1(p.x),y:r1(p.y),z:r1(p.z),f:p.face,hp:Math.round(p.hp),mh:p.maxhp,lv:p.lives,st:p.state,inv:p.inv,hs:p.hs||0,tm:p.timer|0,vz:r1(p.vz||0),
      atk:p.atk?[p.atk.n,p.atk.t,p.atk.len,p.atk.air?1:0,p.atk.hits.size]:0,vx:r1(p.vx||0),cN:p.comboN||0,cW:p.comboW||0,bf:p.buffer?1:0,ak:p.ack,sp:p.sp?[p.sp.t,r1(p.sp.r)]:0,w:Math.round(p.walk),mv:p.moving?1:0,cb:p.combo,pw:p.pow?[p.pow.k,p.pow.t]:0,
      out:p.out?1:0,cn:p.conts===Infinity?-1:p.conts,aw:p.away?1:0,sc:p.score,sav:p.saved,lk:p.look,rs:g.status==='over'||g.status==='win'?p.rs:undefined})),
    en:g.enemies.map(e=>({t:e.type,id:e.id,x:r1(e.x),y:r1(e.y),z:r1(e.z),f:e.face,hp:Math.round(e.hp),mx:e.max,st:e.state,tm:e.timer,w:Math.round(e.walk),fl:e.flash,dy:e.dying?1:0,tg:e.tgt?e.tgt.slot:-1,hs:e.hs||0,vz:r1(e.vz||0)})),
    pj:g.proj.map(q=>({id:q.id,k:q.kind,c:q.c||0,x:r1(q.x),y:r1(q.y),z:r1(q.z),vx:r1(q.vx)})),
    pk:g.pick.map(k=>({id:k.id,k:k.kind,x:r1(k.x),y:r1(k.y),t:k.t,it:k.item||0,tx:k.tx!=null?r1(k.tx):undefined,ty:k.ty!=null?r1(k.ty):undefined})),
    su:g.surv.map(s=>[s.saved?1:0,s.fade,s.t])};
}
// Rebuilds g from a snapshot, keeping existing objects so client-side fields (dev, lostPad, interpolation) survive.
function applySnapshot(g,s){
  if(!g)g={ps:[],enemies:[],proj:[],pick:[],surv:[],waves:[],ev:[],net:true};
  const L=s.lv||1;if(g.level!==L||!g.surv.length){g.level=L;g.len=levelLen(L);g.surv=survFor(L).map(q=>({...q,saved:false,fade:40,t:0}));}
  if(s.rs)g.rs=s.rs;
  g.clearT=s.cl||0;g.grabLen=s.gl||300;g.final=!!s.fin;g.diff=s.df||g.diff||'normal';
  Object.assign(g,{time:s.tm,cam:s.cam,lock:s.lock,waveI:s.wi,score:s.sc,saved:s.sv,go:s.go,banner:s.ban?{txt:s.ban[0],t:s.ban[1]}:null,status:s.st,ctT:s.ct,bonus:s.bn});
  const keep=(list,key,rows,make,upd)=>{const out=[];for(const r of rows){let o=list.find(q=>q[key]===r[key==='slot'?'s':'id']);if(!o)o=make(r);upd(o,r);out.push(o);}return out;};
  const tgt=(o,x,y,z)=>{if(o._nx===undefined){o.x=x;o.y=y;o.z=z;}else{o._fx=o.x;o._fy=o.y;o._fz=o.z;}o._nx=x;o._ny=y;o._nz=z;o._t0=g.now||0;};
  g.ps=keep(g.ps,'slot',s.ps,r=>({slot:r.s,in:{},pin:{},look:{},x:r.x,y:r.y,z:r.z}),(p,r)=>{p.ch=HEROES[r.h]||HEROES[0];tgt(p,r.x,r.y,r.z);p.face=r.f;p.hp=r.hp;p.maxhp=r.mh;p.lives=r.lv;p.state=r.st;p.inv=r.inv;p.hs=r.hs||0;p.timer=r.tm||0;p.vz=r.vz||0;
    p.atk=r.atk?{n:r.atk[0],t:r.atk[1],len:r.atk[2],air:!!r.atk[3]}:null;p.sp=r.sp?{t:r.sp[0],r:r.sp[1]}:null;p.walk=r.w;p.moving=!!r.mv;p.combo=r.cb;p.pow=r.pw?{k:r.pw[0],t:r.pw[1]}:null;
    p.out=!!r.out;p.conts=r.cn===-1||r.cn==null?Infinity:r.cn;p.away=!!r.aw;p.score=r.sc;p.saved=r.sav;p.look=r.lk||{};if(r.rs)p.rs=r.rs;});
  g.enemies=keep(g.enemies,'id',s.en,r=>({id:r.id,x:r.x,y:r.y,z:r.z}),(e,r)=>{e.type=r.t;tgt(e,r.x,r.y,r.z);e.face=r.f;e.hp=r.hp;e.max=r.mx;e.state=r.st;e.timer=r.tm;e.walk=r.w;e.flash=r.fl;e.dying=!!r.dy;e.hs=r.hs||0;e.vz=r.vz||0;e.r=(EN[r.t]&&EN[r.t].r)||0;
    e.tgt=r.tg>=0?g.ps.find(p=>p.slot===r.tg)||null:null;});
  g.proj=keep(g.proj,'id',s.pj,r=>({id:r.id,x:r.x,y:r.y,z:r.z}),(q,r)=>{q.kind=r.k;q.c=r.c||null;tgt(q,r.x,r.y,r.z);q.vx=r.vx;});
  g.pick=keep(g.pick,'id',s.pk,r=>({id:r.id}),(k,r)=>{k.kind=r.k;k.x=r.x;k.y=r.y;k.t=r.t;k.item=r.it||null;k.tx=r.tx;k.ty=r.ty;});
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

// Bump on every change to the rules so the website can tell when a room server is out of date.
const CORE_VERSION='2026.11.03-2';
const LFCore={CORE_VERSION,W,H,TOP,BOT,LEVEL_END,PCOL,HEROES,POW,POWKEYS,EN,WAVES,SURV,FIXED_PICKS,DIFF,DIFFS,LEVELS,NSTAGES,levelZones,levelLen,genWaves,loadLevel,survFor,
  CATS,CAT_NAME,RAR,STAT,STAT_KEYS,CAP,POOL,SETS,SET_OF,BASES,BASE_LIST,BAG_MAX,ITEMCOL,setSize,makeItem,rollRarity,emptyGear,cleanItem,calcStatsFor,gearLookFor,cleanStats,cleanLook,bonusTxt,
  clamp,lerp,rnd,pick,spawn,newGame,addPlayer,removePlayer,revive,setStats,dropBack,step,snapshot,applySnapshot,interpolate,hasPow,active,updPlayer,snapDiff,snapPatch};
globalThis.LFCore=LFCore;
})();
