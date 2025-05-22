# Gravity Shifter

A unique browser-based puzzle platformer where you can change the direction of gravity to navigate through challenging levels.

## Game Concept

In Gravity Shifter, you control a character who can manipulate gravity in four directions (up, down, left, right). The goal is to collect all keys in each level to unlock the exit door and progress to the next challenge.

## Features

- **Unique Gravity Mechanics**: Change gravity direction to solve puzzles in creative ways
- **Physics-Based Gameplay**: Objects and the player respond realistically to gravity shifts
- **Multiple Levels**: Progressively challenging levels with unique layouts
- **Visual Effects**: Particle effects for gravity shifts and key collection
- **Sound Effects**: Audio feedback for player actions
- **Responsive Design**: Playable on both desktop and mobile devices

## How to Play

1. Use arrow keys or on-screen buttons to change gravity direction
2. Collect all keys in each level to unlock the exit door
3. Reach the exit door to complete the level
4. Progress through all levels to win the game

## Running the Game Locally

1. Clone or download this repository
2. Open the `index.html` file in a modern web browser
3. Alternatively, you can use a local development server:
   - If you have Node.js installed, you can use `npx http-server` in the project directory
   - If you have Python installed, navigate to the project directory and run:
     - Python 3: `python -m http.server`
     - Python 2: `python -m SimpleHTTPServer`

## Adding Sound Effects

The game is set up to use sound effects, but the actual audio files need to be added:

1. Create the following audio files in MP3 format:
   - `gravity-shift.mp3`
   - `collect.mp3`
   - `door-unlock.mp3`
   - `win.mp3`
   - `background-music.mp3`
2. Place these files in the `assets/audio/` directory
3. Uncomment the audio source line in the `createAudioElement` method in `audio.js`

## Customization

- **Adding Levels**: Edit the `levels.js` file to create new level layouts
- **Changing Visuals**: Modify the CSS files to change the game's appearance
- **Adjusting Physics**: Tweak parameters in the `physics.js` and `player.js` files

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Future Enhancements

- More levels with increasing complexity
- Power-ups and special abilities
- Time-based challenges
- Level editor
- High score system
