import { ArrowDown, MessageCircle, FileText, Sparkles, Code2, Cpu, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenCv }) => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#2EE6A0]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#00F0FF]/8 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border-white/10 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#2EE6A0] shadow-[0_0_10px_#2EE6A0] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
            {language === 'es' ? 'Ingeniería de Software & IA Aplicada' : 'Software Engineering & Applied AI'}
          </span>
          <span className="text-neutral-500">•</span>
          <span className="text-xs font-mono text-[#00F0FF]">
            {language === 'es' ? '9no Sem. UDO (POO 10/10)' : '9th Sem. UDO (OOP 10/10)'}
          </span>
        </div>

        {/* Editorial Headline - Milan Compain Style */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight text-white leading-[1.08]">
            {language === 'es' ? (
              <>
                Arquitecturas <span className="font-serif italic font-normal text-[#2EE6A0] glow-text-emerald">resilientes</span> y sistemas con <span className="font-serif italic font-normal text-[#00F0FF] glow-text-cyan">visión inteligente.</span>
              </>
            ) : (
              <>
                Crafting <span className="font-serif italic font-normal text-[#2EE6A0] glow-text-emerald">resilient</span> architectures &amp; <span className="font-serif italic font-normal text-[#00F0FF] glow-text-cyan">intelligent vision</span> systems.
              </>
            )}
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl pt-3">
            {language === 'es' ? (
              <>
                Soy <span className="text-white font-semibold">{PERSONAL_INFO.fullName}</span>, desarrollador Full-Stack enfocado en{' '}
                <span className="text-[#2EE6A0] font-medium">Python, FastAPI y Odoo ERP</span>, integrando{' '}
                <span className="text-[#00F0FF] font-medium">OpenCV y YOLOv8</span> para resolver problemas de alta concurrencia y optimización de recursos en la vida real.
              </>
            ) : (
              <>
                I'm <span className="text-white font-semibold">{PERSONAL_INFO.fullName}</span>, a Full-Stack developer specializing in{' '}
                <span className="text-[#2EE6A0] font-medium">Python, FastAPI, and Odoo ERP</span>, integrating{' '}
                <span className="text-[#00F0FF] font-medium">OpenCV and YOLOv8</span> to solve real-world concurrency and compute optimization bottlenecks.
              </>
            )}
          </p>
        </div>

        {/* Action Buttons & Socials */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="px-7 py-3.5 rounded-full bg-[#2EE6A0] text-black font-semibold text-sm hover:bg-[#26c589] shadow-[0_0_25px_rgba(46,230,160,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>{language === 'es' ? 'Explorar Casos de Estudio' : 'Explore Case Studies'}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenCv}
            className="px-6 py-3.5 rounded-full glass-panel hover:bg-white/10 text-white font-medium text-sm border-white/15 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#00F0FF]" />
            <span>{language === 'es' ? 'Ver Currículum Vitae' : 'View Full Resume'}</span>
          </button>

          <a
            href={`https://wa.me/${PERSONAL_INFO.phoneClean}?text=${encodeURIComponent(
              language === 'es'
                ? 'Hola Yerson, vi tu portafolio y me gustaría conversar contigo sobre una oportunidad laboral.'
                : 'Hello Yerson, I viewed your portfolio and would like to discuss a job opportunity.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-medium text-sm transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Directo</span>
          </a>

          {/* Social Quick Links */}
          <div className="flex items-center gap-2.5 ml-auto sm:ml-0 pt-2 sm:pt-0">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 rounded-full glass-panel text-neutral-300 hover:text-white hover:border-[#2EE6A0]/50 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-full glass-panel text-neutral-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#2EE6A0]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">POO & CLEAN CODE</div>
              <div className="text-sm font-semibold text-white">Nota 10/10 en UDO</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00F0FF]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">IA & COMPUTER VISION</div>
              <div className="text-sm font-semibold text-white">YOLOv8 + OpenCV MOG2</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#2EE6A0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">ENTERPRISE ERP</div>
              <div className="text-sm font-semibold text-white">Odoo + Meta Cloud API</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00F0FF]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">BILINGUAL TECH</div>
              <div className="text-sm font-semibold text-white">Inglés C1 Avanzado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
