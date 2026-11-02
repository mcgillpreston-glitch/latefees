# Master prompts: more animation frames (heroes and the busiest monsters)

The game now reads extra frames whenever they exist: a 4-step walk, a follow-through on every swing, a 3-frame finisher, jump apex and fall, a second hurt frame, two get-up frames and a 4-frame special. Characters without them keep using what they have, so do these in any order.

| Chat | Makes | Upload first | Images | Zip |
|---|---|---|---|---|
| 1 | Dex, 14 frames | his 9 current frames | 14 | `dex_frames.zip` |
| 2 | Rae, 14 frames | her 9 current frames | 14 | `rae_frames.zip` |
| 3 | Benny, 14 frames | his 9 current frames | 14 | `benny_frames.zip` |
| 4 | Julia, 14 frames | her 9 current frames | 14 | `julia_frames.zip` |
| 5 | 10 common monsters, 3 frames each | their current frames (7 each) | 30 | `monster_frames.zip` |

Same workflow as always: new chat, upload, paste the box as one message, reply **continue** when it stops, **make the zip** at the end, send me the zips. One frame per image; never a grid.

Priority if you only do some: the walk frames (3 and 4) and the finisher (finish1-3) are what people notice first. Heroes before monsters.

---

## DEX: 14 more frames

Upload **DEX's 9 existing frames** (`art/dex_walk1.webp`, `dex_walk2`, `dex_attack1`, `dex_attack2`, `dex_jump`, `dex_kick`, `dex_hurt`, `dex_down`, `dex_special`), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The 9 attached images are the hero Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops) who swings a silver portable CD player around on its long black cord: walk1, walk2, attack1 (wind-up), attack2 (the hit), jump, kick, hurt, down and special (the file names say which is which). These are the EXACT character and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours, same face, hair, build, clothes and weapon.

TASK: 14 new animation frames of this same hero, ONE FRAME PER IMAGE, then cut out and zip. They fill in the movement between the frames I have, so each must sit naturally between its neighbours.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the attached frames (about 80% of the image height), centred, clear empty margin on every side; no part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no effects except the weapon's own motion.
- Faces RIGHT, full body, same proportions, same weapon in hand in every frame.
- Before each image write one line, e.g. "4/14 - finish1". Make as many images per reply as you can, in order. If you must stop, say which is next and continue exactly there when I say "continue". If a frame breaks a rule or drifts from the character, redraw it.

THE 14 FRAMES, in order (name - what it shows):
1 walk3 - the step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
2 walk4 - the opposite passing step, the other foot in front, body at its highest point. (walk1, walk3, walk2, walk4 should loop as a smooth 4-step walk.)
3 attack3 - the follow-through right after attack2: the swing has passed the target, weapon out in front, body leaning forward and settling.
4 finish1 - the big third hit's wind-up: weapon pulled far back and up, knees bent, coiled like a spring.
5 finish2 - the big third hit landing: a wide CD-player swing on the cord, maximum reach, body fully extended.
6 finish3 - the big hit's follow-through: weapon past the target, off balance, one foot lifted.
7 jump2 - the top of the jump: knees tucked up, arms out, hanging in the air.
8 jump3 - coming down: legs reaching for the ground, arms up for balance.
9 hurt2 - the second half of being hit: staggering back, one hand to the body, face grimacing.
10 getup1 - pushing up off the ground: on one knee and one hand, head raised.
11 getup2 - almost standing: knees still bent, straightening up, weapon back in hand.
12 special2 - the second frame of the special move: a different point in the spin or swing than the attached special frame.
13 special3 - the third frame of the special, further round.
14 special4 - the last frame of the special, the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files dex_<frame>.png: dex_walk3.png, dex_walk4.png, dex_attack3.png, dex_finish1.png, dex_finish2.png, dex_finish3.png, dex_jump2.png, dex_jump3.png, dex_hurt2.png, dex_getup1.png, dex_getup2.png, dex_special2.png, dex_special3.png, dex_special4.png. That is 14 files.
- Include the untouched originals in an originals/ folder. Zip as dex_frames.zip, give me the link, and list any frame you think drifted.
```

---

## RAE: 14 more frames

Upload **RAE's 9 existing frames** (`art/rae_walk1.webp`, `rae_walk2`, `rae_attack1`, `rae_attack2`, `rae_jump`, `rae_kick`, `rae_hurt`, `rae_down`, `rae_special`), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The 9 attached images are the hero Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair) who swings her red bass guitar: walk1, walk2, attack1 (wind-up), attack2 (the hit), jump, kick, hurt, down and special (the file names say which is which). These are the EXACT character and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours, same face, hair, build, clothes and weapon.

TASK: 14 new animation frames of this same hero, ONE FRAME PER IMAGE, then cut out and zip. They fill in the movement between the frames I have, so each must sit naturally between its neighbours.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the attached frames (about 80% of the image height), centred, clear empty margin on every side; no part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no effects except the weapon's own motion.
- Faces RIGHT, full body, same proportions, same weapon in hand in every frame.
- Before each image write one line, e.g. "4/14 - finish1". Make as many images per reply as you can, in order. If you must stop, say which is next and continue exactly there when I say "continue". If a frame breaks a rule or drifts from the character, redraw it.

THE 14 FRAMES, in order (name - what it shows):
1 walk3 - the step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
2 walk4 - the opposite passing step, the other foot in front, body at its highest point. (walk1, walk3, walk2, walk4 should loop as a smooth 4-step walk.)
3 attack3 - the follow-through right after attack2: the swing has passed the target, weapon out in front, body leaning forward and settling.
4 finish1 - the big third hit's wind-up: weapon pulled far back and up, knees bent, coiled like a spring.
5 finish2 - the big third hit landing: a full two-handed bass-guitar swing, strings first, maximum reach, body fully extended.
6 finish3 - the big hit's follow-through: weapon past the target, off balance, one foot lifted.
7 jump2 - the top of the jump: knees tucked up, arms out, hanging in the air.
8 jump3 - coming down: legs reaching for the ground, arms up for balance.
9 hurt2 - the second half of being hit: staggering back, one hand to the body, face grimacing.
10 getup1 - pushing up off the ground: on one knee and one hand, head raised.
11 getup2 - almost standing: knees still bent, straightening up, weapon back in hand.
12 special2 - the second frame of the special move: a different point in the spin or swing than the attached special frame.
13 special3 - the third frame of the special, further round.
14 special4 - the last frame of the special, the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files rae_<frame>.png: rae_walk3.png, rae_walk4.png, rae_attack3.png, rae_finish1.png, rae_finish2.png, rae_finish3.png, rae_jump2.png, rae_jump3.png, rae_hurt2.png, rae_getup1.png, rae_getup2.png, rae_special2.png, rae_special3.png, rae_special4.png. That is 14 files.
- Include the untouched originals in an originals/ folder. Zip as rae_frames.zip, give me the link, and list any frame you think drifted.
```

---

## BENNY: 14 more frames

Upload **BENNY's 9 existing frames** (`art/benny_walk1.webp`, `benny_walk2`, `benny_attack1`, `benny_attack2`, `benny_jump`, `benny_kick`, `benny_hurt`, `benny_down`, `benny_special`), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The 9 attached images are the hero Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops) who swings his red insulated pizza bag: walk1, walk2, attack1 (wind-up), attack2 (the hit), jump, kick, hurt, down and special (the file names say which is which). These are the EXACT character and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours, same face, hair, build, clothes and weapon.

TASK: 14 new animation frames of this same hero, ONE FRAME PER IMAGE, then cut out and zip. They fill in the movement between the frames I have, so each must sit naturally between its neighbours.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the attached frames (about 80% of the image height), centred, clear empty margin on every side; no part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no effects except the weapon's own motion.
- Faces RIGHT, full body, same proportions, same weapon in hand in every frame.
- Before each image write one line, e.g. "4/14 - finish1". Make as many images per reply as you can, in order. If you must stop, say which is next and continue exactly there when I say "continue". If a frame breaks a rule or drifts from the character, redraw it.

THE 14 FRAMES, in order (name - what it shows):
1 walk3 - the step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
2 walk4 - the opposite passing step, the other foot in front, body at its highest point. (walk1, walk3, walk2, walk4 should loop as a smooth 4-step walk.)
3 attack3 - the follow-through right after attack2: the swing has passed the target, weapon out in front, body leaning forward and settling.
4 finish1 - the big third hit's wind-up: weapon pulled far back and up, knees bent, coiled like a spring.
5 finish2 - the big third hit landing: a huge two-handed pizza-bag slam, maximum reach, body fully extended.
6 finish3 - the big hit's follow-through: weapon past the target, off balance, one foot lifted.
7 jump2 - the top of the jump: knees tucked up, arms out, hanging in the air.
8 jump3 - coming down: legs reaching for the ground, arms up for balance.
9 hurt2 - the second half of being hit: staggering back, one hand to the body, face grimacing.
10 getup1 - pushing up off the ground: on one knee and one hand, head raised.
11 getup2 - almost standing: knees still bent, straightening up, weapon back in hand.
12 special2 - the second frame of the special move: a different point in the spin or swing than the attached special frame.
13 special3 - the third frame of the special, further round.
14 special4 - the last frame of the special, the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files benny_<frame>.png: benny_walk3.png, benny_walk4.png, benny_attack3.png, benny_finish1.png, benny_finish2.png, benny_finish3.png, benny_jump2.png, benny_jump3.png, benny_hurt2.png, benny_getup1.png, benny_getup2.png, benny_special2.png, benny_special3.png, benny_special4.png. That is 14 files.
- Include the untouched originals in an originals/ folder. Zip as benny_frames.zip, give me the link, and list any frame you think drifted.
```

---

## JULIA: 14 more frames

Upload **JULIA's 9 existing frames** (`art/julia_walk1.webp`, `julia_walk2`, `julia_attack1`, `julia_attack2`, `julia_jump`, `julia_kick`, `julia_hurt`, `julia_down`, `julia_special`), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The 9 attached images are the hero Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates) who fights with a wooden hockey stick: walk1, walk2, attack1 (wind-up), attack2 (the hit), jump, kick, hurt, down and special (the file names say which is which). These are the EXACT character and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours, same face, hair, build, clothes and weapon.

TASK: 14 new animation frames of this same hero, ONE FRAME PER IMAGE, then cut out and zip. They fill in the movement between the frames I have, so each must sit naturally between its neighbours.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the attached frames (about 80% of the image height), centred, clear empty margin on every side; no part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no effects except the weapon's own motion.
- Faces RIGHT, full body, same proportions, same weapon in hand in every frame.
- Before each image write one line, e.g. "4/14 - finish1". Make as many images per reply as you can, in order. If you must stop, say which is next and continue exactly there when I say "continue". If a frame breaks a rule or drifts from the character, redraw it.

THE 14 FRAMES, in order (name - what it shows):
1 walk3 - the step between walk1 and walk2: feet passing each other, weight on the front foot, body at its highest point.
2 walk4 - the opposite passing step, the other foot in front, body at its highest point. (walk1, walk3, walk2, walk4 should loop as a smooth 4-step walk.)
3 attack3 - the follow-through right after attack2: the swing has passed the target, weapon out in front, body leaning forward and settling.
4 finish1 - the big third hit's wind-up: weapon pulled far back and up, knees bent, coiled like a spring.
5 finish2 - the big third hit landing: a full slapshot swing carried by her skates, maximum reach, body fully extended.
6 finish3 - the big hit's follow-through: weapon past the target, off balance, one foot lifted.
7 jump2 - the top of the jump: knees tucked up, arms out, hanging in the air.
8 jump3 - coming down: legs reaching for the ground, arms up for balance.
9 hurt2 - the second half of being hit: staggering back, one hand to the body, face grimacing.
10 getup1 - pushing up off the ground: on one knee and one hand, head raised.
11 getup2 - almost standing: knees still bent, straightening up, weapon back in hand.
12 special2 - the second frame of the special move: a different point in the spin or swing than the attached special frame.
13 special3 - the third frame of the special, further round.
14 special4 - the last frame of the special, the move completing.

WHEN I SAY "make the zip" (use your Python tool):
- Make the white background transparent (near-white pixels connected to the image edges become alpha 0) and crop each image to the figure with 24 px of padding.
- Name the files julia_<frame>.png: julia_walk3.png, julia_walk4.png, julia_attack3.png, julia_finish1.png, julia_finish2.png, julia_finish3.png, julia_jump2.png, julia_jump3.png, julia_hurt2.png, julia_getup1.png, julia_getup2.png, julia_special2.png, julia_special3.png, julia_special4.png. That is 14 files.
- Include the untouched originals in an originals/ folder. Zip as julia_frames.zip, give me the link, and list any frame you think drifted.
```

---

## Chat 5: the ten monsters you see most, 3 frames each

Upload the current frames of the monsters below (`art/<key>.webp`, `<key>_walk1`, `<key>_walk2`, `<key>_attack1`, `<key>_attack2`, `<key>_hurt`, `<key>_down` for each; 70 files, or do it in two chats of five monsters if uploads are limited), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are 10 existing monsters, 7 frames each; the file names say which monster and which pose (idle, walk1, walk2, attack1 = wind-up, attack2 = the hit, hurt, down). These are the EXACT characters and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: 3 new frames for each monster, ONE FRAME PER IMAGE (30 images), then cut out and zip.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as that monster's attached frames, centred, clear empty margin on every side; nothing may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, shadow, scenery or text.
- Faces RIGHT, full body, the same monster as its attached frames in every detail.
- Work through one monster completely before the next. Before each image write one line, e.g. "ZOMBIE JOCK - walk3". Continue exactly where you stopped when I say "continue". Redraw any frame that drifts from its monster.

THE 3 FRAMES PER MONSTER:
walk3 - the passing step between its walk1 and walk2, body at its highest point.
walk4 - the opposite passing step. (walk1, walk3, walk2, walk4 loop as a 4-step walk.)
attack3 - the follow-through right after attack2: the blow has landed, weapon or limb past the target, body settling.

THE MONSTERS (file key - name):
1 sh - SHAMBLER
2 pod - POD PERSON
3 jock - ZOMBIE JOCK
4 greaser - GREASER GHOUL
5 mummy - MUMMY
6 wolf - WEREWOLF
7 gremlin - ARCADE GREMLIN
8 cop - MALL COP
9 cook - FRY COOK
10 hallmon - HALL MONITOR

WHEN I SAY "make the zip" (use your Python tool): make the white transparent (near-white pixels connected to the edges become alpha 0), crop each to the figure with 24 px padding, name them <key>_walk3.png, <key>_walk4.png, <key>_attack3.png (30 files), include originals/, zip as monster_frames.zip and give me the link.
```

---

**When the zips reach me:** I run the cutter and size-matcher, rebuild the gear-recolour masks for the heroes' new frames, and they're in. Nothing else changes; the game already knows what to do with each frame.
