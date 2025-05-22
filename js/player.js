// Player class
class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.velocityX = 0;
        this.velocityY = 0;
        this.game = game;
        this.isGrounded = false;
        this.element = document.createElement('div');
        this.element.className = 'player';
        
        // Add player to the canvas
        this.game.canvas.appendChild(this.element);
        this.updatePosition();
    }
    
    update() {
        // Apply gravity
        const gravityStrength = 0.5;
        this.velocityX += this.game.gravity.x * gravityStrength;
        this.velocityY += this.game.gravity.y * gravityStrength;
        
        // Apply max velocity
        const maxVelocity = 8;
        this.velocityX = Math.max(Math.min(this.velocityX, maxVelocity), -maxVelocity);
        this.velocityY = Math.max(Math.min(this.velocityY, maxVelocity), -maxVelocity);
        
        // Calculate new position
        let newX = this.x + this.velocityX;
        let newY = this.y + this.velocityY;
        
        // Check for collisions and adjust position
        const collision = this.game.physics.checkPlatformCollisions(
            newX, newY, this.width, this.height
        );
        
        if (collision) {
            // Handle collision response
            if (collision.direction === 'horizontal') {
                this.velocityX = 0;
                newX = collision.adjustedX;
            } else if (collision.direction === 'vertical') {
                this.velocityY = 0;
                newY = collision.adjustedY;
            }
        }
        
        // Check boundaries
        const canvasWidth = this.game.canvas.clientWidth;
        const canvasHeight = this.game.canvas.clientHeight;
        
        if (newX < 0) {
            newX = 0;
            this.velocityX = 0;
        } else if (newX + this.width > canvasWidth) {
            newX = canvasWidth - this.width;
            this.velocityX = 0;
        }
        
        if (newY < 0) {
            newY = 0;
            this.velocityY = 0;
        } else if (newY + this.height > canvasHeight) {
            newY = canvasHeight - this.height;
            this.velocityY = 0;
        }
        
        // Update position
        this.x = newX;
        this.y = newY;
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        
        // Visual feedback for gravity direction
        let rotation = 0;
        if (this.game.gravity.x === 1) rotation = 90;
        else if (this.game.gravity.y === 1) rotation = 180;
        else if (this.game.gravity.x === -1) rotation = 270;
        
        this.element.style.transform = `rotate(${rotation}deg)`;
    }
}
