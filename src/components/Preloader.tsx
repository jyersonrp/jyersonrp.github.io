import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Activity,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { playSound } from '../utils/audioSystem';

interface PreloaderProps {
  onComplete: () => void;
  language: Language;
  soundEnabled?: boolean;
}

interface SubsystemModule {
  id: string;
  tag: string;
  name: { es: string; en: string };
  spec: string;
  range: [number, number]; // [startProgress, endProgress]
}

const SUBSYSTEMS: SubsystemModule[] = [
  {
    id: 'kernel',
    tag: 'SYS_01',
    name: { es: 'Kernel Asíncrono & Memoria RAM', en: 'Async Kernel & RAM Allocation' },
    spec: 'Python 3.11 / FastAPI Non-blocking Event Loop',
    range: [0, 26]
  },
  {
    id: 'vision',
    tag: 'AI_02',
    name: { es: 'Pipeline Visión IA & ONNX Runtime', en: 'Vision AI Pipeline & ONNX Runtime' },
    spec: 'YOLOv8 + OpenCV MOG2 Motion Sentry (<75ms)',
    range: [20, 56]
  },
  {
    id: 'odoo',
    tag: 'ERP_03',
    name: { es: 'Protocolo Odoo ERP & Meta Chatter', en: 'Odoo ERP Protocol & Meta Chatter' },
    spec: 'Native Models & HMAC-SHA256 Verified Webhooks',
    range: [50, 84]
  },
  {
    id: 'arch',
    tag: 'ENG_04',
    name: { es: 'Arquitectura Limpia & Tipado Estricto', en: 'Clean Architecture & Strict Contracts' },
    spec: 'POO 10/10 UDO Systems Engineering Standards',
    range: [78, 100]
  }
];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  language,
  soundEnabled = true
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [activeStageText, setActiveStageText] = useState({
    es: 'INICIALIZANDO SUBSISTEMAS...',
    en: 'INITIALIZING SUBSYSTEMS...'
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const soundPlayedRef = useRef(false);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsFinished(true);
    // Instant skip without waiting for curtain animation
    onCompleteRef.current();
  };

  // Keyboard shortcut listener: ESC or Space to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Cinematic calibrated duration: ~3.0 seconds progression + 240ms dramatic lock
    const DURATION_MS = 2950;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawRatio = Math.min(1, elapsed / DURATION_MS);

      // Cybernetic pacing: snappy startup, compilation middle, high tension build-up, final snap
      let curveRatio = 0;
      if (rawRatio < 0.28) {
        curveRatio = rawRatio * 1.14;
      } else if (rawRatio < 0.74) {
        curveRatio = 0.3192 + (rawRatio - 0.28) * 1.05;
      } else if (rawRatio < 0.94) {
        curveRatio = 0.8022 + (rawRatio - 0.74) * 0.88;
      } else {
        curveRatio = 1;
      }

      const calculatedPercent = Math.min(100, Math.floor(curveRatio * 100));
      setProgress(calculatedPercent);

      // Dynamic telemetry stage text updates
      if (calculatedPercent < 24) {
        setActiveStageText({
          es: 'ALOCANDO RECURSOS DE MEMORIA & KERNEL ASÍNCRONO...',
          en: 'ALLOCATING MEMORY & ASYNC KERNEL RUNTIME...'
        });
      } else if (calculatedPercent < 54) {
        setActiveStageText({
          es: 'CARGANDO PESOS NEURONALES YOLOV8 + OPENCV MOG2...',
          en: 'LOADING YOLOV8 NEURAL WEIGHTS & OPENCV MOG2...'
        });
      } else if (calculatedPercent < 82) {
        setActiveStageText({
          es: 'VERIFICANDO INTEGRIDAD ERP ODOO & WEBHOOKS HMAC...',
          en: 'VERIFYING ODOO ERP INTEGRITY & HMAC WEBHOOKS...'
        });
      } else if (calculatedPercent < 99) {
        setActiveStageText({
          es: 'ENSAMBLANDO CANVASES 3D & CONTRATOS CLEAN ARCHITECTURE...',
          en: 'ASSEMBLING 3D CANVASES & CLEAN ARCHITECTURE...'
        });
      } else {
        setActiveStageText({
          es: 'SISTEMAS ONLINE // ACCESO CONCEDIDO A PORTAFOLIO',
          en: 'SYSTEMS ONLINE // ACCESS GRANTED TO PORTFOLIO'
        });
      }

      // Reaching 100% milestone
      if (calculatedPercent >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (soundEnabledRef.current && !soundPlayedRef.current) {
          soundPlayedRef.current = true;
          try {
            playSound('boot');
          } catch {
            // Audio context silently ignored if restricted
          }
        }

        // Hold at 100% for 240ms, then trigger curtain upward exit
        timerRef.current = setTimeout(() => {
          setIsFinished(true);
        }, 240);
      }
    }, 28);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Guarantee onComplete is called strictly AFTER the curtain exit animation finishes 100%
        onCompleteRef.current();
      }}
    >
      {!isFinished && (
        <motion.div
          key="preloader-curtain"
          data-preloader="true"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            opacity: 0.99,
            transition: {
              duration: 0.85,
              ease: [0.77, 0, 0.175, 1] // Quintic cinematic curtain lift
            }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-5 sm:p-8 md:p-12 bg-[#050508] text-white select-none overflow-hidden cursor-wait"
        >
          {/* Subtle Ambient Background Cyber Grid & Vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

          {/* Dynamic Laser Scanline Sweep Animation */}
          <div
            className="absolute inset-x-0 h-28 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/20 to-transparent blur-sm animate-float"
            style={{ animationDuration: '3.5s' }}
          />

          {/* Pulsing Central Energy Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none transition-all duration-500"
            style={{
              width: `${400 + progress * 3}px`,
              height: `${300 + progress * 2}px`,
              background: `radial-gradient(circle, var(--accent-glow) 0%, var(--accent-glow-secondary, rgba(0,240,255,0.05)) 50%, transparent 80%)`
            }}
          />

          {/* Luminous Leading-Edge Laser Line on Shutter Curtain */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent shadow-[0_0_20px_var(--accent-glow)] pointer-events-none" />

          {/* Top Status Bar & Navigation Telemetry */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]" />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-wider">YERSON RODRÍGUEZ</span>
                <span className="text-neutral-500 hidden xs:inline">/ SYSTEMS ENGINEER</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                <span className="text-neutral-300">CORE: PYTHON 3.11</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span className="text-neutral-300">CSP: STRICT</span>
              </div>
              <span className="text-neutral-700">•</span>
              <span>MATURÍN, VE [UTC-4]</span>
            </div>

            <button
              onClick={handleSkip}
              className="group flex items-center gap-1.5 text-neutral-400 hover:text-white transition-all border border-white/10 hover:border-[var(--accent-primary)]/50 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-[var(--accent-primary)]/10 text-[10.5px] font-mono cursor-pointer active:scale-95"
            >
              <span>{language === 'es' ? 'Saltar Intro' : 'Skip Intro'}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/10 text-[9px] text-neutral-300">
                ESC
              </kbd>
              <ChevronRight className="w-3 h-3 text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Central Main Showcase: Monumental Counter & Modular Telemetry */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4 sm:py-6 max-w-4xl mx-auto w-full">
            {/* Monumental Counter with Cyber-Luxury Aesthetic */}
            <div className="relative text-center select-none mb-4 sm:mb-6">
              {/* Backlight Glow Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-32 sm:h-44 bg-[var(--accent-primary)]/20 rounded-full blur-[60px] pointer-events-none -z-10" />

              <div className="font-serif italic text-7xl sm:text-9xl md:text-[11rem] tracking-tight text-white leading-none font-extrabold select-none drop-shadow-[0_0_40px_var(--accent-glow)] py-1">
                {progress.toString().padStart(3, '0')}
                <span className="text-2xl sm:text-4xl md:text-5xl font-sans not-italic font-bold text-[var(--accent-primary)] ml-2 inline-block align-baseline">
                  %
                </span>
              </div>

              {/* Dynamic Status Notification */}
              <div className="mt-2.5 text-xs sm:text-sm font-mono tracking-widest text-neutral-300 flex items-center justify-center gap-2.5 px-4 text-center">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)] animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-medium tracking-[0.18em]">
                  {language === 'es' ? activeStageText.es : activeStageText.en}
                </span>
              </div>
            </div>

            {/* Glowing Dual Progress Bar */}
            <div className="w-full max-w-xl mx-auto px-4">
              <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] rounded-full shadow-[0_0_15px_var(--accent-glow)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-2">
                <span>000 // STANDBY</span>
                <span className="text-[var(--accent-primary)] font-semibold">{progress} / 100 COMPLETED</span>
                <span>SYS // READY</span>
              </div>
            </div>

            {/* Modular Subsystem Verification Grid (Cyber HUD) with Dedicated Initialization Bars */}
            <div className="w-full max-w-2xl mx-auto mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 px-2">
              {SUBSYSTEMS.map((module) => {
                const [start, end] = module.range;
                let subPct = 0;
                if (progress <= start) subPct = 0;
                else if (progress >= end) subPct = 100;
                else subPct = Math.min(100, Math.max(0, Math.floor(((progress - start) / (end - start)) * 100)));

                const isReady = subPct === 100;
                const isActive = subPct > 0 && !isReady;

                return (
                  <div
                    key={module.id}
                    className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md flex flex-col justify-between ${
                      isReady
                        ? 'bg-[var(--accent-primary)]/[0.06] border-[var(--accent-primary)]/35 shadow-[0_0_15px_var(--accent-glow)]'
                        : isActive
                        ? 'bg-[var(--accent-secondary)]/[0.05] border-[var(--accent-secondary)]/35 shadow-[0_0_12px_var(--accent-glow-secondary)]'
                        : 'bg-white/[0.02] border-white/[0.05] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                            isReady
                              ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                              : isActive
                              ? 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]'
                              : 'bg-white/5 text-neutral-500'
                          }`}
                        >
                          {isReady ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : module.id === 'vision' ? (
                            <Cpu className="w-3.5 h-3.5" />
                          ) : module.id === 'odoo' ? (
                            <Layers className="w-3.5 h-3.5" />
                          ) : (
                            <Activity className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                              {module.tag}
                            </span>
                            <span className="text-xs font-sans font-medium text-white truncate">
                              {module.name[language]}
                            </span>
                          </div>
                          <p className="text-[9.5px] font-mono text-neutral-400 truncate">
                            {module.spec}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                            isReady
                              ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40'
                              : isActive
                              ? 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/40'
                              : 'bg-white/5 text-neutral-500 border border-white/10'
                          }`}
                        >
                          {isReady ? 'ONLINE' : isActive ? `${subPct}%` : 'WAIT'}
                        </span>
                      </div>
                    </div>

                    {/* Dedicated Subsystem Initialization Micro-Bar */}
                    <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-150 rounded-full ${
                          isReady
                            ? 'bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]'
                            : isActive
                            ? 'bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-[0_0_6px_var(--accent-glow-secondary)]'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${subPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry & Engineering Credo */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-3 text-[11px] text-neutral-300">
              <span className="text-[var(--accent-primary)] font-semibold">UDO • 10/10 POO</span>
              <span className="text-neutral-700">•</span>
              <span className="text-[var(--accent-secondary)]">C1 ENGLISH</span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-400">REACT + THREE.JS</span>
            </div>

            <div className="italic font-serif text-sm text-neutral-300 text-center sm:text-right">
              "Crafting resilient architectures &amp; computer vision systems."
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
