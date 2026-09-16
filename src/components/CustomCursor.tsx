import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId: number;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        trailX = mouseX;
        trailY = mouseY;
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (hasMoved) setIsVisible(true);
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.18;
      trailY += (mouseY - trailY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animateTrail);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(animateTrail);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="print:hidden">
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[70] transition-opacity duration-300"
        style={{
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          backgroundColor: 'var(--accent-secondary, #00F0FF)',
          borderRadius: '50%',
          boxShadow: '0 0 10px var(--accent-secondary, #00F0FF)',
          willChange: 'transform',
        }}
      />
      {/* Outer aura trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[70] transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid var(--accent-primary, #2EE6A0)'
            : '1px solid var(--accent-glow, rgba(46, 230, 160, 0.4))',
          backgroundColor: isHovered
            ? 'var(--accent-glow, rgba(46, 230, 160, 0.08))'
            : 'transparent',
          boxShadow: isHovered
            ? '0 0 20px var(--accent-glow, rgba(46, 230, 160, 0.3))'
            : 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
