Folder Structure 
fps-shooter/
│
├─ public/
│   ├─ models/
│   │   └─ gun.glb
│   ├─ sounds/
│   │   └─ click.mp3          # gunshot / click sounds
│   ├─ textures/
│   │   └─ target-texture.png # optional textures for targets
│   └─ fonts/
│       └─ arcade.ttf         # optional font files
│
# FPS Shooter

A small browser-based 3D first-person shooter demo built with Three.js and Vite. Click to lock pointer, aim with the mouse, and shoot targets to increase your score. Difficulty levels change target counts, speed, and game time.

## Quick Start

- Requirements: Node.js (16+ recommended) and npm.
- Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open the server URL printed by Vite (usually http://localhost:5173).

## Project Structure (important files)

- [index.html](index.html) — main HTML file; mounts the app and score UI.
- [package.json](package.json) — project metadata and `dev` script (`vite`).
- [vite.config.js](vite.config.js) — Vite configuration.
- [src/main.js](src/main.js) — core game logic: scene, renderer, loaders, game loop.
- [src/manager.js](src/manager.js) — `UIManager` class: builds UI, loading screen, timer, score.
- [src/components/Target.js](src/components/Target.js) — `Target` class: target behavior and collisions.
- [src/levels/beginner.js](src/levels/beginner.js), [src/levels/intermediate.js](src/levels/intermediate.js), [src/levels/professional.js](src/levels/professional.js) — level configs.
- public/models/*.glb — 3D assets (gun, spaceships).
- public/sounds/glocksound.mp3 — shoot sound.
- public/textures/envMaps/skyinvasion.jpg — scene background.
- public/css/style.css — basic styling for UI elements.

## How To Play

- Click a difficulty button (Beginner/Intermediate/Professional) to start the countdown.
- After the countdown, pointer lock will engage; move the mouse to aim.
- Left-click to shoot. Each hit increases the score.
- The timer and score are displayed on-screen. When time runs out the game ends.

Controls and notes:
- Use the mouse to aim; left click to shoot.
- First user interaction enables audio (browser autoplay policies).
- If pointer lock fails, try clicking inside the canvas or browser window.

## Levels

- Beginner: more time, fewer slow targets. See [src/levels/beginner.js](src/levels/beginner.js).
- Intermediate: moderate challenge. See [src/levels/intermediate.js](src/levels/intermediate.js).
- Professional: fast, many targets, short time. See [src/levels/professional.js](src/levels/professional.js).

## Implementation Notes

- Built with `three` (r3r+) and `vite` for fast development. Dependencies are listed in `package.json`.
- `UIManager` centralizes DOM creation and the loading manager to keep `main.js` focused on game logic.
- Assets live under `public/` and are referenced by loaders with paths like `/models/gun.glb` and `/sounds/glocksound.mp3`.

## Troubleshooting

- No audio: browsers require a user gesture; click the page to initialize audio.
- Pointer lock not engaging: ensure you click the canvas and allow pointer permissions in the browser.
- Missing models/textures errors: check the console for failing network requests and verify files under `public/`.

## Next Steps / Suggestions

- Add a build script and production bundling: `vite build` + simple static host.
- Add more target types, hit effects, scoring multipliers, and a high-score table (localStorage).

---

If you want, I can also:

- add a `start`/`build` script to `package.json`,
- create a minimal CONTRIBUTING or LICENSE file, or
- run the dev server here and verify the app opens in the default browser.

Edited README in repository to summarize the codebase and usage.


