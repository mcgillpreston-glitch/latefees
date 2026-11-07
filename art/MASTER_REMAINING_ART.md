# Master art prompt: everything still missing (November 2026)

This one file replaces the open parts of `MASTER_ART_PROMPTS.md`, `MASTER_OUTFIT_PROMPT.md` and `MASTER_FRAMES_PROMPT.md`. It covers the four groups from the art audit: monsters and bosses with no art, hero outfits, extra animation frames for 15 monsters, and the small pieces still drawn in code.

| Chat | Makes | Upload first | Images | Zip |
|---|---|---|---|---|
| **1** | 5 monsters x 10 poses (Static Specter, Weatherman, Meteor Spawn, Alien Brute, Grey Abductor) | from `refs/style_refs.zip`: `sh`, `mummy`, `bog`, `martian` | 50 | `monsters_b.zip` |
| **2** | 3 bosses x 11 poses (Sasquatch Scoutmaster, King Pin, the Late Fee Collector) | from `refs/style_refs.zip`: `blob`, `chainsaw`, `bog` | 33 | `bosses.zip` |
| **3** | Dex, 4 outfits x 24 poses | `refs/dex_refs.zip` | 96 | `dex_outfits.zip` |
| **4** | Rae, 4 outfits x 14 missing frames | `refs/rae_refs.zip` | 56 | `rae_outfit_frames.zip` |
| **5** | Benny, same | `refs/benny_refs.zip` | 56 | `benny_outfit_frames.zip` |
| **6** | Julia, same | `refs/julia_refs.zip` | 56 | `julia_outfit_frames.zip` |
| **7** | 7 monsters x 3 extra frames | `refs/monster_frames_a_refs.zip` | 21 | `monster_frames_a.zip` |
| **8** | 7 monsters + the Blob x 3 extra frames | `refs/monster_frames_b_refs.zip` | 24 | `monster_frames_b.zip` |
| **9** | Title logo, 7 pickup icons, 9 projectiles | from `refs/style_refs.zip`: `dex`, `icons-hat`, `icons-ring` | 17 | `ui_art.zip` |

**409 images in all.** Suggested order: **1 and 2 first** (stages 9 and 10 and three boss fights are still shape stand-ins), then **3** (Dex has no outfits at all), then 4 to 6, then 7 and 8, then 9.

**What's new compared with the old prompts:**
- **Chats 1 and 2 now ask for the 4-step walk and the attack follow-through from the start** (10 poses per monster, 11 per boss), so these characters never need a second frames pass.
- **Chats 7 and 8 are new:** the 4-step walk and follow-through for the 14 monsters that still walk with two steps, plus the Blob.
- **Chat 9 is new:** the painted title logo, power-up and pickup icons, and projectiles.
- **Chat 3:** Dex's CD player stays in his BACK hand in the standing pose and all four walk frames.

## How every chat works
1. Start a **new** ChatGPT chat. Unzip the refs listed and upload them (several messages is fine; say "more references coming" until they're all up).
2. Paste that chat's box below as **one message**.
3. Reply **continue** whenever it stops. When it says everything is done, reply **make the zip**.
4. Send me the zip. Skip any chat you like: whatever hasn't arrived keeps what it has now.

**Fixing a bad image:** reply *"redraw 4/10 WEATHERMAN attack2"*, or *"redraw N; match base frame walk3 exactly"*, or *"redraw N; match the attached night outfit frames exactly"*.

**The one rule behind every box:** one pose per image, never a grid. Grids are what gave the early batches small, blurry, cut-off figures.

---

## Chat 1: monsters, the last five (50 images)

Upload `sh.png`, `mummy.png`, `bog.png`, `martian.png` from `refs/style_refs.zip`, then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters from the game. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours, a single figure drawn large and detailed. Do not draw the attached monsters.

TASK: 5 new monsters, 10 poses each, ONE POSE PER IMAGE (50 images), then cut out and zip.

Why one per image: in an earlier batch the poses were drawn as a grid and came out small, blurry and cut off where figures overlapped. Each pose must be its own full-size drawing.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, filling about 80% of the image height, centred, with clear empty margin on every side. No part of the figure may touch or run off any edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no second character, no fragments of anything else.
- Every pose faces RIGHT, full body visible.
- Draw the 10 poses in this order, one image each:
  1 idle = standing ready.
  2 walk1 = a step, one foot forward (a floating monster: low point of its bob).
  3 walk2 = the opposite step (floating: high point).
  4 walk3 = the passing step between walk1 and walk2, body at its highest point (floating: halfway up).
  5 walk4 = the opposite passing step (floating: halfway down). walk1, walk3, walk2, walk4 loop as a 4-step walk.
  6 attack1 = the wind-up.
  7 attack2 = the hit itself (see the monster's attack; draw any beam, bolt or wave it fires as part of the picture).
  8 attack3 = the follow-through right after attack2: the blow has landed, limb or weapon past the target, body settling.
  9 hurt = recoiling from a hit, head snapped back.
  10 down = knocked flat on its back on the ground, lying horizontally across the image (a floating monster: crashed on the ground).
- SAME CHARACTER in all 10 images: same face, build, colours, clothes and props as the idle image. Keep the figure the same size from image to image; a lying pose is wider and shorter, not stretched.
- Work through one monster completely before starting the next. Before each image write one line, e.g. "3/10 WEATHERMAN - walk2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule (touches an edge, wrong pose, different character), redraw it.

THE MONSTERS (number, file key, description; size; attack):
1 static - STATIC SPECTER: a floating ghost made of TV static and scan lines, pale blue glow, an old rabbit-ear TV antenna on its head, grey tattered shroud, a wispy tail instead of legs (it floats, never touches the ground). Size: person height, floating. Attack: throws a crackling pale-blue static bolt forward.
2 weather - WEATHERMAN: undead local-TV weatherman, navy suit, gold tie, slick hair, frozen TV smile, green skin, holding a wooden pointer stick. Size: person height. Attack: points the pointer forward and three small yellow lightning bolts shoot out of it.
3 spawn - METEOR SPAWN: small six-legged alien critter, lime green with brown rock plates on its back, glowing pink eyes, a wide fanged mouth. Size: small, about 0.75x person height. Attack: a pouncing leap, legs spread.
4 brute - ALIEN BRUTE: huge muscular alien soldier, green skin, dark brown armoured harness and shoulder plates, glowing lime veins, giant fists. Size: very big, about 1.35x person height. Attack: a huge overhead double-fist smash.
5 abductor - GREY ABDUCTOR: classic grey alien with a huge head and black almond eyes, silver-grey skin, floating inside a small chrome hover-disc with a teal glow underneath (it floats, never touches the ground), holding a teal tractor-beam wand. Size: person height, floating. Attack: fires a teal tractor beam forward from the wand.

WHEN I SAY "make the zip" (use your Python tool):
- For every image, make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop to the figure with 24 px of padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest, e.g. weather.png, weather_walk1.png, weather_walk2.png, weather_walk3.png, weather_walk4.png, weather_attack1.png, weather_attack2.png, weather_attack3.png, weather_hurt.png, weather_down.png. That is 50 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as monsters_b.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 2: the 3 bosses (33 images)

Upload `blob.png`, `chainsaw.png`, `bog.png` from `refs/style_refs.zip`, then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters from the game. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, campy B-movie monster look, warm saturated colours. Do not draw the attached monsters.

TASK: 3 bosses, 11 poses each, ONE POSE PER IMAGE (33 images), then cut out and zip. Bosses are huge, imposing and extra detailed.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, filling about 85% of the image height, centred, with clear empty margin on every side. No part of the figure may touch or run off any edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no second character, no fragments of anything else.
- Every pose faces RIGHT, full body visible.
- Draw the 11 poses in this order, one image each:
  1 idle = standing menacingly.
  2 walk1 = a heavy step, one foot forward (a floating boss: low point of its hover).
  3 walk2 = the opposite step (floating: high point).
  4 walk3 = the passing step between walk1 and walk2, body at its highest point (floating: halfway up).
  5 walk4 = the opposite passing step (floating: halfway down). walk1, walk3, walk2, walk4 loop as a 4-step walk.
  6 attack1 = winding up or summoning, arms raised, roaring.
  7 attack2 = the main attack (draw whatever it fires or throws as part of the picture).
  8 attack3 = the follow-through right after attack2: the attack spent, body settling, still menacing.
  9 special = the slam: leaping or rising high, about to come down.
  10 hurt = recoiling, head snapped back.
  11 down = defeated, collapsed flat on the ground across the image.
- SAME CHARACTER in all 11 images: same face, build, colours, clothes and props as the idle image, same size from image to image.
- Work through one boss completely before starting the next. Before each image write one line, e.g. "7/11 KING PIN - attack2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image breaks a rule, redraw it.

THE BOSSES (number, file key, description; main attack; special):
1 squatch - SASQUATCH SCOUTMASTER (stage 3 boss): a giant shaggy brown Bigfoot wearing a too-small khaki scout-leader shirt covered in merit badges, a red neckerchief, a scout campaign hat, huge bare feet. Main attack: a roaring shoulder-first charge. Special: a ground-pound slam: leaping high and coming down.
2 kingpin - KING PIN (stage 6 boss): a towering bowling monster with a glossy black bowling ball for a head, three glowing finger holes as eyes and mouth, a red bowling shirt with a gold crown logo, red-and-white bowling shoes, carrying a giant bowling pin like a club. Main attack: hurls a spray of small white bowling pins forward. Special: a ground-pound slam with the giant pin: leaping high and coming down.
3 collector - THE LATE FEE COLLECTOR (final boss): a towering floating alien overlord, a long dark brown coat lined inside with hundreds of VHS tapes, a silver alien skull face with glowing gold eyes, a pink energy cape trailing below instead of legs (it floats), holding a giant OVERDUE notice in one hand. Main attack: fires a fan of five pink energy bolts from an outstretched hand. Special: rises high and slams down with both hands in a burst of pink energy.

WHEN I SAY "make the zip" (use your Python tool):
- For every image, make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop to the figure with 24 px of padding.
- Name the files <key>.png for idle and <key>_<pose>.png for the rest: squatch.png, squatch_walk1.png, squatch_walk2.png, squatch_walk3.png, squatch_walk4.png, squatch_attack1.png, squatch_attack2.png, squatch_attack3.png, squatch_special.png, squatch_hurt.png, squatch_down.png, and the same for kingpin and collector. That is 33 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as bosses.zip, give me the download link, and list any pose you think came out wrong.
```

---

## Chat 3: Dex, four outfits from scratch (96 images)

When a hero wears 3 or more pieces of one set, the game swaps their whole look to that set's outfit. Dex's old outfits showed the tube sock he no longer fights with, so his four are drawn from scratch.

Upload **Dex's 24 poses** from `refs/dex_refs.zip` (`dex.png` is the standing pose; the other 23 are named by frame), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are the hero Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops) who swings a silver portable CD player around on its long black cord. They are his 24 poses and the file names say which is which: dex.png (standing), walk1, walk2, walk3, walk4, attack1, attack2, attack3, finish1, finish2, finish3, jump, jump2, jump3, kick, hurt, hurt2, down, getup1, getup2, special, special2, special3, special4. These are the EXACT character, poses and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: redraw Dex in 4 new OUTFITS, every one of the 24 poses for each outfit, ONE POSE PER IMAGE (96 images), then cut out and zip. Change ONLY the clothes: same face, hair, skin, build, CD player and cord, and EXACTLY the pose of the matching reference frame.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the reference frames (about 80% of the image height for a standing pose; a crouched or lying pose is smaller, not stretched), centred, clear empty margin on every side. No part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no effects except the weapon's own motion.
- Faces RIGHT, full body, the CD player in hand in every frame. In the standing pose and all four walk frames it hangs from his BACK hand (the one away from the viewer); it never changes hands between walk frames.
- Work through one outfit completely, in the frame order below, before starting the next. Before each image write one line, e.g. "NIGHT SHIFT 8/24 - attack3". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image drifts from the pose, the character or the outfit, redraw it.

THE 4 OUTFITS (in this order; set key in brackets):
1 NIGHT SHIFT [night] - late-shift video store clerk: teal employee visor with a rewind symbol, reading glasses, a teal rental-clerk vest with a name tag over his shirt, a huge ring of store keys clipped to the belt, a teal ring.
2 TOUR '94 [tour] - grunge band on tour: red-and-black flannel under a distressed denim jacket with a "TOUR '94" back patch, black ripped jeans with safety pins, beat-up black combat boots with red laces, a studded wristband.
3 SKATE CREW [skate] - 90s skate crew: a sticker-covered skate helmet, a black-and-hot-pink checkerboard hoodie, baggy checkerboard shorts, checkerboard skate shoes, knee pads.
4 MALL SECURITY [mall] - mall rent-a-cop: mirrored cop sunglasses, a mustard security shirt with a navy badge patch, a navy duty belt with a flashlight and walkie-talkie, a chunky watch, a badge-shaped ring.

THE 24 POSES, in order (name - what the reference shows; copy its pose exactly):
1 idle - standing ready (the dex.png reference).
2 walk1 - a step, one foot forward.
3 walk2 - the opposite step.
4 walk3 - the passing step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
5 walk4 - the opposite passing step. (walk1, walk3, walk2, walk4 loop as a 4-step walk.)
6 attack1 - the wind-up of a swing.
7 attack2 - the hit.
8 attack3 - the follow-through: swing past the target, weapon out in front, leaning forward and settling.
9 finish1 - the big third hit's wind-up: weapon pulled far back and up, knees bent, coiled.
10 finish2 - the big hit landing: a wide swing on the cord, maximum reach, body fully extended.
11 finish3 - its follow-through: weapon past the target, off balance, one foot lifted.
12 jump - leaving the ground.
13 jump2 - the top of the jump: knees tucked, arms out, hanging in the air.
14 jump3 - coming down: legs reaching for the ground, arms up for balance.
15 kick - a flying kick.
16 hurt - taking a hit, head snapped back.
17 hurt2 - staggering back, one hand to the body, face grimacing.
18 down - knocked flat on his back, lying horizontally across the image.
19 getup1 - pushing up off the ground: one knee and one hand down, head raised.
20 getup2 - almost standing: knees bent, straightening up, weapon back in hand.
21 special - the special move's first frame.
22 special2 - the special, further round.
23 special3 - further still.
24 special4 - the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files dex_<set>_<frame>.png, lowercase, with set = night, tour, skate or mall and the idle pose named dex_<set>.png. For example: dex_night.png, dex_night_walk1.png, dex_night_walk3.png, dex_tour_finish2.png, dex_skate_getup1.png, dex_mall_special4.png. That is 96 files (24 per outfit).
- Also include the untouched originals in an originals/ folder.
- Zip everything as dex_outfits.zip, give me the download link, and list any image you think came out wrong.
```

---

## Chat 4: Rae, the 14 missing frames for each outfit (56 images)

Each of Rae's, Benny's and Julia's outfits has 10 of its 24 poses. For a missing pose the game falls back to the hero's normal clothes, so the outfit flickers off during combos, jumps and specials.

Upload from `refs/rae_refs.zip`: **her base frames** (`base/`) and **the existing outfit frames** (`outfits/`). The outfit frames are the look to keep; the base frames are the poses to draw. Then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are the hero Rae, the grunge bassist (pink hair, red-and-black flannel, black tank top, ripped teal jeans, black combat boots) who swings her red bass guitar, in two groups:
- base frames rae_<frame>.png: her 24 poses in her normal clothes (rae.png is standing). These give the EXACT poses.
- outfit frames rae_<set>_<frame>.png: frames of her in 4 outfits (night, tour, skate, mall). These give the EXACT clothes for each outfit.
Same art style throughout: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: each outfit is missing 14 of her animation frames. Draw them, ONE POSE PER IMAGE (4 outfits x 14 = 56 images), then cut out and zip. Each image is Rae in the outfit's clothes, in the pose of the matching base frame: same face, hair, skin, build and bass guitar as always, clothes exactly as in that outfit's frames.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the base frames (about 80% of the image height for a standing pose; a crouched or lying pose is smaller, not stretched), centred, clear empty margin on every side. No part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no effects except the weapon's own motion.
- Faces RIGHT, full body, the bass in hand in every frame.
- Work through one outfit completely, in the frame order below, before starting the next. Before each image write one line, e.g. "TOUR '94 5/14 - finish2". Make as many images per reply as you can. If you must stop, say which image is next and continue exactly there when I say "continue". If an image drifts from the pose, the character or the outfit, redraw it.

THE 4 OUTFITS (in this order; set key in brackets; match the attached frames of each):
1 NIGHT SHIFT [night] - teal employee visor with a rewind symbol, reading glasses, teal rental-clerk vest with a name tag, a huge ring of store keys on the belt, a teal ring.
2 TOUR '94 [tour] - red-and-black flannel under a distressed denim jacket with a "TOUR '94" back patch, black ripped jeans with safety pins, black combat boots with red laces, a studded wristband.
3 SKATE CREW [skate] - sticker-covered skate helmet, black-and-hot-pink checkerboard hoodie, baggy checkerboard shorts, checkerboard skate shoes, knee pads.
4 MALL SECURITY [mall] - mirrored cop sunglasses, mustard security shirt with a navy badge patch, navy duty belt with flashlight and walkie-talkie, a chunky watch, a badge-shaped ring.

THE 14 FRAMES, in order (name - what the base frame shows; copy its pose exactly):
1 walk3 - the passing step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
2 walk4 - the opposite passing step. (walk1, walk3, walk2, walk4 loop as a 4-step walk.)
3 attack3 - the follow-through after attack2: swing past the target, bass out in front, leaning forward and settling.
4 finish1 - the big third hit's wind-up: bass pulled far back and up, knees bent, coiled.
5 finish2 - the big hit landing: a wide two-handed swing, maximum reach, body fully extended.
6 finish3 - its follow-through: bass past the target, off balance, one foot lifted.
7 jump2 - the top of the jump: knees tucked, arms out, hanging in the air.
8 jump3 - coming down: legs reaching for the ground, arms up for balance.
9 hurt2 - staggering back, one hand to the body, face grimacing.
10 getup1 - pushing up off the ground: one knee and one hand down, head raised.
11 getup2 - almost standing: knees bent, straightening up, bass back in hand.
12 special2 - the special move, further round than the outfit's special frame.
13 special3 - further still.
14 special4 - the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files rae_<set>_<frame>.png, lowercase, with set = night, tour, skate or mall. For example: rae_night_walk3.png, rae_tour_finish2.png, rae_skate_getup1.png, rae_mall_special4.png. That is 56 files.
- Also include the untouched originals in an originals/ folder.
- Zip everything as rae_outfit_frames.zip, give me the download link, and list any image you think came out wrong.
```

---

## Chat 5: Benny, the 14 missing frames for each outfit (56 images)

Upload from `refs/benny_refs.zip` (`base/` and `outfits/`), then paste the **Chat 4 box** with these changes:
- the first paragraph: `the hero Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops) who swings his red insulated pizza bag`, and the file names `benny_<frame>.png` / `benny_<set>_<frame>.png`
- "the bass" / "bass" becomes "the pizza bag" / "pizza bag" wherever it appears (rules line, attack3, finish1 to 3, getup2)
- the zip section: files `benny_<set>_<frame>.png`, zip `benny_outfit_frames.zip`

## Chat 6: Julia, the 14 missing frames for each outfit (56 images)

Upload from `refs/julia_refs.zip` (`base/` and `outfits/`), then paste the **Chat 4 box** with these changes:
- the first paragraph: `the hero Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates) who fights with a wooden hockey stick`, and the file names `julia_<frame>.png` / `julia_<set>_<frame>.png`
- "the bass" / "bass" becomes "the hockey stick" / "stick" wherever it appears
- the zip section: files `julia_<set>_<frame>.png`, zip `julia_outfit_frames.zip`

---

## Chats 7 and 8: a 4-step walk and follow-through for 15 monsters (45 images)

Ten monsters already have these frames. These 15 still walk with two steps and have no follow-through on their attack.

- **Chat 7** (upload `refs/monster_frames_a_refs.zip`, 49 files): chainsaw, tape, lunch, bog, skeeter, derby, rinkrat.
- **Chat 8** (upload `refs/monster_frames_b_refs.zip`, 57 files): martian, pinhead, clawcrab, mannequin, usher, lifeguard, poolshark, blob.

Paste the box, with the monster list for that chat:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are existing monsters, 7 frames each (the Blob has 8); the file names say which monster and which pose: <key>.png = idle, walk1, walk2, attack1 = the wind-up, attack2 = the hit, hurt, down (and the Blob's special). These are the EXACT characters and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: 3 new frames for each monster below, ONE FRAME PER IMAGE, then cut out and zip.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as that monster's attached frames, centred, clear empty margin on every side; nothing may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, shadow, scenery or text.
- Faces RIGHT, full body, the same monster as its attached frames in every detail: face, colours, clothes, props.
- Work through one monster completely before the next. Before each image write one line, e.g. "DERBY DEMON - walk3". Make as many images per reply as you can. Continue exactly where you stopped when I say "continue". Redraw any frame that drifts from its monster.

THE 3 FRAMES PER MONSTER:
walk3 - the passing step between its walk1 and walk2: feet passing each other, body at its highest point. (A flying or floating monster: halfway between its walk1 and walk2 heights, rising.)
walk4 - the opposite passing step (flying or floating: halfway, sinking). walk1, walk3, walk2, walk4 loop as a 4-step walk.
attack3 - the follow-through right after attack2: the blow has landed or the shot has gone, weapon or limb past the target, body settling.

THE MONSTERS (file key - name):
[CHAT 7]
chainsaw - CHAINSAW MANIAC
tape - TAPE WRAITH (floats)
lunch - LUNCH LADY
bog - BOG BEAST
skeeter - MEGA SKEETER (flies)
derby - DERBY DEMON (on roller skates: the walk is a skating stride)
rinkrat - RINK RAT
[CHAT 8]
martian - MARTIAN INVADER
pinhead - PINHEAD
clawcrab - CLAW CRAB (sideways scuttle: the walk is a leg cycle)
mannequin - MANNEQUIN
usher - ZOMBIE USHER
lifeguard - LIFEGUARD LURKER
poolshark - POOL SHARK
blob - THE BLOB FROM AISLE 9 (a huge gelatinous boss with no legs: the walk is a heaving ooze forward, its body squashing and stretching)

WHEN I SAY "make the zip" (use your Python tool): make the white transparent (near-white pixels connected to the edges become alpha 0), crop each to the figure with 24 px padding, name them <key>_walk3.png, <key>_walk4.png, <key>_attack3.png, include the untouched originals in originals/, zip as monster_frames_a.zip (Chat 7) or monster_frames_b.zip (Chat 8), and give me the link.
```

**Before pasting:** delete the other chat's half of the monster list, so Chat 7 lists only its 7 monsters and Chat 8 only its 8.

---

## Chat 9: title logo, pickups and projectiles (17 images)

These are drawn in code today as small pixel shapes. Painted versions make the title screen and the fights match the rest of the art.

Upload `dex.png`, `icons-hat.png`, `icons-ring.png` from `refs/style_refs.zip`, then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are from the game: a hero (dex.png) and two sheets of item icons. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Do not redraw them.

TASK: 17 images, ONE SUBJECT PER IMAGE, then cut out and zip. Before each image write one line, e.g. "9/17 shot_laser". Make as many per reply as you can; continue exactly where you stopped when I say "continue". Redraw any image that breaks a rule.

RULES FOR EVERY IMAGE:
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no extra text beyond what is asked for.
- Exactly ONE subject, centred, with clear empty margin on every side; nothing may touch or run off an edge.

IMAGE 1, THE TITLE LOGO (landscape 1536x640):
- The game's logo, spelled EXACTLY: on top, smaller, "THE LAST"; below it, big, "VIDEO STORE"; below that, small, "THE DEAD DON'T REWIND".
- Chunky 80s/90s video-store sign lettering: "VIDEO STORE" in warm yellow with a red drop shadow and thick black outline, "THE LAST" in cream, the tagline in lime green. Lime-green slime dripping off the bottom edge of "VIDEO STORE".
- No other words, no characters, no background panel. Check every letter of the spelling; redraw if any letter is wrong.

IMAGES 2 TO 8, PICKUP ICONS (square 1024x1024, the object filling about 70% of the image, drawn like the attached item icons, a slight 3/4 view):
2 pickup_jolt - a can of JOLT SODA: red can, yellow lightning bolt, condensation drops.
3 pickup_boombox - a 90s boombox: silver and black, two big speakers, orange accent stripe, a carry handle.
4 pickup_pog - a POG SLAMMER: a thick metal disc with a teal-and-pink swirl design, slightly tilted.
5 pickup_troll - a TROLL DOLL: a little troll with wild hot-pink upright hair, big grin, bare belly, tiny gem.
6 pickup_beeper - a 90s BEEPER / pager: lime-green plastic, small grey screen showing "911", a belt clip.
7 pickup_pizza - a single slice of pepperoni pizza: golden crust, stretchy cheese, five pepperoni.
8 pickup_tape - a black VHS cassette tape with a white handwritten label and a glint of gold (a bonus-points pickup).

IMAGES 9 TO 17, PROJECTILES (square 1024x1024, the shot filling about 60% of the width, flying to the RIGHT, motion streaks trailing to the left):
9 shot_slime - a wet lime-green slime glob with drips.
10 shot_wave - a sonic whistle blast: three curved cream-white sound-wave arcs.
11 shot_laser - a 1950s sci-fi ray-gun blast: a short lime-green energy bolt with a bright white core.
12 shot_flash - a flashlight beam blast: a cone of pale yellow light ending in a bright flare.
13 shot_static - a crackling ball of TV static, pale blue, with scan lines and small sparks.
14 shot_lightning - a small yellow zig-zag lightning bolt.
15 shot_pink - a pink energy bolt with a hot-white core and a short comet tail.
16 shot_beam - a teal tractor-beam pulse: a glowing teal ring of light with ripples.
17 shot_pin - a single white bowling pin with two red stripes, tumbling end over end.

WHEN I SAY "make the zip" (use your Python tool): make the white background transparent (near-white pixels connected to the edges become alpha 0), crop each to the subject with 24 px of padding, name the files logo.png, pickup_jolt.png ... pickup_tape.png, shot_slime.png ... shot_pin.png (17 files), include the untouched originals in originals/, zip as ui_art.zip and give me the link.
```

---

**When the zips reach me:** I run them through the importer (cut-out clean-up, size matching, colour matching to the existing frames), rebuild the sprite sheets, and they're in. Chats 1 to 8 need no code changes: the game already plays every one of those frames as soon as it exists. Chat 9 is the exception: the logo, icons and shots are drawn in code today, so I'll switch those over to the new art when it arrives.
