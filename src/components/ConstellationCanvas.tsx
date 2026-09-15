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
  isHero?: boolean;
}

interface MicroStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Meteor {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  color: string;
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
  const microStarsRef = useRef<MicroStar[]>([]);
  const meteorRef = useRef<Meteor>({
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 0,
    alpha: 0,
    color: '#00F0FF',
  });

  // Keep refs in sync and update particle colors dynamically when theme or palette changes
  useEffect(() => {
    themeRef.current = themeMode;
    paletteRef.current = palette;

    const pal = PALETTES[palette] || PALETTES.emerald;
    const isDark = themeMode === 'dark';
    const currentColors = isDark ? pal.dotColorDark : pal.dotColorLight;

    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p, idx) => {
        p.color = currentColors[idx % currentColors.length];
        p.alpha = isDark ? Math.random() * 0.35 + 0.30 : Math.random() * 0.25 + 0.70;
        p.baseRadius = p.isHero
          ? isDark ? 2.6 : 3.0
          : isDark ? Math.random() * 1.0 + 0.7 : Math.random() * 1.3 + 1.2;
        p.radius = p.baseRadius;
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
      radius: 175,
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

    // Initialize all particle layers
    const initParticles = () => {
      const isMobile = width < 768;
      const pal = PALETTES[paletteRef.current] || PALETTES.emerald;
      const isDark = themeRef.current === 'dark';
      const cols = isDark ? pal.dotColorDark : pal.dotColorLight;

      // Layer 0: Cosmic Micro-Dust (Deep 3D field)
      const microCount = isMobile ? 32 : 64;
      const newMicroStars: MicroStar[] = [];
      for (let i = 0; i < microCount; i++) {
        newMicroStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          radius: Math.random() * 0.55 + 0.45,
          alpha: isDark ? Math.random() * 0.4 + 0.15 : Math.random() * 0.35 + 0.35,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      microStarsRef.current = newMicroStars;

      // Layer 1: Constellation Grid Nodes
      const count = isMobile
        ? Math.min(Math.max(Math.floor((width * height) / 32000), 24), 34)
        : Math.min(Math.max(Math.floor((width * height) / 16500), 50), 80);

      const newParticles: Particle[] = [];
      // Assign 5 hero beacon stars evenly distributed
      const heroIndices = new Set([2, 9, 17, 26, 38]);

      for (let i = 0; i < count; i++) {
        const isHero = heroIndices.has(i);
        const baseRadius = isHero
          ? (isDark ? 2.6 : 3.0)
          : (isDark ? Math.random() * 1.0 + 0.7 : Math.random() * 1.3 + 1.2);

        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.24),
          vy: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.24),
          radius: baseRadius,
          baseRadius,
          color: isHero ? pal.primary : cols[i % cols.length],
          alpha: isHero
            ? (isDark ? 0.9 : 1.0)
            : (isDark ? Math.random() * 0.35 + 0.30 : Math.random() * 0.25 + 0.70),
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          isHero,
        });
      }

      particlesRef.current = newParticles;
    };

    initParticles();

    // Shooting star scheduler (every 7 to 11 seconds)
    let nextMeteorTime = Date.now() + 4000;

    const maybeSpawnMeteor = () => {
      const now = Date.now();
      const meteor = meteorRef.current;
      if (!meteor.active && now > nextMeteorTime) {
        const pal = PALETTES[paletteRef.current] || PALETTES.emerald;
        const isDark = themeRef.current === 'dark';
        const startX = Math.random() * (width * 0.75);
        const startY = Math.random() * (height * 0.35);
        const speed = Math.random() * 4 + 7;
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 deg downward-right

        meteor.active = true;
        meteor.x = startX;
        meteor.y = startY;
        meteor.vx = Math.cos(angle) * speed;
        meteor.vy = Math.sin(angle) * speed;
        meteor.length = Math.random() * 60 + 80;
        meteor.alpha = isDark ? 0.85 : 0.75;
        meteor.color = isDark ? pal.primary : (pal.id === 'emerald' ? '#059669' : pal.id === 'ultraviolet' ? '#7E22CE' : '#D97706');

        nextMeteorTime = now + (Math.random() * 5000 + 7000);
      }
    };

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

      // -------------------------------------------------------------
      // 1. DYNAMIC VOLUMETRIC AURORA NEBULAE (Fluid harmonic oscillation)
      // -------------------------------------------------------------
      const nowTime = Date.now() * 0.00035;

      // Nebula 1: Primary floating organic accent glow
      const a1X = width * 0.22 + Math.cos(nowTime) * 90;
      const a1Y = height * 0.28 + Math.sin(nowTime * 0.8) * 70;
      const a1Radius = Math.max(width, height) * 0.55;
      const grad1 = ctx.createRadialGradient(a1X, a1Y, 0, a1X, a1Y, a1Radius);

      if (isDark) {
        grad1.addColorStop(
          0,
          curPal.id === 'emerald'
            ? 'rgba(46, 230, 160, 0.065)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(168, 85, 247, 0.065)'
            : 'rgba(245, 158, 11, 0.065)'
        );
        grad1.addColorStop(
          0.5,
          curPal.id === 'emerald'
            ? 'rgba(0, 240, 255, 0.022)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(56, 189, 248, 0.022)'
            : 'rgba(249, 115, 22, 0.022)'
        );
        grad1.addColorStop(1, 'transparent');
      } else {
        grad1.addColorStop(
          0,
          curPal.id === 'emerald'
            ? 'rgba(5, 150, 105, 0.13)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(126, 34, 206, 0.13)'
            : 'rgba(217, 119, 6, 0.13)'
        );
        grad1.addColorStop(
          0.5,
          curPal.id === 'emerald'
            ? 'rgba(2, 132, 199, 0.05)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(2, 132, 199, 0.05)'
            : 'rgba(234, 88, 12, 0.05)'
        );
        grad1.addColorStop(1, 'transparent');
      }

      ctx.save();
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(a1X, a1Y, a1Radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Nebula 2: Secondary floating organic accent glow
      const a2X = width * 0.78 + Math.sin(nowTime * 0.7) * 100;
      const a2Y = height * 0.72 + Math.cos(nowTime * 0.9) * 80;
      const a2Radius = Math.max(width, height) * 0.50;
      const grad2 = ctx.createRadialGradient(a2X, a2Y, 0, a2X, a2Y, a2Radius);

      if (isDark) {
        grad2.addColorStop(
          0,
          curPal.id === 'emerald'
            ? 'rgba(0, 240, 255, 0.055)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(56, 189, 248, 0.055)'
            : 'rgba(249, 115, 22, 0.055)'
        );
        grad2.addColorStop(0.55, 'rgba(15, 23, 42, 0.012)');
        grad2.addColorStop(1, 'transparent');
      } else {
        grad2.addColorStop(
          0,
          curPal.id === 'amber'
            ? 'rgba(234, 88, 12, 0.11)'
            : 'rgba(2, 132, 199, 0.11)'
        );
        grad2.addColorStop(
          0.55,
          curPal.id === 'emerald'
            ? 'rgba(5, 150, 105, 0.04)'
            : 'rgba(126, 34, 206, 0.04)'
        );
        grad2.addColorStop(1, 'transparent');
      }

      ctx.save();
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(a2X, a2Y, a2Radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Nebula 3: Center ambient spatial depth
      const a3X = width * 0.5 + Math.cos(nowTime * 0.5) * 60;
      const a3Y = height * 0.52 + Math.sin(nowTime * 0.6) * 50;
      const a3Radius = Math.max(width, height) * 0.45;
      const grad3 = ctx.createRadialGradient(a3X, a3Y, 0, a3X, a3Y, a3Radius);
      if (isDark) {
        grad3.addColorStop(0, 'rgba(14, 165, 233, 0.028)');
        grad3.addColorStop(1, 'transparent');
      } else {
        grad3.addColorStop(0, 'rgba(30, 41, 59, 0.05)');
        grad3.addColorStop(1, 'transparent');
      }
      ctx.save();
      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.arc(a3X, a3Y, a3Radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // 2. LAYER 0: COSMIC MICRO-DUST (Distant Deep-Field Stars)
      // -------------------------------------------------------------
      const microStars = microStarsRef.current;
      for (let i = 0; i < microStars.length; i++) {
        const ms = microStars[i];
        ms.x += ms.vx;
        ms.y += ms.vy;

        if (ms.x < 0) ms.x = width;
        else if (ms.x > width) ms.x = 0;
        if (ms.y < 0) ms.y = height;
        else if (ms.y > height) ms.y = 0;

        ms.twinklePhase += ms.twinkleSpeed;
        const alpha = ms.alpha * (0.65 + 0.35 * Math.sin(ms.twinklePhase));

        ctx.save();
        ctx.fillStyle = isDark ? '#E2E8F0' : '#475569';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(ms.x, ms.y, ms.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.085;
      mouse.y += (mouse.targetY - mouse.y) * 0.085;

      // -------------------------------------------------------------
      // 3. INTERACTIVE FLASHLIGHT / CURSOR AURA GLOW
      // -------------------------------------------------------------
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.35
        );
        cursorGlow.addColorStop(
          0,
          isDark ? curPal.glow : 'rgba(30, 41, 59, 0.09)'
        );
        const secStop = isDark
          ? curPal.id === 'emerald'
            ? 'rgba(0, 240, 255, 0.025)'
            : curPal.id === 'ultraviolet'
            ? 'rgba(56, 189, 248, 0.025)'
            : 'rgba(249, 115, 22, 0.025)'
          : curPal.id === 'emerald'
          ? 'rgba(5, 150, 105, 0.055)'
          : curPal.id === 'ultraviolet'
          ? 'rgba(126, 34, 206, 0.055)'
          : 'rgba(217, 119, 6, 0.055)';
        cursorGlow.addColorStop(0.65, secStop);
        cursorGlow.addColorStop(1, 'transparent');

        ctx.save();
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 4. LAYER 1: CONSTELLATION NODES & HERO BEACONS
      // -------------------------------------------------------------
      const particles = particlesRef.current;
      const isMobile = width < 768;
      mouse.radius = isMobile ? 130 : 180;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport boundaries smoothly
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Twinkle cycle
        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = isDark
          ? p.alpha * (0.7 + 0.3 * Math.sin(p.twinklePhase))
          : p.alpha * (0.8 + 0.2 * Math.sin(p.twinklePhase));

        // Gravitational cursor reactivity
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let activeRadius = p.baseRadius;
        if (dist < mouse.radius && mouse.isActive && dist > 1) {
          const force = 1 - dist / mouse.radius;
          const pull = force * (isMobile ? 0.045 : 0.07);
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
          p.vx += (-dy / dist) * pull * 0.35;
          p.vy += (dx / dist) * pull * 0.35;
          p.vx *= 0.96;
          p.vy *= 0.96;
          activeRadius = p.baseRadius * (1 + force * 0.75);
        }

        // Damping velocity toward cruising speed
        const speed = Math.hypot(p.vx, p.vy);
        const maxCruisingSpeed = isMobile ? 0.22 : 0.30;
        if (speed > maxCruisingSpeed) {
          p.vx *= 0.975;
          p.vy *= 0.975;
        }

        // Draw Hero Beacon Outer Halo Ring
        if (p.isHero) {
          const haloPhase = Math.sin(p.twinklePhase * 1.5) * 0.25 + 0.75;
          const haloRadius = activeRadius * (isDark ? 4.5 : 4.0);

          ctx.save();
          const haloGrad = ctx.createRadialGradient(p.x, p.y, activeRadius, p.x, p.y, haloRadius);
          haloGrad.addColorStop(0, isDark ? `${primaryColor}55` : `${primaryColor}44`);
          haloGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = haloGrad;
          ctx.globalAlpha = haloPhase;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Core Star
        ctx.save();
        ctx.globalAlpha = isDark
          ? Math.min(Math.max(currentAlpha, 0.20), 0.85)
          : Math.min(Math.max(currentAlpha, 0.55), 0.95);
        ctx.fillStyle = p.color;

        if (activeRadius > 1.2 || p.isHero) {
          ctx.shadowColor = isDark
            ? p.color
            : (p.color.startsWith('#') ? `${p.color}50` : 'rgba(51, 65, 85, 0.45)');
          ctx.shadowBlur = p.isHero ? (isDark ? 9 : 7) : (isDark ? 5 : 4);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, activeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Constellation connection lines
        const maxDist = isMobile ? 88 : 130;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < maxDist) {
            const factor = 1 - cdist / maxDist;
            ctx.save();

            if (isDark) {
              const hasHero = p.isHero || p2.isHero;
              ctx.strokeStyle = hasHero ? secondaryColor : primaryColor;
              ctx.globalAlpha = factor * (hasHero ? 0.28 : 0.20);
              ctx.lineWidth = hasHero ? 0.8 : 0.6;
            } else {
              const isAccent =
                p.color === primaryColor ||
                p2.color === primaryColor ||
                p.color === secondaryColor ||
                p2.color === secondaryColor;
              ctx.strokeStyle = isAccent ? primaryColor : '#334155';
              ctx.globalAlpha = factor * 0.36;
              ctx.lineWidth = 0.95;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Mouse elastic beam connection
        if (mouse.isActive && dist < mouse.radius) {
          const mouseLineFactor = 1 - dist / mouse.radius;
          ctx.save();
          ctx.strokeStyle = secondaryColor;
          ctx.globalAlpha = isDark
            ? mouseLineFactor * 0.26
            : mouseLineFactor * 0.42;
          ctx.lineWidth = isDark ? 0.8 : 1.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // -------------------------------------------------------------
      // 5. LAYER 2: CELESTIAL SHOOTING STAR / METEOR TRAIL
      // -------------------------------------------------------------
      maybeSpawnMeteor();
      const meteor = meteorRef.current;
      if (meteor.active) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.alpha -= 0.016; // smooth decay

        if (meteor.alpha <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteor.active = false;
        } else {
          // Calculate tail origin
          const tailX = meteor.x - (meteor.vx / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;
          const tailY = meteor.y - (meteor.vy / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;

          ctx.save();
          const meteorGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          meteorGrad.addColorStop(0, 'transparent');
          meteorGrad.addColorStop(0.7, isDark ? `${meteor.color}66` : `${meteor.color}88`);
          meteorGrad.addColorStop(1, isDark ? '#FFFFFF' : meteor.color);

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = isDark ? 1.75 : 2.0;
          ctx.lineCap = 'round';
          ctx.globalAlpha = meteor.alpha;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();

          // Meteor head particle sparkle
          ctx.fillStyle = isDark ? '#FFFFFF' : meteor.color;
          ctx.shadowColor = meteor.color;
          ctx.shadowBlur = isDark ? 8 : 6;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, isDark ? 1.5 : 1.8, 0, Math.PI * 2);
          ctx.fill();
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
      className="fixed inset-0 pointer-events-none z-0 print:hidden transition-opacity duration-500"
      style={{ willChange: 'transform' }}
    />
  );
};
