// Main game controller
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.levelNumber = 1;
        this.maxLevels = 6; // Total number of levels
        this.keysCollected = 0;
        this.keysTotal = 0;
        this.gravity = { x: 0, y: 1 }; // Default gravity: down
        this.gameObjects = {
            player: null,
            platforms: [],
            keys: [],
            door: null
        };
        this.gameState = 'start'; // start, playing, levelComplete, gameOver
        
        // DOM elements
        this.levelNumberElement = document.getElementById('level-number');
        this.keysCollectedElement = document.getElementById('keys-collected');
        this.keysTotalElement = document.getElementById('keys-total');
        this.startScreen = document.getElementById('start-screen');
        this.levelCompleteScreen = document.getElementById('level-complete');
        this.gameOverScreen = document.getElementById('game-over');
        
        // Initialize systems
        this.physics = new Physics(this);
        this.audio = new AudioController();
        this.particles = new ParticleSystem(this.canvas);
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.gameState !== 'playing') return;
            
            switch(e.key) {
                case 'ArrowUp':
                    this.changeGravity(0, -1);
                    break;
                case 'ArrowRight':
                    this.changeGravity(1, 0);
                    break;
                case 'ArrowDown':
                    this.changeGravity(0, 1);
                    break;
                case 'ArrowLeft':
                    this.changeGravity(-1, 0);
                    break;
            }
        });
        
        // Button controls
        document.getElementById('gravity-up').addEventListener('click', () => {
            if (this.gameState === 'playing') this.changeGravity(0, -1);
        });
        
        document.getElementById('gravity-right').addEventListener('click', () => {
            if (this.gameState === 'playing') this.changeGravity(1, 0);
        });
        
        document.getElementById('gravity-down').addEventListener('click', () => {
            if (this.gameState === 'playing') this.changeGravity(0, 1);
        });
        
        document.getElementById('gravity-left').addEventListener('click', () => {
            if (this.gameState === 'playing') this.changeGravity(-1, 0);
        });
        
        // Game flow buttons
        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('next-level').addEventListener('click', () => {
            this.loadNextLevel();
        });
        
        document.getElementById('restart-game').addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.startScreen.classList.add('hidden');
        this.loadLevel(this.levelNumber);
        this.audio.playBackgroundMusic();
        this.gameLoop();
    }
    
    loadLevel(levelNum) {
        // Clear previous level
        this.clearLevel();
        
        // Get level data
        const levelData = levels[levelNum - 1];
        if (!levelData) return;
        
        // Set up level
        this.levelNumberElement.textContent = levelNum;
        this.keysCollected = 0;
        this.keysTotal = levelData.keys.length;
        this.keysTotalElement.textContent = this.keysTotal;
        this.keysCollectedElement.textContent = this.keysCollected;
        
        // Reset gravity
        this.gravity = { x: 0, y: 1 };
        
        // Create player
        this.gameObjects.player = new Player(
            levelData.player.x,
            levelData.player.y,
            this
        );
        
        // Create platforms
        levelData.platforms.forEach(platform => {
            const platformElement = document.createElement('div');
            platformElement.className = 'platform';
            platformElement.style.width = platform.width + 'px';
            platformElement.style.height = platform.height + 'px';
            platformElement.style.left = platform.x + 'px';
            platformElement.style.top = platform.y + 'px';
            
            this.canvas.appendChild(platformElement);
            this.gameObjects.platforms.push({
                element: platformElement,
                x: platform.x,
                y: platform.y,
                width: platform.width,
                height: platform.height
            });
        });
        
        // Create keys
        levelData.keys.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';
            keyElement.style.left = key.x + 'px';
            keyElement.style.top = key.y + 'px';
            
            this.canvas.appendChild(keyElement);
            this.gameObjects.keys.push({
                element: keyElement,
                x: key.x,
                y: key.y,
                width: 20,
                height: 20,
                collected: false
            });
        });
        
        // Create door
        const doorElement = document.createElement('div');
        doorElement.className = 'door';
        doorElement.style.width = levelData.door.width + 'px';
        doorElement.style.height = levelData.door.height + 'px';
        doorElement.style.left = levelData.door.x + 'px';
        doorElement.style.top = levelData.door.y + 'px';
        
        this.canvas.appendChild(doorElement);
        this.gameObjects.door = {
            element: doorElement,
            x: levelData.door.x,
            y: levelData.door.y,
            width: levelData.door.width,
            height: levelData.door.height,
            unlocked: false
        };
    }
    
    clearLevel() {
        // Remove all game objects from the canvas
        while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
        }
        
        // Reset game objects
        this.gameObjects = {
            player: null,
            platforms: [],
            keys: [],
            door: null
        };
    }
    
    changeGravity(x, y) {
        // Don't change if it's the same direction
        if (this.gravity.x === x && this.gravity.y === y) return;
        
        this.gravity = { x, y };
        this.audio.playGravityShift();
        this.particles.createGravityShiftEffect(this.gameObjects.player);
        
        // Visual feedback for gravity change
        document.querySelectorAll('.gravity-btn').forEach(btn => {
            btn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        if (y === -1) document.getElementById('gravity-up').style.backgroundColor = 'rgba(79, 195, 247, 0.6)';
        else if (x === 1) document.getElementById('gravity-right').style.backgroundColor = 'rgba(79, 195, 247, 0.6)';
        else if (y === 1) document.getElementById('gravity-down').style.backgroundColor = 'rgba(79, 195, 247, 0.6)';
        else if (x === -1) document.getElementById('gravity-left').style.backgroundColor = 'rgba(79, 195, 247, 0.6)';
    }
    
    collectKey(keyIndex) {
        const key = this.gameObjects.keys[keyIndex];
        if (key && !key.collected) {
            key.collected = true;
            key.element.style.display = 'none';
            this.keysCollected++;
            this.keysCollectedElement.textContent = this.keysCollected;
            this.audio.playCollect();
            this.particles.createCollectEffect(key.x + 10, key.y + 10);
            
            // Check if all keys are collected
            if (this.keysCollected === this.keysTotal) {
                this.unlockDoor();
            }
        }
    }
    
    unlockDoor() {
        this.gameObjects.door.unlocked = true;
        this.gameObjects.door.element.classList.add('unlocked');
        this.audio.playDoorUnlock();
    }
    
    checkDoorReached() {
        if (!this.gameObjects.door.unlocked) return false;
        
        const player = this.gameObjects.player;
        const door = this.gameObjects.door;
        
        // Check collision between player and door
        if (this.physics.checkCollision(
            player.x, player.y, player.width, player.height,
            door.x, door.y, door.width, door.height
        )) {
            return true;
        }
        
        return false;
    }
    
    completeLevel() {
        this.gameState = 'levelComplete';
        this.audio.playWin();
        this.levelCompleteScreen.classList.remove('hidden');
    }
    
    loadNextLevel() {
        this.levelNumber++;
        this.levelCompleteScreen.classList.add('hidden');
        
        if (this.levelNumber > this.maxLevels) {
            this.gameOver();
        } else {
            this.gameState = 'playing';
            this.loadLevel(this.levelNumber);
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.gameOverScreen.classList.remove('hidden');
    }
    
    restartGame() {
        this.levelNumber = 1;
        this.gameOverScreen.classList.add('hidden');
        this.gameState = 'playing';
        this.loadLevel(this.levelNumber);
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update player
        if (this.gameObjects.player) {
            this.gameObjects.player.update();
        }
        
        // Check for key collection
        this.gameObjects.keys.forEach((key, index) => {
            if (!key.collected && this.physics.checkCollision(
                this.gameObjects.player.x, this.gameObjects.player.y, 
                this.gameObjects.player.width, this.gameObjects.player.height,
                key.x, key.y, key.width, key.height
            )) {
                this.collectKey(index);
            }
        });
        
        // Check if player reached the door
        if (this.checkDoorReached()) {
            this.completeLevel();
        }
        
        // Update particles
        this.particles.update();
    }
    
    gameLoop() {
        this.update();
        
        // Continue the game loop
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game when the window loads
window.addEventListener('load', () => {
    const game = new Game();
});
