# The Lost Library — a word at a time

A complete letter-wheel vocabulary game for start.ng. Connect letters, discover words, read their meanings and example sentences, and restore a magical library. The current version replaces the earlier exploration gameplay with the word-building concept requested by the owner.

## Play

Open index.html directly or serve this folder using any static server. No build, installation, server, or API keys are needed. Pick Easy, Hard, or Very Hard, then Let’s play. There are four handcrafted levels per difficulty, 12 in total. Any level can be revisited; prior discoveries remain found. There is no timer, life count, paid hint, or penalty for trying.

Tap letters and press Find word, or swipe across letters and lift your finger. Each tile can be used once per word; wheels with repeated letters have separate tiles. Undo, Clear, Shuffle, free progressive hints, and Show me are available. The first puzzle guides C → A → T. Keyboard users can focus and activate letter buttons, or type letters and use Enter/Backspace.

## Learning and celebrations

vocabulary.js contains an authored word collection. Each accepted word has a simple definition and an original example sentence. Required words fill the page, and other buildable entries are bonus discoveries. This is a curated collection, not an exhaustive English dictionary: feedback states when a word is outside the collection rather than claiming it is not English.

Rare discovery is an editorial collection badge, not a measured frequency ranking. Specialist and literary entries were checked against Cambridge Dictionary:

- Lumen: https://dictionary.cambridge.org/us/dictionary/english/lumen
- Isle: https://dictionary.cambridge.org/us/dictionary/english/isle
- Thane: https://dictionary.cambridge.org/dictionary/english/thane
- Tor: https://dictionary.cambridge.org/dictionary/english/tor

A discovery card shows meaning and sentence without blocking the next word. Every word enters the journal once. Celebrations use gentle chimes, locally synthesized applause, and optional sparkles. Completing a level unlocks an optional two-choice sentence exercise with retry feedback. Sentence practice is tracked once per level. GLOW lights the scenery, STAR reveals stars, and PLANT brings flowers back.

## Saving and identity

The new adventure saves in this browser under lost-library-words-v2. Existing lost-library-v1 exploration saves are preserved separately and are not converted into word-game scores. Saving is local to this browser, not an account or cross-device save. Loaded word data is validated against known puzzles and their letter counts; duplicate rewards and journal entries are prevented.

The documented start.ng connect iframe supplies player or guest identity, face picture, character style, leaderboard reads, and best-run score submissions. Both message origin and source window are checked and request IDs are correlated. Identity refreshes on focus and visibility changes. The original renderer retains supported body, skin, clothing, hair, hat, and accessory details. Guests can play and sign in. No passwords or account credentials are collected.

startng.json declares levels completed and unique words discovered. Replays do not add duplicate progress. Live authentication and score saving require the published start.ng origin.

## Art, audio, accessibility

The library backdrop and cover were generated using the built-in image generation tool. The backdrop prompt requested a painterly magical library, perimeter shelves, moonlit windows, golden lanterns, pink vines, and spacious wooden floor, without text or characters. library-room.webp is the optimized asset. Morrow uses an AI-generated transparent portrait derived from the LinkedIn launch artwork: the silver-haired lady with gold glasses, a teal embroidered jacket, pink lapels, and a welcoming wave. The built-in image-generation edit prompt preserved those appearance details and isolated her on a transparent background. The optimized asset is morrow-lady.webp; an SVG wrapper provides gentle motion and blinking, disabled for reduced motion. The player is drawn on canvas.

An original melody, soft chord pads, effects, and applause are synthesized locally using Web Audio. Music starts on Play/Continue unless muted. Enable music is also available. Browser autoplay rules require a gesture. Sound preference is stored separately as lost-library-audio-v1. Hidden tabs stop audio; returning resumes with a tap fallback when needed.

Controls have accessible names and focus styles. Puzzle rows expose word lengths and found words. Feedback uses live text. Touch and keyboard input are supported, and reduced-motion settings disable decorative movement. Fonts have local fallbacks; gameplay works without network access after assets are loaded.

## Publishing

Ready-to-play index.html and assets are committed in the repository root. Use POST https://api.start.ng/games/check with {"repo_url":"https://github.com/chinonsograce/the-lost-library","name":"the-lost-library"}, fix reported errors, and send the same body to /games/publish. The game is already approved, so successful publications update it directly. Requirements: https://start.ng/docs.md.

Unlinked earlier exploration scripts remain in the repository for reference and rollback. The new page loads vocabulary.js, word-art.js, wordgame.js, audio.js, and the library-3d.js module.

## Three.js integration

The game bundles Three.js r180 (MIT license in vendor/three-LICENSE.txt) and uses a real WebGLRenderer, PerspectiveCamera, scene graph, geometry, lighting and raycasting in library-3d.js. The interactive library is visible on the welcome screen and beside gameplay; Visit the library opens a larger view. Drag or arrow keys rotate the scene. Tapping the open Great Book gives a clue. Word discoveries brighten its lanterns, completed levels add floating pages, and the 3D explorer is rebuilt from start.ng character style. It preserves documented body, colours, hair, hats and accessories. Reduced motion removes ambient movement; hidden tabs stop rendering. Without WebGL the existing 2D character and fully playable word game remain available. Modules require HTTP(S) hosting for the 3D view.
