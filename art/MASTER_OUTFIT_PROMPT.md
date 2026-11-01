# Master prompt: set outfits that replace each hero's look

When a hero wears **3 or more pieces of one set**, the game swaps their whole look to that set's outfit, in every animation. With fewer pieces, the gear recolours their normal clothes instead (that already works).

There are 4 sets × 4 heroes = 16 outfits. Do **one ChatGPT chat per hero**; each chat returns one zip with all 4 of that hero's outfits (36 images).

## Steps (per hero)

1. Start a new ChatGPT chat. Upload that hero's **9 animation frames**, the same PNGs you sent me (for example `dex_walk1.png`, `dex_walk2.png`, `dex_attack1.png`, `dex_attack2.png`, `dex_jump.png`, `dex_kick.png`, `dex_hurt.png`, `dex_down.png`, `dex_special.png`).
2. Copy the prompt below. Change the first line to the hero's name (Dex, Rae, Benny or Julia), then send it.
3. Reply **continue** whenever it stops. When all 4 sheets are done, reply **make the zip**.
4. Send me the zip. Repeat for the next hero. Do as many heroes or sets as you like; anything you skip keeps the recolour look.

```
HERO: Dex   (change this to Rae, Benny or Julia)

You are making game art for my 90s beat-'em-up "Late Fees of the Dead". The 9 attached images are this hero's animation frames: walk1, walk2, attack1, attack2, jump, kick, hurt, down, special (the file names say which is which).

TASK: redraw this hero in 4 new OUTFITS. Each outfit is one sheet showing all 9 poses. Then slice the sheets and give me one zip.

RULES FOR EVERY SHEET:
- Same character: same face, hair, skin tone, body proportions, weapon/prop, and EXACTLY the same 9 poses as the attached frames. Change ONLY the clothes.
- Same art style as the attached frames: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours.
- Square image 1536x1536, a 3x3 grid, one pose per cell, in this order (left to right, top row first):
  row 1: walk1, walk2, attack1
  row 2: attack2, jump, kick
  row 3: hurt, down, special
- Every pose faces RIGHT, full body, fully inside its cell with empty space around it, feet near the bottom of the cell. Keep the character the same size in all 9 cells, as in the reference frames (a crouched or lying pose is smaller, not stretched).
- Plain flat solid white (#FFFFFF) background. No grid lines, no labels, no text, no shadows, no floor, no extra characters.
- Before each sheet write one line, for example "Sheet 2 - TOUR '94". Draw as many sheets per reply as you can, in order. If you must stop, say which sheet is next and continue exactly there when I say "continue". If a sheet has the wrong poses, wrong count or wrong order, redraw that sheet.

THE 4 OUTFITS (one sheet each, in this order):
Sheet 1 - NIGHT SHIFT: late-shift video store clerk. Teal employee visor with a rewind symbol, reading glasses, a teal rental-clerk vest with a name tag over their shirt, a huge ring of store keys clipped to the belt, a teal ring.
Sheet 2 - TOUR '94: grunge band on tour. Red-and-black flannel under a distressed denim jacket with a "TOUR '94" back patch, black ripped jeans with safety pins, beat-up black combat boots with red laces, a studded wristband.
Sheet 3 - SKATE CREW: 90s skate crew. A sticker-covered skate helmet, a black-and-hot-pink checkerboard hoodie, baggy checkerboard shorts, checkerboard skate shoes, knee pads.
Sheet 4 - MALL SECURITY: mall rent-a-cop. Mirrored cop sunglasses, a mustard security shirt with a navy badge patch, a navy duty belt with a flashlight and walkie-talkie, a chunky watch, a badge-shaped ring.

WHEN I SAY "make the zip" (use your Python tool):
- Cut each sheet into its 3x3 grid of equal cells.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0), then crop to the figure with 24 px padding.
- Name the files <hero>_<set>_<pose>.png in lowercase, with set = night, tour, skate or mall. For example: dex_night_walk1.png, dex_tour_attack2.png, dex_skate_down.png, dex_mall_special.png. That gives 36 files.
- Also include the 4 full sheets as sheet_night.png, sheet_tour.png, sheet_skate.png and sheet_mall.png.
- Zip everything as <hero>_outfits.zip and give me the download link. Tell me any pose you think came out wrong.
```

**If a sheet's poses drift** (different pose, missing weapon, facing left): reply *"Redraw sheet N; match the attached frames' poses exactly"*.

**When the zip reaches me:** I line up each outfit's frames the way I did your animation zips. As soon as a hero's outfit is in, wearing 3+ pieces of that set switches them to it everywhere: in game, in the character select screen, in the gear screen, and for other players online.
