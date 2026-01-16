# FPS Shooter

A small browser-based 3D first-person shooter demo built with Three.js and Vite.
Click to lock the pointer, aim with the mouse, and shoot targets to increase your score.
Difficulty levels affect target count, speed, and overall game time.

---

## Quick Start

### Requirements
- Node.js (16+ recommended)
- npm

### Installation & Run
npm install
npm run dev

Open the URL printed by Vite (usually:
http://localhost:5173)

---

## Project Structure

index.html  
Main HTML file; mounts the app and score UI.

package.json  
Project metadata and dev scripts (Vite).

vite.config.js  
Vite configuration.

main.js  
Core game logic: scene, renderer, loaders, game loop.

manager.js  
UIManager class: builds UI, loading screen, timer, and score.

Target.js  
Target behavior and collision handling.

beginner.js  
Beginner difficulty configuration.

intermediate.js  
Intermediate difficulty configuration.

professional.js  
Professional difficulty configuration.

public/models/*.glb  
3D assets (gun, spaceships).

glocksound.mp3  
Shoot sound effect.

skyinvasion.jpg  
Scene background image.

style.css  
Basic styling for UI elements.

---

## How To Play

1. Click a difficulty button (Beginner / Intermediate / Professional).
2. Wait for the countdown to finish.
3. Pointer lock will engage automatically.
4. Move the mouse to aim.
5. Left-click to shoot targets.
6. Score increases for every hit.
7. The game ends when the timer runs out.

---

## Controls & Notes

Mouse  
Aim

Left Click  
Shoot

Notes:
- First user interaction enables audio (browser autoplay policy).
- If pointer lock fails, click inside the canvas or browser window.

---

## Levels

Beginner  
More time, fewer and slower targets.  
See beginner.js

Intermediate  
Moderate difficulty.  
See intermediate.js

Professional  
Fast targets, higher count, shorter time.  
See professional.js

---
## Implementation Notes

- Built with Three.js and Vite for fast development.
- Dependencies are listed in package.json.
- UIManager centralizes DOM creation and loading logic.
- Assets are stored under public and loaded via relative paths.

---

## Troubleshooting

No audio  
Click anywhere on the page to initialize audio.

Pointer lock not engaging  
Ensure you click inside the canvas and allow browser permissions.

Missing models or textures  
Check the console for failed network requests and verify files under public.

---

## Vercel Live link problems
gun.glb is not loading although locally the gun loads succesfully 

