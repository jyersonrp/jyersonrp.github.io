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
      {/* Minimalist Progress Track with Neon Emerald & Cyan Gradient */}
      <div
        className="h-full bg-gradient-to-r from-[#2EE6A0] via-[#00F0FF] to-[#2EE6A0] shadow-[0_0_8px_rgba(46,230,160,0.8),0_0_16px_rgba(0,240,255,0.4)] origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          opacity: progress > 0.001 ? 1 : 0,
          transition: 'opacity 150ms ease-out',
        }}
      />

      {/* Leading Photon Tracer Pulse Dot */}
      {progress > 0.005 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF,0_0_16px_#2EE6A0] pointer-events-none"
          style={{
            left: `clamp(4px, ${progress * 100}%, calc(100% - 4px))`,
          }}
        />
      )}
    </div>
  );
};
