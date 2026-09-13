import React, { useEffect, useRef, useState } from 'react';
import { Eye, Cpu, RotateCcw } from 'lucide-react';
import { Language } from '../types';

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
}

export const Hero3DCore: React.FC<Hero3DCoreProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

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

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const isCyan = i % 3 === 0;
      nodes.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isCyan ? '#00F0FF' : '#2EE6A0',
        size: isCyan ? 3.2 : 2.5
      });
    }

    // -------------------------------------------------------------
    // 2. Satellites along 3D Orbital Rings
    // -------------------------------------------------------------
    const satellites: Satellite3D[] = [
      { radius: sphereRadius * 1.45, tiltX: 0.65, tiltY: 0.35, speed: 1.8, angle: 0, color: '#2EE6A0', size: 4.5 },
      { radius: sphereRadius * 1.75, tiltX: -0.55, tiltY: 0.85, speed: -1.3, angle: Math.PI / 2, color: '#00F0FF', size: 4.0 },
      { radius: sphereRadius * 2.05, tiltX: 0.85, tiltY: -0.65, speed: 1.0, angle: Math.PI, color: '#5ef2ba', size: 3.5 }
    ];

    // -------------------------------------------------------------
    // 3. Floating 3D Particulate Cloud
    // -------------------------------------------------------------
    const cloudCount = isMobile ? 26 : 75;
    const particles: (Point3D & { speed: number; phase: number; color: string; size: number })[] = [];
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
        color: Math.random() > 0.4 ? '#2EE6A0' : '#00F0FF',
        size: 1 + Math.random() * 1.8
      });
    }

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

    // Helper: Rotate Point around X and Y
    const project3D = (x: number, y: number, z: number, rx: number, ry: number): { px: number; py: number; pz: number; scale: number; alpha: number } => {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective divide
      const scale = fov / (fov + z2 + sphereRadius * 1.5);
      const px = width / 2 + x1 * scale;
      const py = height / 2 + y2 * scale;
      const alpha = Math.max(0.12, Math.min(1, (z2 + sphereRadius * 1.5) / (sphereRadius * 3)));

      return { px, py, pz: z2, scale, alpha };
    };

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Inertia & Idle spin
      if (!isDragging) {
        velY *= 0.94;
        velX *= 0.94;
        if (Math.abs(velY) < 0.004) velY = 0.004; // Baseline idle rotation
        rotY += velY;
        rotX += velX;
      }

      // Smooth tilt lerp
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      const currentRotX = rotX + tiltX;
      const currentRotY = rotY + tiltY;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Background Volumetric Glow
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, sphereRadius * 1.8);
      bgGrad.addColorStop(0, 'rgba(46, 230, 160, 0.12)');
      bgGrad.addColorStop(0.4, 'rgba(0, 240, 255, 0.05)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing Central Compute Core
      const corePulse = 1 + Math.sin(elapsed * 3) * 0.15;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sphereRadius * 0.38 * corePulse);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coreGrad.addColorStop(0.25, 'rgba(46, 230, 160, 0.85)');
      coreGrad.addColorStop(0.6, 'rgba(0, 240, 255, 0.35)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 0.38 * corePulse, 0, Math.PI * 2);
      ctx.fill();

      // Project all nodes
      const projectedNodes = nodes.map((node) => {
        // Micro oscillation of nodes
        const osc = Math.sin(elapsed * 2 + node.pulsePhase) * 6;
        const scaleDist = (sphereRadius + osc) / sphereRadius;
        const curX = node.baseX * scaleDist;
        const curY = node.baseY * scaleDist;
        const curZ = node.baseZ * scaleDist;

        const proj = project3D(curX, curY, curZ, currentRotX, currentRotY);
        return { ...node, ...proj };
      });

      // Sort nodes and draw back connections/nodes first
      // -------------------------------------------------------------
      // Draw Synaptic Connection Lines
      // -------------------------------------------------------------
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
            const lineAlpha = (1 - dist / maxConnectDist) * Math.min(n1.alpha, n2.alpha) * 0.45;
            ctx.strokeStyle = `rgba(46, 230, 160, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // Draw 3D Orbital Rings with Perspective Projection
      // -------------------------------------------------------------
      const ringSteps = isMobile ? 36 : 72;
      satellites.forEach((sat, sIdx) => {
        ctx.beginPath();
        let firstX = 0;
        let firstY = 0;

        for (let s = 0; s <= ringSteps; s++) {
          const a = (s / ringSteps) * Math.PI * 2;
          // Unrotated ring in X-Y plane
          let rx = sat.radius * Math.cos(a);
          let ry = sat.radius * Math.sin(a);
          let rz = 0;

          // Apply ring specific tilt
          const cosTx = Math.cos(sat.tiltX);
          const sinTx = Math.sin(sat.tiltX);
          const ry1 = ry * cosTx - rz * sinTx;
          const rz1 = ry * sinTx + rz * cosTx;

          const cosTy = Math.cos(sat.tiltY);
          const sinTy = Math.sin(sat.tiltY);
          const rx2 = rx * cosTy + rz1 * sinTy;
          const rz2 = -rx * sinTy + rz1 * cosTy;

          // Project with main rotation
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
        ctx.strokeStyle = sIdx === 1 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(46, 230, 160, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // -----------------------------------------------------------
        // Satellite Bead along this ring
        // -----------------------------------------------------------
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

        // Draw glowing satellite
        const satGlow = ctx.createRadialGradient(satProj.px, satProj.py, 0, satProj.px, satProj.py, sat.size * 3 * satProj.scale);
        satGlow.addColorStop(0, sat.color);
        satGlow.addColorStop(0.4, sat.color);
        satGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = satGlow;
        ctx.beginPath();
        ctx.arc(satProj.px, satProj.py, sat.size * 3 * satProj.scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(satProj.px, satProj.py, sat.size * 0.9 * satProj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // -------------------------------------------------------------
      // Draw 3D Neural Nodes with Depth Sorting
      // -------------------------------------------------------------
      projectedNodes.sort((a, b) => a.pz - b.pz);

      projectedNodes.forEach((node) => {
        const r = node.size * node.scale;
        // Node outer glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, r * 2.8);
        grad.addColorStop(0, node.color);
        grad.addColorStop(0.5, `rgba(${node.color === '#00F0FF' ? '0, 240, 255' : '46, 230, 160'}, ${node.alpha * 0.6})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.arc(node.px, node.py, r * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.fillStyle = node.alpha > 0.6 ? '#ffffff' : node.color;
        ctx.arc(node.px, node.py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // -------------------------------------------------------------
      // Floating 3D Star Particles
      // -------------------------------------------------------------
      particles.forEach((p) => {
        const dynamicZ = p.z + Math.sin(elapsed * p.speed + p.phase) * 12;
        const proj = project3D(p.x, p.y, dynamicZ, currentRotX, currentRotY);
        ctx.fillStyle = `rgba(${p.color === '#00F0FF' ? '0, 240, 255' : '46, 230, 160'}, ${proj.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, p.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] sm:h-[400px] lg:h-[460px] flex items-center justify-center select-none"
    >
      {/* Background Volumetric Aura */}
      <div className="absolute inset-0 bg-radial from-[#2EE6A0]/[0.08] via-[#00F0FF]/[0.04] to-transparent rounded-3xl pointer-events-none blur-2xl" />

      {/* 3D Mathematical Canvas Engine */}
      <canvas
        ref={canvasRef}
        aria-label={language === 'es' ? 'Núcleo neuronal interactivo en 3D' : 'Interactive 3D neural core'}
        className={`w-full h-full touch-none ${isInteracting ? 'cursor-grabbing' : 'cursor-grab'}`}
      />

      {/* Floating HUD Telemetry Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2EE6A0] animate-pulse" />
          <span className="text-neutral-300 tracking-wider">
            {language === 'es' ? 'NÚCLEO NEURONAL // 3D' : 'NEURAL CORE // 3D'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08] text-[#00F0FF]">
          <Cpu className="w-3 h-3 text-[#00F0FF]" />
          <span>{language === 'es' ? 'ACELERACIÓN ONNX' : 'ONNX ACCELERATED'}</span>
        </div>
      </div>

      {/* Bottom Interaction Guide Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/[0.1] text-[10px] font-mono text-neutral-300 shadow-xl whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
          <span>
            {language === 'es'
              ? (isInteracting ? 'ROTANDO NÚCLEO 3D' : 'ARRASTRA PARA ROTAR EN 3D')
              : (isInteracting ? 'ROTATING 3D CORE' : 'DRAG TO ROTATE IN 3D')}
          </span>
        </div>
      </div>
    </div>
  );
};
