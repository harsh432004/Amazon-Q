// Physics system
class Physics {
    constructor(game) {
        this.game = game;
    }
    
    checkCollision(x1, y1, width1, height1, x2, y2, width2, height2) {
        return (
            x1 < x2 + width2 &&
            x1 + width1 > x2 &&
            y1 < y2 + height2 &&
            y1 + height1 > y2
        );
    }
    
    checkPlatformCollisions(playerX, playerY, playerWidth, playerHeight) {
        for (const platform of this.game.gameObjects.platforms) {
            if (this.checkCollision(
                playerX, playerY, playerWidth, playerHeight,
                platform.x, platform.y, platform.width, platform.height
            )) {
                // Determine collision direction
                const previousPlayerRight = this.game.gameObjects.player.x + playerWidth;
                const previousPlayerBottom = this.game.gameObjects.player.y + playerHeight;
                const previousPlayerLeft = this.game.gameObjects.player.x;
                const previousPlayerTop = this.game.gameObjects.player.y;
                
                const platformRight = platform.x + platform.width;
                const platformBottom = platform.y + platform.height;
                
                // Calculate overlap on each side
                const overlapLeft = previousPlayerRight - platform.x;
                const overlapRight = platformRight - previousPlayerLeft;
                const overlapTop = previousPlayerBottom - platform.y;
                const overlapBottom = platformBottom - previousPlayerTop;
                
                // Find the smallest overlap
                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                
                // Adjust position based on the smallest overlap
                if (minOverlap === overlapLeft && this.game.gravity.x <= 0) {
                    return {
                        direction: 'horizontal',
                        adjustedX: platform.x - playerWidth
                    };
                } else if (minOverlap === overlapRight && this.game.gravity.x >= 0) {
                    return {
                        direction: 'horizontal',
                        adjustedX: platformRight
                    };
                } else if (minOverlap === overlapTop && this.game.gravity.y <= 0) {
                    return {
                        direction: 'vertical',
                        adjustedY: platform.y - playerHeight
                    };
                } else if (minOverlap === overlapBottom && this.game.gravity.y >= 0) {
                    return {
                        direction: 'vertical',
                        adjustedY: platformBottom
                    };
                }
            }
        }
        
        return null;
    }
}
