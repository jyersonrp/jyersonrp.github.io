// Pure Web Audio API Sound Synthesis System (Zero external dependencies)

let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

// Initialize sound state from localStorage safely (defaults to enabled for immediate interactive feedback)
export const initSoundPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('portfolio_sound_enabled');
  // If not explicitly turned off by user, enable it so simulations and preview sounds are immediately audible
  isSoundEnabled = saved !== 'false';
  return isSoundEnabled;
};

export const setSoundEnabled = (enabled: boolean): void => {
  isSoundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_sound_enabled', enabled ? 'true' : 'false');
    if (enabled) {
      unlockAudio();
    }
  }
};

export const getSoundEnabled = (): boolean => isSoundEnabled;

export const unlockAudio = (): void => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
};

// Automatically listen for first user gesture to unlock AudioContext
if (typeof window !== 'undefined') {
  const handleFirstInteraction = () => {
    unlockAudio();
    window.removeEventListener('pointerdown', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  };
  window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
  window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });
  window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
}

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export type SoundType = 'click' | 'open' | 'close' | 'switch' | 'success' | 'simulation' | 'scan' | 'action' | 'boot';

export const playSound = (type: SoundType = 'click'): void => {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (type) {
      case 'click': {
        // Ultra-subtle mechanical tactile click (like a quiet mechanical keyboard switch)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.022);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.022);
        break;
      }
      case 'open': {
        // Soft airy swoosh up (for opening palettes / modals / preview drawers)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'close': {
        // Subtle downward pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 'switch': {
        // Crisp dual-click for tabs
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.setValueAtTime(1150, now + 0.02);

        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
        break;
      }
      case 'success': {
        // Delicate harmonic two-tone chord (D5, A5)
        const notes = [587.33, 880];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.035);

          gain.gain.setValueAtTime(0.02, now + i * 0.035);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.035 + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.035);
          osc.stop(now + i * 0.035 + 0.12);
        });
        break;
      }
      case 'simulation': {
        // Futuristic cyber synth chime for triggering live simulations (AI inference / FSM concurrency)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(660, now);
        osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);

        gain.gain.setValueAtTime(0.038, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.12);
        osc2.stop(now + 0.12);
        break;
      }
      case 'scan': {
        // High-tech digital camera / radar pulse blip for switching CCTV feeds
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1350, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.038);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.038);
        break;
      }
      case 'action': {
        // Quick energetic tactile pulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.05);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 'boot': {
        // Ethereal cyber-luxury startup chord (A3, E4, B4, F#5) with gentle harmonic bloom
        const frequencies = [220, 329.63, 493.88, 739.99];
        const chordGain = ctx.createGain();
        const lowpass = ctx.createBiquadFilter();

        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(450, now);
        lowpass.frequency.exponentialRampToValueAtTime(3200, now + 0.35);
        lowpass.frequency.exponentialRampToValueAtTime(1200, now + 0.7);

        chordGain.gain.setValueAtTime(0.001, now);
        chordGain.gain.linearRampToValueAtTime(0.045, now + 0.08);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime(idx * 4 - 6, now);
          osc.connect(lowpass);
          osc.start(now);
          osc.stop(now + 0.75);
        });

        lowpass.connect(chordGain);
        chordGain.connect(ctx.destination);
        break;
      }
    }
  } catch {
    // Ignore audio errors gracefully on un-interacted or unsupported contexts
  }
};
