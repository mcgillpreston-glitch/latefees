# The Last Video Store: gear art handoff (270 items)

## How the art turns into a different look in the game

Drawing each hero separately for every item and every animation frame would take 270 items × 4 heroes × 9 frames, about **9,700 images**. It also wouldn't work: players mix and match 9 slots, so a picture of Dex in one jacket can't combine with a picture of him in a particular hat. Instead, **each item is drawn once**, and the game puts it on whichever hero is wearing it, frame by frame:

| Slot | What the art is used for | How it shows on the hero in every frame |
|---|---|---|
| **Hats, Glasses** (60) | Bag icon, loot drop, **and the worn piece itself** | Drawn on the hero's head, following the head through walk, attack, jump, hurt and knockdown. |
| **Shirts, Jackets, Pants, Shoes** (120) | Bag icon and loot drop | The hero's own shirt, jacket, pants or shoes are recoloured to the item's colours, using the item art as the colour source. |
| **Belts, Bracelets, Rings** (90) | Bag icon and loot drop | Too small to read on a 50-pixel-tall hero, so they show as a small sparkle on the waist or hand when equipped. |
| **Full sets** (optional, Part 3) | A full unique outfit per hero | Wearing every piece of a set swaps the hero to a hand-drawn outfit version of all 9 animation frames. |

So the minimum handoff is **270 images, one per item**. Part 3 is optional: unique per-hero outfits for completed sets.

## How to use

1. Start a ChatGPT image chat. Attach **one hero image** from `art/` (any hero) as a **style reference only**.
2. Paste the **style block** for that slot group once.
3. Then paste one **prompt line** from the tables at a time, and save each result under its **File** name.
4. Send the images back in a zip (any number at a time). I'll cut them out, size them and wire them in. Items without art keep their current drawn icons.

**Faster option:** paste 4 prompt lines at once and add *"Make a 2x2 grid, one item per cell, with lots of empty space between them, in this order."* Then name the sheet after the first item. I can split the grids apart.

### Style block A: Hats and Glasses (they get worn on the head, so the angle matters)

> Match the art style of the attached reference exactly: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Draw ONLY the item, with nobody wearing it, in a strict **side view facing RIGHT**, exactly as it would sit on the head of a character facing right. Hats: the opening at the bottom, the brim or front pointing right. Glasses: seen from the side, the lens at the right and the arm going back to the left. Centred, filling about 70% of the canvas. Transparent background (no glow, no shadow, no floor, no text). Square canvas 1024x1024.

### Style block B: Shirts, Jackets, Pants, Shoes, Belts, Bracelets, Rings

> Match the art style of the attached reference exactly: thick black ink outlines, grainy 90s comic-book print texture, warm saturated campy colours. Draw ONLY the item as a single **product shot** (clothing laid flat or on an invisible mannequin, shoes as a pair seen from the side facing right, jewellery at a 3/4 angle and large). Show its main colour clearly and keep it as the dominant colour. Centred, filling about 75% of the canvas. Transparent background (no glow, no shadow, no floor, no hands, no text unless the prompt asks for a print). Square canvas 1024x1024.

**Rarity guide (already written into every line):** Commons are plain thrift-store pieces. Rares have one fun extra detail. Ultra rares are over-the-top and legendary. Set pieces share their set's look:
- **Night Shift:** video-store clerk, teal, rewind symbols.
- **Tour '94:** grunge tour merch, red and black.
- **Skate Crew:** hot pink and black, checkerboard.
- **Mall Security:** mustard and navy, badges.

## Part 1 and 2: The 270 items

Hats and Glasses use **style block A**; everything else uses **style block B**.

### Hats (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_hat0.png` | Backwards Cap | Common | "Backwards Cap": a backwards cap, mainly tomato red; an everyday 90s thrift-store item. |
| 2 | `item_hat1.png` | Bucket Hat | Common | "Bucket Hat": a bucket hat, mainly orange; an everyday 90s thrift-store item. |
| 3 | `item_hat2.png` | Trucker Cap | Common | "Trucker Cap": a trucker cap, mainly tan brown; an everyday 90s thrift-store item. |
| 4 | `item_hat3.png` | Beanie | Common | "Beanie": a beanie, mainly deep teal; an everyday 90s thrift-store item. |
| 5 | `item_hat4.png` | Visor | Common | "Visor": a visor, mainly chocolate brown; an everyday 90s thrift-store item. |
| 6 | `item_hat5.png` | Snapback | Common | "Snapback": a snapback, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 7 | `item_hat6.png` | Painter's Cap | Common | "Painter's Cap": a painter's cap, mainly mustard yellow; an everyday 90s thrift-store item. |
| 8 | `item_hat7.png` | Newsboy Cap | Common | "Newsboy Cap": a newsboy cap, mainly cream; an everyday 90s thrift-store item. |
| 9 | `item_hat8.png` | Fishing Hat | Common | "Fishing Hat": a fishing hat, mainly coral; an everyday 90s thrift-store item. |
| 10 | `item_hat9.png` | Headband | Common | "Headband": a headband, mainly aqua; an everyday 90s thrift-store item. |
| 11 | `item_hat10.png` | Bandana | Common | "Bandana": a bandana, mainly lime green; an everyday 90s thrift-store item. |
| 12 | `item_hat11.png` | Earflap Hat | Common | "Earflap Hat": a earflap hat, mainly burnt orange; an everyday 90s thrift-store item. |
| 13 | `item_hat12.png` | Paper Crown | Common | "Paper Crown": paper fast-food crown, mainly raspberry; an everyday 90s thrift-store item. |
| 14 | `item_hat13.png` | Hard Hat | Common | "Hard Hat": construction hard hat, mainly hot pink; an everyday 90s thrift-store item. |
| 15 | `item_hat14.png` | Sweatband | Common | "Sweatband": a sweatband, mainly tomato red; an everyday 90s thrift-store item. |
| 16 | `item_hat15.png` | Golf Cap | Common | "Golf Cap": a golf cap, mainly orange; an everyday 90s thrift-store item. |
| 17 | `item_hat16.png` | Foam Visor | Common | "Foam Visor": a foam visor, mainly tan brown; an everyday 90s thrift-store item. |
| 18 | `item_hat17.png` | Propeller Beanie | Rare | "Propeller Beanie": striped beanie with a little plastic propeller on top, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_hat18.png` | Fry Cook Hat | Rare | "Fry Cook Hat": paper fry-cook hat with a burger logo, mainly chocolate brown; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_hat19.png` | Lifeguard Visor | Rare | "Lifeguard Visor": foam visor with a red cross and a whistle on a cord, mainly dark espresso brown; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_hat20.png` | Raver Bucket Hat | Rare | "Raver Bucket Hat": fuzzy bucket hat with smiley-face pins, mainly mustard yellow; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_hat21.png` | Rodeo Hat | Rare | "Rodeo Hat": cowboy hat with a rhinestone band, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_hat22.png` | Slime-dipped Cap | Rare | "Slime-dipped Cap": baseball cap dripping with glowing green slime, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_hat23.png` | Neon Snapback | Rare | "Neon Snapback": snapback with a neon zig-zag print, mainly aqua; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_hat24.png` | Grandpa's Fedora | Rare | "Grandpa's Fedora": worn fedora with a feather in the band, mainly lime green; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_hat25.png` | Prom King Crown | Ultra rare | "Prom King Crown": cheap gold prom crown covered in plastic jewels, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_hat26.png` | Meteor Shard Helm | Ultra rare | "Meteor Shard Helm": helmet made from a glowing green meteor rock, cracked and pulsing, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_hat27.png` | Arcade Legend Cap | Ultra rare | "Arcade Legend Cap": cap covered in arcade high-score patches with a pixel joystick logo, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_hat28.png` | Night Shift Visor | Set piece (NIGHT SHIFT) | "Night Shift Visor": video-store employee visor with a rewind symbol, mainly deep teal, part of the Night Shift set (late-shift video store clerk: teal, name tags, rewind symbols, a tiny "BE KIND REWIND" motif). |
| 30 | `item_hat29.png` | Skate Crew Lid | Set piece (SKATE CREW) | "Skate Crew Lid": skate helmet covered in stickers, mainly hot pink, part of the Skate Crew set (90s skate park: hot pink and black, checkerboard, grip-tape texture, stickers). |

### Glasses (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_glasses0.png` | Shades | Common | "Shades": a shades, mainly aqua; an everyday 90s thrift-store item. |
| 2 | `item_glasses1.png` | Aviators | Common | "Aviators": a aviators, mainly lime green; an everyday 90s thrift-store item. |
| 3 | `item_glasses2.png` | Nerd Specs | Common | "Nerd Specs": a nerd specs, mainly burnt orange; an everyday 90s thrift-store item. |
| 4 | `item_glasses3.png` | Safety Goggles | Common | "Safety Goggles": a safety goggles, mainly raspberry; an everyday 90s thrift-store item. |
| 5 | `item_glasses4.png` | Swim Goggles | Common | "Swim Goggles": a swim goggles, mainly hot pink; an everyday 90s thrift-store item. |
| 6 | `item_glasses5.png` | Clip-ons | Common | "Clip-ons": a clip-ons, mainly tomato red; an everyday 90s thrift-store item. |
| 7 | `item_glasses6.png` | Reading Glasses | Common | "Reading Glasses": a reading glasses, mainly orange; an everyday 90s thrift-store item. |
| 8 | `item_glasses7.png` | Round Specs | Common | "Round Specs": a round specs, mainly tan brown; an everyday 90s thrift-store item. |
| 9 | `item_glasses8.png` | Wraparounds | Common | "Wraparounds": a wraparounds, mainly deep teal; an everyday 90s thrift-store item. |
| 10 | `item_glasses9.png` | Sport Shades | Common | "Sport Shades": a sport shades, mainly chocolate brown; an everyday 90s thrift-store item. |
| 11 | `item_glasses10.png` | 3D Glasses | Common | "3D Glasses": paper 3D glasses with one red and one blue lens, frame mainly dark espresso brown; an everyday 90s thrift-store item. |
| 12 | `item_glasses11.png` | Tinted Lenses | Common | "Tinted Lenses": a tinted lenses, mainly mustard yellow; an everyday 90s thrift-store item. |
| 13 | `item_glasses12.png` | Cat-eye Frames | Common | "Cat-eye Frames": a cat-eye frames, mainly cream; an everyday 90s thrift-store item. |
| 14 | `item_glasses13.png` | Gas Station Shades | Common | "Gas Station Shades": a gas station shades, mainly coral; an everyday 90s thrift-store item. |
| 15 | `item_glasses14.png` | Snow Goggles | Common | "Snow Goggles": a snow goggles, mainly aqua; an everyday 90s thrift-store item. |
| 16 | `item_glasses15.png` | Monocle | Common | "Monocle": monocle on a chain, mainly lime green; an everyday 90s thrift-store item. |
| 17 | `item_glasses16.png` | Lab Goggles | Common | "Lab Goggles": a lab goggles, mainly burnt orange; an everyday 90s thrift-store item. |
| 18 | `item_glasses17.png` | Laser Eye Shades | Rare | "Laser Eye Shades": shades with red laser lines across the lenses, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_glasses18.png` | Mirror Aviators | Rare | "Mirror Aviators": mirrored aviators reflecting a sunset, mainly hot pink; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_glasses19.png` | X-ray Specs | Rare | "X-ray Specs": novelty x-ray specs with spiral lenses, mainly tomato red; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_glasses20.png` | Slap-wrap Shades | Rare | "Slap-wrap Shades": wraparound shades with a slap-bracelet band, mainly orange; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_glasses21.png` | Blacklight Goggles | Rare | "Blacklight Goggles": goggles glowing purple under blacklight, mainly tan brown; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_glasses22.png` | Neon Squares | Rare | "Neon Squares": square frames in neon colours, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_glasses23.png` | Night Vision Goggles | Rare | "Night Vision Goggles": chunky green night vision goggles, mainly chocolate brown; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_glasses24.png` | Hypno Specs | Rare | "Hypno Specs": specs with black-and-white spiral lenses, mainly dark espresso brown; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_glasses25.png` | Third Eye Visor | Ultra rare | "Third Eye Visor": gold visor with a glowing third eye in the middle, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_glasses26.png` | Moonbeam Lenses | Ultra rare | "Moonbeam Lenses": round lenses glowing with pale moonlight, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_glasses27.png` | Blob-proof Goggles | Ultra rare | "Blob-proof Goggles": heavy lab goggles with pink slime splattered on them, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_glasses28.png` | Rewind Readers | Set piece (NIGHT SHIFT) | "Rewind Readers": reading glasses with tiny rewind symbols on the arms, mainly deep teal, part of the Night Shift set (late-shift video store clerk: teal, name tags, rewind symbols, a tiny "BE KIND REWIND" motif). |
| 30 | `item_glasses29.png` | Mall Cop Mirrors | Set piece (MALL SECURITY) | "Mall Cop Mirrors": mirrored cop sunglasses, mainly mustard yellow, part of the Mall Security set (mall rent-a-cop: mustard and navy, badge shapes, walkie-talkie details). |

### Shirts (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_shirt0.png` | Plain Tee | Common | "Plain Tee": a plain tee, mainly chocolate brown; an everyday 90s thrift-store item. |
| 2 | `item_shirt1.png` | Band Tee | Common | "Band Tee": a band tee, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 3 | `item_shirt2.png` | Flannel | Common | "Flannel": a flannel, mainly mustard yellow; an everyday 90s thrift-store item. |
| 4 | `item_shirt3.png` | Polo | Common | "Polo": a polo, mainly cream; an everyday 90s thrift-store item. |
| 5 | `item_shirt4.png` | Tank Top | Common | "Tank Top": a tank top, mainly coral; an everyday 90s thrift-store item. |
| 6 | `item_shirt5.png` | Ringer Tee | Common | "Ringer Tee": a ringer tee, mainly aqua; an everyday 90s thrift-store item. |
| 7 | `item_shirt6.png` | Henley | Common | "Henley": a henley, mainly lime green; an everyday 90s thrift-store item. |
| 8 | `item_shirt7.png` | Hawaiian Shirt | Common | "Hawaiian Shirt": a hawaiian shirt, mainly burnt orange; an everyday 90s thrift-store item. |
| 9 | `item_shirt8.png` | Rugby Shirt | Common | "Rugby Shirt": a rugby shirt, mainly raspberry; an everyday 90s thrift-store item. |
| 10 | `item_shirt9.png` | Thermal | Common | "Thermal": a thermal, mainly hot pink; an everyday 90s thrift-store item. |
| 11 | `item_shirt10.png` | Bowling Shirt | Common | "Bowling Shirt": a bowling shirt, mainly tomato red; an everyday 90s thrift-store item. |
| 12 | `item_shirt11.png` | Tie-dye Tee | Common | "Tie-dye Tee": a tie-dye tee, mainly orange; an everyday 90s thrift-store item. |
| 13 | `item_shirt12.png` | Jersey | Common | "Jersey": a jersey, mainly tan brown; an everyday 90s thrift-store item. |
| 14 | `item_shirt13.png` | Turtleneck | Common | "Turtleneck": a turtleneck, mainly deep teal; an everyday 90s thrift-store item. |
| 15 | `item_shirt14.png` | Pocket Tee | Common | "Pocket Tee": a pocket tee, mainly chocolate brown; an everyday 90s thrift-store item. |
| 16 | `item_shirt15.png` | Work Shirt | Common | "Work Shirt": a work shirt, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 17 | `item_shirt16.png` | Mesh Tank | Common | "Mesh Tank": a mesh tank, mainly mustard yellow; an everyday 90s thrift-store item. |
| 18 | `item_shirt17.png` | Glow-paint Tee | Rare | "Glow-paint Tee": t-shirt with glow-in-the-dark paint splatters, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_shirt18.png` | Bootleg Concert Tee | Rare | "Bootleg Concert Tee": faded bootleg concert tee with a misspelled band name, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_shirt19.png` | Heat-shift Tee | Rare | "Heat-shift Tee": heat-sensitive colour-changing tee with handprints, mainly aqua; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_shirt20.png` | Pizza Grease Tee | Rare | "Pizza Grease Tee": tee with a giant pizza print and grease stains, mainly lime green; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_shirt21.png` | Varsity Jersey | Rare | "Varsity Jersey": varsity sports jersey with a big number, mainly burnt orange; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_shirt22.png` | Rave Tee | Rare | "Rave Tee": oversized rave tee with a smiley face, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_shirt23.png` | Lucky Bowling Shirt | Rare | "Lucky Bowling Shirt": two-tone bowling shirt with dice and flames, mainly hot pink; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_shirt24.png` | Wrestling Tee | Rare | "Wrestling Tee": pro wrestling tee with a muscle-man print, mainly tomato red; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_shirt25.png` | Tee Of Infinite Merch | Ultra rare | "Tee Of Infinite Merch": tee covered edge to edge in gold band logos, absurdly over the top, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_shirt26.png` | Meteor-dyed Shirt | Ultra rare | "Meteor-dyed Shirt": shirt tie-dyed in glowing meteor green, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_shirt27.png` | Signed Tour Shirt | Ultra rare | "Signed Tour Shirt": purple tour shirt covered in marker signatures, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_shirt28.png` | Rental Clerk Vest | Set piece (NIGHT SHIFT) | "Rental Clerk Vest": video store employee vest with a name tag, mainly deep teal, part of the Night Shift set (late-shift video store clerk: teal, name tags, rewind symbols, a tiny "BE KIND REWIND" motif). |
| 30 | `item_shirt29.png` | Tour '94 Flannel | Set piece (TOUR '94) | "Tour '94 Flannel": red-and-black flannel with a TOUR '94 patch, mainly tomato red, part of the Tour '94 set (grunge band tour merch: red and black, safety pins, a "TOUR '94" print, distressed). |

### Jackets (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_jacket0.png` | Denim Jacket | Common | "Denim Jacket": a denim jacket, mainly hot pink; an everyday 90s thrift-store item. |
| 2 | `item_jacket1.png` | Windbreaker | Common | "Windbreaker": a windbreaker, mainly tomato red; an everyday 90s thrift-store item. |
| 3 | `item_jacket2.png` | Bomber | Common | "Bomber": a bomber, mainly orange; an everyday 90s thrift-store item. |
| 4 | `item_jacket3.png` | Varsity Jacket | Common | "Varsity Jacket": a varsity jacket, mainly tan brown; an everyday 90s thrift-store item. |
| 5 | `item_jacket4.png` | Hoodie | Common | "Hoodie": a hoodie, mainly deep teal; an everyday 90s thrift-store item. |
| 6 | `item_jacket5.png` | Fleece | Common | "Fleece": a fleece, mainly chocolate brown; an everyday 90s thrift-store item. |
| 7 | `item_jacket6.png` | Puffer | Common | "Puffer": a puffer, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 8 | `item_jacket7.png` | Track Jacket | Common | "Track Jacket": a track jacket, mainly mustard yellow; an everyday 90s thrift-store item. |
| 9 | `item_jacket8.png` | Rain Slicker | Common | "Rain Slicker": a rain slicker, mainly cream; an everyday 90s thrift-store item. |
| 10 | `item_jacket9.png` | Corduroy Jacket | Common | "Corduroy Jacket": a corduroy jacket, mainly coral; an everyday 90s thrift-store item. |
| 11 | `item_jacket10.png` | Team Jacket | Common | "Team Jacket": a team jacket, mainly aqua; an everyday 90s thrift-store item. |
| 12 | `item_jacket11.png` | Army Jacket | Common | "Army Jacket": a army jacket, mainly lime green; an everyday 90s thrift-store item. |
| 13 | `item_jacket12.png` | Leather Jacket | Common | "Leather Jacket": a leather jacket, mainly burnt orange; an everyday 90s thrift-store item. |
| 14 | `item_jacket13.png` | Cardigan | Common | "Cardigan": a cardigan, mainly raspberry; an everyday 90s thrift-store item. |
| 15 | `item_jacket14.png` | Zip Hoodie | Common | "Zip Hoodie": a zip hoodie, mainly hot pink; an everyday 90s thrift-store item. |
| 16 | `item_jacket15.png` | Overshirt | Common | "Overshirt": a overshirt, mainly tomato red; an everyday 90s thrift-store item. |
| 17 | `item_jacket16.png` | Puffy Vest | Common | "Puffy Vest": a puffy vest, mainly orange; an everyday 90s thrift-store item. |
| 18 | `item_jacket17.png` | Glow Windbreaker | Rare | "Glow Windbreaker": windbreaker with reflective glowing panels, mainly tan brown; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_jacket18.png` | Studded Leather | Rare | "Studded Leather": black leather jacket covered in metal studs, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_jacket19.png` | Eight-ball Jacket | Rare | "Eight-ball Jacket": leather jacket with a giant 8-ball on the back, mainly chocolate brown; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_jacket20.png` | Reflective Vest | Rare | "Reflective Vest": safety vest with reflective stripes, mainly dark espresso brown; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_jacket21.png` | Satin Tour Jacket | Rare | "Satin Tour Jacket": shiny satin tour jacket with embroidery, mainly mustard yellow; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_jacket22.png` | Arcade Jacket | Rare | "Arcade Jacket": jacket printed with arcade game sprites, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_jacket23.png` | Camo Parka | Rare | "Camo Parka": camouflage parka with fur hood, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_jacket24.png` | Patchwork Denim | Rare | "Patchwork Denim": denim jacket made of mismatched patches, mainly aqua; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_jacket25.png` | Coat Of 1000 Pins | Ultra rare | "Coat Of 1000 Pins": long coat completely covered in enamel pins and buttons, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_jacket26.png` | Meteor Shard Parka | Ultra rare | "Meteor Shard Parka": parka with glowing green meteor crystals growing from it, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_jacket27.png` | Prom Night Tux Coat | Ultra rare | "Prom Night Tux Coat": purple velvet prom tuxedo jacket with ruffles, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_jacket28.png` | Tour '94 Denim | Set piece (TOUR '94) | "Tour '94 Denim": distressed denim jacket with TOUR '94 back patch, mainly tomato red, part of the Tour '94 set (grunge band tour merch: red and black, safety pins, a "TOUR '94" print, distressed). |
| 30 | `item_jacket29.png` | Skate Crew Hoodie | Set piece (SKATE CREW) | "Skate Crew Hoodie": black-and-pink checkerboard skate hoodie, mainly hot pink, part of the Skate Crew set (90s skate park: hot pink and black, checkerboard, grip-tape texture, stickers). |

### Belts (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_belt0.png` | Leather Belt | Common | "Leather Belt": a leather belt, mainly coral; an everyday 90s thrift-store item. |
| 2 | `item_belt1.png` | Web Belt | Common | "Web Belt": a web belt, mainly aqua; an everyday 90s thrift-store item. |
| 3 | `item_belt2.png` | Braided Belt | Common | "Braided Belt": a braided belt, mainly lime green; an everyday 90s thrift-store item. |
| 4 | `item_belt3.png` | Canvas Belt | Common | "Canvas Belt": a canvas belt, mainly burnt orange; an everyday 90s thrift-store item. |
| 5 | `item_belt4.png` | Studded Belt | Common | "Studded Belt": a studded belt, mainly raspberry; an everyday 90s thrift-store item. |
| 6 | `item_belt5.png` | Fanny Pack | Common | "Fanny Pack": fanny pack, mainly hot pink; an everyday 90s thrift-store item. |
| 7 | `item_belt6.png` | Tool Belt | Common | "Tool Belt": a tool belt, mainly tomato red; an everyday 90s thrift-store item. |
| 8 | `item_belt7.png` | Chain Belt | Common | "Chain Belt": a chain belt, mainly orange; an everyday 90s thrift-store item. |
| 9 | `item_belt8.png` | Rope Belt | Common | "Rope Belt": a rope belt, mainly tan brown; an everyday 90s thrift-store item. |
| 10 | `item_belt9.png` | Bike Chain Belt | Common | "Bike Chain Belt": a bike chain belt, mainly deep teal; an everyday 90s thrift-store item. |
| 11 | `item_belt10.png` | Elastic Belt | Common | "Elastic Belt": a elastic belt, mainly chocolate brown; an everyday 90s thrift-store item. |
| 12 | `item_belt11.png` | Weight Belt | Common | "Weight Belt": a weight belt, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 13 | `item_belt12.png` | Wallet Chain | Common | "Wallet Chain": wallet with a chain, mainly mustard yellow; an everyday 90s thrift-store item. |
| 14 | `item_belt13.png` | Suspenders | Common | "Suspenders": pair of suspenders, mainly cream; an everyday 90s thrift-store item. |
| 15 | `item_belt14.png` | Snap Belt | Common | "Snap Belt": a snap belt, mainly coral; an everyday 90s thrift-store item. |
| 16 | `item_belt15.png` | Rodeo Buckle | Common | "Rodeo Buckle": a rodeo buckle, mainly aqua; an everyday 90s thrift-store item. |
| 17 | `item_belt16.png` | Ribbon Belt | Common | "Ribbon Belt": a ribbon belt, mainly lime green; an everyday 90s thrift-store item. |
| 18 | `item_belt17.png` | Pager Holster | Rare | "Pager Holster": belt with a clip-on pager, mainly burnt orange; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_belt18.png` | Glow Belt | Rare | "Glow Belt": belt with glowing light strip, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_belt19.png` | Lucky Buckle | Rare | "Lucky Buckle": belt with a horseshoe buckle, mainly hot pink; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_belt20.png` | Champion Buckle | Rare | "Champion Buckle": belt with a huge trophy buckle, mainly tomato red; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_belt21.png` | Utility Belt | Rare | "Utility Belt": utility belt full of pouches, mainly orange; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_belt22.png` | Bandolier Of Pogs | Rare | "Bandolier Of Pogs": bandolier lined with pog discs, mainly tan brown; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_belt23.png` | Walkman Clip | Rare | "Walkman Clip": belt with a clipped-on cassette walkman and headphone cord, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_belt24.png` | Arcade Coin Belt | Rare | "Arcade Coin Belt": belt with an arcade token dispenser, mainly chocolate brown; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_belt25.png` | Belt Of The Blob | Ultra rare | "Belt Of The Blob": belt made of pink blob goo with eyes in it, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_belt26.png` | Title Belt | Ultra rare | "Title Belt": giant gold wrestling championship belt, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_belt27.png` | Infinite Pocket Pack | Ultra rare | "Infinite Pocket Pack": purple fanny pack with a swirling cosmic opening, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_belt28.png` | Night Shift Keychain | Set piece (NIGHT SHIFT) | "Night Shift Keychain": store keychain belt loop with a huge ring of keys, mainly deep teal, part of the Night Shift set (late-shift video store clerk: teal, name tags, rewind symbols, a tiny "BE KIND REWIND" motif). |
| 30 | `item_belt29.png` | Mall Cop Duty Belt | Set piece (MALL SECURITY) | "Mall Cop Duty Belt": duty belt with flashlight and walkie-talkie, mainly mustard yellow, part of the Mall Security set (mall rent-a-cop: mustard and navy, badge shapes, walkie-talkie details). |

### Pants (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_pants0.png` | Jeans | Common | "Jeans": a jeans, mainly deep teal; an everyday 90s thrift-store item. |
| 2 | `item_pants1.png` | Cargo Shorts | Common | "Cargo Shorts": a cargo shorts, mainly chocolate brown; an everyday 90s thrift-store item. |
| 3 | `item_pants2.png` | Sweatpants | Common | "Sweatpants": a sweatpants, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 4 | `item_pants3.png` | Khakis | Common | "Khakis": a khakis, mainly mustard yellow; an everyday 90s thrift-store item. |
| 5 | `item_pants4.png` | Track Pants | Common | "Track Pants": a track pants, mainly cream; an everyday 90s thrift-store item. |
| 6 | `item_pants5.png` | Overalls | Common | "Overalls": denim-style overalls, mainly coral; an everyday 90s thrift-store item. |
| 7 | `item_pants6.png` | Corduroys | Common | "Corduroys": a corduroys, mainly aqua; an everyday 90s thrift-store item. |
| 8 | `item_pants7.png` | Board Shorts | Common | "Board Shorts": a board shorts, mainly lime green; an everyday 90s thrift-store item. |
| 9 | `item_pants8.png` | Carpenter Jeans | Common | "Carpenter Jeans": a carpenter jeans, mainly burnt orange; an everyday 90s thrift-store item. |
| 10 | `item_pants9.png` | Parachute Pants | Common | "Parachute Pants": shiny parachute pants, mainly raspberry; an everyday 90s thrift-store item. |
| 11 | `item_pants10.png` | Bike Shorts | Common | "Bike Shorts": a bike shorts, mainly hot pink; an everyday 90s thrift-store item. |
| 12 | `item_pants11.png` | Zip-off Pants | Common | "Zip-off Pants": zip-off convertible hiking pants, mainly tomato red; an everyday 90s thrift-store item. |
| 13 | `item_pants12.png` | Gym Shorts | Common | "Gym Shorts": a gym shorts, mainly orange; an everyday 90s thrift-store item. |
| 14 | `item_pants13.png` | Painter Pants | Common | "Painter Pants": a painter pants, mainly tan brown; an everyday 90s thrift-store item. |
| 15 | `item_pants14.png` | Stonewash Jeans | Common | "Stonewash Jeans": a stonewash jeans, mainly deep teal; an everyday 90s thrift-store item. |
| 16 | `item_pants15.png` | Flannel Pjs | Common | "Flannel Pjs": flannel pyjama pants, mainly chocolate brown; an everyday 90s thrift-store item. |
| 17 | `item_pants16.png` | Camo Pants | Common | "Camo Pants": a camo pants, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 18 | `item_pants17.png` | Ripped Jeans | Rare | "Ripped Jeans": heavily ripped jeans, mainly mustard yellow; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_pants18.png` | Phat Raver Pants | Rare | "Phat Raver Pants": enormous wide-leg raver pants with stripes, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_pants19.png` | Glow Joggers | Rare | "Glow Joggers": joggers with glowing piping, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_pants20.png` | Patch Jeans | Rare | "Patch Jeans": jeans covered in iron-on patches, mainly aqua; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_pants21.png` | Genie Pants | Rare | "Genie Pants": billowy genie pants, mainly lime green; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_pants22.png` | Zip-leg Jeans | Rare | "Zip-leg Jeans": jeans with zippers all down the legs, mainly burnt orange; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_pants23.png` | Snap Pants | Rare | "Snap Pants": tear-away snap pants with side snaps, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_pants24.png` | Sweat-proof Shorts | Rare | "Sweat-proof Shorts": shiny athletic shorts, mainly hot pink; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_pants25.png` | Pants Of Holding | Ultra rare | "Pants Of Holding": gold cargo pants with impossibly many pockets, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_pants26.png` | Meteor-washed Jeans | Ultra rare | "Meteor-washed Jeans": acid-wash jeans with glowing green splotches, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_pants27.png` | Legendary Overalls | Ultra rare | "Legendary Overalls": purple overalls with gold buckles and patches, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_pants28.png` | Tour '94 Jeans | Set piece (TOUR '94) | "Tour '94 Jeans": black distressed jeans with safety pins, mainly tomato red, part of the Tour '94 set (grunge band tour merch: red and black, safety pins, a "TOUR '94" print, distressed). |
| 30 | `item_pants29.png` | Skate Crew Shorts | Set piece (SKATE CREW) | "Skate Crew Shorts": baggy checkerboard skate shorts, mainly hot pink, part of the Skate Crew set (90s skate park: hot pink and black, checkerboard, grip-tape texture, stickers). |

### Shoes (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_shoes0.png` | Sneakers | Common | "Sneakers": a sneakers, mainly raspberry; an everyday 90s thrift-store item. |
| 2 | `item_shoes1.png` | High-tops | Common | "High-tops": a high-tops, mainly hot pink; an everyday 90s thrift-store item. |
| 3 | `item_shoes2.png` | Skate Shoes | Common | "Skate Shoes": a skate shoes, mainly tomato red; an everyday 90s thrift-store item. |
| 4 | `item_shoes3.png` | Combat Boots | Common | "Combat Boots": a combat boots, mainly orange; an everyday 90s thrift-store item. |
| 5 | `item_shoes4.png` | Loafers | Common | "Loafers": a loafers, mainly tan brown; an everyday 90s thrift-store item. |
| 6 | `item_shoes5.png` | Sandals | Common | "Sandals": a sandals, mainly deep teal; an everyday 90s thrift-store item. |
| 7 | `item_shoes6.png` | Flip-flops | Common | "Flip-flops": a flip-flops, mainly chocolate brown; an everyday 90s thrift-store item. |
| 8 | `item_shoes7.png` | Hiking Boots | Common | "Hiking Boots": a hiking boots, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 9 | `item_shoes8.png` | Jelly Shoes | Common | "Jelly Shoes": translucent jelly sandals, mainly mustard yellow; an everyday 90s thrift-store item. |
| 10 | `item_shoes9.png` | Slip-ons | Common | "Slip-ons": a slip-ons, mainly cream; an everyday 90s thrift-store item. |
| 11 | `item_shoes10.png` | Running Shoes | Common | "Running Shoes": a running shoes, mainly coral; an everyday 90s thrift-store item. |
| 12 | `item_shoes11.png` | Moon Boots | Common | "Moon Boots": puffy moon boots, mainly aqua; an everyday 90s thrift-store item. |
| 13 | `item_shoes12.png` | Work Boots | Common | "Work Boots": a work boots, mainly lime green; an everyday 90s thrift-store item. |
| 14 | `item_shoes13.png` | Canvas Low-tops | Common | "Canvas Low-tops": a canvas low-tops, mainly burnt orange; an everyday 90s thrift-store item. |
| 15 | `item_shoes14.png` | Cowboy Boots | Common | "Cowboy Boots": a cowboy boots, mainly raspberry; an everyday 90s thrift-store item. |
| 16 | `item_shoes15.png` | Platform Shoes | Common | "Platform Shoes": chunky platform sneakers, mainly hot pink; an everyday 90s thrift-store item. |
| 17 | `item_shoes16.png` | Bowling Shoes | Common | "Bowling Shoes": two-tone bowling shoes, mainly tomato red; an everyday 90s thrift-store item. |
| 18 | `item_shoes17.png` | Light-up Sneakers | Rare | "Light-up Sneakers": sneakers with light-up soles, mainly orange; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_shoes18.png` | Pump-up Kicks | Rare | "Pump-up Kicks": high-tops with a pump button on the tongue, mainly tan brown; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_shoes19.png` | Inline Skates | Rare | "Inline Skates": inline skates, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_shoes20.png` | Steel-toe Boots | Rare | "Steel-toe Boots": work boots with exposed steel toes, mainly chocolate brown; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_shoes21.png` | Velcro Kicks | Rare | "Velcro Kicks": chunky velcro-strap sneakers, mainly dark espresso brown; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_shoes22.png` | Turbo Runners | Rare | "Turbo Runners": running shoes with flame decals, mainly mustard yellow; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_shoes23.png` | Wheel Heels | Rare | "Wheel Heels": sneakers with wheels in the heel, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_shoes24.png` | Spring Shoes | Rare | "Spring Shoes": shoes with big springs under the soles, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_shoes25.png` | Rocket Boots | Ultra rare | "Rocket Boots": gold boots with little rocket thrusters, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_shoes26.png` | Kicks Of The Meteor | Ultra rare | "Kicks Of The Meteor": sneakers made of glowing green meteor rock, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_shoes27.png` | Golden High-tops | Ultra rare | "Golden High-tops": purple-and-gold high-tops with wings, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_shoes28.png` | Tour '94 Boots | Set piece (TOUR '94) | "Tour '94 Boots": beat-up black combat boots with red laces, mainly tomato red, part of the Tour '94 set (grunge band tour merch: red and black, safety pins, a "TOUR '94" print, distressed). |
| 30 | `item_shoes29.png` | Skate Crew Kicks | Set piece (SKATE CREW) | "Skate Crew Kicks": checkerboard skate shoes, mainly hot pink, part of the Skate Crew set (90s skate park: hot pink and black, checkerboard, grip-tape texture, stickers). |

### Bracelets (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_bracelet0.png` | Slap Bracelet | Common | "Slap Bracelet": slap bracelet with a neon print, mainly cream; an everyday 90s thrift-store item. |
| 2 | `item_bracelet1.png` | Friendship Band | Common | "Friendship Band": a friendship band, mainly coral; an everyday 90s thrift-store item. |
| 3 | `item_bracelet2.png` | Wrist Sweatband | Common | "Wrist Sweatband": a wrist sweatband, mainly aqua; an everyday 90s thrift-store item. |
| 4 | `item_bracelet3.png` | Digital Watch | Common | "Digital Watch": cheap digital watch, mainly lime green; an everyday 90s thrift-store item. |
| 5 | `item_bracelet4.png` | Rubber Band | Common | "Rubber Band": a rubber band, mainly burnt orange; an everyday 90s thrift-store item. |
| 6 | `item_bracelet5.png` | Hemp Bracelet | Common | "Hemp Bracelet": a hemp bracelet, mainly raspberry; an everyday 90s thrift-store item. |
| 7 | `item_bracelet6.png` | Bead Bracelet | Common | "Bead Bracelet": a bead bracelet, mainly hot pink; an everyday 90s thrift-store item. |
| 8 | `item_bracelet7.png` | Bangle | Common | "Bangle": a bangle, mainly tomato red; an everyday 90s thrift-store item. |
| 9 | `item_bracelet8.png` | Charm Bracelet | Common | "Charm Bracelet": a charm bracelet, mainly orange; an everyday 90s thrift-store item. |
| 10 | `item_bracelet9.png` | Wristband | Common | "Wristband": a wristband, mainly tan brown; an everyday 90s thrift-store item. |
| 11 | `item_bracelet10.png` | Id Bracelet | Common | "Id Bracelet": a id bracelet, mainly deep teal; an everyday 90s thrift-store item. |
| 12 | `item_bracelet11.png` | Mood Band | Common | "Mood Band": a mood band, mainly chocolate brown; an everyday 90s thrift-store item. |
| 13 | `item_bracelet12.png` | Leather Cuff | Common | "Leather Cuff": a leather cuff, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 14 | `item_bracelet13.png` | Chain Bracelet | Common | "Chain Bracelet": a chain bracelet, mainly mustard yellow; an everyday 90s thrift-store item. |
| 15 | `item_bracelet14.png` | Shell Bracelet | Common | "Shell Bracelet": a shell bracelet, mainly cream; an everyday 90s thrift-store item. |
| 16 | `item_bracelet15.png` | Hair Tie | Common | "Hair Tie": scrunchie worn on the wrist, mainly coral; an everyday 90s thrift-store item. |
| 17 | `item_bracelet16.png` | Glow Stick Band | Common | "Glow Stick Band": a glow stick band, mainly aqua; an everyday 90s thrift-store item. |
| 18 | `item_bracelet17.png` | Calculator Watch | Rare | "Calculator Watch": calculator wristwatch, mainly lime green; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_bracelet18.png` | Spiked Cuff | Rare | "Spiked Cuff": leather cuff with metal spikes, mainly burnt orange; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_bracelet19.png` | Color-change Band | Rare | "Color-change Band": colour-changing wristband, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_bracelet20.png` | Lucky Charm Chain | Rare | "Lucky Charm Chain": chain bracelet with clover and dice charms, mainly hot pink; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_bracelet21.png` | Virtual Pet Strap | Rare | "Virtual Pet Strap": wrist strap holding a virtual pet egg toy, mainly tomato red; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_bracelet22.png` | Power Band | Rare | "Power Band": thick athletic power band, mainly orange; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_bracelet23.png` | Pager Strap | Rare | "Pager Strap": wrist strap with a tiny pager, mainly tan brown; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_bracelet24.png` | Glow Cuff | Rare | "Glow Cuff": cuff made of glow sticks, mainly deep teal; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_bracelet25.png` | Bangle Of Rewind | Ultra rare | "Bangle Of Rewind": gold bangle shaped like a VHS reel, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_bracelet26.png` | Meteor Charm | Ultra rare | "Meteor Charm": bracelet with a glowing meteor fragment charm, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_bracelet27.png` | Gauntlet Of Pogs | Ultra rare | "Gauntlet Of Pogs": purple gauntlet studded with pogs and a slammer, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_bracelet28.png` | Tour '94 Wristband | Set piece (TOUR '94) | "Tour '94 Wristband": black-and-red studded tour wristband, mainly tomato red, part of the Tour '94 set (grunge band tour merch: red and black, safety pins, a "TOUR '94" print, distressed). |
| 30 | `item_bracelet29.png` | Mall Cop Watch | Set piece (MALL SECURITY) | "Mall Cop Watch": chunky security guard watch, mainly mustard yellow, part of the Mall Security set (mall rent-a-cop: mustard and navy, badge shapes, walkie-talkie details). |

### Rings (30)

| # | File | Item | Rarity | Prompt line |
|---|---|---|---|---|
| 1 | `item_ring0.png` | Mood Ring | Common | "Mood Ring": mood ring, mainly tan brown; an everyday 90s thrift-store item. |
| 2 | `item_ring1.png` | Class Ring | Common | "Class Ring": a class ring, mainly deep teal; an everyday 90s thrift-store item. |
| 3 | `item_ring2.png` | Plastic Ring | Common | "Plastic Ring": a plastic ring, mainly chocolate brown; an everyday 90s thrift-store item. |
| 4 | `item_ring3.png` | Silver Band | Common | "Silver Band": a silver band, mainly dark espresso brown; an everyday 90s thrift-store item. |
| 5 | `item_ring4.png` | Spoon Ring | Common | "Spoon Ring": ring bent from a spoon, mainly mustard yellow; an everyday 90s thrift-store item. |
| 6 | `item_ring5.png` | Toe Ring | Common | "Toe Ring": tiny toe ring, mainly cream; an everyday 90s thrift-store item. |
| 7 | `item_ring6.png` | Candy Ring | Common | "Candy Ring": candy ring pop, mainly coral; an everyday 90s thrift-store item. |
| 8 | `item_ring7.png` | Puzzle Ring | Common | "Puzzle Ring": a puzzle ring, mainly aqua; an everyday 90s thrift-store item. |
| 9 | `item_ring8.png` | Skull Ring | Common | "Skull Ring": a skull ring, mainly lime green; an everyday 90s thrift-store item. |
| 10 | `item_ring9.png` | Heart Ring | Common | "Heart Ring": a heart ring, mainly burnt orange; an everyday 90s thrift-store item. |
| 11 | `item_ring10.png` | Turquoise Ring | Common | "Turquoise Ring": a turquoise ring, mainly raspberry; an everyday 90s thrift-store item. |
| 12 | `item_ring11.png` | Pinky Ring | Common | "Pinky Ring": a pinky ring, mainly hot pink; an everyday 90s thrift-store item. |
| 13 | `item_ring12.png` | Signet Ring | Common | "Signet Ring": a signet ring, mainly tomato red; an everyday 90s thrift-store item. |
| 14 | `item_ring13.png` | Washer Ring | Common | "Washer Ring": ring made from a hardware washer, mainly orange; an everyday 90s thrift-store item. |
| 15 | `item_ring14.png` | Bubblegum Ring | Common | "Bubblegum Ring": a bubblegum ring, mainly tan brown; an everyday 90s thrift-store item. |
| 16 | `item_ring15.png` | Pop-tab Ring | Common | "Pop-tab Ring": ring made from a soda pop tab, mainly deep teal; an everyday 90s thrift-store item. |
| 17 | `item_ring16.png` | Cereal Box Ring | Common | "Cereal Box Ring": cheap plastic cereal prize ring, mainly chocolate brown; an everyday 90s thrift-store item. |
| 18 | `item_ring17.png` | Decoder Ring | Rare | "Decoder Ring": cereal-prize decoder ring with a dial, mainly dark espresso brown; a cooler, more detailed 90s item with a little extra flair. |
| 19 | `item_ring18.png` | Glow Ring | Rare | "Glow Ring": glow-in-the-dark ring, mainly mustard yellow; a cooler, more detailed 90s item with a little extra flair. |
| 20 | `item_ring19.png` | Lucky Dice Ring | Rare | "Lucky Dice Ring": ring with a tiny pair of dice, mainly cream; a cooler, more detailed 90s item with a little extra flair. |
| 21 | `item_ring20.png` | Championship Ring | Rare | "Championship Ring": chunky championship ring, mainly coral; a cooler, more detailed 90s item with a little extra flair. |
| 22 | `item_ring21.png` | Pizza Ring | Rare | "Pizza Ring": ring shaped like a pizza slice, mainly aqua; a cooler, more detailed 90s item with a little extra flair. |
| 23 | `item_ring22.png` | Spider Ring | Rare | "Spider Ring": plastic Halloween spider ring, mainly lime green; a cooler, more detailed 90s item with a little extra flair. |
| 24 | `item_ring23.png` | Smiley Ring | Rare | "Smiley Ring": ring with a smiley face, mainly burnt orange; a cooler, more detailed 90s item with a little extra flair. |
| 25 | `item_ring24.png` | Opal Ring | Rare | "Opal Ring": ring with a shimmering opal, mainly raspberry; a cooler, more detailed 90s item with a little extra flair. |
| 26 | `item_ring25.png` | Ring Of The Late Fee | Ultra rare | "Ring Of The Late Fee": gold ring with a tiny VHS tape gem and an overdue stamp, mainly gold; a legendary, over-the-top campy version, the best item in the game. |
| 27 | `item_ring26.png` | Meteor Signet | Ultra rare | "Meteor Signet": signet ring set with a glowing green meteor stone, mainly lime green; a legendary, over-the-top campy version, the best item in the game. |
| 28 | `item_ring27.png` | Prom Queen Ring | Ultra rare | "Prom Queen Ring": purple jewelled prom queen ring, mainly purple; a legendary, over-the-top campy version, the best item in the game. |
| 29 | `item_ring28.png` | Night Shift Ring | Set piece (NIGHT SHIFT) | "Night Shift Ring": teal ring stamped with a rewind symbol, mainly deep teal, part of the Night Shift set (late-shift video store clerk: teal, name tags, rewind symbols, a tiny "BE KIND REWIND" motif). |
| 30 | `item_ring29.png` | Mall Cop Badge Ring | Set piece (MALL SECURITY) | "Mall Cop Badge Ring": ring shaped like a security badge, mainly mustard yellow, part of the Mall Security set (mall rent-a-cop: mustard and navy, badge shapes, walkie-talkie details). |

## Part 3 (optional): Full-set outfits for each hero

When a hero wears every piece of a set, the game can switch to a hand-drawn version of that hero in the set's outfit. That's 4 sets × 4 heroes = 16 outfits. Each outfit needs the same 9 frames the heroes already have (walk1, walk2, attack1, attack2, jump, kick, hurt, down, special), so 144 images in total. Do as many or as few as you like; any outfit you finish gets used.

**How to:** for each outfit, start a new chat and attach that hero's **existing frame** (for example `dex_walk1.webp`) plus the hero's original image. Paste the block below, then ask for each frame by name, for example: *"Now the same outfit in the pose of the attached dex_attack2 frame."* Save the results as `<hero>_<set>_<frame>.png`, for example `dex_night_walk1.png` or `julia_skate_kick.png`.

> Same character, same face, hair, body proportions, weapon and pose as the attached frame, in the same thick black ink, grainy 90s comic-book style. Change ONLY the clothes to the outfit described. Full body, side view facing right, transparent background, portrait canvas 1024x1536, feet near the bottom edge.

| Set | Pieces | Outfit description to paste after the block |
|---|---|---|
| **Night Shift** | Night Shift Visor, Rewind Readers, Rental Clerk Vest, Night Shift Keychain, Night Shift Ring | "Outfit: late-shift video store clerk. Teal employee visor with a rewind symbol, reading glasses, teal rental-clerk vest with a name tag over their shirt, a huge ring of store keys clipped to the belt, a teal ring." |
| **Tour '94** | Tour '94 Flannel, Tour '94 Denim, Tour '94 Jeans, Tour '94 Boots, Tour '94 Wristband | "Outfit: grunge band on tour. Red-and-black flannel under a distressed denim jacket with a TOUR '94 back patch, black ripped jeans with safety pins, beat-up black combat boots with red laces, a studded wristband." |
| **Skate Crew** | Skate Crew Lid, Skate Crew Hoodie, Skate Crew Shorts, Skate Crew Kicks | "Outfit: 90s skate crew. Sticker-covered skate helmet, black-and-hot-pink checkerboard hoodie, baggy checkerboard shorts, checkerboard skate shoes, knee pads." |
| **Mall Security** | Mall Cop Mirrors, Mall Cop Duty Belt, Mall Cop Watch, Mall Cop Badge Ring | "Outfit: mall rent-a-cop. Mirrored cop sunglasses, a mustard security shirt with a navy badge patch, a navy duty belt with a flashlight and walkie-talkie, a chunky watch, a badge-shaped ring." |

Heroes and the frame files to attach as references: **Dex** (`dex_*.webp`), **Rae** (`rae_*.webp`), **Benny** (`benny_*.webp`), **Julia** (`julia_*.webp`).
