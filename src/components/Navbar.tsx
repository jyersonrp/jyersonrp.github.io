import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  FileText,
  Globe,
  ArrowUpRight,
  Sparkles,
  Search,
  Download,
  Volume2,
  VolumeX,
  Palette,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import { Language, ThemeMode, ColorPalette } from '../types';
import { smoothScrollTo } from '../utils/smoothScroll';
import { playSound } from '../utils/audioSystem';
import { PALETTES } from '../utils/themeSystem';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenCv: () => void;
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  themeMode: ThemeMode;
  onSetThemeMode: (mode: ThemeMode) => void;
  colorPalette: ColorPalette;
  onSetColorPalette: (palette: ColorPalette) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenCv,
  onOpenCommandPalette,
  soundEnabled,
  onToggleSound,
  themeMode,
  onSetThemeMode,
  colorPalette,
  onSetColorPalette,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!isThemePopoverOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsThemePopoverOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsThemePopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemePopoverOpen]);

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
            ? 'bg-white/85 dark:bg-[#09090d]/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-slate-200/80 dark:border-white/[0.09]'
            : 'bg-white/60 dark:bg-[#0b0b10]/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06]'
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1c1c24] dark:to-[#0c0c10] border border-slate-300 dark:border-white/15 flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:border-[var(--accent-primary)]/60 transition-colors relative shrink-0">
            <span className="text-slate-900 dark:text-white">YR</span>
            <span
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 8px var(--accent-primary)',
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-[var(--accent-primary)] transition-colors truncate max-w-[120px] xs:max-w-none">
              Yerson Rodríguez
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 hidden sm:block tracking-wider">
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
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Customizer, Command Palette, Sound, Lang, Download CV */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Customizer Popover Trigger */}
          <div className="relative" ref={popoverRef}>
            <button
              onClick={() => {
                playSound('open');
                setIsThemePopoverOpen(!isThemePopoverOpen);
              }}
              title={
                language === 'es'
                  ? 'Personalizar tema y paleta cromática'
                  : 'Customize theme & color palette'
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] hover:border-[var(--accent-primary)]/50 text-xs font-mono text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="text-[11px] font-medium hidden xl:inline">
                {language === 'es' ? 'Personalizar' : 'Theme'}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: '0 0 6px var(--accent-primary)',
                }}
              />
            </button>

            {/* Floating Glass Popover */}
            {isThemePopoverOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white/95 dark:bg-[#0b0b12]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-4 text-xs font-sans select-none">
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-slate-900 dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{language === 'es' ? 'Personalización' : 'Customization'}</span>
                  </div>
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 font-semibold uppercase">
                    {PALETTES[colorPalette].name[language]}
                  </span>
                </div>

                {/* Mode Selector */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                    {language === 'es' ? 'Modo de Visualización' : 'Display Mode'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06]">
                    <button
                      onClick={() => {
                        playSound('switch');
                        onSetThemeMode('dark');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        themeMode === 'dark'
                          ? 'bg-slate-900 text-white shadow-md border border-white/20 font-semibold'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-sky-400" />
                      <span>{language === 'es' ? 'Oscuro' : 'Dark'}</span>
                    </button>
                    <button
                      onClick={() => {
                        playSound('switch');
                        onSetThemeMode('light');
                      }}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        themeMode === 'light'
                          ? 'bg-white text-slate-900 shadow-md border border-slate-200 font-bold'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'es' ? 'Claro' : 'Light'}</span>
                    </button>
                  </div>
                </div>

                {/* Palette Selector */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                    {language === 'es' ? 'Paleta Cromática (Duotono)' : 'Color Palette (Duotone)'}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {(Object.keys(PALETTES) as ColorPalette[]).map((palKey) => {
                      const p = PALETTES[palKey];
                      const isSelected = colorPalette === palKey;
                      return (
                        <button
                          key={palKey}
                          onClick={() => {
                            playSound('switch');
                            onSetColorPalette(palKey);
                          }}
                          className={`flex items-center justify-between p-2 rounded-xl transition-all border ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-white/[0.08] border-[var(--accent-primary)]/50 shadow-sm'
                              : 'border-transparent hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full shadow-inner shrink-0 border border-black/10 dark:border-white/20"
                              style={{ background: p.gradient }}
                            />
                            <span
                              className={`text-xs ${
                                isSelected
                                  ? 'font-semibold text-slate-900 dark:text-white'
                                  : 'text-slate-600 dark:text-neutral-300'
                              }`}
                            >
                              {p.name[language]}
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[var(--accent-primary)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Command Palette Trigger Pill */}
          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            title={language === 'es' ? 'Paleta de Comandos (Ctrl+K)' : 'Command Palette (Ctrl+K)'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] hover:border-[var(--accent-primary)]/40 text-xs font-mono text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden xl:inline text-slate-500 dark:text-neutral-400 group-hover:text-slate-800 dark:group-hover:text-neutral-200">
              {language === 'es' ? 'Buscar' : 'Search'}
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px] font-mono text-slate-600 dark:text-neutral-300">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={
              soundEnabled
                ? language === 'es'
                  ? 'Silenciar efectos de sonido'
                  : 'Mute sound effects'
                : language === 'es'
                ? 'Activar efectos de sonido hápticos'
                : 'Enable haptic sound effects'
            }
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              playSound('switch');
              onToggleLanguage();
            }}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span className="font-semibold text-slate-900 dark:text-white">
              {language.toUpperCase()}
            </span>
          </button>

          {/* Direct Download CV Button */}
          <a
            href="./CV_Yerson_Rodriguez.pdf"
            download="CV_Yerson_Rodriguez.pdf"
            onClick={() => playSound('click')}
            title={language === 'es' ? 'Descargar CV directo en PDF' : 'Direct download of CV PDF'}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-primary)] text-black font-bold text-xs hover:brightness-110 shadow-[0_0_20px_var(--accent-glow)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Descargar CV' : 'Download CV'}</span>
          </a>
        </div>

        {/* Mobile menu and quick controls */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Quick Palette Popover / Drawer button */}
          <button
            onClick={() => {
              playSound('open');
              setMobileMenuOpen(true);
            }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Tema y Paleta"
            aria-label="Personalizar colores"
          >
            <Palette className="w-4 h-4 text-[var(--accent-primary)]" />
          </button>

          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              playSound('open');
              onOpenCommandPalette();
            }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Comandos (Ctrl+K)"
            aria-label="Abrir paleta de comandos"
          >
            <Search className="w-4 h-4 text-[var(--accent-primary)]" />
          </button>

          {/* Quick Sound Toggle on Mobile */}
          <button
            onClick={onToggleSound}
            className="hidden sm:flex p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Sonido"
            aria-label="Sonido"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
            )}
          </button>

          {/* Quick Lang Toggle */}
          <button
            onClick={() => {
              playSound('switch');
              onToggleLanguage();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {language.toUpperCase()}
          </button>

          {/* Direct CV Download Icon */}
          <a
            href="./CV_Yerson_Rodriguez.pdf"
            download="CV_Yerson_Rodriguez.pdf"
            onClick={() => playSound('click')}
            className="p-2 rounded-lg bg-[var(--accent-primary)] text-black text-xs font-semibold flex items-center justify-center hover:brightness-110 transition-colors"
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
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mt-2 p-5 rounded-2xl bg-white/95 dark:bg-[#0b0b12]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 lg:hidden flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>
                {language === 'es' ? 'Disponible para contratación' : 'Available for hire'}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
              Maturín, VE
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
              </a>
            ))}
          </div>

          {/* Customization Section in Mobile Drawer */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                {language === 'es' ? 'Personalización' : 'Customization'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 font-semibold uppercase">
                {PALETTES[colorPalette].name[language]}
              </span>
            </div>

            {/* Dark / Light Mode Selector */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200 dark:border-white/5">
              <button
                onClick={() => {
                  playSound('switch');
                  onSetThemeMode('dark');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-white shadow-md font-semibold'
                    : 'text-slate-600 dark:text-neutral-400'
                }`}
              >
                <Moon className="w-4 h-4 text-sky-400" />
                <span>{language === 'es' ? 'Modo Oscuro' : 'Dark Mode'}</span>
              </button>
              <button
                onClick={() => {
                  playSound('switch');
                  onSetThemeMode('light');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  themeMode === 'light'
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'text-slate-600 dark:text-neutral-400'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{language === 'es' ? 'Modo Claro' : 'Light Mode'}</span>
              </button>
            </div>

            {/* Palette Swatches */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(Object.keys(PALETTES) as ColorPalette[]).map((palKey) => {
                const p = PALETTES[palKey];
                const isSelected = colorPalette === palKey;
                return (
                  <button
                    key={palKey}
                    onClick={() => {
                      playSound('switch');
                      onSetColorPalette(palKey);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-white/[0.08] border-[var(--accent-primary)] shadow-sm'
                        : 'border-slate-200 dark:border-white/5 hover:bg-slate-100/60 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full shadow-inner border border-black/10 dark:border-white/20"
                      style={{ background: p.gradient }}
                    />
                    <span className="text-[10px] font-mono truncate max-w-[80px] text-slate-700 dark:text-neutral-300">
                      {palKey === 'emerald' ? 'Emerald' : palKey === 'ultraviolet' ? 'Violet' : 'Amber'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Toggle inside mobile menu */}
          <button
            onClick={() => {
              playSound('switch');
              onToggleLanguage();
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between border border-slate-200 dark:border-white/5"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span>{language === 'es' ? 'Idioma' : 'Language'}</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[var(--accent-secondary)] font-semibold">
              {language === 'es' ? 'ESPAÑOL (ES)' : 'ENGLISH (EN)'}
            </span>
          </button>

          {/* Sound Toggle inside mobile menu */}
          <button
            onClick={onToggleSound}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between border border-slate-200 dark:border-white/5"
          >
            <div className="flex items-center gap-2.5">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
              )}
              <span>{language === 'es' ? 'Sonido Háptico' : 'Haptic Sound Effects'}</span>
            </div>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                soundEnabled
                  ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-neutral-400'
              }`}
            >
              {soundEnabled ? 'ON' : 'MUTED'}
            </span>
          </button>

          {/* Action Buttons in Drawer */}
          <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-2">
            <a
              href="./CV_Yerson_Rodriguez.pdf"
              download="CV_Yerson_Rodriguez.pdf"
              onClick={() => {
                playSound('click');
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent-primary)] text-black font-bold text-xs shadow-lg"
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
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white font-semibold text-xs border border-slate-200 dark:border-white/10"
            >
              <FileText className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span>{language === 'es' ? 'Ver en Pantalla' : 'View Online'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
