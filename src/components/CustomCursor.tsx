import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentTrailX = -100;
    let currentTrailY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, [role="button"], .interactive-hover');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animateTrail = () => {
      currentTrailX += (mouseX - currentTrailX) * 0.18;
      currentTrailY += (mouseY - currentTrailY) * 0.18;
      setTrailingPos({ x: currentTrailX, y: currentTrailY });
      animId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          backgroundColor: '#00F0FF',
          borderRadius: '50%',
          boxShadow: '0 0 10px #00F0FF',
        }}
      />
      {/* Outer aura trailing ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 16)}px, ${trailingPos.y - (isHovered ? 24 : 16)}px, 0)`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid #2EE6A0' : '1px solid rgba(46, 230, 160, 0.4)',
          backgroundColor: isHovered ? 'rgba(46, 230, 160, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(46, 230, 160, 0.3)' : 'none',
        }}
      />
    </>
  );
};
