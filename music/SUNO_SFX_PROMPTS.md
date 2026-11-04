# Suno Sounds: the game's sound effects (v6)

Every action in the game currently makes a synthesised blip. This list replaces them with real sounds, made in Suno's **Sounds** tab. 86 sounds in five batches, most important first: you can stop after any batch and the game will use what's there, with the old blip still covering anything missing.

## How to make each one

1. **Create → Sounds**, model **v6**.
2. Paste the prompt into **Describe the sound you want**.
3. **Advanced Options → Type**: **One-Shot** for everything except batch 5 (those are **Loop**). Leave **BPM** on Auto and **Key** on Any.
4. Suno gives two takes. **Keep both if both are good** and name them `_1` and `_2`; the game picks one at random each time, so two hits in a row never sound identical. If one take is bad, keep only `_1`.
5. Download as MP3 (WAV is fine too) and name it exactly as shown, e.g. `hit_light_1.mp3`, `hit_light_2.mp3`.
6. Put everything in one zip, `sfx.zip` (or one zip per batch), and send it.

**Don't worry about:** silence at the start or end, loudness differences, or length. On import I trim the silence, match the loudness across every sound, cut one-shots to their useful length and check that loops repeat without a click.

**If a take comes out wrong:** music under it, a voice saying words, or a long reverb tail. Regenerate it; adding "dry, no music, no reverb" to the prompt usually fixes it.

---

## Batch 1: hits and swings (the biggest difference, 20 sounds)

What every punch sounds like. Beat-'em-ups live on these.

| File | Prompt |
|---|---|
| `hit_light` | Single punchy cartoon punch impact, a quick meaty thwack, 90s arcade beat-'em-up style, dry, very short, no music |
| `hit_heavy` | Single heavy body-blow impact with a deep low-end thump and a crunchy crack, 90s arcade beat-'em-up finisher, dry, short, no music |
| `hit_ko` | Big knockout impact: a huge crunchy smack followed by a short whoosh of the body flying, retro arcade brawler, dry, no music |
| `hit_block` | Blow glancing off a hard plastic riot shield, dull clack with a slight ring, short, dry, no music |
| `body_fall` | A body slamming flat onto a hard floor, heavy thud with a little bounce, short, dry, no music |
| `swing_cd` | Quick whoosh of a small portable CD player swung on a cord, light whippy swish with a faint plastic rattle, short, dry, no music |
| `hit_cd` | A plastic portable CD player smacking into something, hollow plastic clack with a meaty punch under it, short, dry, no music |
| `swing_bass` | Heavy whoosh of an electric bass guitar swung like a club, deep swoosh with a faint string buzz, short, dry, no music |
| `hit_bass` | Electric bass guitar body smashing into an enemy, a woody thump with the strings twanging and buzzing, short, dry, no music |
| `swing_bag` | Whoosh of a padded insulated pizza delivery bag swung hard, soft heavy swish of vinyl fabric, short, dry, no music |
| `hit_bag` | Padded pizza bag slapping into someone, a fat vinyl slap with a muffled thump, short, dry, no music |
| `swing_stick` | Fast whoosh of a wooden hockey stick slicing the air, sharp thin swish, short, dry, no music |
| `hit_stick` | Wooden hockey stick cracking against a body, sharp wooden whack, short, dry, no music |
| `jump` | Quick cartoon jump hop, a short springy rising swoosh, retro arcade, dry, no music |
| `land` | Sneakers landing on a hard floor after a jump, quick soft double thud, short, dry, no music |
| `special_dex` | A portable CD player spinning fast on its cord like a buzzsaw, whirring hum with a spinning disc whine, about one second, dry, no music |
| `special_rae` | Massive distorted bass guitar power chord shockwave, a booming low thunderclap with amp feedback, about one second, no drums, no melody |
| `special_benny` | Pizza box flung like a frisbee, a spinning cardboard whirr flying away, about one second, dry, no music |
| `special_julia` | Inline skates kicking off into a fast dash, a wheel roll building to a sharp swoosh and a stick slash, about one second, dry, no music |
| `special_charge` | Power-up whoosh, a bright rising energy swell for a special move, retro arcade, one second, no music |

## Batch 2: the heroes' voices (12 sounds)

Short grunts, no words. Each hero has their own voice.

| File | Prompt |
|---|---|
| `dex_effort` | Young adult male, short effort grunt while swinging, "hup!", no words, dry, no music |
| `dex_hurt` | Young adult male, short pained grunt from being punched, no words, dry, no music |
| `dex_ko` | Young adult male, longer pained groan while falling down, no words, dry, no music |
| `rae_effort` | Young adult woman with a raspy rock voice, short fierce effort shout while swinging, no words, dry, no music |
| `rae_hurt` | Young adult woman with a raspy voice, short pained grunt from being hit, no words, dry, no music |
| `rae_ko` | Young adult woman with a raspy voice, groan while falling down, no words, dry, no music |
| `benny_effort` | Teenage boy, short goofy effort grunt while swinging, no words, dry, no music |
| `benny_hurt` | Teenage boy, short surprised "oof" from being hit, no words, dry, no music |
| `benny_ko` | Teenage boy, comedic groan while falling down, no words, dry, no music |
| `julia_effort` | Teenage girl, short sporty effort shout while swinging, "hyah!", no words, dry, no music |
| `julia_hurt` | Teenage girl, short sharp pained gasp from being hit, no words, dry, no music |
| `julia_ko` | Teenage girl, groan while falling down, no words, dry, no music |

## Batch 3: monster voices (30 sounds)

Two sounds per voice group: **`_attack`** plays as a monster winds up (so players hear it coming) and **`_die`** when it's beaten. Groups share a voice so 30 monsters only need 15 voices.

| Group (monsters that use it) | `_attack` prompt | `_die` prompt |
|---|---|---|
| `zombie` (Shambler, Zombie Jock, Greaser Ghoul, Lunch Lady, Fry Cook) | Hungry zombie moan rising into a snarl, B-movie horror, short, dry, no music | Zombie death groan trailing off into a wet gurgle, B-movie horror, short, dry, no music |
| `mummy` (Mummy) | Dusty raspy mummy groan with dry wrappings creaking, short, dry, no music | Mummy collapsing into dust, a dry rasp and a crumbling papery whoosh, short, dry, no music |
| `wolf` (Werewolf, Rink Rat) | Werewolf snarl leading into a vicious bark, short, dry, no music | Werewolf yelp turning into a whimper, short, dry, no music |
| `pod` (Pod Person) | Eerie alien pod person screech, a high inhuman wail, short, dry, no music | Pod person deflating with a wet hiss and a fading screech, short, dry, no music |
| `chainsaw` (Chainsaw Maniac) | Chainsaw revving up to full scream, about one second, dry, no music | Chainsaw sputtering and stalling, engine dying, short, dry, no music |
| `gremlin` (Arcade Gremlin, Meteor Spawn) | Small mischievous gremlin cackle with an electronic arcade glitch, short, dry, no music | Gremlin squeal ending in a short-circuit zap, short, dry, no music |
| `tape` (Tape Wraith, Static Specter) | Ghostly wail mixed with VHS tape warble and static hiss, short, dry, no music | Ghost dissolving into TV static and a rewinding tape squeal, short, dry, no music |
| `cop` (Mall Cop, Lifeguard Lurker) | Undead security guard grunting and blowing a short whistle blast, short, dry, no music | Undead guard groaning, then a whistle and radio static falling silent, short, dry, no music |
| `hallmon` (Hall Monitor) | Sharp angry referee whistle blast with a hissing zombie breath, short, dry, no music | Whistle sputtering out and a zombie groan, short, dry, no music |
| `beast` (Bog Beast, Pool Shark) | Deep wet swamp monster roar with gurgling water, short, dry, no music | Swamp monster dying with a bubbling gurgle and a splash, short, dry, no music |
| `bug` (Mega Skeeter, Claw Crab) | Giant mosquito buzzing whine swooping closer, short, dry, no music | Giant insect splat with a fizzling buzz cutting out, short, dry, no music |
| `derby` (Derby Demon, Pinhead) | Demonic snarl with roller-skate wheels screeching, short, dry, no music | Demon shriek fading as skate wheels spin to a stop, short, dry, no music |
| `alien` (Martian Invader, Grey Abductor, Alien Brute) | Retro 1950s sci-fi alien warble with a ray-gun charge, short, dry, no music | 1950s B-movie alien death squeal with a theremin dropping in pitch, short, dry, no music |
| `mannequin` (Mannequin, Zombie Usher) | Hard plastic joints creaking and clacking as a mannequin lurches, short, dry, no music | Plastic mannequin clattering apart on a hard floor, short, dry, no music |
| `weather` (Weatherman) | Undead TV weatherman groaning through a crackling microphone with a thunder rumble, short, dry, no music | Microphone feedback squeal and a thunderclap fading, short, dry, no music |

## Batch 4: shots, bosses and pickups (14 sounds)

| File | Prompt |
|---|---|
| `shot_slime` | Wet slime glob launched, squelchy spit, short, dry, no music |
| `shot_laser` | 1950s sci-fi ray gun zap, short, dry, no music |
| `shot_wave` | Sonic whistle blast wave, a sharp ringing whoosh, short, dry, no music |
| `shot_hit` | Projectile splatting against a target, a wet pop, short, dry, no music |
| `boss_blob` | Enormous gelatinous blob monster roar, wet and bubbling, about two seconds, dry, no music |
| `boss_squatch` | Huge Sasquatch roar echoing through a forest, about two seconds, no music |
| `boss_kingpin` | Giant bowling pin monster bellow with bowling pins crashing, about two seconds, no music |
| `boss_collector` | Deep demonic voice laughing over a cash register ching and rattling chains, about two seconds, no music |
| `boss_stomp` | Gigantic monster stomp, a heavy ground-shaking boom, short, no music |
| `pickup_item` | Retro arcade item pickup chime, bright and quick, no music |
| `pickup_rare` | Sparkly rare treasure pickup jingle, two bright rising notes, retro arcade, short |
| `pickup_health` | Satisfying bite of a pizza slice with a happy little crunch, short, dry, no music |
| `rescue` | Short cheerful crowd of people cheering and clapping, about one second, no music |
| `power_up` | Retro arcade power-up jingle, rising and energetic, about one second |

## Batch 5: ambience loops (10 sounds, Type: **Loop**)

Quiet background bed for each stage, under the radio. Optional, but it makes each place feel real.

| File | Prompt |
|---|---|
| `amb_suburb` | Quiet suburban night ambience, crickets, a distant dog bark, a faint car passing, seamless loop, no music |
| `amb_school` | Empty school hallway at night, buzzing fluorescent lights, a distant locker slam, seamless loop, no music |
| `amb_camp` | Forest at night by a lake, crickets, frogs, an owl, wind in pine trees, seamless loop, no music |
| `amb_rink` | Empty roller rink, a disco ball motor humming, distant skate wheels rolling, seamless loop, no music |
| `amb_drivein` | Drive-in movie lot at night, crickets, a faint movie playing through car speakers, light rain on cars, seamless loop, no melody |
| `amb_bowling` | Bowling alley ambience, balls rolling and pins crashing in the distance, arcade machine bleeps, seamless loop, no music |
| `amb_warehouse` | Dark video store warehouse, humming lights, a VCR whirring, distant metal shelves creaking, seamless loop, no music |
| `amb_waterpark` | Abandoned water park at night, running water, dripping, a pool filter humming, seamless loop, no music |
| `amb_studio` | Dark TV studio, electrical hum, distant TV static, a camera dolly creaking, seamless loop, no music |
| `amb_crater` | Alien crash site at night, an eerie low electronic drone, crackling fire, distant strange chirps, seamless loop, no music |

---

**When the files reach me:** I add a sound player that picks between each sound's takes, pitches each one slightly differently every time, and plays it at the right moment: swings and impacts per hero weapon, voices on effort/hurt/knock-down, monster cues as they wind up, death cries, boss roars on arrival, shots, pickups, and each stage's ambience under the radio. A **SOUND EFFECTS** volume already exists in Settings and will control all of it. Anything not yet made keeps its old blip. Nothing to redeploy on the server.
