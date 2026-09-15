import React, { useEffect, useRef } from 'react';
import { ThemeMode, ColorPalette } from '../types';
import { PALETTES } from '../utils/themeSystem';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ConstellationCanvasProps {
  themeMode?: ThemeMode;
  palette?: ColorPalette;
}

export const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({
  themeMode = 'dark',
  palette = 'emerald',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(themeMode);
  const paletteRef = useRef(palette);
  const particlesRef = useRef<Particle[]>([]);

  // Keep refs in sync and update particle colors dynamically when theme or palette changes
  useEffect(() => {
    themeRef.current = themeMode;
    paletteRef.current = palette;

    const pal = PALETTES[palette] || PALETTES.emerald;
    const currentColors = themeMode === 'dark' ? pal.dotColorDark : pal.dotColorLight;

    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p) => {
        p.color = currentColors[Math.floor(Math.random() * currentColors.length)];
      });
    }
  }, [themeMode, palette]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    // Track mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse.isActive || mouse.x < 0) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (!mouse.isActive || mouse.x < 0) {
          mouse.x = touch.clientX;
          mouse.y = touch.clientY;
        }
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      setupCanvasSize();
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    const initParticles = () => {
      const isMobile = width < 768;
      const count = isMobile
        ? Math.min(Math.max(Math.floor((width * height) / 36000), 14), 22)
        : Math.min(Math.max(Math.floor((width * height) / 22000), 30), 60);

      const pal = PALETTES[paletteRef.current] || PALETTES.emerald;
      const cols = themeRef.current === 'dark' ? pal.dotColorDark : pal.dotColorLight;
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 0.9 + 0.6;
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.16 : 0.22),
          vy: (Math.random() - 0.5) * (isMobile ? 0.16 : 0.22),
          radius: baseRadius,
          baseRadius,
          color: cols[Math.floor(Math.random() * cols.length)],
          alpha: Math.random() * 0.4 + 0.15,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = newParticles;
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const curPal = PALETTES[paletteRef.current] || PALETTES.emerald;
      const primaryColor = isDark
        ? curPal.primary
        : paletteRef.current === 'emerald'
        ? '#059669'
        : paletteRef.current === 'ultraviolet'
        ? '#7E22CE'
        : '#D97706';
      const secondaryColor = isDark
        ? curPal.secondary
        : paletteRef.current === 'emerald'
        ? '#0284C7'
        : paletteRef.current === 'ultraviolet'
        ? '#0284C7'
        : '#EA580C';

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle ambient glow circle around cursor if active
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const radialGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.3
        );
        radialGradient.addColorStop(
          0,
          isDark ? curPal.glow : 'rgba(15, 23, 42, 0.04)'
        );
        radialGradient.addColorStop(
          0.6,
          isDark ? 'rgba(0, 240, 255, 0.015)' : 'rgba(2, 132, 199, 0.02)'
        );
        radialGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      const particles = particlesRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders smoothly
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Gentle twinkle
        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.twinklePhase));

        // Interactive mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let activeRadius = p.baseRadius;
        if (dist < mouse.radius && mouse.isActive) {
          const force = (1 - dist / mouse.radius) * 0.35;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          activeRadius = p.baseRadius * (1 + (1 - dist / mouse.radius) * 0.8);
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.min(Math.max(currentAlpha, 0.08), 0.7);
        ctx.fillStyle = p.color;
        if (activeRadius > 1.4 && isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, activeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle, delicate glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const isMobile = width < 768;
          const maxDist = isMobile ? 75 : 115;

          if (cdist < maxDist) {
            const lineAlpha = (1 - cdist / maxDist) * (isMobile ? 0.05 : 0.07);
            ctx.save();
            ctx.strokeStyle = primaryColor;
            ctx.globalAlpha = isDark ? lineAlpha : lineAlpha * 1.4;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Connect to mouse if close
        if (mouse.isActive && dist < mouse.radius) {
          const mouseLineAlpha = (1 - dist / mouse.radius) * 0.15;
          ctx.save();
          ctx.strokeStyle = secondaryColor;
          ctx.globalAlpha = isDark ? mouseLineAlpha : mouseLineAlpha * 1.2;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 dark:opacity-70 opacity-60 print:hidden transition-opacity duration-500"
      style={{ willChange: 'transform' }}
    />
  );
};
