import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import { getPublicEmail } from '../utils/security';
import { ArrowUp, MessageCircle, Mail, Terminal, Heart, Download } from 'lucide-react';
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
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#050508] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Local Time */}
        <div className="space-y-3.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] flex items-center justify-center font-mono font-bold text-xs text-[var(--accent-primary)]">
              YR
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {PERSONAL_INFO.fullName}
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_8px_var(--accent-glow)]" />
            <span>Maturín, Venezuela:</span>
            <span className="text-slate-900 dark:text-white font-semibold">{currentTime || '18:00:00 AST'}</span>
            <span className="text-slate-400 dark:text-neutral-500">(UTC-4)</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-neutral-400 max-w-sm font-light">
            {language === 'es'
              ? 'Ingeniería de software de alta fidelidad, visión por computadora y desarrollo Full-Stack.'
              : 'High-fidelity software engineering, computer vision, and Full-Stack development.'}
          </p>
        </div>

        {/* Social Navigation & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/30 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] hover:border-[var(--accent-secondary)]/40 text-slate-600 dark:text-neutral-400 hover:text-[var(--accent-secondary)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] hover:border-[#25D366]/40 text-slate-600 dark:text-neutral-400 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${getPublicEmail()}`}
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] hover:border-[var(--accent-primary)]/40 text-slate-600 dark:text-neutral-400 hover:text-[var(--accent-primary)] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="./CV_Yerson_Rodriguez.pdf"
              download="CV_Yerson_Rodriguez.pdf"
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] hover:border-[var(--accent-primary)]/50 text-slate-600 dark:text-neutral-400 hover:text-[var(--accent-primary)] transition-colors"
              title={language === 'es' ? 'Descargar CV (PDF)' : 'Download CV (PDF)'}
              aria-label="Download CV"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] text-slate-800 dark:text-white ml-2 transition-all group"
              title={language === 'es' ? 'Volver arriba' : 'Back to top'}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-500 text-center md:text-right">
            © {new Date().getFullYear()} Yerson José Rodríguez Pérez. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
