# The Last Video Store: animation frame prompts

Use these in ChatGPT image generation to add animation frames for the illustrated sprites. The game already animates each character from its single image (bobbing walk, wind-up lean, strike lunge, hurt recoil, knockdown), so every frame here is optional. Make whichever ones you like and send them back; I'll cut them out, line up their feet, and register them in `art/manifest.js` under the names below.

## How to use

1. Start a new ChatGPT image chat for each character and attach that character's original image (the one already in the game) as the reference.
2. Paste the **style block** once, then one frame prompt at a time.
3. Save each result with the file name shown (for example `dex_walk1.png`).
4. Keep every frame of one character the same size and framing so the feet line up.

**Style block (paste first, every time):**

> Match the attached reference image exactly: same character, same outfit, same colors, same proportions, same thick black ink outlines and grainy 90s comic-book texture. Full body, side view facing RIGHT, whole figure in frame with the feet at the bottom edge and a little empty space around it. Transparent background (no glow, no shadow, no floor). Portrait canvas 1024x1536.

Frames the game uses, in order of how much they add: `attack2` (strike), `attack1` (wind-up), `walk1` and `walk2`, `hurt`, `down`, then `jump`, `kick` and `special` for heroes.

## Heroes (9 frames each)

### Dex

Reference: `art/dex.webp` (the image you sent).

- **`dex_walk1.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: mid-stride walking, left foot forward, CD player hanging from its cord at his side."
- **`dex_walk2.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: mid-stride walking, right foot forward, CD player hanging from its cord at his side."
- **`dex_attack1.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: winding up, CD player swung far back over his shoulder on its cord."
- **`dex_attack2.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: follow-through of a big swing, arm fully extended forward, CD player whipping out in front of him on its cord."
- **`dex_jump.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: in the air, knees tucked, CD player swinging on its cord."
- **`dex_kick.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: flying jump kick, front leg extended forward."
- **`dex_hurt.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: recoiling from a hit, head snapped back, eyes squeezed shut."
- **`dex_down.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: knocked flat on his back on the ground, lying horizontally, dazed."
- **`dex_special.png`**: "Same character: Dex, the video store clerk (white bowling shirt with teal panel, purple pants, white high-tops, a silver portable CD player on a long black cord). Pose: spinning in place with the CD player whirling around him on its cord (Rewind Spin)."

### Rae

Reference: `art/rae.webp` (the image you sent).

- **`rae_walk1.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: mid-stride walking, left foot forward, bass held low."
- **`rae_walk2.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: mid-stride walking, right foot forward, bass held low."
- **`rae_attack1.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: winding up, bass guitar lifted back over her shoulder like a club."
- **`rae_attack2.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: follow-through, bass guitar swung forward and down with full force."
- **`rae_jump.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: in the air, knees tucked, bass held up."
- **`rae_kick.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: flying jump kick with a combat boot extended forward."
- **`rae_hurt.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: recoiling from a hit, hair flying, wincing."
- **`rae_down.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: knocked flat on her back, lying horizontally, bass beside her."
- **`rae_special.png`**: "Same character: Rae, the grunge bassist (red-and-black flannel, black tank top, ripped teal jeans, black combat boots, pink hair, red bass guitar). Pose: strumming a huge power chord, head thrown back, sound shockwave rings bursting from the bass (Power Chord)."

### Benny

Reference: `art/benny.webp` (the image you sent).

- **`benny_walk1.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: mid-stride walking, left foot forward, pizza bag at his side."
- **`benny_walk2.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: mid-stride walking, right foot forward, pizza bag at his side."
- **`benny_attack1.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: winding up, pizza bag swung back behind him."
- **`benny_attack2.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: follow-through, pizza bag swung forward like a hammer."
- **`benny_jump.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: in the air, knees tucked, bag held up."
- **`benny_kick.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: flying jump kick with a sneaker extended forward."
- **`benny_hurt.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: recoiling from a hit, cap almost falling off."
- **`benny_down.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: knocked flat on his back, lying horizontally."
- **`benny_special.png`**: "Same character: Benny, the pizza delivery guy (backwards red cap, yellow work shirt with pizza patch, lime-green cargo shorts, teal fanny pack, white high-tops, red insulated pizza bag). Pose: hurling a spinning pizza box forward like a frisbee, throwing arm extended (Hot Delivery)."

### Julia

Reference: `art/julia.webp` (replace with the new Julia image when it is ready).

- **`julia_walk1.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: skating stride, left skate pushing out."
- **`julia_walk2.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: skating stride, right skate pushing out."
- **`julia_attack1.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: winding up a slapshot, hockey stick raised high behind her."
- **`julia_attack2.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: follow-through of a slapshot, stick swung forward and low."
- **`julia_jump.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: in the air, skates tucked, stick held across body."
- **`julia_kick.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: flying jump kick with a skate extended forward."
- **`julia_hurt.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: recoiling from a hit, losing balance on her skates."
- **`julia_down.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: knocked flat on her back, lying horizontally, skates in the air."
- **`julia_special.png`**: "Same character: Julia, the mall rollerblader (pink headband, teal jersey with pink/yellow/orange stripes, orange shorts, black knee pads, pink inline skates, wooden hockey stick). Pose: low crouched speed dash with the stick held forward like a lance, motion lines (Blade Rush)."

## Monsters (6 frames each)

### The shambler zombie

Reference: `art/sh.webp` (the image you sent).

- **`sh_walk1.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: mid-stride walking toward the right, left foot forward."
- **`sh_walk2.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: mid-stride walking toward the right, right foot forward."
- **`sh_attack1.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: winding up an attack, arms pulled back."
- **`sh_attack2.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: striking forward, arms fully extended."
- **`sh_hurt.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: recoiling from a hit, head snapped back."
- **`sh_down.png`**: "Same character: the Shambler zombie (green skin, torn orange polo with yellow stripes, brown pants, black loafers). Pose: knocked flat on its back, lying horizontally on the ground."

### The mummy

Reference: `art/mummy.webp` (the image you sent).

- **`mummy_walk1.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: mid-stride walking toward the right, left foot forward."
- **`mummy_walk2.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: mid-stride walking toward the right, right foot forward."
- **`mummy_attack1.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: winding up an attack, arms pulled back."
- **`mummy_attack2.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: striking forward, arms fully extended."
- **`mummy_hurt.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: recoiling from a hit, head snapped back."
- **`mummy_down.png`**: "Same character: the Mummy (wrapped in stained cream bandages, glowing yellow eyes). Pose: knocked flat on its back, lying horizontally on the ground."

### The werewolf in jeans

Reference: `art/wolf.webp` (the image you sent).

- **`wolf_walk1.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: mid-stride walking toward the right, left foot forward."
- **`wolf_walk2.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: mid-stride walking toward the right, right foot forward."
- **`wolf_attack1.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: crouched low, about to pounce."
- **`wolf_attack2.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: mid-pounce lunge forward, claws out, jaws open."
- **`wolf_hurt.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: recoiling from a hit, head snapped back."
- **`wolf_down.png`**: "Same character: the Werewolf in jeans (brown fur, torn pink shirt, ripped teal jeans, long claws). Pose: knocked flat on its back, lying horizontally on the ground."

### The pod person

Reference: `art/pod.webp` (the image you sent).

- **`pod_walk1.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: mid-stride walking toward the right, left foot forward."
- **`pod_walk2.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: mid-stride walking toward the right, right foot forward."
- **`pod_attack1.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: rearing back, cheeks puffed, about to spit."
- **`pod_attack2.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: spitting a glowing green slime glob forward."
- **`pod_hurt.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: recoiling from a hit, head snapped back."
- **`pod_down.png`**: "Same character: the Pod Person (pink alien head, brown suit, yellow tie). Pose: knocked flat on its back, lying horizontally on the ground."

### The chainsaw maniac

Reference: `art/chainsaw.webp` (the image you sent).

- **`chainsaw_walk1.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: mid-stride walking toward the right, left foot forward."
- **`chainsaw_walk2.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: mid-stride walking toward the right, right foot forward."
- **`chainsaw_attack1.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: revving the chainsaw, smoke puffing from the engine."
- **`chainsaw_attack2.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: charging forward with the chainsaw thrust out in front."
- **`chainsaw_hurt.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: recoiling from a hit, head snapped back."
- **`chainsaw_down.png`**: "Same character: the Chainsaw Maniac (pale mask, red buffalo-plaid shirt, teal cargo pants, yellow chainsaw). Pose: knocked flat on its back, lying horizontally on the ground."

### The arcade gremlin

Reference: `art/gremlin.webp` (the image you sent).

- **`gremlin_walk1.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: mid-stride walking toward the right, left foot forward."
- **`gremlin_walk2.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: mid-stride walking toward the right, right foot forward."
- **`gremlin_attack1.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: crouched to pounce, grinning."
- **`gremlin_attack2.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: mid-air pounce, claws and joystick forward."
- **`gremlin_hurt.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: recoiling from a hit, head snapped back."
- **`gremlin_down.png`**: "Same character: the Arcade Gremlin (teal spotted lizard-gremlin, orange zigzag windbreaker, purple shorts, yellow high-tops, joystick and coins). Pose: knocked flat on its back, lying horizontally on the ground."

### The tape wraith

Reference: `art/tape.webp` (the image you sent).

- **`tape_walk1.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: floating, tape ribbons swirling left."
- **`tape_walk2.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: floating, tape ribbons swirling right."
- **`tape_attack1.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: tape tendrils pulled back, coiled to strike."
- **`tape_attack2.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: tape tendrils lashing forward like whips."
- **`tape_hurt.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: recoiling from a hit, head snapped back."
- **`tape_down.png`**: "Same character: the Tape Wraith (haunted VHS cassette body with a skull face and a tangle of brown magnetic tape). Pose: knocked flat on its back, lying horizontally on the ground."

### The fry cook zombie

Reference: `art/cook.webp` (the image you sent).

- **`cook_walk1.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: mid-stride walking toward the right, left foot forward."
- **`cook_walk2.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: mid-stride walking toward the right, right foot forward."
- **`cook_attack1.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: spatula raised high, tray held up as a shield."
- **`cook_attack2.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: spatula slammed forward and down."
- **`cook_hurt.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: recoiling from a hit, head snapped back."
- **`cook_down.png`**: "Same character: the Fry Cook zombie (paper hat, red shirt, stained yellow apron, checkered pants, spatula and food tray). Pose: knocked flat on its back, lying horizontally on the ground."

### The mall cop zombie

Reference: `art/cop.webp` (the image you sent).

- **`cop_walk1.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: mid-stride walking toward the right, left foot forward."
- **`cop_walk2.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: mid-stride walking toward the right, right foot forward."
- **`cop_attack1.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: baton raised overhead."
- **`cop_attack2.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: baton swung down in a heavy strike."
- **`cop_hurt.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: recoiling from a hit, head snapped back."
- **`cop_down.png`**: "Same character: the Mall Cop zombie (navy cap, tan shirt, gold tie, aviator glasses, baton and flashlight). Pose: knocked flat on its back, lying horizontally on the ground."

## Boss (7 frames)

### The blob from aisle 9

Reference: `art/blob.webp` (the image you sent).

- **`blob_walk1.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: oozing forward, body leaning right."
- **`blob_walk2.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: oozing forward, body squashed down and wider."
- **`blob_attack1.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: mouth gaping wide, about to spray green slime."
- **`blob_attack2.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: spraying a stream of green slime forward."
- **`blob_special.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: stretched tall and rising up, about to body-slam."
- **`blob_hurt.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: recoiling, eyes squeezed shut, jiggling."
- **`blob_down.png`**: "Same character: the Blob from Aisle 9 (giant pink slime monster with many eyeballs, green drool, a shopping cart stuck in it, small teal cap). Pose: melting into a puddle, defeated."

## Neighbors to rescue (1 image each, plus an optional cheer)

These are still simple pixel figures and stand out next to the new art. One image each brings them up to match.

- **`surv_grill_dad.png`**: "New character in the same style: Grill Dad, a bald suburban dad in a white apron holding a spatula, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_grill_dad_cheer.png`** (optional): "Same character: Grill Dad, jumping and cheering, saved."
- **`surv_paper_kid.png`**: "New character in the same style: Paper Route Kid, a kid in a red cap and teal shirt with a paper bag, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_paper_kid_cheer.png`** (optional): "Same character: Paper Route Kid, jumping and cheering, saved."
- **`surv_aerobics_mom.png`**: "New character in the same style: Aerobics Mom, a big-haired mom in a pink leotard and teal leg warmers, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_aerobics_mom_cheer.png`** (optional): "Same character: Aerobics Mom, jumping and cheering, saved."
- **`surv_food_court_teen.png`**: "New character in the same style: Food Court Teen, a teen in a red uniform and yellow paper hat, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_food_court_teen_cheer.png`** (optional): "Same character: Food Court Teen, jumping and cheering, saved."
- **`surv_arcade_champ.png`**: "New character in the same style: Arcade Champ, a kid in an orange tee clutching a fistful of tokens, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_arcade_champ_cheer.png`** (optional): "Same character: Arcade Champ, jumping and cheering, saved."
- **`surv_night_guard.png`**: "New character in the same style: Night Guard, a tired security guard in a brown uniform and yellow cap, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_night_guard_cheer.png`** (optional): "Same character: Night Guard, jumping and cheering, saved."
- **`surv_mall_walker.png`**: "New character in the same style: Mall Walker, a white-haired lady in a pink tracksuit and lime sneakers, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_mall_walker_cheer.png`** (optional): "Same character: Mall Walker, jumping and cheering, saved."
- **`surv_cart_wrangler.png`**: "New character in the same style: Cart Wrangler, a teen in an orange vest pushing a shopping cart, waving both arms for help, scared. Full body, facing the viewer."
- **`surv_cart_wrangler_cheer.png`** (optional): "Same character: Cart Wrangler, jumping and cheering, saved."

## Counts

Heroes 36, monsters 54, boss 7, neighbors 8 (16 with cheers). Start with `attack1`/`attack2` for the four heroes; those make the biggest difference to how hits feel.
