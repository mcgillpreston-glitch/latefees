# Master prompts: the 270 item icons (3 ChatGPT chats)

Every piece of gear is still a coloured shape drawn by the game. This art gives each of the 270 items its own icon: in the gear bag, on the ground when it drops, in the loot messages and on the phone's gear LCD. The item list, colours and rarities below are generated from the game's own data, so they match exactly.

| Chat | Items | Sheets | Zip |
|---|---|---|---|
| A | Hats and glasses (60): the most visible slots; do these first | 10 | `items_a.zip` |
| B | Shirts, jackets, pants and shoes (120): their colours already tint the heroes; this adds their icons | 20 | `items_b.zip` |
| C | Belts, bracelets and rings (90): icons only | 15 | `items_c.zip` |

**Every chat works the same way:**
1. Start a new ChatGPT chat and upload the 4 hero images `art/dex.webp`, `rae.webp`, `benny.webp`, `julia.webp` (style reference only).
2. Copy everything inside that chat's box and send it as one message.
3. Each time it stops, reply **continue**. It usually draws a few sheets per reply.
4. When it says all sheets are done, reply **make the zip**, download it and send it to me.

**Why sheets here, when the characters went to one pose per image:** icons are small and compact, so six fit on a sheet with plenty of room, and each still comes out around 300 px, several times what the game needs. The rules below keep every item well inside its cell, which is what went wrong with the character grids.

**If something comes out wrong:** "Redraw sheet N" (wrong order, wrong count, items touching), or "Redraw sheet N, item M: wrong colour / wrong angle".

**When a zip reaches me:** I add the icon loader the game doesn't have yet, clean each cut-out (white pockets, stray specks), size each category to one scale, and every item switches from its drawn shape to its icon. Anything you haven't sent yet keeps its drawn shape.

---

## Chat A: Hats and glasses

```
You are producing game art for my 90s beat-'em-up "The Last Video Store". The 4 attached images are the heroes. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Do NOT draw the heroes.

TASK: draw the 60 items listed at the bottom (HAT, GLASSES) as 10 grid sheets of 6, then cut them out and give me one zip.

SHEET RULES (every sheet):
- Landscape 1536x1024, a 3-column x 2-row grid of equal cells = 6 items per sheet, read left to right, top row first.
- Sheet order: HAT (sheets 1-5), GLASSES (sheets 6-10). Items 0-5 on the first sheet of a slot, 6-11 on the second, and so on.
- Exactly ONE item per cell, centred, fitting inside a circle 60% of the cell's width. Wide empty margins all round: nothing touches or crosses into a neighbouring cell or the image edge.
- Plain flat solid white (#FFFFFF) background. No grid lines, no labels, no text, no hands, no people, no mannequins, no shadows, no floor, no sparkles or effects outside the item.
- Every item has an unbroken thick black outline all the way round, so it separates cleanly from the white. Holes in an item (a ring's band, a bracelet, glasses frames, a belt loop) may show the white through.
- Same scale for every item of one slot, as if sized for the same person. Rings and bracelets are drawn big (filling that 60% circle) so they read as icons.
- The colour in brackets is the item's MAIN colour and must dominate it; the hex code is the exact shade the game uses for that item.
- Plain item = everyday 90s thrift-store version. [R] = rare: one fun extra detail. [U] = ultra rare: legendary, over-the-top campy version. [S <set>] = a set piece: Night Shift (late-shift video store clerk: teal, rewind symbols, name tags, store keys), Tour '94 (grunge tour merch: red and black flannel, distressed denim, safety pins), Skate Crew (hot pink and black checkerboard, stickers), Mall Security (mustard and navy, badges, rent-a-cop gear).

VIEW FOR EACH SLOT (same angle for every item in the slot):
- HAT: strict side view facing RIGHT, exactly as worn on the head of a character facing right: opening at the bottom, brim or front pointing right.
- GLASSES: side view facing RIGHT, as worn: lens at the right, the arm running back to the left.

WORKING:
- Before each sheet write one line naming it and its six items, for example "Sheet 2 - HAT 6-11: ...". Then draw it.
- Draw as many sheets per reply as you can, in order. When you must stop, say which sheet is next; when I say "continue", pick up exactly there. Never skip or reorder items.
- If a sheet breaks a rule (wrong count, wrong order, items touching or cut off, wrong angle), redraw that same sheet before moving on.

WHEN I SAY "make the zip" (use your Python tool):
- Load every sheet in order and cut each into its 3x2 grid of equal cells.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0). Keep only the item: drop any small separate scraps near the cell edges. Crop to the item with 24 px padding.
- Save each as item_<slot>_<index>.png with the lowercase slot name and the index from the list (item_hat_0.png ... ). That gives 60 files.
- Also save the original sheets as sheets/sheet_01.png ... sheets/sheet_10.png.
- Zip everything as items_a.zip, give me the download link, and list any item you think came out wrong.

ITEM LIST (index=name (main colour, hex) [rarity]):
HAT (sheets 1-5): 0=Backwards Cap (red #e8453c); 1=Bucket Hat (orange #ff9a3c); 2=Trucker Cap (tan #a0623a); 3=Beanie (teal #1f9e8e); 4=Visor (brown #7a4a2e); 5=Snapback (dark brown #4a2418); 6=Painter's Cap (mustard #ffc93c); 7=Newsboy Cap (cream #ffe9c2); 8=Fishing Hat (coral #f08a5a); 9=Headband (aqua #3ad6c0); 10=Bandana (lime #c8f05a); 11=Earflap Hat (burnt orange #d9771e); 12=Paper Crown (raspberry #b8426a); 13=Hard Hat (hot pink #ff5fa8); 14=Sweatband (red #e8453c); 15=Golf Cap (orange #ff9a3c); 16=Foam Visor (tan #a0623a); 17=Propeller Beanie (teal #1f9e8e) [R]; 18=Fry Cook Hat (brown #7a4a2e) [R]; 19=Lifeguard Visor (dark brown #4a2418) [R]; 20=Raver Bucket Hat (mustard #ffc93c) [R]; 21=Rodeo Hat (cream #ffe9c2) [R]; 22=Slime-Dipped Cap (coral #f08a5a) [R]; 23=Neon Snapback (aqua #3ad6c0) [R]; 24=Grandpa's Fedora (lime #c8f05a) [R]; 25=Prom King Crown (gold #ffcf4a) [U]; 26=Meteor Shard Helm (lime #c8f05a) [U]; 27=Arcade Legend Cap (purple #c77dff) [U]; 28=Night Shift Visor (teal #1f9e8e) [S Night Shift]; 29=Skate Crew Lid (hot pink #ff5fa8) [S Skate Crew]
GLASSES (sheets 6-10): 0=Shades (aqua #3ad6c0); 1=Aviators (lime #c8f05a); 2=Nerd Specs (burnt orange #d9771e); 3=Safety Goggles (raspberry #b8426a); 4=Swim Goggles (hot pink #ff5fa8); 5=Clip-Ons (red #e8453c); 6=Reading Glasses (orange #ff9a3c); 7=Round Specs (tan #a0623a); 8=Wraparounds (teal #1f9e8e); 9=Sport Shades (brown #7a4a2e); 10=3D Glasses (dark brown #4a2418); 11=Tinted Lenses (mustard #ffc93c); 12=Cat-Eye Frames (cream #ffe9c2); 13=Gas Station Shades (coral #f08a5a); 14=Snow Goggles (aqua #3ad6c0); 15=Monocle (lime #c8f05a); 16=Lab Goggles (burnt orange #d9771e); 17=Laser Eye Shades (raspberry #b8426a) [R]; 18=Mirror Aviators (hot pink #ff5fa8) [R]; 19=X-Ray Specs (red #e8453c) [R]; 20=Slap-Wrap Shades (orange #ff9a3c) [R]; 21=Blacklight Goggles (tan #a0623a) [R]; 22=Neon Squares (teal #1f9e8e) [R]; 23=Night Vision Goggles (brown #7a4a2e) [R]; 24=Hypno Specs (dark brown #4a2418) [R]; 25=Third Eye Visor (gold #ffcf4a) [U]; 26=Moonbeam Lenses (lime #c8f05a) [U]; 27=Blob-Proof Goggles (purple #c77dff) [U]; 28=Rewind Readers (teal #1f9e8e) [S Night Shift]; 29=Mall Cop Mirrors (mustard #ffc93c) [S Mall Security]
```

---

## Chat B: Shirts, jackets, pants and shoes

```
You are producing game art for my 90s beat-'em-up "The Last Video Store". The 4 attached images are the heroes. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Do NOT draw the heroes.

TASK: draw the 120 items listed at the bottom (SHIRT, JACKET, PANTS, SHOES) as 20 grid sheets of 6, then cut them out and give me one zip.

SHEET RULES (every sheet):
- Landscape 1536x1024, a 3-column x 2-row grid of equal cells = 6 items per sheet, read left to right, top row first.
- Sheet order: SHIRT (sheets 1-5), JACKET (sheets 6-10), PANTS (sheets 11-15), SHOES (sheets 16-20). Items 0-5 on the first sheet of a slot, 6-11 on the second, and so on.
- Exactly ONE item per cell, centred, fitting inside a circle 60% of the cell's width. Wide empty margins all round: nothing touches or crosses into a neighbouring cell or the image edge.
- Plain flat solid white (#FFFFFF) background. No grid lines, no labels, no text, no hands, no people, no mannequins, no shadows, no floor, no sparkles or effects outside the item.
- Every item has an unbroken thick black outline all the way round, so it separates cleanly from the white. Holes in an item (a ring's band, a bracelet, glasses frames, a belt loop) may show the white through.
- Same scale for every item of one slot, as if sized for the same person. Rings and bracelets are drawn big (filling that 60% circle) so they read as icons.
- The colour in brackets is the item's MAIN colour and must dominate it; the hex code is the exact shade the game uses for that item.
- Plain item = everyday 90s thrift-store version. [R] = rare: one fun extra detail. [U] = ultra rare: legendary, over-the-top campy version. [S <set>] = a set piece: Night Shift (late-shift video store clerk: teal, rewind symbols, name tags, store keys), Tour '94 (grunge tour merch: red and black flannel, distressed denim, safety pins), Skate Crew (hot pink and black checkerboard, stickers), Mall Security (mustard and navy, badges, rent-a-cop gear).

VIEW FOR EACH SLOT (same angle for every item in the slot):
- SHIRT: front view laid flat, collar at the top, sleeves out to the sides, nothing inside it.
- JACKET: front view laid flat, open or zipped as the item suggests, sleeves out to the sides.
- PANTS: front view laid flat, waistband at the top, both legs straight down.
- SHOES: ONE shoe only, side view, toe pointing RIGHT, sole at the bottom.

WORKING:
- Before each sheet write one line naming it and its six items, for example "Sheet 2 - SHIRT 6-11: ...". Then draw it.
- Draw as many sheets per reply as you can, in order. When you must stop, say which sheet is next; when I say "continue", pick up exactly there. Never skip or reorder items.
- If a sheet breaks a rule (wrong count, wrong order, items touching or cut off, wrong angle), redraw that same sheet before moving on.

WHEN I SAY "make the zip" (use your Python tool):
- Load every sheet in order and cut each into its 3x2 grid of equal cells.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0). Keep only the item: drop any small separate scraps near the cell edges. Crop to the item with 24 px padding.
- Save each as item_<slot>_<index>.png with the lowercase slot name and the index from the list (item_shirt_0.png ... ). That gives 120 files.
- Also save the original sheets as sheets/sheet_01.png ... sheets/sheet_20.png.
- Zip everything as items_b.zip, give me the download link, and list any item you think came out wrong.

ITEM LIST (index=name (main colour, hex) [rarity]):
SHIRT (sheets 1-5): 0=Plain Tee (brown #7a4a2e); 1=Band Tee (dark brown #4a2418); 2=Flannel (mustard #ffc93c); 3=Polo (cream #ffe9c2); 4=Tank Top (coral #f08a5a); 5=Ringer Tee (aqua #3ad6c0); 6=Henley (lime #c8f05a); 7=Hawaiian Shirt (burnt orange #d9771e); 8=Rugby Shirt (raspberry #b8426a); 9=Thermal (hot pink #ff5fa8); 10=Bowling Shirt (red #e8453c); 11=Tie-Dye Tee (orange #ff9a3c); 12=Jersey (tan #a0623a); 13=Turtleneck (teal #1f9e8e); 14=Pocket Tee (brown #7a4a2e); 15=Work Shirt (dark brown #4a2418); 16=Mesh Tank (mustard #ffc93c); 17=Glow-Paint Tee (cream #ffe9c2) [R]; 18=Bootleg Concert Tee (coral #f08a5a) [R]; 19=Heat-Shift Tee (aqua #3ad6c0) [R]; 20=Pizza Grease Tee (lime #c8f05a) [R]; 21=Varsity Jersey (burnt orange #d9771e) [R]; 22=Rave Tee (raspberry #b8426a) [R]; 23=Lucky Bowling Shirt (hot pink #ff5fa8) [R]; 24=Wrestling Tee (red #e8453c) [R]; 25=Tee Of Infinite Merch (gold #ffcf4a) [U]; 26=Meteor-Dyed Shirt (lime #c8f05a) [U]; 27=Signed Tour Shirt (purple #c77dff) [U]; 28=Rental Clerk Vest (teal #1f9e8e) [S Night Shift]; 29=Tour '94 Flannel (red #e8453c) [S Tour '94]
JACKET (sheets 6-10): 0=Denim Jacket (hot pink #ff5fa8); 1=Windbreaker (red #e8453c); 2=Bomber (orange #ff9a3c); 3=Varsity Jacket (tan #a0623a); 4=Hoodie (teal #1f9e8e); 5=Fleece (brown #7a4a2e); 6=Puffer (dark brown #4a2418); 7=Track Jacket (mustard #ffc93c); 8=Rain Slicker (cream #ffe9c2); 9=Corduroy Jacket (coral #f08a5a); 10=Team Jacket (aqua #3ad6c0); 11=Army Jacket (lime #c8f05a); 12=Leather Jacket (burnt orange #d9771e); 13=Cardigan (raspberry #b8426a); 14=Zip Hoodie (hot pink #ff5fa8); 15=Overshirt (red #e8453c); 16=Puffy Vest (orange #ff9a3c); 17=Glow Windbreaker (tan #a0623a) [R]; 18=Studded Leather (teal #1f9e8e) [R]; 19=Eight-Ball Jacket (brown #7a4a2e) [R]; 20=Reflective Vest (dark brown #4a2418) [R]; 21=Satin Tour Jacket (mustard #ffc93c) [R]; 22=Arcade Jacket (cream #ffe9c2) [R]; 23=Camo Parka (coral #f08a5a) [R]; 24=Patchwork Denim (aqua #3ad6c0) [R]; 25=Coat Of 1000 Pins (gold #ffcf4a) [U]; 26=Meteor Shard Parka (lime #c8f05a) [U]; 27=Prom Night Tux Coat (purple #c77dff) [U]; 28=Tour '94 Denim (red #e8453c) [S Tour '94]; 29=Skate Crew Hoodie (hot pink #ff5fa8) [S Skate Crew]
PANTS (sheets 11-15): 0=Jeans (teal #1f9e8e); 1=Cargo Shorts (brown #7a4a2e); 2=Sweatpants (dark brown #4a2418); 3=Khakis (mustard #ffc93c); 4=Track Pants (cream #ffe9c2); 5=Overalls (coral #f08a5a); 6=Corduroys (aqua #3ad6c0); 7=Board Shorts (lime #c8f05a); 8=Carpenter Jeans (burnt orange #d9771e); 9=Parachute Pants (raspberry #b8426a); 10=Bike Shorts (hot pink #ff5fa8); 11=Zip-Off Pants (red #e8453c); 12=Gym Shorts (orange #ff9a3c); 13=Painter Pants (tan #a0623a); 14=Stonewash Jeans (teal #1f9e8e); 15=Flannel Pjs (brown #7a4a2e); 16=Camo Pants (dark brown #4a2418); 17=Ripped Jeans (mustard #ffc93c) [R]; 18=Phat Raver Pants (cream #ffe9c2) [R]; 19=Glow Joggers (coral #f08a5a) [R]; 20=Patch Jeans (aqua #3ad6c0) [R]; 21=Genie Pants (lime #c8f05a) [R]; 22=Zip-Leg Jeans (burnt orange #d9771e) [R]; 23=Snap Pants (raspberry #b8426a) [R]; 24=Sweat-Proof Shorts (hot pink #ff5fa8) [R]; 25=Pants Of Holding (gold #ffcf4a) [U]; 26=Meteor-Washed Jeans (lime #c8f05a) [U]; 27=Legendary Overalls (purple #c77dff) [U]; 28=Tour '94 Jeans (red #e8453c) [S Tour '94]; 29=Skate Crew Shorts (hot pink #ff5fa8) [S Skate Crew]
SHOES (sheets 16-20): 0=Sneakers (raspberry #b8426a); 1=High-Tops (hot pink #ff5fa8); 2=Skate Shoes (red #e8453c); 3=Combat Boots (orange #ff9a3c); 4=Loafers (tan #a0623a); 5=Sandals (teal #1f9e8e); 6=Flip-Flops (brown #7a4a2e); 7=Hiking Boots (dark brown #4a2418); 8=Jelly Shoes (mustard #ffc93c); 9=Slip-Ons (cream #ffe9c2); 10=Running Shoes (coral #f08a5a); 11=Moon Boots (aqua #3ad6c0); 12=Work Boots (lime #c8f05a); 13=Canvas Low-Tops (burnt orange #d9771e); 14=Cowboy Boots (raspberry #b8426a); 15=Platform Shoes (hot pink #ff5fa8); 16=Bowling Shoes (red #e8453c); 17=Light-Up Sneakers (orange #ff9a3c) [R]; 18=Pump-Up Kicks (tan #a0623a) [R]; 19=Inline Skates (teal #1f9e8e) [R]; 20=Steel-Toe Boots (brown #7a4a2e) [R]; 21=Velcro Kicks (dark brown #4a2418) [R]; 22=Turbo Runners (mustard #ffc93c) [R]; 23=Wheel Heels (cream #ffe9c2) [R]; 24=Spring Shoes (coral #f08a5a) [R]; 25=Rocket Boots (gold #ffcf4a) [U]; 26=Kicks Of The Meteor (lime #c8f05a) [U]; 27=Golden High-Tops (purple #c77dff) [U]; 28=Tour '94 Boots (red #e8453c) [S Tour '94]; 29=Skate Crew Kicks (hot pink #ff5fa8) [S Skate Crew]
```

---

## Chat C: Belts, bracelets and rings

```
You are producing game art for my 90s beat-'em-up "The Last Video Store". The 4 attached images are the heroes. Use them ONLY as the art-style reference: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Do NOT draw the heroes.

TASK: draw the 90 items listed at the bottom (BELT, BRACELET, RING) as 15 grid sheets of 6, then cut them out and give me one zip.

SHEET RULES (every sheet):
- Landscape 1536x1024, a 3-column x 2-row grid of equal cells = 6 items per sheet, read left to right, top row first.
- Sheet order: BELT (sheets 1-5), BRACELET (sheets 6-10), RING (sheets 11-15). Items 0-5 on the first sheet of a slot, 6-11 on the second, and so on.
- Exactly ONE item per cell, centred, fitting inside a circle 60% of the cell's width. Wide empty margins all round: nothing touches or crosses into a neighbouring cell or the image edge.
- Plain flat solid white (#FFFFFF) background. No grid lines, no labels, no text, no hands, no people, no mannequins, no shadows, no floor, no sparkles or effects outside the item.
- Every item has an unbroken thick black outline all the way round, so it separates cleanly from the white. Holes in an item (a ring's band, a bracelet, glasses frames, a belt loop) may show the white through.
- Same scale for every item of one slot, as if sized for the same person. Rings and bracelets are drawn big (filling that 60% circle) so they read as icons.
- The colour in brackets is the item's MAIN colour and must dominate it; the hex code is the exact shade the game uses for that item.
- Plain item = everyday 90s thrift-store version. [R] = rare: one fun extra detail. [U] = ultra rare: legendary, over-the-top campy version. [S <set>] = a set piece: Night Shift (late-shift video store clerk: teal, rewind symbols, name tags, store keys), Tour '94 (grunge tour merch: red and black flannel, distressed denim, safety pins), Skate Crew (hot pink and black checkerboard, stickers), Mall Security (mustard and navy, badges, rent-a-cop gear).

VIEW FOR EACH SLOT (same angle for every item in the slot):
- BELT: front view, buckle in the centre, the strap curled in a loose loop around it.
- BRACELET: three-quarter view from slightly above, its decorated face toward the viewer.
- RING: three-quarter view from slightly above, the stone or top facing the viewer.

WORKING:
- Before each sheet write one line naming it and its six items, for example "Sheet 2 - BELT 6-11: ...". Then draw it.
- Draw as many sheets per reply as you can, in order. When you must stop, say which sheet is next; when I say "continue", pick up exactly there. Never skip or reorder items.
- If a sheet breaks a rule (wrong count, wrong order, items touching or cut off, wrong angle), redraw that same sheet before moving on.

WHEN I SAY "make the zip" (use your Python tool):
- Load every sheet in order and cut each into its 3x2 grid of equal cells.
- In each cell make the white background transparent (near-white pixels connected to the cell edges become alpha 0). Keep only the item: drop any small separate scraps near the cell edges. Crop to the item with 24 px padding.
- Save each as item_<slot>_<index>.png with the lowercase slot name and the index from the list (item_belt_0.png ... ). That gives 90 files.
- Also save the original sheets as sheets/sheet_01.png ... sheets/sheet_15.png.
- Zip everything as items_c.zip, give me the download link, and list any item you think came out wrong.

ITEM LIST (index=name (main colour, hex) [rarity]):
BELT (sheets 1-5): 0=Leather Belt (coral #f08a5a); 1=Web Belt (aqua #3ad6c0); 2=Braided Belt (lime #c8f05a); 3=Canvas Belt (burnt orange #d9771e); 4=Studded Belt (raspberry #b8426a); 5=Fanny Pack (hot pink #ff5fa8); 6=Tool Belt (red #e8453c); 7=Chain Belt (orange #ff9a3c); 8=Rope Belt (tan #a0623a); 9=Bike Chain Belt (teal #1f9e8e); 10=Elastic Belt (brown #7a4a2e); 11=Weight Belt (dark brown #4a2418); 12=Wallet Chain (mustard #ffc93c); 13=Suspenders (cream #ffe9c2); 14=Snap Belt (coral #f08a5a); 15=Rodeo Buckle (aqua #3ad6c0); 16=Ribbon Belt (lime #c8f05a); 17=Pager Holster (burnt orange #d9771e) [R]; 18=Glow Belt (raspberry #b8426a) [R]; 19=Lucky Buckle (hot pink #ff5fa8) [R]; 20=Champion Buckle (red #e8453c) [R]; 21=Utility Belt (orange #ff9a3c) [R]; 22=Bandolier Of Pogs (tan #a0623a) [R]; 23=Walkman Clip (teal #1f9e8e) [R]; 24=Arcade Coin Belt (brown #7a4a2e) [R]; 25=Belt Of The Blob (gold #ffcf4a) [U]; 26=Title Belt (lime #c8f05a) [U]; 27=Infinite Pocket Pack (purple #c77dff) [U]; 28=Night Shift Keychain (teal #1f9e8e) [S Night Shift]; 29=Mall Cop Duty Belt (mustard #ffc93c) [S Mall Security]
BRACELET (sheets 6-10): 0=Slap Bracelet (cream #ffe9c2); 1=Friendship Band (coral #f08a5a); 2=Wrist Sweatband (aqua #3ad6c0); 3=Digital Watch (lime #c8f05a); 4=Rubber Band (burnt orange #d9771e); 5=Hemp Bracelet (raspberry #b8426a); 6=Bead Bracelet (hot pink #ff5fa8); 7=Bangle (red #e8453c); 8=Charm Bracelet (orange #ff9a3c); 9=Wristband (tan #a0623a); 10=Id Bracelet (teal #1f9e8e); 11=Mood Band (brown #7a4a2e); 12=Leather Cuff (dark brown #4a2418); 13=Chain Bracelet (mustard #ffc93c); 14=Shell Bracelet (cream #ffe9c2); 15=Hair Tie (coral #f08a5a); 16=Glow Stick Band (aqua #3ad6c0); 17=Calculator Watch (lime #c8f05a) [R]; 18=Spiked Cuff (burnt orange #d9771e) [R]; 19=Color-Change Band (raspberry #b8426a) [R]; 20=Lucky Charm Chain (hot pink #ff5fa8) [R]; 21=Virtual Pet Strap (red #e8453c) [R]; 22=Power Band (orange #ff9a3c) [R]; 23=Pager Strap (tan #a0623a) [R]; 24=Glow Cuff (teal #1f9e8e) [R]; 25=Bangle Of Rewind (gold #ffcf4a) [U]; 26=Meteor Charm (lime #c8f05a) [U]; 27=Gauntlet Of Pogs (purple #c77dff) [U]; 28=Tour '94 Wristband (red #e8453c) [S Tour '94]; 29=Mall Cop Watch (mustard #ffc93c) [S Mall Security]
RING (sheets 11-15): 0=Mood Ring (tan #a0623a); 1=Class Ring (teal #1f9e8e); 2=Plastic Ring (brown #7a4a2e); 3=Silver Band (dark brown #4a2418); 4=Spoon Ring (mustard #ffc93c); 5=Toe Ring (cream #ffe9c2); 6=Candy Ring (coral #f08a5a); 7=Puzzle Ring (aqua #3ad6c0); 8=Skull Ring (lime #c8f05a); 9=Heart Ring (burnt orange #d9771e); 10=Turquoise Ring (raspberry #b8426a); 11=Pinky Ring (hot pink #ff5fa8); 12=Signet Ring (red #e8453c); 13=Washer Ring (orange #ff9a3c); 14=Bubblegum Ring (tan #a0623a); 15=Pop-Tab Ring (teal #1f9e8e); 16=Cereal Box Ring (brown #7a4a2e); 17=Decoder Ring (dark brown #4a2418) [R]; 18=Glow Ring (mustard #ffc93c) [R]; 19=Lucky Dice Ring (cream #ffe9c2) [R]; 20=Championship Ring (coral #f08a5a) [R]; 21=Pizza Ring (aqua #3ad6c0) [R]; 22=Spider Ring (lime #c8f05a) [R]; 23=Smiley Ring (burnt orange #d9771e) [R]; 24=Opal Ring (raspberry #b8426a) [R]; 25=Ring Of The Late Fee (gold #ffcf4a) [U]; 26=Meteor Signet (lime #c8f05a) [U]; 27=Prom Queen Ring (purple #c77dff) [U]; 28=Night Shift Ring (teal #1f9e8e) [S Night Shift]; 29=Mall Cop Badge Ring (mustard #ffc93c) [S Mall Security]
```

