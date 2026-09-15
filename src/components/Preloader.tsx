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
  minProgress: number;
}

const SUBSYSTEMS: SubsystemModule[] = [
  {
    id: 'kernel',
    tag: 'SYS_01',
    name: { es: 'Kernel Asíncrono & Memoria RAM', en: 'Async Kernel & RAM Allocation' },
    spec: 'Python 3.11 / FastAPI Non-blocking Event Loop',
    minProgress: 18
  },
  {
    id: 'vision',
    tag: 'AI_02',
    name: { es: 'Pipeline Visión IA & ONNX Runtime', en: 'Vision AI Pipeline & ONNX Runtime' },
    spec: 'YOLOv8 + OpenCV MOG2 Motion Sentry (<75ms)',
    minProgress: 48
  },
  {
    id: 'odoo',
    tag: 'ERP_03',
    name: { es: 'Protocolo Odoo ERP & Meta Chatter', en: 'Odoo ERP Protocol & Meta Chatter' },
    spec: 'Native Models & HMAC-SHA256 Verified Webhooks',
    minProgress: 76
  },
  {
    id: 'arch',
    tag: 'ENG_04',
    name: { es: 'Arquitectura Limpia & Tipado Estricto', en: 'Clean Architecture & Strict Contracts' },
    spec: 'POO 10/10 UDO Systems Engineering Standards',
    minProgress: 95
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
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const soundPlayedRef = useRef(false);

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

  const handleSkip = () => {
    setIsFinished(true);
    onCompleteRef.current();
  };

  useEffect(() => {
    const DURATION_MS = 2950;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawRatio = Math.min(1, elapsed / DURATION_MS);

      // Cybernetic easing: snappy start, cinematic weighted middle, momentary dramatic hold at 99%, then 100%
      let curveRatio = 0;
      if (rawRatio < 0.3) {
        // Fast responsive boot
        curveRatio = rawRatio * 1.15;
      } else if (rawRatio < 0.75) {
        // Steady compilation
        curveRatio = 0.345 + (rawRatio - 0.3) * 1.05;
      } else if (rawRatio < 0.95) {
        // High tension final assembly
        curveRatio = 0.8175 + (rawRatio - 0.75) * 0.85;
      } else {
        // Snap to 100%
        curveRatio = 1;
      }

      const calculatedPercent = Math.min(100, Math.floor(curveRatio * 100));
      setProgress(calculatedPercent);

      // Dynamic telemetry stage text updates
      if (calculatedPercent < 22) {
        setActiveStageText({
          es: 'ALOCANDO RECURSOS DE MEMORIA & KERNEL ASÍNCRONO...',
          en: 'ALLOCATING MEMORY & ASYNC KERNEL RUNTIME...'
        });
      } else if (calculatedPercent < 52) {
        setActiveStageText({
          es: 'CARGANDO PESOS NEURONALES YOLOV8 + OPENCV MOG2...',
          en: 'LOADING YOLOV8 NEURAL WEIGHTS & OPENCV MOG2...'
        });
      } else if (calculatedPercent < 80) {
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

      // When reaching 100%, play boot sound and trigger reveal
      if (calculatedPercent >= 100) {
        clearInterval(interval);

        if (!soundPlayedRef.current) {
          soundPlayedRef.current = true;
          try {
            playSound('boot');
          } catch {
            // ignore
          }
        }

        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onCompleteRef.current();
          }, 350);
        }, 220);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-5 sm:p-8 md:p-12 bg-[#050508] text-white select-none overflow-hidden cursor-wait"
        >
          {/* Subtle Ambient Background Cyber Grid & Vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#2EE6A0]/[0.07] via-[#00F0FF]/[0.05] to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Top Status Bar & Navigation Telemetry */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EE6A0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2EE6A0] shadow-[0_0_8px_#2EE6A0]" />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-wider">YERSON RODRÍGUEZ</span>
                <span className="text-neutral-500 hidden xs:inline">/ SYSTEMS ENGINEER</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="text-neutral-300">CORE: PYTHON 3.11</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2EE6A0]" />
                <span className="text-neutral-300">CSP: STRICT</span>
              </div>
              <span className="text-neutral-700">•</span>
              <span>MATURÍN, VE [UTC-4]</span>
            </div>

            <button
              onClick={handleSkip}
              className="group flex items-center gap-1.5 text-neutral-400 hover:text-white transition-all border border-white/10 hover:border-[#2EE6A0]/50 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-[#2EE6A0]/10 text-[10.5px] font-mono"
            >
              <span>{language === 'es' ? 'Saltar Intro' : 'Skip Intro'}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/10 text-[9px] text-neutral-300">
                ESC
              </kbd>
              <ChevronRight className="w-3 h-3 text-[#2EE6A0] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Central Main Showcase: Monumental Counter & Modular Telemetry */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6 sm:py-8 max-w-4xl mx-auto w-full">
            {/* Monumental Counter with Cyber-Luxury Aesthetic */}
            <div className="relative text-center select-none mb-6 sm:mb-8">
              {/* Backlight Glow Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-32 sm:h-44 bg-[#2EE6A0]/20 rounded-full blur-[60px] pointer-events-none -z-10" />

              <div className="font-serif italic text-7xl sm:text-9xl md:text-[11rem] tracking-tight text-white leading-none font-extrabold select-none drop-shadow-[0_0_40px_rgba(46,230,160,0.35)] py-1">
                {progress.toString().padStart(3, '0')}
                <span className="text-2xl sm:text-4xl md:text-5xl font-sans not-italic font-bold text-[#2EE6A0] ml-2 inline-block align-baseline">
                  %
                </span>
              </div>

              {/* Dynamic Status Notification */}
              <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-neutral-300 flex items-center justify-center gap-2.5 px-4 text-center">
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-medium tracking-[0.18em]">
                  {language === 'es' ? activeStageText.es : activeStageText.en}
                </span>
              </div>
            </div>

            {/* Glowing Dual Progress Bar */}
            <div className="w-full max-w-xl mx-auto px-4">
              <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2EE6A0] via-[#00F0FF] to-[#2EE6A0] rounded-full shadow-[0_0_15px_rgba(46,230,160,0.9)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-2">
                <span>000 // STANDBY</span>
                <span className="text-[#2EE6A0] font-semibold">{progress} / 100 COMPLETED</span>
                <span>SYS // READY</span>
              </div>
            </div>

            {/* Modular Subsystem Verification Grid (Cyber HUD) */}
            <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 px-2">
              {SUBSYSTEMS.map((module) => {
                const isReady = progress >= module.minProgress;
                const isActive = progress > 0 && !isReady;

                return (
                  <div
                    key={module.id}
                    className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md flex items-center justify-between ${
                      isReady
                        ? 'bg-[#2EE6A0]/[0.05] border-[#2EE6A0]/30 shadow-[0_0_15px_rgba(46,230,160,0.08)]'
                        : isActive
                        ? 'bg-[#00F0FF]/[0.04] border-[#00F0FF]/30 animate-pulse'
                        : 'bg-white/[0.02] border-white/[0.05] opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                          isReady
                            ? 'bg-[#2EE6A0]/20 text-[#2EE6A0]'
                            : isActive
                            ? 'bg-[#00F0FF]/20 text-[#00F0FF]'
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
                        <p className="text-[10px] font-mono text-neutral-400 truncate">
                          {module.spec}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      <span
                        className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                          isReady
                            ? 'bg-[#2EE6A0]/20 text-[#2EE6A0] border border-[#2EE6A0]/40'
                            : isActive
                            ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                            : 'bg-white/5 text-neutral-500 border border-white/10'
                        }`}
                      >
                        {isReady ? 'ONLINE' : isActive ? 'SYNC...' : 'WAIT'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry & Engineering Credo */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-3 text-[11px] text-neutral-300">
              <span className="text-[#2EE6A0] font-semibold">UDO • 10/10 POO</span>
              <span className="text-neutral-700">•</span>
              <span className="text-[#00F0FF]">C1 ENGLISH</span>
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
