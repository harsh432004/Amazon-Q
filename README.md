# Gravity Shifter

A unique browser-based puzzle platformer where you can change the direction of gravity to navigate through challenging levels.

## Game Concept

In Gravity Shifter, you control a character who can manipulate gravity in four directions (up, down, left, right). The goal is to collect all keys in each level to unlock the exit door and progress to the next challenge.

## Features

- **Unique Gravity Mechanics**: Change gravity direction to solve puzzles in creative ways
- **Physics-Based Gameplay**: Objects and the player respond realistically to gravity shifts
- **Multiple Levels**: Six progressively challenging levels with unique layouts
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

## Sound Effects

The game includes the following sound effects:
- Gravity shift sound
- Key collection sound
- Door unlock sound
- Level completion sound
- Background music

## Level Descriptions

1. **Introduction**: Learn the basics of gravity shifting
2. **Platform Hopping**: Navigate between floating platforms
3. **Enclosed Challenge**: Maneuver through a complex enclosed space
4. **Maze Challenge**: Find your way through a gravity-defying maze
5. **Gravity Chambers**: Navigate through multiple connected chambers
6. **Orbital Challenge**: Master gravity control to orbit around obstacles

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
