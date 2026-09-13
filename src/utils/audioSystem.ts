// Pure Web Audio API Sound Synthesis System (Zero external dependencies)

let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

// Initialize sound state from localStorage safely
export const initSoundPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('portfolio_sound_enabled');
  // Default to false so it is never intrusive, but user can toggle anytime
  isSoundEnabled = saved === 'true';
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

export type SoundType = 'click' | 'open' | 'close' | 'switch' | 'success';

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
        // Soft airy swoosh up (for opening palettes / modals)
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
        // Crisp dual-click
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
    }
  } catch {
    // Ignore audio errors gracefully on un-interacted or unsupported contexts
  }
};
