import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { subscribeLenis } from '../utils/smoothScroll';

/**
 * Ultra-modern, high-fidelity scroll progress indicator.
 * Combines Lenis smooth scrolling with Framer Motion spring physics (60/120 FPS),
 * dynamic CSS theme palette gradients, atmospheric glow, and a photon micro-spark tip.
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rawProgress = useMotionValue(0);

  useEffect(() => {
    // 1. Reactive binding to Framer Motion's viewport scroll tracker
    const unsubscribeFm = scrollYProgress.on('change', (latest) => {
      rawProgress.set(latest);
    });

    // 2. Direct reactive subscription to Lenis virtual scroll engine
    let activeLenisOff: (() => void) | null = null;
    const unsubscribeLenisInit = subscribeLenis((lenis) => {
      if (activeLenisOff) {
        activeLenisOff();
        activeLenisOff = null;
      }

      if (lenis) {
        const handleLenisScroll = (e: any) => {
          if (typeof e?.progress === 'number') {
            rawProgress.set(Math.min(1, Math.max(0, e.progress)));
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

    // 3. Fallback calculation for initial page offset on mount/refresh
    const calculateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        rawProgress.set(Math.min(1, Math.max(0, currentScroll / docHeight)));
      }
    };

    calculateProgress();
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      unsubscribeFm();
      unsubscribeLenisInit();
      if (activeLenisOff) activeLenisOff();
      window.removeEventListener('resize', calculateProgress);
    };
  }, [scrollYProgress, rawProgress]);

  // Critically damped spring physics (zeta ~ 1.06) for responsive, silky-smooth 60/120 FPS
  // tracking without notch stutter or sluggish lag
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.0005,
  });

  // Smooth, continuous fade transitions instead of binary ternary jumps
  const barOpacity = useTransform(smoothProgress, [0, 0.002, 0.008], [0, 0.7, 1]);
  const sparkOpacity = useTransform(smoothProgress, [0, 0.004, 0.012], [0, 0.5, 1]);

  // Micro-spark accurately tracks the leading edge throughout the entire 0% - 100% range
  const sparkLeft = useTransform(
    smoothProgress,
    (v) => `${Math.min(100, Math.max(0, v * 100))}%`
  );

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] sm:h-[3px] pointer-events-none select-none print:hidden"
    >
      {/* Subtle translucent ambient background track */}
      <div className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.05] backdrop-blur-[0.5px]" />

      {/* Reactive High-Fidelity Gradient Progress Bar */}
      <motion.div
        className="h-full w-full origin-left rounded-r-full will-change-transform"
        style={{
          scaleX: smoothProgress,
          opacity: barOpacity,
          background: 'var(--accent-gradient-primary, var(--accent-gradient))',
          boxShadow:
            '0 0 10px var(--accent-glow), 0 0 20px var(--accent-glow-secondary, var(--accent-glow))',
        }}
      />

      {/* Leading Photon / Micro-Spark Glow Tip */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          left: sparkLeft,
          opacity: sparkOpacity,
        }}
      >
        {/* Soft radial glow flare that leads the track */}
        <span
          className="absolute w-7 h-7 rounded-full blur-[4px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, var(--accent-secondary) 0%, var(--accent-primary) 50%, transparent 75%)',
            opacity: 0.85,
          }}
        />

        {/* Pulsing aura ring */}
        <span
          className="absolute w-3.5 h-3.5 rounded-full animate-ping pointer-events-none opacity-40"
          style={{
            backgroundColor: 'var(--accent-primary)',
          }}
        />

        {/* High-intensity micro-crystal light spark */}
        <span
          className="relative w-2 h-2 rounded-full bg-white dark:bg-white shadow-[0_0_6px_#ffffff,0_0_12px_var(--accent-primary),0_0_18px_var(--accent-secondary)]"
        />
      </motion.div>
    </div>
  );
};
