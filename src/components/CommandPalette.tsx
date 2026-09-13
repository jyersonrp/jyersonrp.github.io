import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/smoothScroll';
import { playSound, getSoundEnabled, setSoundEnabled } from '../utils/audioSystem';
import {
  Search,
  X,
  FileText,
  Download,
  Copy,
  Check,
  Globe,
  Volume2,
  VolumeX,
  ExternalLink,
  Code,
  Layers,
  Sparkles,
  Cpu,
  Mail,
  Phone,
  ArrowRight,
  Command,
  CornerDownLeft,
  FolderGit2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenCv: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

interface CommandItem {
  id: string;
  category: 'navigation' | 'projects' | 'actions' | 'social';
  title: { es: string; en: string };
  subtitle?: { es: string; en: string };
  icon: React.ReactNode;
  badge?: string;
  keywords: string[];
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  language,
  onToggleLanguage,
  onOpenCv,
  soundEnabled,
  onToggleSound
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggled
          playSound('open');
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      playSound('open');
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    playSound('success');
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(
        language === 'es'
          ? `¡${label} copiado al portapapeles!`
          : `Copied ${label} to clipboard!`
      );
    });
  };

  const downloadCvDirect = () => {
    playSound('click');
    const link = document.createElement('a');
    link.href = './CV_Yerson_Rodriguez.pdf';
    link.download = 'CV_Yerson_Rodriguez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      category: 'navigation',
      title: { es: 'Inicio / Portada', en: 'Home / Hero' },
      subtitle: { es: 'Volver a la cabecera principal', en: 'Jump to main hero section' },
      icon: <Sparkles className="w-4 h-4 text-[#2EE6A0]" />,
      keywords: ['inicio', 'home', 'top', 'hero', 'portada'],
      action: () => {
        onClose();
        smoothScrollTo(0);
      }
    },
    {
      id: 'nav-projects',
      category: 'navigation',
      title: { es: 'Casos de Estudio & Proyectos', en: 'Case Studies & Projects' },
      subtitle: { es: 'Smart NVR, Odoo WhatsApp, WhatsBot', en: 'Smart NVR, Odoo WhatsApp, WhatsBot' },
      icon: <Cpu className="w-4 h-4 text-[#00F0FF]" />,
      keywords: ['proyectos', 'projects', 'nvr', 'odoo', 'whatsbot', 'ia', 'vision'],
      action: () => {
        onClose();
        smoothScrollTo('#projects');
      }
    },
    {
      id: 'nav-philosophy',
      category: 'navigation',
      title: { es: 'Filosofía & Arquitectura de Software', en: 'Engineering Philosophy & Architecture' },
      subtitle: { es: 'POO 10/10, Clean Architecture, Concurrencia', en: 'OOP 10/10, Clean Architecture, Concurrency' },
      icon: <Layers className="w-4 h-4 text-[#2EE6A0]" />,
      keywords: ['filosofia', 'philosophy', 'arquitectura', 'architecture', 'poo', 'clean', 'solid', '10/10'],
      action: () => {
        onClose();
        smoothScrollTo('#philosophy');
      }
    },
    {
      id: 'nav-repos',
      category: 'navigation',
      title: { es: 'Explorador de Repositorios GitHub', en: 'GitHub Repositories Explorer' },
      subtitle: { es: 'Código fuente abierto y commits', en: 'Open source code and commits' },
      icon: <FolderGit2 className="w-4 h-4 text-[#00F0FF]" />,
      keywords: ['repos', 'github', 'codigo', 'commits', 'repositorios'],
      action: () => {
        onClose();
        smoothScrollTo('#repos');
      }
    },
    {
      id: 'nav-skills',
      category: 'navigation',
      title: { es: 'Stack Técnico & Habilidades', en: 'Technical Stack & Skills' },
      subtitle: { es: 'Python, FastAPI, Odoo ERP, OpenCV, TypeScript', en: 'Python, FastAPI, Odoo ERP, OpenCV, TypeScript' },
      icon: <Code className="w-4 h-4 text-[#2EE6A0]" />,
      keywords: ['habilidades', 'skills', 'stack', 'python', 'odoo', 'fastapi', 'typescript'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'nav-experience',
      category: 'navigation',
      title: { es: 'Trayectoria & Educación', en: 'Experience & Education' },
      subtitle: { es: 'Universidad de Oriente (UDO) & Certificaciones', en: 'Universidad de Oriente (UDO) & Certifications' },
      icon: <FileText className="w-4 h-4 text-[#00F0FF]" />,
      keywords: ['experiencia', 'educacion', 'udo', 'certificaciones', 'education', 'experience'],
      action: () => {
        onClose();
        smoothScrollTo('#experience');
      }
    },
    {
      id: 'nav-contact',
      category: 'navigation',
      title: { es: 'Contacto Directo & Redes', en: 'Direct Contact & Socials' },
      subtitle: { es: 'Email, WhatsApp, LinkedIn', en: 'Email, WhatsApp, LinkedIn' },
      icon: <Mail className="w-4 h-4 text-[#2EE6A0]" />,
      keywords: ['contacto', 'contact', 'email', 'whatsapp', 'telefono', 'contratar'],
      action: () => {
        onClose();
        smoothScrollTo('#contact');
      }
    },

    // Actions
    {
      id: 'act-download-cv',
      category: 'actions',
      title: { es: 'Descargar CV Oficial en PDF', en: 'Download Official PDF Resume' },
      subtitle: { es: 'Descarga directa de CV_Yerson_Rodriguez.pdf', en: 'Direct download of CV_Yerson_Rodriguez.pdf' },
      icon: <Download className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'PDF',
      keywords: ['cv', 'curriculum', 'resume', 'pdf', 'descargar', 'download'],
      action: downloadCvDirect
    },
    {
      id: 'act-view-cv',
      category: 'actions',
      title: { es: 'Ver Currículum en Pantalla', en: 'View Resume Modal' },
      subtitle: { es: 'Abrir visor interactivo e imprimible', en: 'Open interactive printable viewer' },
      icon: <FileText className="w-4 h-4 text-[#00F0FF]" />,
      keywords: ['cv', 'curriculum', 'resume', 'ver', 'view', 'modal'],
      action: () => {
        onClose();
        onOpenCv();
      }
    },
    {
      id: 'act-copy-email',
      category: 'actions',
      title: { es: 'Copiar Correo Electrónico', en: 'Copy Email Address' },
      subtitle: { es: PERSONAL_INFO.email, en: PERSONAL_INFO.email },
      icon: <Copy className="w-4 h-4 text-neutral-300" />,
      keywords: ['email', 'correo', 'copiar', 'copy'],
      action: () => copyToClipboard(PERSONAL_INFO.email, language === 'es' ? 'Correo' : 'Email')
    },
    {
      id: 'act-copy-phone',
      category: 'actions',
      title: { es: 'Copiar Teléfono / WhatsApp', en: 'Copy Phone / WhatsApp' },
      subtitle: { es: PERSONAL_INFO.phone, en: PERSONAL_INFO.phone },
      icon: <Phone className="w-4 h-4 text-neutral-300" />,
      keywords: ['telefono', 'phone', 'whatsapp', 'celular'],
      action: () => copyToClipboard(PERSONAL_INFO.phoneClean, language === 'es' ? 'Teléfono' : 'Phone')
    },
    {
      id: 'act-toggle-lang',
      category: 'actions',
      title: { es: 'Cambiar Idioma a Inglés', en: 'Switch Language to Spanish' },
      subtitle: { es: 'Current: Español (ES)', en: 'Current: English (EN)' },
      icon: <Globe className="w-4 h-4 text-[#00F0FF]" />,
      badge: language.toUpperCase(),
      keywords: ['idioma', 'language', 'english', 'espanol', 'ingles', 'spanish'],
      action: () => {
        onToggleLanguage();
        playSound('switch');
      }
    },
    {
      id: 'act-toggle-sound',
      category: 'actions',
      title: {
        es: soundEnabled ? 'Silenciar Efectos de Sonido' : 'Activar Efectos de Sonido Hápticos',
        en: soundEnabled ? 'Mute Sound Effects' : 'Enable Haptic Sound Effects'
      },
      subtitle: {
        es: soundEnabled ? 'Sonido Web Audio activo' : 'Sonido desactivado actualmente',
        en: soundEnabled ? 'Web Audio sound active' : 'Sound currently muted'
      },
      icon: soundEnabled ? <Volume2 className="w-4 h-4 text-[#2EE6A0]" /> : <VolumeX className="w-4 h-4 text-neutral-500" />,
      badge: soundEnabled ? 'ON' : 'MUTED',
      keywords: ['sonido', 'sound', 'audio', 'mute', 'volumen', 'haptic', 'clics'],
      action: () => {
        onToggleSound();
      }
    },

    // Social / External
    {
      id: 'soc-github',
      category: 'social',
      title: { es: 'Visitar Perfil de GitHub', en: 'Visit GitHub Profile' },
      subtitle: { es: 'github.com/jyersonrp', en: 'github.com/jyersonrp' },
      icon: <GithubIcon className="w-4 h-4 text-white" />,
      keywords: ['github', 'git', 'repos', 'perfil'],
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      }
    },
    {
      id: 'soc-linkedin',
      category: 'social',
      title: { es: 'Conectar en LinkedIn', en: 'Connect on LinkedIn' },
      subtitle: { es: 'linkedin.com/in/yerson-jose-rodriguez-perez', en: 'linkedin.com/in/yerson-jose-rodriguez-perez' },
      icon: <LinkedinIcon className="w-4 h-4 text-[#00F0FF]" />,
      keywords: ['linkedin', 'red', 'trabajo', 'conectar'],
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'soc-whatsapp',
      category: 'social',
      title: { es: 'Abrir Chat de WhatsApp', en: 'Start WhatsApp Chat' },
      subtitle: { es: PERSONAL_INFO.phone, en: PERSONAL_INFO.phone },
      icon: <Phone className="w-4 h-4 text-[#2EE6A0]" />,
      keywords: ['whatsapp', 'mensaje', 'chat'],
      action: () => {
        window.open(`https://wa.me/${PERSONAL_INFO.phoneClean}`, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const titleMatch = cmd.title[language].toLowerCase().includes(q);
    const subMatch = cmd.subtitle ? cmd.subtitle[language].toLowerCase().includes(q) : false;
    const keyMatch = cmd.keywords.some((k) => k.toLowerCase().includes(q));
    return titleMatch || subMatch || keyMatch;
  });

  // Handle keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSound('click');
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playSound('click');
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playSound('close');
          onClose();
        }
      }}
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl bg-[#0b0b12] border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-white/[0.08] bg-[#0f0f18]/60">
          <Search className="w-5 h-5 text-[#2EE6A0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'es'
                ? 'Escribe un comando o busca secciones, proyectos, CV...'
                : 'Type a command, search sections, projects, resume...'
            }
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base outline-none font-sans"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono text-neutral-400">
              ESC
            </kbd>
            <button
              onClick={() => {
                playSound('close');
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-white/[0.03]">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 space-y-2">
              <Command className="w-8 h-8 mx-auto opacity-40 text-neutral-400" />
              <p className="text-sm font-mono">
                {language === 'es' ? 'No se encontraron resultados para su búsqueda.' : 'No commands matched your query.'}
              </p>
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 sm:px-4 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-md'
                      : 'text-neutral-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-2 rounded-lg transition-colors shrink-0 ${
                        isSelected ? 'bg-white/15' : 'bg-white/5'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {item.title[language]}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#00F0FF]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-light">
                          {item.subtitle[language]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-500 shrink-0 ml-3">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#2EE6A0] bg-[#2EE6A0]/10 px-2 py-0.5 rounded border border-[#2EE6A0]/30">
                        <CornerDownLeft className="w-3 h-3" />
                        <span className="hidden sm:inline">Ejecutar</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Bar with Keyboard Cheatsheet */}
        <div className="px-4 py-3 bg-[#08080d] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">↑↓</kbd>
              <span className="hidden sm:inline">{language === 'es' ? 'Navegar' : 'Navigate'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">↵</kbd>
              <span className="hidden sm:inline">{language === 'es' ? 'Seleccionar' : 'Select'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">esc</kbd>
              <span className="hidden sm:inline">{language === 'es' ? 'Cerrar' : 'Close'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#2EE6A0] font-semibold">{filteredCommands.length}</span>
            <span>{language === 'es' ? 'comandos' : 'commands'}</span>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-[#2EE6A0] text-black font-semibold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
