import React, { useEffect, useRef } from 'react';

interface SoundManagerProps {
  enabled: boolean;
  gameState: any;
}

const SoundManager: React.FC<SoundManagerProps> = ({ enabled, gameState }) => {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const effectRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Create ambient sound (simulated with Web Audio API)
    const createAmbientSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      
      // Add some variation
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
      lfoGain.gain.setValueAtTime(5, audioContext.currentTime);
      
      oscillator.start();
      lfo.start();
      
      return { oscillator, lfo, audioContext };
    };

    let ambientSound: any = null;
    
    try {
      ambientSound = createAmbientSound();
    } catch (error) {
      console.log('Audio context not supported');
    }

    return () => {
      if (ambientSound) {
        try {
          ambientSound.oscillator.stop();
          ambientSound.lfo.stop();
          ambientSound.audioContext.close();
        } catch (error) {
          console.log('Error stopping audio');
        }
      }
    };
  }, [enabled]);

  // Play effect sounds based on game state changes
  useEffect(() => {
    if (!enabled) return;

    const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.log('Audio effect not supported');
      }
    };

    // Play sounds based on game state
    if (gameState.escapeAttempts > 0) {
      playBeep(200, 0.5, 0.2); // Warning sound
    }
    
    if (gameState.hasAnonymityTracker) {
      playBeep(800, 0.2, 0.1); // Success sound
    }

  }, [gameState.escapeAttempts, gameState.hasAnonymityTracker, enabled]);

  return null; // This component doesn't render anything
};

export default SoundManager;