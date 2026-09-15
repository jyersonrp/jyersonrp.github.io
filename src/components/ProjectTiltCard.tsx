import React, { useRef, useEffect } from 'react';

interface ProjectTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const ProjectTiltCard: React.FC<ProjectTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    // Disable entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number | null = null;
    let isHovered = false;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let targetGlareX = 50;
    let targetGlareY = 50;
    let currentGlareX = 50;
    let currentGlareY = 50;

    let targetGlareOpacity = 0;
    let currentGlareOpacity = 0;

    const updatePhysics = () => {
      // Smooth lerp physics
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;
      currentGlareX += (targetGlareX - currentGlareX) * 0.14;
      currentGlareY += (targetGlareY - currentGlareY) * 0.14;
      currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * 0.12;

      card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(3)}deg) rotateY(${currentRotY.toFixed(3)}deg) translateZ(4px)`;
      glare.style.opacity = currentGlareOpacity.toFixed(3);
      glare.style.background = `radial-gradient(circle 440px at ${currentGlareX.toFixed(1)}% ${currentGlareY.toFixed(1)}%, rgba(255, 255, 255, 0.22), var(--accent-glow, rgba(46, 230, 160, 0.1)) 40%, transparent 75%)`;

      // Check if animation has settled to idle
      const isSettled =
        !isHovered &&
        Math.abs(currentRotX) < 0.02 &&
        Math.abs(currentRotY) < 0.02 &&
        currentGlareOpacity < 0.005;

      if (isSettled) {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        glare.style.opacity = '0';
        rafId = null;
      } else {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const handleMouseEnter = () => {
      isHovered = true;
      targetGlareOpacity = 0.14;
      startAnimation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Inverted Y for natural 3D tilt
      targetRotX = -percentY * maxTilt;
      targetRotY = percentX * maxTilt;

      targetGlareX = (x / rect.width) * 100;
      targetGlareY = (y / rect.height) * 100;
      targetGlareOpacity = 0.15;

      startAnimation();
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
      targetGlareOpacity = 0;
      startAnimation();
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative ${className}`}
    >
      {/* Specular glare dynamic reflection overlay (Zero re-render RAF driven) */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-none"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};
