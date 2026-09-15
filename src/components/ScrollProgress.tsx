import React, { useEffect, useState } from 'react';
import { subscribeLenis } from '../utils/smoothScroll';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const calculated = Math.min(1, Math.max(0, currentScroll / docHeight));
      setProgress(calculated);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    // Calculate initial value
    calculateProgress();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Synchronous, reactive connection to Lenis via subscribeLenis
    let activeLenisOff: (() => void) | null = null;

    const unsubscribeLenisInit = subscribeLenis((lenis) => {
      if (activeLenisOff) {
        activeLenisOff();
        activeLenisOff = null;
      }

      if (lenis) {
        const handleLenisScroll = (e: any) => {
          if (typeof e?.progress === 'number') {
            setProgress(Math.min(1, Math.max(0, e.progress)));
          } else {
            onScroll();
          }
        };

        lenis.on('scroll', handleLenisScroll);
        activeLenisOff = () => {
          try {
            lenis.off('scroll', handleLenisScroll);
          } catch {
            // ignore
          }
        };
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (activeLenisOff) activeLenisOff();
      unsubscribeLenisInit();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none print:hidden bg-transparent"
    >
      {/* Minimalist Progress Track with Dynamic Palette Gradient */}
      <div
        className="h-full origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          opacity: progress > 0.001 ? 1 : 0,
          transition: 'opacity 150ms ease-out',
          background: 'var(--accent-gradient)',
          boxShadow: '0 0 12px var(--accent-glow)',
        }}
      />

      {/* Leading Photon Tracer Pulse Dot */}
      {progress > 0.005 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: `clamp(4px, ${progress * 100}%, calc(100% - 4px))`,
            backgroundColor: 'var(--accent-secondary)',
            boxShadow: '0 0 8px var(--accent-secondary), 0 0 16px var(--accent-primary)',
          }}
        />
      )}
    </div>
  );
};
