// Level definitions
const levels = [
    // Level 1
    {
        player: { x: 50, y: 50 },
        platforms: [
            { x: 0, y: 580, width: 800, height: 20 },    // Bottom
            { x: 0, y: 0, width: 20, height: 600 },      // Left
            { x: 780, y: 0, width: 20, height: 600 },    // Right
            { x: 0, y: 0, width: 800, height: 20 },      // Top
            { x: 200, y: 400, width: 400, height: 20 },  // Middle platform
            { x: 100, y: 200, width: 20, height: 200 },  // Vertical obstacle
            { x: 600, y: 200, width: 20, height: 200 }   // Vertical obstacle
        ],
        keys: [
            { x: 400, y: 350 },
            { x: 700, y: 100 }
        ],
        door: { x: 730, y: 530, width: 40, height: 50 }
    },
    
    // Level 2
    {
        player: { x: 50, y: 50 },
        platforms: [
            { x: 0, y: 580, width: 800, height: 20 },    // Bottom
            { x: 0, y: 0, width: 20, height: 600 },      // Left
            { x: 780, y: 0, width: 20, height: 600 },    // Right
            { x: 0, y: 0, width: 800, height: 20 },      // Top
            { x: 150, y: 150, width: 100, height: 20 },  // Platform 1
            { x: 350, y: 250, width: 100, height: 20 },  // Platform 2
            { x: 550, y: 350, width: 100, height: 20 },  // Platform 3
            { x: 250, y: 450, width: 100, height: 20 },  // Platform 4
            { x: 400, y: 100, width: 20, height: 300 }   // Vertical obstacle
        ],
        keys: [
            { x: 190, y: 120 },
            { x: 390, y: 220 },
            { x: 590, y: 320 }
        ],
        door: { x: 290, y: 400, width: 40, height: 50 }
    },
    
    // Level 3
    {
        player: { x: 50, y: 50 },
        platforms: [
            { x: 0, y: 580, width: 800, height: 20 },    // Bottom
            { x: 0, y: 0, width: 20, height: 600 },      // Left
            { x: 780, y: 0, width: 20, height: 600 },    // Right
            { x: 0, y: 0, width: 800, height: 20 },      // Top
            { x: 100, y: 100, width: 600, height: 20 },  // Upper platform
            { x: 100, y: 400, width: 600, height: 20 },  // Lower platform
            { x: 100, y: 120, width: 20, height: 280 },  // Left vertical
            { x: 700, y: 120, width: 20, height: 280 },  // Right vertical
            { x: 300, y: 200, width: 200, height: 20 },  // Middle platform
            { x: 400, y: 220, width: 20, height: 180 }   // Middle vertical
        ],
        keys: [
            { x: 150, y: 350 },
            { x: 650, y: 350 },
            { x: 400, y: 150 },
            { x: 200, y: 50 }
        ],
        door: { x: 650, y: 50, width: 40, height: 50 }
    }
];
