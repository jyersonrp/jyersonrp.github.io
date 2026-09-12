import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenCv
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#projects', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { href: '#repos', label: language === 'es' ? 'Repositorios' : 'Repositories' },
    { href: '#skills', label: language === 'es' ? 'Stack & IA' : 'Stack & AI' },
    { href: '#experience', label: language === 'es' ? 'Trayectoria' : 'Experience' },
    { href: '#contact', label: language === 'es' ? 'Contacto' : 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.7)] border-white/10 backdrop-blur-md'
            : 'bg-black/30 border border-white/5 backdrop-blur-sm'
        }`}
      >
        {/* Logo / Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1c1c24] to-[#0e0e12] border border-white/15 flex items-center justify-center font-mono font-bold text-sm tracking-wider group-hover:border-[#2EE6A0] transition-colors relative">
            <span className="text-white">YR</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2EE6A0] shadow-[0_0_8px_#2EE6A0]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-[#2EE6A0] transition-colors">
              Yerson Rodríguez
            </span>
            <span className="text-[10px] font-mono text-neutral-400 hidden sm:block">
              Python • Odoo • AI
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Open to Work, Language, CV */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Availability badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EE6A0]/10 border border-[#2EE6A0]/25 text-[11px] font-mono text-[#2EE6A0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EE6A0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE6A0]"></span>
            </span>
            <span>{language === 'es' ? 'Disponible' : 'Open to Work'}</span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="font-semibold text-white">{language.toUpperCase()}</span>
          </button>

          {/* View CV Button */}
          <button
            onClick={onOpenCv}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2EE6A0] to-[#00F0FF] text-black font-semibold text-xs hover:shadow-[0_0_20px_rgba(46,230,160,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Ver CV' : 'Resume'}</span>
          </button>
        </div>

        {/* Mobile menu button and quick lang toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleLanguage}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-200"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={onOpenCv}
            className="p-2 rounded-lg bg-[#2EE6A0] text-black text-xs font-semibold"
            title="CV"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mt-3 p-5 rounded-2xl glass-panel border border-white/10 lg:hidden flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2EE6A0]">
              <span className="w-2 h-2 rounded-full bg-[#2EE6A0] animate-pulse" />
              <span>{language === 'es' ? 'Disponible para contratación' : 'Available for hire'}</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">Maturín, VE</span>
          </div>

          <div className="flex flex-col gap-1 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#2EE6A0] to-[#00F0FF] text-black font-semibold text-xs shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'es' ? 'Abrir Currículum Completo' : 'Open Full Resume'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
