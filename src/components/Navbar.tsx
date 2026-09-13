import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Globe, ArrowUpRight, Sparkles, Search, Download, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { smoothScrollTo } from '../utils/smoothScroll';
import { playSound } from '../utils/audioSystem';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenCv: () => void;
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenCv,
  onOpenCommandPalette,
  soundEnabled,
  onToggleSound
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
    { href: '#philosophy', label: language === 'es' ? 'Filosofía' : 'Philosophy' },
    { href: '#repos', label: language === 'es' ? 'Repositorios' : 'Repositories' },
    { href: '#skills', label: language === 'es' ? 'Stack & IA' : 'Stack & AI' },
    { href: '#experience', label: language === 'es' ? 'Trayectoria' : 'Experience' },
    { href: '#contact', label: language === 'es' ? 'Contacto' : 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playSound('click');
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-3 sm:py-5 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#09090d]/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/[0.09]'
            : 'bg-[#0b0b10]/60 backdrop-blur-md border border-white/[0.06]'
        }`}
      >
        {/* Logo / Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playSound('click');
            smoothScrollTo(0);
          }}
          className="flex items-center gap-2.5 sm:gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1c1c24] to-[#0c0c10] border border-white/15 flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:border-[#2EE6A0]/60 transition-colors relative shrink-0">
            <span className="text-white">YR</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#2EE6A0] shadow-[0_0_8px_#2EE6A0]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-[#2EE6A0] transition-colors truncate max-w-[120px] xs:max-w-none">
              Yerson Rodríguez
            </span>
            <span className="text-[10px] font-mono text-neutral-400 hidden sm:block tracking-wider">
              Python • Odoo • AI
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Command Palette, Sound, Lang, Download CV */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Command Palette Trigger Pill */}
          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            title={language === 'es' ? 'Paleta de Comandos (Ctrl+K)' : 'Command Palette (Ctrl+K)'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#2EE6A0]/40 text-xs font-mono text-neutral-300 hover:text-white transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-[#2EE6A0]" />
            <span className="hidden xl:inline text-neutral-400 group-hover:text-neutral-200">
              {language === 'es' ? 'Buscar' : 'Search'}
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-neutral-300">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={
              soundEnabled
                ? (language === 'es' ? 'Silenciar efectos de sonido' : 'Mute sound effects')
                : (language === 'es' ? 'Activar efectos de sonido hápticos' : 'Enable haptic sound effects')
            }
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#2EE6A0]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              playSound('switch');
              onToggleLanguage();
            }}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-neutral-300 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="font-semibold text-white">{language.toUpperCase()}</span>
          </button>

          {/* Direct Download CV Button */}
          <a
            href="./CV_Yerson_Rodriguez.pdf"
            download="CV_Yerson_Rodriguez.pdf"
            onClick={() => playSound('click')}
            title={language === 'es' ? 'Descargar CV directo en PDF' : 'Direct download of CV PDF'}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2EE6A0] text-black font-bold text-xs hover:bg-[#26c589] shadow-[0_0_20px_rgba(46,230,160,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Descargar CV' : 'Download CV'}</span>
          </a>
        </div>

        {/* Mobile menu and quick controls */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
            title="Comandos (Ctrl+K)"
            aria-label="Abrir paleta de comandos"
          >
            <Search className="w-4 h-4 text-[#2EE6A0]" />
          </button>

          {/* Quick Sound Toggle on Mobile */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
            title="Sonido"
            aria-label="Sonido"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#2EE6A0]" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {/* Quick Lang Toggle */}
          <button
            onClick={() => {
              playSound('switch');
              onToggleLanguage();
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-200"
          >
            {language.toUpperCase()}
          </button>

          {/* Direct CV Download Icon */}
          <a
            href="./CV_Yerson_Rodriguez.pdf"
            download="CV_Yerson_Rodriguez.pdf"
            onClick={() => playSound('click')}
            className="p-2 rounded-lg bg-[#2EE6A0] text-black text-xs font-semibold flex items-center justify-center"
            title="Descargar CV (PDF)"
            aria-label="Descargar CV"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Drawer Menu Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mt-2 p-5 rounded-2xl glass-panel border border-white/10 lg:hidden flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#2EE6A0]">
              <span className="w-2 h-2 rounded-full bg-[#2EE6A0] animate-pulse" />
              <span>{language === 'es' ? 'Disponible para contratación' : 'Available for hire'}</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">Maturín, VE</span>
          </div>

          <div className="flex flex-col gap-1 py-1">
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

          {/* Sound Toggle inside mobile menu */}
          <button
            onClick={onToggleSound}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between border border-white/5"
          >
            <div className="flex items-center gap-2.5">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#2EE6A0]" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-500" />
              )}
              <span>{language === 'es' ? 'Sonido Háptico' : 'Haptic Sound Effects'}</span>
            </div>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                soundEnabled ? 'bg-[#2EE6A0]/20 text-[#2EE6A0]' : 'bg-white/10 text-neutral-400'
              }`}
            >
              {soundEnabled ? 'ON' : 'MUTED'}
            </span>
          </button>

          {/* Action Buttons in Drawer */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row gap-2">
            <a
              href="./CV_Yerson_Rodriguez.pdf"
              download="CV_Yerson_Rodriguez.pdf"
              onClick={() => {
                playSound('click');
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2EE6A0] text-black font-bold text-xs shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'es' ? 'Descargar CV (PDF)' : 'Download CV (PDF)'}</span>
            </a>

            <button
              onClick={() => {
                playSound('open');
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-neutral-200 hover:text-white font-semibold text-xs border border-white/10"
            >
              <FileText className="w-4 h-4 text-[#00F0FF]" />
              <span>{language === 'es' ? 'Ver en Pantalla' : 'View Online'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
