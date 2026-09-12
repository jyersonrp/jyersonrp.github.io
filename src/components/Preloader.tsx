import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { Language } from '../types';

interface PreloaderProps {
  onComplete: () => void;
  language: Language;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, language }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 700);
          }, 200);
          return 100;
        }
        // Realistic variable speed increment
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#060608] text-white select-none cursor-wait"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2EE6A0] animate-pulse"></span>
              <span className="text-white font-semibold">YERSON RODRÍGUEZ</span>
              <span className="text-neutral-500">/ SYSTEMS ENG.</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>MATURÍN, VE [10° 27' N / 63° 10' W]</span>
            </div>
            <button
              onClick={() => {
                setIsFinished(true);
                onComplete();
              }}
              className="text-neutral-500 hover:text-[#2EE6A0] transition-colors border border-white/10 px-3 py-1 rounded-full text-[10px]"
            >
              {language === 'es' ? 'Saltar Intro →' : 'Skip Intro →'}
            </button>
          </div>

          {/* Central Large Counter - Milan Compain Style */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative">
              <div className="font-serif italic text-6xl sm:text-8xl md:text-9xl tracking-tight text-white/95 select-none glow-text-emerald">
                {progress.toString().padStart(3, '0')}
                <span className="text-2xl sm:text-4xl font-sans not-italic text-[#2EE6A0] ml-2">%</span>
              </div>
              <div className="text-center mt-3 text-xs sm:text-sm font-mono tracking-widest text-neutral-400 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2EE6A0] animate-spin" style={{ animationDuration: '3s' }} />
                <span>
                  {language === 'es'
                    ? 'INICIALIZANDO PORTAFOLIO DE INGENIERÍA...'
                    : 'INITIALIZING ENGINEERING PORTFOLIO...'}
                </span>
              </div>
            </div>

            {/* Glowing progress line */}
            <div className="w-full max-w-md mt-8 h-1 bg-white/10 rounded-full overflow-hidden p-0 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2EE6A0] via-[#00F0FF] to-[#2EE6A0] rounded-full shadow-[0_0_12px_rgba(46,230,160,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Bottom quote / philosophy */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-white/5 pt-6">
            <div className="flex items-center gap-4">
              <span className="text-[#2EE6A0]">PYTHON 3.11</span>
              <span>•</span>
              <span className="text-[#00F0FF]">FASTAPI & ODOO</span>
              <span>•</span>
              <span className="text-neutral-300">YOLOV8 ONNX</span>
            </div>
            <div className="italic font-serif text-sm text-neutral-400">
              "Suivez l'étoile — Crafting resilient architectures"
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
