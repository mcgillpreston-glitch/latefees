# The Last Video Store

*The Dead Don't Rewind.*

A 1–4 player side-scrolling beat-'em-up set in Hollow Pines, Ohio, summer 1996. Four slacker twentysomethings fight B-movie monsters across 10 stages, from a cul-de-sac to the meteor crater, rescuing neighbors and collecting Diablo-style loot along the way.

The game is two files: `index.html` (the page, renderer and input) and `game-core.js` (the rules). Open `index.html` in any browser, or play the hosted build on GitHub Pages.

## Online play

Pick **Online** on the title screen. One player hosts a room and gets a 4-letter code; friends open the same page on their own devices and join with the code. The room runs on a Cloudflare Worker with one Durable Object per room, which executes the same `game-core.js` the browser uses, so nobody has a lag advantage and a dropped player can rejoin.

The server lives in [`server/`](server/). Deploy it with `wrangler deploy` and paste the printed address into the **Room server address** box under the game.

## Controls

- **Player 1 (keyboard):** WASD move, J hit, K jump, L special, I gear, Enter join/pause
- **Player 2 (keyboard):** arrows move, `,` hit, `.` jump, `/` special, `'` gear, Right Shift join/pause
- **Controllers (Bluetooth or USB):** stick/d-pad move, X hit, A jump, B special, Select gear, Start join/pause
- Every player's keys and buttons can be remapped from **Controls** on the title screen or pause menu.

## Running locally

No build step. Open `index.html` directly, or serve the folder with any static server.
