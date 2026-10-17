# The Lost Library

A cozy, complete five-room vocabulary adventure for start.ng. Explore a magical library, act on words in the environment, recover five pages, and restore the Great Book.

## Play

Open `index.html` directly, or serve this folder with any static server. No build, installation, backend, or API keys are needed. Use arrows/WASD, E to inspect, J for the journal, H for hints, and P/Escape to pause. Touch arrow controls and tap-to-walk are available. Every puzzle has three hint levels and unlimited attempts.

## Contents

- Five handcrafted rooms, each with two vocabulary challenges and one observation/route challenge.
- Eight unique words with definitions and scene-specific examples. The final chamber revisits two words in new contexts.
- The Broken Passage supports repairing the middle bridge or taking either outer walkway.
- Local browser saving, continue, pause, optional gentle sound effects, and a completion screen with a protected replay action.
- A start.ng character renderer supporting the documented body, clothing colours, skin, hairstyles, hats, and accessories. Outside start.ng, a clearly labelled local preview character is used.
- `startng.json` declares progress-based leaderboard columns: `rooms` and `words`. Duplicate interactions never accumulate rewards. start.ng keeps the best run.
- `cover.png`: 1600 × 1000, under 2 MB. Cover generated with the built-in image generation tool from a prompt for a cozy magical library, floating pages, an explorer, the title “The Lost Library”, and the specified navy/cream/teal/gold/pink palette.

## Integration

The hidden `https://start.ng/connect` frame implements whoami, score saving, and leaderboard queries. Replies validate both origin and source window, and correlate request IDs. Identity refreshes on tab focus and visibility changes. Guests can sign in through start.ng. The game does not ask for passwords or handle account credentials. Integration only responds on a published `*.start.ng` domain; character fetching and shared score saving require live verification after approval.

Progress is stored only in the current browser under `lost-library-v1`, shared by people using that browser. It is not an account or cross-device save. Sign-in enables the shared best-run leaderboard, not cloud adventure saves.

## Publish

The built files are in the repository root. Call `POST https://api.start.ng/games/check` with `{"repo_url":"https://github.com/chinonsograce/the-lost-library","name":"the-lost-library"}`. Fix reported errors, then send the same body to `/games/publish`. Open its returned approval URL and approve once. Later pushes update the game automatically. Requirements: https://start.ng/docs.md.

## Accessibility

Keyboard-accessible menus and native dialogs, visible focus, touch targets, a text list of nearby objects, readable puzzle descriptions, no timed challenges, no flashing or mandatory sound, and reduced-motion CSS. The canvas map is supplemented by object buttons, but full nonvisual route navigation is not implemented.

## Art and audio

Room and character art is drawn directly on canvas; cover art is AI generated. Sound effects are synthesized locally. Fonts use Google Fonts with local serif and sans-serif fallbacks; gameplay remains functional offline.
