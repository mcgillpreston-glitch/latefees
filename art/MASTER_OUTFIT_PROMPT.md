# Master prompts: set outfits, brought up to 23 frames

When a hero wears **3 or more pieces of one set**, the game swaps their whole look to that set's outfit in every animation. With fewer pieces, the gear recolours their normal clothes instead (that already works and needs no art).

**What changed since the first outfit batch**

- Every hero now has **23 animation frames** plus the standing pose (a 4-step walk, a three-hit combo, a 3-frame finisher, jump apex and fall, a second hurt frame, two get-up frames, a 4-frame special). The outfits were drawn when there were 9. An outfit only has the frames it was drawn with, so putting one on currently drops the hero back to the old 9-frame animation.
- **Dex's outfits were removed.** They showed the tube sock; he fights with the CD player now. His four need redrawing from scratch.
- Everything is **one pose per image** now. The 3x3 sheets from the first batch are what gave us small, blurry, cut-off figures.

| Chat | Makes | Upload first | Images | Zip |
|---|---|---|---|---|
| 1 | Dex, 4 outfits x 24 poses (idle + 23 frames) | `refs/dex_refs.zip` (his 24 poses) | 96 | `dex_outfits.zip` |
| 2 | Rae, 4 outfits x the 14 missing frames | `refs/rae_refs.zip` (her 24 poses + her 36 existing outfit frames) | 56 | `rae_outfit_frames.zip` |
| 3 | Benny, same | `refs/benny_refs.zip` | 56 | `benny_outfit_frames.zip` |
| 4 | Julia, same | `refs/julia_refs.zip` | 56 | `julia_outfit_frames.zip` |

264 images in all. Do them in any order; a hero whose zip hasn't arrived keeps what they have. If you only do some, Dex first (he has nothing), then the walk frames and finisher of the others (those are what people notice).

**On my side** nothing is manual any more: the importer adds frames to an outfit, strips white pockets and stray fragments, sizes each pose and matches its colours to the hero's own frames, so a batch can't flicker against itself. Outfits don't use the gear masks (a worn set replaces the whole look), so there is no mask work either.

## Steps (per hero)

1. Unzip that hero's refs zip. Start a new ChatGPT chat and upload the reference PNGs (a few messages if it won't take them all at once; say "more references coming" until they're all up).
2. Paste the hero's box below as one message.
3. Reply **continue** whenever it stops. When every image is done, reply **make the zip**.
4. Send me the zip.

The 14 frame descriptions are the same ones the heroes' own frames were drawn from, so the new outfit frames will line up with them pose for pose.

---

## Chat 1: DEX, four outfits from scratch (96 images)

Upload **Dex's 24 poses** from `refs/dex_refs.zip` (`dex.png` is the standing pose; the other 23 are named by frame), then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are the hero Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops) who swings a silver portable CD player around on its long black cord. They are his 24 poses and the file names say which is which: dex.png (standing), walk1, walk2, walk3, walk4, attack1, attack2, attack3, finish1, finish2, finish3, jump, jump2, jump3, kick, hurt, hurt2, down, getup1, getup2, special, special2, special3, special4. These are the EXACT character, poses and art style: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: redraw Dex in 4 new OUTFITS, every one of the 24 poses for each outfit, ONE POSE PER IMAGE (96 images), then cut out and zip. Change ONLY the clothes: same face, hair, skin, build, CD player and cord, and EXACTLY the pose of the matching reference frame.

RULES FOR EVERY IMAGE:
- Portrait 1024x1536. Exactly ONE figure, the same size as in the reference frames (about 80% of the image height for a standing pose; a crouched or lying pose is smaller, not stretched), centred, clear empty margin on every side. No part of the figure may touch or run off an edge.
- Plain flat solid white (#FFFFFF) background. No floor, no shadow, no scenery, no text, no labels, no effects except the weapon's own motion.
- Faces RIGHT, full body, the CD player in hand in every frame.
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

## Chat 2: RAE, the 14 missing frames for each outfit (56 images)

Upload from `refs/rae_refs.zip`: **her 23 base frames** (`base/`) and **the 36 existing outfit frames** (`outfits/`, 9 per set). The outfit frames are the look to keep; the base frames are the poses to draw. Then paste:

```
You are making game art for my 90s beat-'em-up "The Last Video Store". The attached images are the hero Rae, the grunge bassist (pink hair, red-and-black flannel, black tank top, ripped teal jeans, black combat boots) who swings her red bass guitar, in two groups:
- base frames rae_<frame>.png: her 24 poses in her normal clothes (rae.png is standing). These give the EXACT poses.
- outfit frames rae_<set>_<frame>.png: 9 frames each of her in 4 outfits (night, tour, skate, mall). These give the EXACT clothes for each outfit.
Same art style throughout: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.

TASK: each outfit has 9 of her 23 animation frames and is missing the other 14. Draw them, ONE POSE PER IMAGE (4 outfits x 14 = 56 images), then cut out and zip. Each image is Rae in the outfit's clothes, in the pose of the matching base frame: same face, hair, skin, build and bass guitar as always, clothes exactly as in that outfit's 9 frames.

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

## Chat 3: BENNY, the 14 missing frames for each outfit (56 images)

Upload from `refs/benny_refs.zip` (`base/` and `outfits/`), then paste the Rae box with these lines changed:

- the first paragraph: `the hero Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops) who swings his red insulated pizza bag` and the file names `benny_<frame>.png` / `benny_<set>_<frame>.png`
- "the bass" / "bass" -> "the pizza bag" / "pizza bag" wherever it appears (rules line, attack3, finish1-3, getup2)
- the zip section: files `benny_<set>_<frame>.png`, zip `benny_outfit_frames.zip`

---

## Chat 4: JULIA, the 14 missing frames for each outfit (56 images)

Upload from `refs/julia_refs.zip` (`base/` and `outfits/`), then paste the Rae box with these lines changed:

- the first paragraph: `the hero Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates) who fights with a wooden hockey stick` and the file names `julia_<frame>.png` / `julia_<set>_<frame>.png`
- "the bass" / "bass" -> "the hockey stick" / "stick" wherever it appears
- the zip section: files `julia_<set>_<frame>.png`, zip `julia_outfit_frames.zip`

---

**If an outfit's clothes drift** (a different jacket, missing helmet, wrong colours): reply *"Redraw N; match the attached <set> outfit frames exactly"*. **If a pose drifts**: *"Redraw N; match base frame <frame> exactly"*.

**When a zip reaches me:** I import it the same way as the hero and monster frames. As soon as it's in, wearing 3+ pieces of that set plays every animation in the outfit: in game, in the character select, in the gear screen, and for other players online.
