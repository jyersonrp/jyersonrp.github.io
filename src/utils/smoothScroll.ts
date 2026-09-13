import Lenis from 'lenis';

type LenisListener = (lenis: Lenis | null) => void;
const lenisListeners = new Set<LenisListener>();

let lenisInstance: Lenis | null = null;

export const setLenisInstance = (instance: Lenis | null) => {
  lenisInstance = instance;
  lenisListeners.forEach((listener) => {
    try {
      listener(instance);
    } catch {
      // ignore
    }
  });
};

export const getLenisInstance = (): Lenis | null => {
  return lenisInstance;
};

export const subscribeLenis = (listener: LenisListener): (() => void) => {
  lenisListeners.add(listener);
  if (lenisInstance) {
    try {
      listener(lenisInstance);
    } catch {
      // ignore
    }
  }
  return () => {
    lenisListeners.delete(listener);
  };
};

/**
 * Smoothly scrolls to a target element or offset using Lenis when available,
 * falling back to native scroll.
 */
export const smoothScrollTo = (target: string | HTMLElement | number) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.2,
      offset: typeof target === 'number' ? 0 : -88,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};
