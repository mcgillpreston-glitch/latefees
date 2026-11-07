# Master prompts: the last monsters, the bosses, the stage backgrounds, the item icons

> **Superseded:** everything still to be made from this file is in `art/MASTER_REMAINING_ART.md` (November 2026). Use that one.

Everything the game still draws with pixel stand-ins. Six ChatGPT chats, each started with one paste; each ends with a zip. Send me the zips and I'll import them. Skip any chat you like; the stand-ins stay until its art arrives.

| Chat | Makes | Upload first (style reference) | Images | Zip |
|---|---|---|---|---|
| 1 | 5 monsters x 7 poses (claw crab, mannequin, usher, lifeguard, pool shark) | `art/sh.webp`, `art/mummy.webp`, `art/bog.webp`, `art/martian.webp` | 35 | `monsters_a.zip` |
| 2 | 5 monsters x 7 poses (static specter, weatherman, meteor spawn, alien brute, grey abductor) | the same 4 | 35 | `monsters_b.zip` |
| 3 | 3 bosses x 8 poses | `art/blob.webp`, `art/chainsaw.webp`, `art/bog.webp` | 24 | `bosses.zip` |
| 4 | Backgrounds, stages 2 to 6 | `art/bg-suburb.webp`, `art/bg-mall.webp`, `art/bg-lot.webp` | 15 | `backgrounds_a.zip` |
| 5 | Backgrounds, stages 7 to 10 | the same 3 | 12 | `backgrounds_b.zip` |
| 6 | The 270 item icons | see `art/MASTER_ITEM_PROMPT.md` (3 chats, A/B/C) | 45 sheets | `items_a/b/c.zip` |

**The one rule that changed, learned the hard way:** monsters and bosses are now **one pose per image**, never a grid sheet. The last batch was drawn as 7-figure sheets; the figures came out ~100 px tall, upscaled soft, and cut off wherever two figures touched. The large single-figure drawings are what the game uses now, and these prompts ask for exactly that.

**Every chat works the same way:** start a new chat, upload the files listed, paste everything inside that chat's box as one message, and reply **continue** whenever it stops. When it says everything is done, reply **make the zip**. If something comes out wrong, reply *"redraw 4/7 USHER attack2"* (or *"redraw image 6"* for backgrounds).

---

## Chat 1: monsters, first five

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters from the game. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours, a single figure drawn large and detailed. Do not draw the attached monsters.

TASK: 5 new monsters, 7 poses each, ONE POSE PER IMAGE (35 images), then cut out and zip.

Why one per image: in an earlier batch the poses were drawn as a grid and came out small, blurry and cut off where figures overlapped. Each pose must be its own full-size drawing.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, filling about 80% of the image height, centred, with clear empty margin on every side. No part of the figure may touch or run off any edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no second character, no fragments of anything else.
- Every pose faces RIGHT, full body visible.
- Draw the 7 poses in this order, one image each: idle, walk1, walk2, attack1, attack2, hurt, down.
  idle = standing ready. walk1 / walk2 = two opposite steps of a walk (a floating monster: two bob heights). attack1 = the wind-up. attack2 = the hit itself (see the monster's attack; draw any beam, bolt or wave it fires as part of the picture). hurt = recoiling from a hit, head snapped back. down = knocked flat on its back on the ground, lying horizontally across the image (a floating monster: crashed on the ground).
- SAME CHARACTER in all 7 images: same face, build, colours, clothes and props as the idle image. Keep the figure the same size from image to image; a lying pose is wider and shorter, not stretched.
- Work through one monster completely before starting the next. Before each image write one line, e.g. "3/7 CLAW CRAB - walk2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule (touches an edge, wrong pose, different character), redraw it.

THE MONSTERS (number, file key, description; size; attack):
1 clawcrab - CLAW CRAB: giant red crab whose two claws are silver arcade claw-machine grabbers, a plush toy still stuck in one claw, gold eyes on stalks, dark brown legs. Size: big and wide: about 1.2x the height of a person. Attack: a big double claw pinch forward.
2 mannequin - MANNEQUIN: possessed department-store mannequin, blank beige plastic face and body, visible cracked ball joints, teal 90s windbreaker, stiff creepy pose. Size: person height. Attack: a stiff-armed karate chop.
3 usher - ZOMBIE USHER: undead movie-theatre usher, red vest with gold buttons, black bow tie, red pillbox hat, green rotting skin, a big chrome flashlight. Size: person height. Attack: shines the flashlight forward in a blinding cream-yellow beam.
4 lifeguard - LIFEGUARD LURKER: waterlogged zombie lifeguard, red swimsuit and red visor, whistle on a cord, bloated teal-blue skin, water dripping off him. Size: person height. Attack: a lunging two-handed grab.
5 poolshark - POOL SHARK: a shark standing upright on two legs, grey skin, rows of teeth, a teal pool-noodle ring around its middle, white swim trunks, holding a cream rescue board like a shield. Size: big: about 1.2x person height. Attack: a head-down charge behind the board.

WHEN I SAY "make the zip" (use your Python tool):
- For every image, make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop to the figure with 24 px of padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest, e.g. clawcrab.png, clawcrab_walk1.png, clawcrab_walk2.png, clawcrab_attack1.png, clawcrab_attack2.png, clawcrab_hurt.png, clawcrab_down.png. That is 35 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as monsters_a.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 2: monsters, last five

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters from the game. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours, a single figure drawn large and detailed. Do not draw the attached monsters.

TASK: 5 new monsters, 7 poses each, ONE POSE PER IMAGE (35 images), then cut out and zip.

Why one per image: in an earlier batch the poses were drawn as a grid and came out small, blurry and cut off where figures overlapped. Each pose must be its own full-size drawing.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, filling about 80% of the image height, centred, with clear empty margin on every side. No part of the figure may touch or run off any edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no second character, no fragments of anything else.
- Every pose faces RIGHT, full body visible.
- Draw the 7 poses in this order, one image each: idle, walk1, walk2, attack1, attack2, hurt, down.
  idle = standing ready. walk1 / walk2 = two opposite steps of a walk (a floating monster: two bob heights). attack1 = the wind-up. attack2 = the hit itself (see the monster's attack; draw any beam, bolt or wave it fires as part of the picture). hurt = recoiling from a hit, head snapped back. down = knocked flat on its back on the ground, lying horizontally across the image (a floating monster: crashed on the ground).
- SAME CHARACTER in all 7 images: same face, build, colours, clothes and props as the idle image. Keep the figure the same size from image to image; a lying pose is wider and shorter, not stretched.
- Work through one monster completely before starting the next. Before each image write one line, e.g. "3/7 CLAW CRAB - walk2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule (touches an edge, wrong pose, different character), redraw it.

THE MONSTERS (number, file key, description; size; attack):
1 static - STATIC SPECTER: a floating ghost made of TV static and scan lines, pale blue glow, an old rabbit-ear TV antenna on its head, grey tattered shroud, a wispy tail instead of legs (it floats, never touches the ground). Size: person height, floating. Attack: throws a crackling pale-blue static bolt forward.
2 weather - WEATHERMAN: undead local-TV weatherman, navy suit, gold tie, slick hair, frozen TV smile, green skin, holding a wooden pointer stick. Size: person height. Attack: points the pointer forward and three small yellow lightning bolts shoot out of it.
3 spawn - METEOR SPAWN: small six-legged alien critter, lime green with brown rock plates on its back, glowing pink eyes, a wide fanged mouth. Size: small: about 0.75x person height. Attack: a pouncing leap, legs spread.
4 brute - ALIEN BRUTE: huge muscular alien soldier, green skin, dark brown armoured harness and shoulder plates, glowing lime veins, giant fists. Size: very big: about 1.35x person height. Attack: a huge overhead double-fist smash.
5 abductor - GREY ABDUCTOR: classic grey alien with a huge head and black almond eyes, silver-grey skin, floating inside a small chrome hover-disc with a teal glow underneath (it floats, never touches the ground), holding a teal tractor-beam wand. Size: person height, floating. Attack: fires a teal tractor beam forward from the wand.

WHEN I SAY "make the zip" (use your Python tool):
- For every image, make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop to the figure with 24 px of padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest, e.g. clawcrab.png, clawcrab_walk1.png, clawcrab_walk2.png, clawcrab_attack1.png, clawcrab_attack2.png, clawcrab_hurt.png, clawcrab_down.png. That is 35 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as monsters_b.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 3: the 3 bosses

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters from the game. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours. Do not draw the attached monsters.

TASK: 3 bosses, 8 poses each, ONE POSE PER IMAGE (24 images), then cut out and zip. Bosses are huge, imposing and extra detailed.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, filling about 85% of the image height, centred, with clear empty margin on every side. No part of the figure may touch or run off any edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no second character, no fragments of anything else.
- Every pose faces RIGHT, full body visible.
- Draw the 8 poses in this order, one image each: idle, walk1, walk2, attack1, attack2, special, hurt, down.
  idle = standing menacingly. walk1 / walk2 = two opposite steps (a floating boss: two hover heights). attack1 = winding up or summoning, arms raised, roaring. attack2 = the main attack (draw whatever it fires or throws as part of the picture). special = the slam: leaping or rising high, about to come down. hurt = recoiling, head snapped back. down = defeated, collapsed flat on the ground across the image.
- SAME CHARACTER in all 8 images: same face, build, colours, clothes and props as the idle image, same size from image to image.
- Work through one boss completely before starting the next. Before each image write one line, e.g. "5/8 KING PIN - attack2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule, redraw it.

THE BOSSES (number, file key, description; main attack; special):
1 squatch - SASQUATCH SCOUTMASTER (stage 3 boss): a giant shaggy brown Bigfoot wearing a too-small khaki scout-leader shirt covered in merit badges, a red neckerchief, a scout campaign hat, huge bare feet. Main attack: a roaring shoulder-first charge. Special: a ground-pound slam: leaping high and coming down.
2 kingpin - KING PIN (stage 6 boss): a towering bowling monster with a glossy black bowling ball for a head, three glowing finger holes as eyes and mouth, a red bowling shirt with a gold crown logo, red-and-white bowling shoes, carrying a giant bowling pin like a club. Main attack: hurls a spray of small white bowling pins forward. Special: a ground-pound slam with the giant pin: leaping high and coming down.
3 collector - THE LATE FEE COLLECTOR (final boss): a towering floating alien overlord, a long dark brown coat lined inside with hundreds of VHS tapes, a silver alien skull face with glowing gold eyes, a pink energy cape trailing below instead of legs (it floats), holding a giant OVERDUE notice in one hand. Main attack: fires a fan of five pink energy bolts from an outstretched hand. Special: rises high and slams down with both hands in a burst of pink energy.

WHEN I SAY "make the zip" (use your Python tool):
- For every image, make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop to the figure with 24 px of padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest: squatch.png, squatch_walk1.png, squatch_walk2.png, squatch_attack1.png, squatch_attack2.png, squatch_special.png, squatch_hurt.png, squatch_down.png, and the same for kingpin and collector. That is 24 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as bosses.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 4: backgrounds for stages 2 to 6

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


---

## Chat 5: backgrounds for stages 7 to 10

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


---

## Chat 6: the 270 item icons

Use `art/MASTER_ITEM_PROMPT.md` as written: three chats (A hats and glasses, B shirts/jackets/pants/shoes, C belts/bracelets/rings), each a set of 6-per-sheet grids with a zip at the end. Grids are fine for icons because each item only needs to be ~170 px to read well at bag size. The item lists in that file are generated from the game's data, with each item's exact colour code.

---

**When the zips reach me:**
- **Monsters and bosses:** I run the cut-out cleaner (it now drops any sliver of a neighbouring figure), even out the pose sizes, and wire them in; bosses also use their special pose for the ground-pound. Each takes a few minutes.
- **Backgrounds:** I convert them, line the floor up with where the heroes walk, and each stage switches from its drawn stand-in to the painted scenes with the same crossfades Maple Court uses.
- **Items:** I add the icon loader (the game doesn't have one yet; the bag and loot use drawn shapes), then every item gets its icon in the bag, on the ground, in loot messages and on the phone's gear LCD.
