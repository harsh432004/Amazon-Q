// Audio controller
class AudioController {
    constructor() {
        this.sounds = {
            gravityShift: this.createAudioElement('gravity-shift'),
            collect: this.createAudioElement('collect'),
            doorUnlock: this.createAudioElement('door-unlock'),
            win: this.createAudioElement('win'),
            backgroundMusic: this.createAudioElement('background-music', true)
        };
        
        // Set volume levels
        this.sounds.backgroundMusic.volume = 0.3;
    }
    
    createAudioElement(name, loop = false) {
        // Create audio element with source
        const audio = document.createElement('audio');
        audio.id = `sound-${name}`;
        
        // Set the audio source
        audio.src = `assets/audio/${name}.mp3`;
        
        if (loop) {
            audio.loop = true;
        }
        
        document.body.appendChild(audio);
        return audio;
    }
    
    playGravityShift() {
        this.playSound(this.sounds.gravityShift);
    }
    
    playCollect() {
        this.playSound(this.sounds.collect);
    }
    
    playDoorUnlock() {
        this.playSound(this.sounds.doorUnlock);
    }
    
    playWin() {
        this.playSound(this.sounds.win);
    }
    
    playBackgroundMusic() {
        this.sounds.backgroundMusic.play().catch(e => {
            // Handle autoplay restrictions
            console.log('Background music autoplay prevented. User interaction required.');
        });
    }
    
    playSound(sound) {
        // Reset the audio to the beginning if it's already playing
        sound.currentTime = 0;
        sound.play().catch(e => {
            // Handle autoplay restrictions
            console.log('Sound playback prevented. User interaction required.');
        });
    }
}
