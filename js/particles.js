// Particle system for visual effects
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.particles = [];
    }
    
    createParticle(x, y, color, size, lifetime, velocityX, velocityY) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = '1';
        particle.style.pointerEvents = 'none';
        
        this.canvas.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x,
            y,
            velocityX,
            velocityY,
            size,
            lifetime,
            age: 0,
            opacity: 1
        });
    }
    
    createGravityShiftEffect(player) {
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        const colors = ['#4fc3f7', '#29b6f6', '#03a9f4', '#039be5'];
        
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            const size = 3 + Math.random() * 5;
            const lifetime = 30 + Math.random() * 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.createParticle(
                centerX,
                centerY,
                color,
                size,
                lifetime,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }
    
    createCollectEffect(x, y) {
        const colors = ['#ffeb3b', '#fdd835', '#fbc02d', '#f9a825'];
        
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const size = 2 + Math.random() * 4;
            const lifetime = 20 + Math.random() * 15;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.createParticle(
                x,
                y,
                color,
                size,
                lifetime,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }
    
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            
            // Update age
            particle.age++;
            
            // Update opacity based on lifetime
            particle.opacity = 1 - (particle.age / particle.lifetime);
            
            // Update visual
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.opacity;
            
            // Remove if expired
            if (particle.age >= particle.lifetime) {
                this.canvas.removeChild(particle.element);
                this.particles.splice(i, 1);
            }
        }
    }
}
