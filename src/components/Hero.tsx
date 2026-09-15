import React from 'react';
import { ArrowDown, MessageCircle, FileText, Sparkles, Cpu, Eye, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, ThemeMode, ColorPalette } from '../types';
import { Hero3DCore } from './Hero3DCore';
import { MagneticButton } from './MagneticButton';
import { smoothScrollTo } from '../utils/smoothScroll';
import { playSound } from '../utils/audioSystem';

interface HeroProps {
  language: Language;
  onOpenCv: () => void;
  themeMode?: ThemeMode;
  palette?: ColorPalette;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenCv, themeMode, palette }) => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound('click');
    smoothScrollTo('#projects');
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient radial gradients - deep blur & soft volume */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#2EE6A0]/[0.06] rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 sm:right-12 w-[500px] h-[400px] bg-[#00F0FF]/[0.06] rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Minimalist Status Pill */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-6 sm:mb-8 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EE6A0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE6A0]" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-200 font-medium">
            {language === 'es' ? 'Disponible para Contratación' : 'Open to Work'}
          </span>
          <span className="text-neutral-600 hidden xs:inline">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] tracking-wider hidden xs:inline">
            {language === 'es' ? 'UDO • 9no Semestre' : 'UDO • 9th Semester'}
          </span>
        </div>

        {/* Hero Two-Column Grid: Editorial Typography + 3D Interactive Neural Vision Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Authorial Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-sans font-extrabold tracking-[-0.03em] text-white leading-[1.18] sm:leading-[1.14] lg:leading-[1.12]">
              {language === 'es' ? (
                <>
                  Arquitecturas <span className="editorial-accent-emerald">resilientes</span> y sistemas con <span className="editorial-accent-cyan">visión inteligente</span>.
                </>
              ) : (
                <>
                  Crafting <span className="editorial-accent-emerald">resilient</span> architectures &amp; <span className="editorial-accent-cyan">intelligent vision</span> systems.
                </>
              )}
            </h1>

            {/* Subtitle / Clear Value Proposition */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-300/90 font-light leading-relaxed max-w-2xl pt-1">
              {language === 'es' ? (
                <>
                  Soy <span className="text-white font-medium">{PERSONAL_INFO.fullName}</span>, desarrollador Full-Stack enfocado en{' '}
                  <span className="text-[#2EE6A0] font-normal">Python, FastAPI y Odoo ERP</span>, integrando{' '}
                  <span className="text-[#00F0FF] font-normal">OpenCV y YOLOv8</span> para resolver problemas de alta concurrencia y optimización de recursos en la vida real.
                </>
              ) : (
                <>
                  I'm <span className="text-white font-medium">{PERSONAL_INFO.fullName}</span>, a Full-Stack developer specializing in{' '}
                  <span className="text-[#2EE6A0] font-normal">Python, FastAPI, and Odoo ERP</span>, integrating{' '}
                  <span className="text-[#00F0FF] font-normal">OpenCV and YOLOv8</span> to solve real-world concurrency and compute optimization bottlenecks.
                </>
              )}
            </p>

            {/* Refined Magnetic Action Buttons */}
            <div className="pt-3 sm:pt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton strength={0.25}>
                <a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#2EE6A0] hover:bg-[#26c589] text-black font-semibold text-xs sm:text-sm shadow-[0_0_30px_rgba(46,230,160,0.35)] hover:shadow-[0_0_40px_rgba(46,230,160,0.5)] transition-all flex items-center gap-2"
                >
                  <span>{language === 'es' ? 'Explorar Casos de Estudio' : 'Explore Case Studies'}</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </MagneticButton>

              {/* Direct CV Download Button */}
              <MagneticButton strength={0.25}>
                <a
                  href="./CV_Yerson_Rodriguez.pdf"
                  download="CV_Yerson_Rodriguez.pdf"
                  onClick={() => playSound('click')}
                  title={language === 'es' ? 'Descargar CV directo en PDF' : 'Direct download of CV PDF'}
                  className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs sm:text-sm border border-white/[0.1] hover:border-[#2EE6A0]/50 transition-all flex items-center gap-2 group"
                >
                  <Download className="w-4 h-4 text-[#2EE6A0] group-hover:translate-y-0.5 transition-transform" />
                  <span>{language === 'es' ? 'Descargar CV' : 'Download CV'}</span>
                </a>
              </MagneticButton>

              {/* View Online CV Modal */}
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => {
                    playSound('open');
                    onOpenCv();
                  }}
                  className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-xs sm:text-sm border border-white/[0.1] hover:border-[#00F0FF]/50 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#00F0FF]" />
                  <span>{language === 'es' ? 'Ver Online' : 'View Online'}</span>
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href={`https://wa.me/${PERSONAL_INFO.phoneClean}?text=${encodeURIComponent(
                    language === 'es'
                      ? 'Hola Yerson, vi tu portafolio y me gustaría conversar contigo sobre una oportunidad laboral.'
                      : 'Hello Yerson, I viewed your portfolio and would like to discuss a job opportunity.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#2EE6A0]/50 text-neutral-200 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#2EE6A0]" />
                  <span>WhatsApp</span>
                </a>
              </MagneticButton>

              {/* Social Quick Links with Magnetic Hover */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
                <MagneticButton strength={0.3}>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] text-neutral-400 hover:text-white transition-all flex items-center justify-center"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.3}>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#00F0FF]/40 text-neutral-400 hover:text-[#00F0FF] transition-all flex items-center justify-center"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js 3D Neural Vision Core */}
          <div className="lg:col-span-5 relative w-full flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-[480px] rounded-3xl bg-[#09090f]/75 dark:bg-[#09090f]/75 bg-white/90 border border-white/[0.08] dark:border-white/[0.08] border-slate-200/90 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] shadow-2xl overflow-hidden group hover:border-[var(--accent-primary)]/40 transition-all duration-500">
              {/* Subtle Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--accent-primary)]/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--accent-secondary)]/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--accent-secondary)]/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--accent-primary)]/40 pointer-events-none" />

              {/* Three.js Canvas Container */}
              <Hero3DCore language={language} themeMode={themeMode} palette={palette} />

              {/* Bottom Specs Bar */}
              <div className="px-4 py-2.5 bg-white/[0.02] dark:bg-white/[0.02] bg-slate-50/90 border-t border-white/[0.06] dark:border-white/[0.06] border-slate-200/90 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-400 text-slate-600">
                <div className="flex items-center gap-1.5 text-[var(--accent-primary)]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>OPENCV + YOLOV8</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-400 text-slate-600">
                  <Cpu className="w-3 h-3 text-[var(--accent-secondary)]" />
                  <span>{language === 'es' ? '60 FPS INTERACTIVO' : '60 FPS INTERACTIVE'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Architecture Stack Band */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#2EE6A0] shadow-[0_0_8px_rgba(46,230,160,0.6)] shrink-0" />
            <span className="text-white font-semibold tracking-wider">
              {language === 'es' ? 'BACKEND & ERP:' : 'BACKEND & ERP:'}
            </span>
            <span className="text-neutral-200 font-medium">PYTHON 3.11</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">FASTAPI</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-200 font-medium">ODOO ERP</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)] shrink-0" />
            <span className="text-white font-semibold tracking-wider">
              {language === 'es' ? 'VISIÓN & IA:' : 'VISION & AI:'}
            </span>
            <span className="text-neutral-200 font-medium">OPENCV MOG2</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">YOLOV8 ONNX</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-200 font-medium">POSTGRESQL</span>
          </div>
        </div>
      </div>
    </section>
  );
};
