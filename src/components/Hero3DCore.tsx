import React, { useEffect, useRef, useState } from 'react';
import { Cpu } from 'lucide-react';
import { Language, ThemeMode, ColorPalette } from '../types';
import { PALETTES } from '../utils/themeSystem';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Node3D extends Point3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  pulsePhase: number;
  color: string;
  size: number;
}

interface Satellite3D {
  radius: number;
  tiltX: number;
  tiltY: number;
  speed: number;
  angle: number;
  color: string;
  size: number;
}

interface Hero3DCoreProps {
  language: Language;
  themeMode?: ThemeMode;
  palette?: ColorPalette;
}

export const Hero3DCore: React.FC<Hero3DCoreProps> = ({
  language,
  themeMode = 'dark',
  palette = 'emerald',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const themeRef = useRef(themeMode);
  const paletteRef = useRef(palette);
  const nodesRef = useRef<Node3D[]>([]);
  const satellitesRef = useRef<Satellite3D[]>([]);
  const particlesRef = useRef<(Point3D & { speed: number; phase: number; color: string; size: number })[]>([]);

  // Update refs and refresh dynamic color assignments when theme or palette changes
  useEffect(() => {
    themeRef.current = themeMode;
    paletteRef.current = palette;

    const curPal = PALETTES[palette] || PALETTES.emerald;
    const isDark = themeMode === 'dark';
    const primary = isDark
      ? curPal.primary
      : palette === 'emerald'
      ? '#059669'
      : palette === 'ultraviolet'
      ? '#7E22CE'
      : '#D97706';
    const secondary = isDark
      ? curPal.secondary
      : palette === 'emerald'
      ? '#0284C7'
      : palette === 'ultraviolet'
      ? '#0284C7'
      : '#EA580C';
    const tertiary = isDark
      ? palette === 'emerald'
        ? '#5ef2ba'
        : palette === 'ultraviolet'
        ? '#c084fc'
        : '#fbbf24'
      : palette === 'emerald'
      ? '#10b981'
      : palette === 'ultraviolet'
      ? '#a855f7'
      : '#f59e0b';

    nodesRef.current.forEach((n, i) => {
      n.color = i % 3 === 0 ? secondary : primary;
    });

    if (satellitesRef.current.length >= 3) {
      satellitesRef.current[0].color = primary;
      satellitesRef.current[1].color = secondary;
      satellitesRef.current[2].color = tertiary;
    }

    particlesRef.current.forEach((p) => {
      p.color = Math.random() > 0.4 ? primary : secondary;
    });
  }, [themeMode, palette]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = container.clientWidth || 440;
    let height = container.clientHeight || 440;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = container.clientWidth || 440;
      height = container.clientHeight || 440;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();

    // -------------------------------------------------------------
    // 1. Generate 3D Geodesic Neural Nodes (Fibonacci Sphere)
    // -------------------------------------------------------------
    const isMobile = width < 640;
    const nodeCount = isMobile ? 32 : 56;
    const sphereRadius = Math.min(width, height) * 0.28;
    const nodes: Node3D[] = [];

    const curPal = PALETTES[paletteRef.current] || PALETTES.emerald;
    const isDark = themeRef.current === 'dark';
    const initPrimary = isDark
      ? curPal.primary
      : paletteRef.current === 'emerald'
      ? '#059669'
      : paletteRef.current === 'ultraviolet'
      ? '#7E22CE'
      : '#D97706';
    const initSecondary = isDark
      ? curPal.secondary
      : paletteRef.current === 'emerald'
      ? '#0284C7'
      : paletteRef.current === 'ultraviolet'
      ? '#0284C7'
      : '#EA580C';
    const initTertiary = isDark
      ? paletteRef.current === 'emerald'
        ? '#5ef2ba'
        : paletteRef.current === 'ultraviolet'
        ? '#c084fc'
        : '#fbbf24'
      : paletteRef.current === 'emerald'
      ? '#10b981'
      : paletteRef.current === 'ultraviolet'
      ? '#a855f7'
      : '#f59e0b';

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const isCyan = i % 3 === 0;
      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isCyan ? initSecondary : initPrimary,
        size: isCyan ? 3.2 : 2.5,
      });
    }
    nodesRef.current = nodes;

    // -------------------------------------------------------------
    // 2. Satellites along 3D Orbital Rings
    // -------------------------------------------------------------
    const satellites: Satellite3D[] = [
      {
        radius: sphereRadius * 1.45,
        tiltX: 0.65,
        tiltY: 0.35,
        speed: 1.8,
        angle: 0,
        color: initPrimary,
        size: 4.5,
      },
      {
        radius: sphereRadius * 1.75,
        tiltX: -0.55,
        tiltY: 0.85,
        speed: -1.3,
        angle: Math.PI / 2,
        color: initSecondary,
        size: 4.0,
      },
      {
        radius: sphereRadius * 2.05,
        tiltX: 0.85,
        tiltY: -0.65,
        speed: 1.0,
        angle: Math.PI,
        color: initTertiary,
        size: 3.5,
      },
    ];
    satellitesRef.current = satellites;

    // -------------------------------------------------------------
    // 3. Floating 3D Particulate Cloud
    // -------------------------------------------------------------
    const cloudCount = isMobile ? 26 : 75;
    const particles: (Point3D & {
      speed: number;
      phase: number;
      color: string;
      size: number;
    })[] = [];
    for (let i = 0; i < cloudCount; i++) {
      const r = sphereRadius * (0.9 + Math.random() * 1.4);
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        speed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? initPrimary : initSecondary,
        size: 1 + Math.random() * 1.8,
      });
    }
    particlesRef.current = particles;

    // -------------------------------------------------------------
    // 4. 3D Rotation Physics, Interaction & Inertia
    // -------------------------------------------------------------
    let rotX = 0.3;
    let rotY = 0;
    let velX = 0;
    let velY = 0.005; // Idle auto-spin
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        velY = deltaX * 0.006;
        velX = -deltaY * 0.006;
        rotY += velY;
        rotX += velX;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltX = ny * 0.35;
        targetTiltY = nx * 0.35;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      setIsInteracting(false);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // 5. 3D Projection Engine & Render Loop
    // -------------------------------------------------------------
    let startTime = performance.now();
    const fov = 420;

    const project3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number
    ): { px: number; py: number; pz: number; scale: number; alpha: number } => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const scale = fov / (fov + z2 + sphereRadius * 1.5);
      const px = width / 2 + x1 * scale;
      const py = height / 2 + y2 * scale;
      const alpha = Math.max(0.12, Math.min(1, (z2 + sphereRadius * 1.5) / (sphereRadius * 3)));

      return { px, py, pz: z2, scale, alpha };
    };

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      if (!isDragging) {
        velY *= 0.94;
        velX *= 0.94;
        if (Math.abs(velY) < 0.004) velY = 0.004;
        rotY += velY;
        rotX += velX;
      }

      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      const currentRotX = rotX + tiltX;
      const currentRotY = rotY + tiltY;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      const isDark = themeRef.current === 'dark';
      const activePal = PALETTES[paletteRef.current] || PALETTES.emerald;
      const primary = isDark
        ? activePal.primary
        : paletteRef.current === 'emerald'
        ? '#059669'
        : paletteRef.current === 'ultraviolet'
        ? '#7E22CE'
        : '#D97706';
      const secondary = isDark
        ? activePal.secondary
        : paletteRef.current === 'emerald'
        ? '#0284C7'
        : paletteRef.current === 'ultraviolet'
        ? '#0284C7'
        : '#EA580C';

      // Background Volumetric Glow
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        sphereRadius * 1.8
      );
      bgGrad.addColorStop(
        0,
        isDark ? activePal.glow : 'rgba(15, 23, 42, 0.04)'
      );
      const secondaryGlowStop = isDark
        ? paletteRef.current === 'emerald'
          ? 'rgba(0, 240, 255, 0.05)'
          : paletteRef.current === 'ultraviolet'
          ? 'rgba(56, 189, 248, 0.05)'
          : 'rgba(249, 115, 22, 0.05)'
        : paletteRef.current === 'emerald'
        ? 'rgba(2, 132, 199, 0.03)'
        : paletteRef.current === 'ultraviolet'
        ? 'rgba(2, 132, 199, 0.03)'
        : 'rgba(234, 88, 12, 0.03)';
      bgGrad.addColorStop(0.4, secondaryGlowStop);
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing Central Compute Core
      const corePulse = 1 + Math.sin(elapsed * 3) * 0.15;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        sphereRadius * 0.38 * corePulse
      );
      if (isDark) {
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGrad.addColorStop(0.25, primary);
        coreGrad.addColorStop(0.6, secondary);
      } else {
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.3, primary);
        coreGrad.addColorStop(0.7, secondary);
      }
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 0.38 * corePulse, 0, Math.PI * 2);
      ctx.fill();

      const activeNodes = nodesRef.current;
      const projectedNodes = activeNodes.map((node) => {
        const osc = Math.sin(elapsed * 2 + node.pulsePhase) * 6;
        const scaleDist = (sphereRadius + osc) / sphereRadius;
        const curX = node.baseX * scaleDist;
        const curY = node.baseY * scaleDist;
        const curZ = node.baseZ * scaleDist;

        const proj = project3D(curX, curY, curZ, currentRotX, currentRotY);
        return { ...node, ...proj };
      });

      // Synaptic Connection Lines
      const maxConnectDist = sphereRadius * 0.72;
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxConnectDist) {
            const lineAlpha =
              (1 - dist / maxConnectDist) *
              Math.min(n1.alpha, n2.alpha) *
              (isDark ? 0.45 : 0.65);
            ctx.save();
            ctx.strokeStyle = primary;
            ctx.globalAlpha = lineAlpha;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Orbital Rings
      const ringSteps = isMobile ? 36 : 72;
      satellitesRef.current.forEach((sat, sIdx) => {
        ctx.beginPath();
        let firstX = 0;
        let firstY = 0;

        for (let s = 0; s <= ringSteps; s++) {
          const a = (s / ringSteps) * Math.PI * 2;
          let rx = sat.radius * Math.cos(a);
          let ry = sat.radius * Math.sin(a);
          let rz = 0;

          const cosTx = Math.cos(sat.tiltX);
          const sinTx = Math.sin(sat.tiltX);
          const ry1 = ry * cosTx - rz * sinTx;
          const rz1 = ry * sinTx + rz * cosTx;

          const cosTy = Math.cos(sat.tiltY);
          const sinTy = Math.sin(sat.tiltY);
          const rx2 = rx * cosTy + rz1 * sinTy;
          const rz2 = -rx * sinTy + rz1 * cosTy;

          const proj = project3D(rx2, ry1, rz2, currentRotX, currentRotY);

          if (s === 0) {
            firstX = proj.px;
            firstY = proj.py;
            ctx.moveTo(proj.px, proj.py);
          } else {
            ctx.lineTo(proj.px, proj.py);
          }
        }
        ctx.closePath();
        ctx.save();
        ctx.strokeStyle = sIdx === 1 ? secondary : primary;
        ctx.globalAlpha = isDark ? 0.45 : 0.6;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Glowing Satellite Bead
        const currentAngle = sat.angle + elapsed * sat.speed;
        let sx = sat.radius * Math.cos(currentAngle);
        let sy = sat.radius * Math.sin(currentAngle);
        let sz = 0;

        const cosTx = Math.cos(sat.tiltX);
        const sinTx = Math.sin(sat.tiltX);
        const sy1 = sy * cosTx - sz * sinTx;
        const sz1 = sy * sinTx + sz * cosTx;

        const cosTy = Math.cos(sat.tiltY);
        const sinTy = Math.sin(sat.tiltY);
        const sx2 = sx * cosTy + sz1 * sinTy;
        const sz2 = -sx * sinTy + sz1 * cosTy;

        const satProj = project3D(sx2, sy1, sz2, currentRotX, currentRotY);

        const satGlow = ctx.createRadialGradient(
          satProj.px,
          satProj.py,
          0,
          satProj.px,
          satProj.py,
          sat.size * 3 * satProj.scale
        );
        satGlow.addColorStop(0, sat.color);
        satGlow.addColorStop(0.4, sat.color);
        satGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = satGlow;
        ctx.beginPath();
        ctx.arc(
          satProj.px,
          satProj.py,
          sat.size * 3 * satProj.scale,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(
          satProj.px,
          satProj.py,
          sat.size * 0.9 * satProj.scale,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Neural Nodes with Depth Sorting
      projectedNodes.sort((a, b) => a.pz - b.pz);

      projectedNodes.forEach((node) => {
        const r = node.size * node.scale;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          node.px,
          node.py,
          0,
          node.px,
          node.py,
          r * 2.8
        );
        grad.addColorStop(0, node.color);
        grad.addColorStop(0.5, node.color);
        grad.addColorStop(1, 'transparent');
        ctx.save();
        ctx.globalAlpha = isDark ? node.alpha * 0.6 : node.alpha * 0.8;
        ctx.fillStyle = grad;
        ctx.arc(node.px, node.py, r * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = isDark
          ? node.alpha > 0.6
            ? '#ffffff'
            : node.color
          : node.color;
        ctx.arc(node.px, node.py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating 3D Star Particles
      particlesRef.current.forEach((p) => {
        const dynamicZ = p.z + Math.sin(elapsed * p.speed + p.phase) * 12;
        const proj = project3D(p.x, p.y, dynamicZ, currentRotX, currentRotY);
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isDark ? proj.alpha * 0.7 : proj.alpha * 0.85;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, p.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const curPal = PALETTES[palette] || PALETTES.emerald;
  const isDark = themeMode === 'dark';
  const primaryColor = isDark
    ? curPal.primary
    : palette === 'emerald'
    ? '#059669'
    : palette === 'ultraviolet'
    ? '#7E22CE'
    : '#D97706';
  const secondaryColor = isDark
    ? curPal.secondary
    : palette === 'emerald'
    ? '#0284C7'
    : palette === 'ultraviolet'
    ? '#0284C7'
    : '#EA580C';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] sm:h-[400px] lg:h-[460px] flex items-center justify-center select-none"
    >
      {/* Background Volumetric Aura */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none blur-2xl opacity-70 transition-colors duration-500"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}18, ${secondaryColor}10, transparent 70%)`,
        }}
      />

      {/* 3D Mathematical Canvas Engine */}
      <canvas
        ref={canvasRef}
        aria-label={
          language === 'es'
            ? 'Núcleo neuronal interactivo en 3D'
            : 'Interactive 3D neural core'
        }
        className={`w-full h-full touch-none ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* Floating HUD Telemetry Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <div className="flex items-center gap-2 bg-white/85 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/90 dark:border-white/[0.08] shadow-sm">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
          <span className="text-slate-700 dark:text-neutral-300 tracking-wider">
            {language === 'es' ? 'NÚCLEO NEURONAL // 3D' : 'NEURAL CORE // 3D'}
          </span>
        </div>
        <div
          className="hidden sm:flex items-center gap-1.5 bg-white/85 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/90 dark:border-white/[0.08] shadow-sm"
          style={{ color: secondaryColor }}
        >
          <Cpu className="w-3 h-3" style={{ color: secondaryColor }} />
          <span>
            {language === 'es' ? 'ACELERACIÓN ONNX' : 'ONNX ACCELERATED'}
          </span>
        </div>
      </div>

      {/* Bottom Interaction Guide Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-200/90 dark:border-white/[0.1] text-[10px] font-mono text-slate-700 dark:text-neutral-300 shadow-xl whitespace-nowrap">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: secondaryColor }}
          />
          <span>
            {language === 'es'
              ? isInteracting
                ? 'ROTANDO NÚCLEO 3D'
                : 'ARRASTRA PARA ROTAR EN 3D'
              : isInteracting
              ? 'ROTATING 3D CORE'
              : 'DRAG TO ROTATE IN 3D'}
          </span>
        </div>
      </div>
    </div>
  );
};
