import React, { useEffect, useRef } from 'react';

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

export const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      isActive: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Create particles based on screen area
    let particles: Particle[] = [];
    const colors = ['#2EE6A0', '#00F0FF', '#E2E8F0', '#94A3B8'];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 11000), 120);

      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 1.8 + 0.6;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw subtle glow circle around cursor if active
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const radialGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.4
        );
        radialGradient.addColorStop(0, 'rgba(46, 230, 160, 0.08)');
        radialGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
        radialGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Twinkle
        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinklePhase));

        // Interactive mouse interaction (magnetic attraction & glow)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let activeRadius = p.baseRadius;
        if (dist < mouse.radius && mouse.isActive) {
          const force = (1 - dist / mouse.radius) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          activeRadius = p.baseRadius * (1 + (1 - dist / mouse.radius) * 1.5);
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.min(Math.max(currentAlpha, 0.1), 1);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = activeRadius > 2.5 ? 8 : 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, activeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxDist = 110;

          if (cdist < maxDist) {
            const lineAlpha = (1 - cdist / maxDist) * 0.15;
            ctx.save();
            ctx.strokeStyle = '#2EE6A0';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Connect to mouse if close
        if (mouse.isActive && dist < mouse.radius) {
          const mouseLineAlpha = (1 - dist / mouse.radius) * 0.28;
          ctx.save();
          ctx.strokeStyle = '#00F0FF';
          ctx.globalAlpha = mouseLineAlpha;
          ctx.lineWidth = 1;
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
};
