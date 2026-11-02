# Master prompts: new enemies, bosses and stage backgrounds

The last of the art for **The Last Video Store**: 4 ChatGPT chats, each started with one paste. Each chat ends with a zip; send me the zips. Everything here already plays with drawn stand-ins, so any chat you skip just keeps the stand-ins.

| Chat | What it makes | Upload first | Sheets/images | Zip |
|---|---|---|---|---|
| 1 | 20 new enemies, 7 poses each | `sh.webp`, `mummy.webp`, `cop.webp` (style refs) | 20 sheets | `enemies.zip` |
| 2 | 3 bosses, 8 poses each | `blob.webp`, `chainsaw.webp` (style refs) | 3 sheets | `bosses.zip` |
| 3 | Backgrounds, stages 2 to 6 | `bg-suburb.webp`, `bg-mall.webp`, `bg-lot.webp` | 15 images | `backgrounds_a.zip` |
| 4 | Backgrounds, stages 7 to 10 | the same 3 backgrounds | 12 images | `backgrounds_b.zip` |

**Every chat works the same way:** start a new chat, upload the files listed, paste everything inside that chat's box, and reply **continue** whenever it stops. When it says everything is done, reply **make the zip**. If something comes out wrong, reply *"redraw sheet N"* (or *"redraw image N"*).

---

## Chat 1: the 20 new enemies

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours. Do not draw the attached monsters.

TASK: 20 new monsters, one sheet each, then slice and zip.

SHEET RULES (every sheet):
- Landscape 1536x1024, a 4-column x 2-row grid of equal cells. One pose per cell, in this order:
  row 1: idle, walk1, walk2, attack1
  row 2: attack2, hurt, down, (leave this last cell empty)
- idle = standing ready. walk1/walk2 = two opposite steps of a walk (floating monsters: two bob positions). attack1 = wind-up. attack2 = the hit itself (see each monster's attack). hurt = recoiling from a hit, head snapped back. down = knocked flat on its back on the ground, lying horizontally (floating monsters: crashed on the ground).
- Same character, same size and same colours in all 7 cells; a crouched or lying pose is smaller, not stretched. Every pose faces RIGHT, full body, fully inside its cell with space around it, feet near the bottom of the cell.
- Plain flat solid white (#FFFFFF) background. No grid lines, no labels, no text, no shadows, no floor.
- Before each sheet write one line, e.g. "Sheet 3 - LUNCH LADY". Draw as many sheets per reply as you can, in order. If you must stop, say which sheet is next and continue exactly there when I say "continue". If a sheet has wrong poses, a wrong count or a wrong order, redraw it.

THE 20 MONSTERS (sheet number, file key, description; attack):
1 jock - ZOMBIE JOCK: hulking undead football player, red letterman jacket with a gold letter, white football pants, cracked helmet under one arm, green rotting skin. Attack: lowered-shoulder tackle charge.
2 hallmon - HALL MONITOR: zombie teen, orange safety sash, whistle, hall-pass clipboard, grey-green skin, beige slacks, smirk. Attack: blows the whistle, firing a sound wave forward.
3 lunch - LUNCH LADY: large undead cafeteria lady, hairnet, stained white apron over a teal uniform, giant ladle dripping green slop, pale green skin. Attack: overhead ladle slam.
4 bog - BOG BEAST: hunched swamp monster of moss, mud and lake weed, glowing lime eyes, huge clawed hands dripping algae. Attack: two-handed claw swipe.
5 skeeter - MEGA SKEETER: dog-sized mutant mosquito hovering on buzzing wings, needle proboscis, bulging red belly, brown striped body. Attack: dive-stab with the proboscis.
6 derby - DERBY DEMON: undead roller-derby girl on quad skates, pink numbered jersey, knee pads, fishnets, pink demon face with small horns. Attack: low skating body-check lunge.
7 rinkrat - RINK RAT: dog-sized mutant rat, one tiny orange rental skate, grey fur, pink tail, glowing eyes. Attack: leaping bite.
8 martian - MARTIAN INVADER: 50s B-movie martian, silver jumpsuit, bubble helmet, bright green skin, big black eyes, ray gun. Attack: fires the ray gun forward (show the green beam).
9 greaser - GREASER GHOUL: undead 50s greaser, black leather jacket, cuffed blue jeans, pompadour, switchblade comb, pale green skin. Attack: slashing comb swipe.
10 pinhead - PINHEAD: living bowling pin, white with red neck stripes, angry cartoon face, stubby arms and legs. Attack: hopping headbutt.
11 clawcrab - CLAW CRAB: giant red crab whose claws are silver arcade claw-machine grabbers, a plush toy stuck in one, gold eyes. Attack: big claw pinch.
12 mannequin - MANNEQUIN: possessed store mannequin, blank beige face, cracked joints, teal 90s windbreaker, stiff creepy pose. Attack: stiff-armed karate chop.
13 usher - ZOMBIE USHER: undead theatre usher, red vest, bow tie, pillbox hat, green skin, big flashlight. Attack: blinding flashlight beam forward.
14 lifeguard - LIFEGUARD LURKER: waterlogged zombie lifeguard, red swimsuit and visor, whistle, bloated teal-blue skin, dripping water. Attack: lunging grab.
15 poolshark - POOL SHARK: upright shark on legs, teal pool-noodle ring, white swim trunks, grey skin, rows of teeth, rescue board as a shield. Attack: head-down charge behind the board.
16 static - STATIC SPECTER: floating ghost made of TV static and scan lines, pale blue glow, old TV antenna on its head, wispy tail instead of legs. Attack: throws a crackling static bolt.
17 weather - WEATHERMAN: undead TV weatherman, navy suit, gold tie, slick hair, frozen TV smile, green skin, pointer stick. Attack: points the pointer and lightning shoots out.
18 spawn - METEOR SPAWN: small alien critter, lime green with brown rock plates, pink glowing eyes, six legs. Attack: pouncing leap.
19 brute - ALIEN BRUTE: huge muscular alien soldier, green skin, dark brown armoured harness, glowing lime veins, giant fists. Attack: huge overhead double-fist smash.
20 abductor - GREY ABDUCTOR: classic grey alien floating in a small hover-disc, silver-grey skin, huge black eyes, teal tractor-beam wand. Attack: fires a teal tractor beam forward.

WHEN I SAY "make the zip" (use your Python tool):
- Cut each sheet into its 4x2 grid of equal cells and ignore the empty 8th cell.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0), then crop to the figure with 24 px padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest, e.g. jock.png, jock_walk1.png, jock_walk2.png, jock_attack1.png, jock_attack2.png, jock_hurt.png, jock_down.png. That is 140 files.
- Also include each full sheet as sheets/sheet_01_jock.png ... sheets/sheet_20_abductor.png.
- Zip everything as enemies.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 2: the 3 bosses

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours. Do not draw the attached monsters.

TASK: 3 bosses, one sheet each, then slice and zip. Bosses are big and detailed: draw them as giant, imposing figures.

SHEET RULES (every sheet):
- Landscape 1536x1024, a 4-column x 2-row grid of equal cells, one pose per cell in this order:
  row 1: idle, walk1, walk2, attack1
  row 2: attack2, special, hurt, down
- idle = standing menacingly. walk1/walk2 = two opposite steps (floating boss: two hover positions). attack1 = winding up / summoning (arms raised, roaring). attack2 = the main attack (see each boss). special = leaping or rising high for a ground-pound slam (stretched tall, coming down). hurt = recoiling, head snapped back. down = defeated, collapsed flat on the ground.
- Same character, size and colours in every cell; lying or crouched poses are smaller, not stretched. Every pose faces RIGHT, full body, fully inside its cell with space around it, feet near the bottom of the cell.
- Plain flat solid white (#FFFFFF) background. No grid lines, labels, text, shadows or floor.
- Before each sheet write one line, e.g. "Sheet 2 - KING PIN". Continue exactly where you stopped when I say "continue". Redraw a sheet if its poses, count or order are wrong.

THE 3 BOSSES (sheet number, file key, description; main attack):
1 squatch - SASQUATCH SCOUTMASTER (stage 3 boss): giant shaggy brown Bigfoot in a too-small khaki scout-leader shirt covered in merit badges, red neckerchief, scout hat, huge feet. Main attack: a roaring shoulder-first charge.
2 kingpin - KING PIN (stage 6 boss): towering bowling monster with a black bowling ball for a head, glowing finger holes as eyes, red bowling shirt with a gold crown logo, bowling shoes, carrying a giant bowling pin like a club. Main attack: hurls a spray of small bowling pins forward.
3 collector - THE LATE FEE COLLECTOR (final boss): towering floating alien overlord, dark brown coat lined with hundreds of VHS tapes, silver alien skull face with glowing gold eyes, pink energy cape trailing below instead of legs, holding a giant overdue notice. Main attack: fires a fan of pink energy bolts from an outstretched hand.

WHEN I SAY "make the zip" (use your Python tool):
- Cut each sheet into its 4x2 grid of equal cells.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0), then crop to the figure with 24 px padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest: squatch.png, squatch_walk1.png, squatch_walk2.png, squatch_attack1.png, squatch_attack2.png, squatch_special.png, squatch_hurt.png, squatch_down.png (same for kingpin and collector). That is 24 files.
- Also include the 3 full sheets in a sheets folder.
- Zip everything as bosses.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 3: backgrounds for stages 2 to 6

```
You are making stage backgrounds for my 90s side-scrolling beat-'em-up "The Last Video Store". The 3 attached images are existing stage backgrounds. Match their art style exactly: thick black ink outlines, grainy 90s comic-book / VHS-cover texture, warm campy B-movie colours, the same level of detail, the same flat side-on view.

TASK: 15 background images, one per reply step, then zip them.

RULES FOR EVERY IMAGE:
- As wide as you can make it: a 3:1 panorama (about 1944x648) if possible, otherwise 1536x1024. Use the same size for all 15.
- Flat side-on view like a beat-'em-up stage. The ground/floor line sits at about 62% down the image. From there to the bottom edge is the walkable floor: keep it plain, flat and clear, with nothing standing on it.
- Everything interesting (walls, buildings, props, signs, sky) goes in the top 62%.
- The left and right edges must line up so the image can repeat side by side without a visible seam.
- No characters, no monsters, no people. No text except the signs named in the description.
- Before each image write one line, e.g. "Image 4 - bg-camp-cabins". Make as many images per reply as you can, in order. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule (objects on the floor, people, wrong view), redraw it.

THE 15 IMAGES (number, file name, scene):
STAGE 2 - HOLLOW PINES HIGH
1 bg-school-hall: a 1996 high school hallway at night. Rows of dented mustard-yellow lockers with a red stripe, a trophy case, flickering fluorescent ceiling lights, a NO RUNNING sign, homecoming dance posters. Floor: speckled grey-brown linoleum tile.
2 bg-school-gym: a high school gym at night. Red painted cinderblock walls, folded wooden bleachers, a basketball hoop, a banner reading GO PINE CONES!, caged lights. Floor: polished honey-coloured hardwood with court lines.
3 bg-school-field: the school football field at night under stadium lights. Bleachers, a goalpost, a scoreboard reading HOME 0 GUESTS 13, purple night sky. Floor: trampled green grass with chalk yard lines.
STAGE 3 - CAMP TALL PINES
4 bg-camp-cabins: a summer camp at night. Log cabins with glowing amber windows, one marked CABIN 13, a flagpole, a bulletin board, pine trees, deep blue sky. Floor: packed brown dirt path.
5 bg-camp-lake: a dark lake under a full moon. A wooden dock, overturned canoes, a lifeguard chair, a NO SWIMMING AFTER DARK sign, mist on the water, pines on the far shore. Floor: muddy sand shore.
6 bg-camp-woods: deep pine woods at night. Huge dark trunks, a smouldering campfire glow, a TRAIL CLOSED sign, claw marks on a tree, a torn tent, orange firelight. Floor: dark forest dirt with pine needles.
STAGE 4 - SKATE GALAXY
7 bg-rink-snack: the snack bar of a 90s roller rink. A purple counter, a neon SNACK BAR sign, a nacho cheese machine, a soda fountain, cosmic planets-and-stars carpet walls, pink neon trim. Floor: purple-and-black checker tile.
8 bg-rink-floor: the main rink. Rails along a cosmic-carpet wall, a mirror ball throwing coloured spots, a neon COUPLES SKATE sign, teal and pink neon tubes. Floor: polished maple rink wood.
9 bg-rink-dj: the DJ corner. A booth with turntables and stacked speakers, a sign reading REQUESTS $1, lockers of rental skates, red and gold lights. Floor: dark rubber tile.
STAGE 5 - STARLIGHT DRIVE-IN
10 bg-drivein-stand: a drive-in concession stand at night. A red-and-gold building with a CONCESSIONS marquee, popcorn and hot dog signs, strings of bulbs, deep violet sky. Floor: cracked dark asphalt.
11 bg-drivein-cars: rows of parked 50s and 70s cars at a drive-in, speaker posts on poles, a TUNE TO 88.1 FM sign, pink neon reflections, starry sky. Floor: dark asphalt.
12 bg-drivein-screen: the giant drive-in screen at night showing a glowing black-and-white flying saucer movie, a TONIGHT: DOUBLE FEATURE marquee, a projector beam through the haze. Floor: dark asphalt.
STAGE 6 - STRIKE ZONE LANES
13 bg-bowl-lanes: a 90s bowling alley. Pins at the far end of the lanes, a STRIKE ZONE neon sign, overhead score monitors, an orange-and-brown retro wall pattern. Floor: polished light wood lane approach.
14 bg-bowl-arcade: the alley's arcade corner. A row of glowing arcade cabinets, a claw machine full of plush toys, a prize counter, an ARCADE neon sign in pink and purple. Floor: dark carpet with a neon cosmic pattern.
15 bg-bowl-bar: the bowling alley lounge. A bar with stools, beer neon signs, a LAST CALL sign, a jukebox, wood panelling, an amber glow. Floor: brown tile.

WHEN I SAY "make the zip" (use your Python tool): save each image as PNG named exactly as listed (bg-school-hall.png ... bg-bowl-bar.png), zip all 15 as backgrounds_a.zip, give me the download link, and list any image you think broke a rule.
```

---

## Chat 4: backgrounds for stages 7 to 10

```
You are making stage backgrounds for my 90s side-scrolling beat-'em-up "The Last Video Store". The 3 attached images are existing stage backgrounds. Match their art style exactly: thick black ink outlines, grainy 90s comic-book / VHS-cover texture, warm campy B-movie colours, the same level of detail, the same flat side-on view.

TASK: 12 background images, then zip them.

RULES FOR EVERY IMAGE:
- As wide as you can make it: a 3:1 panorama (about 1944x648) if possible, otherwise 1536x1024. Use the same size for all 12.
- Flat side-on view like a beat-'em-up stage. The ground/floor line sits at about 62% down the image. From there to the bottom edge is the walkable floor: keep it plain, flat and clear, with nothing standing on it.
- Everything interesting (walls, buildings, props, signs, sky) goes in the top 62%.
- The left and right edges must line up so the image can repeat side by side without a visible seam.
- No characters, no monsters, no people. No text except the signs named in the description.
- Before each image write one line, e.g. "Image 4 - bg-water-wave". Make as many images per reply as you can, in order. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule, redraw it.

THE 12 IMAGES (number, file name, scene):
STAGE 7 - REWIND VIDEO WAREHOUSE
1 bg-video-shelves: a huge video rental warehouse. Endless tall shelves packed with VHS boxes, a BE KIND REWIND banner, blue walls, harsh fluorescent tubes. Floor: grey industrial tile.
2 bg-video-dock: a warehouse loading dock. Roll-up doors, stacks of cardboard boxes full of tapes, pallets, a forklift, a RETURNS sign, orange caged work lights. Floor: stained concrete.
3 bg-video-office: a cramped back office. A desk piled with overdue notices, a wall of TVs showing static, a MANAGER ONLY door, wood panelling, a red alarm light. Floor: worn brown carpet.
STAGE 8 - SPLASH KINGDOM
4 bg-water-wave: an abandoned water park at sunset. A wave pool of murky green water, a lifeguard tower, closed umbrellas, a WAVE POOL sign, orange sky. Floor: sun-bleached beige concrete deck.
5 bg-water-slides: giant twisting water slides in faded teal and orange, a sign reading THE PLUNGE, a tall slide tower, a chain-link fence, dusky sky. Floor: wet concrete deck.
6 bg-water-lockers: a water park locker room. Rows of teal lockers, a broken shower, a LOCKERS sign, puddles, a buzzing light. Floor: white tile with a teal stripe.
STAGE 9 - CHANNEL 9 STUDIOS
7 bg-tv-news: a 90s local TV newsroom set. A curved anchor desk with a CHANNEL 9 NEWS logo, a city skyline backdrop, studio lights, cameras pushed against the wall. Floor: dark studio floor with taped marks.
8 bg-tv-studio: a TV soundstage. A game-show set with flashing bulbs, a glowing red ON AIR sign, tangled cables, a weather-map green screen. Floor: black painted studio floor.
9 bg-tv-roof: the TV station rooftop at night. A giant red-and-white transmitter tower with blinking lights, a TRANSMITTER sign, satellite dishes, stormy purple sky with lightning. Floor: gravel rooftop.
STAGE 10 - THE CRATER
10 bg-crater-woods: scorched woods at the edge of a meteor crater. Burnt trees, a KEEP OUT sign, police tape, an eerie green glow on the horizon. Floor: cracked, burnt black earth.
11 bg-crater-hull: inside a crashed alien meteor-ship. Ribbed organic metal walls, glowing green pods, tangles of tubes, strange alien lettering. Floor: smooth metallic deck plates.
12 bg-crater-core: the heart of the alien ship. A giant glowing pink-and-gold core, mountains of stolen VHS tapes, a huge banner reading RETURN ALL TAPES, alien machinery. Floor: dark metal grating.

WHEN I SAY "make the zip" (use your Python tool): save each image as PNG named exactly as listed (bg-video-shelves.png ... bg-crater-core.png), zip all 12 as backgrounds_b.zip, give me the download link, and list any image you think broke a rule.
```

---

**When the zips reach me:**
- **Monsters:** I cut them out, even out their sizes, and wire up their moves, the same as the earlier monster zips. Bosses also use their special pose for the ground-pound.
- **Backgrounds:** I convert them and check that the floor lines up with where the heroes walk. Each stage then switches from the drawn stand-in to the painted scene, with a crossfade between the 3 areas the same way as in Maple Court.
