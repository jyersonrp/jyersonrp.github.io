import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowUp, MessageCircle, Mail, Terminal, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Caracas',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('es-VE', options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050508] py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Local Time */}
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#2EE6A0]">
              YR
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              {PERSONAL_INFO.fullName}
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#2EE6A0] animate-pulse" />
            <span>Maturín, Venezuela:</span>
            <span className="text-white font-semibold">{currentTime || '18:00:00 AST'}</span>
            <span className="text-neutral-500">(UTC-4)</span>
          </div>

          <p className="text-xs text-neutral-400 max-w-sm">
            {language === 'es'
              ? 'Ingeniería de software de alta fidelidad, visión por computadora y desarrollo Full-Stack.'
              : 'High-fidelity software engineering, computer vision, and Full-Stack development.'}
          </p>
        </div>

        {/* Social Navigation & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-panel hover:border-white/40 text-neutral-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-panel hover:border-[#00F0FF]/40 text-neutral-300 hover:text-[#00F0FF] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-panel hover:border-[#25D366]/40 text-neutral-300 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-full glass-panel hover:border-[#2EE6A0]/40 text-neutral-300 hover:text-[#2EE6A0] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white ml-2 transition-all group"
              title={language === 'es' ? 'Volver arriba' : 'Back to top'}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-neutral-400 text-center md:text-right">
            © {new Date().getFullYear()} Yerson José Rodríguez Pérez. Built with React, TypeScript &amp; Tailwind.
          </div>
        </div>
      </div>
    </footer>
  );
};
