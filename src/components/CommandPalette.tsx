import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/smoothScroll';
import { playSound } from '../utils/audioSystem';
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
  Command,
  CornerDownLeft,
  FolderGit2,
  Bot,
  Database,
  Server,
  ShieldCheck,
  Award
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

type CommandCategory = 'navigation' | 'projects' | 'repos' | 'skills' | 'actions' | 'social';

interface CommandItem {
  id: string;
  category: CommandCategory;
  title: { es: string; en: string };
  subtitle?: { es: string; en: string };
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  keywords: string[];
  action: () => void;
}

const CATEGORY_META: Record<CommandCategory, { es: string; en: string; color: string }> = {
  navigation: { es: 'Secciones', en: 'Sections', color: '#2EE6A0' },
  projects: { es: 'Casos de Estudio & Proyectos', en: 'Case Studies & Projects', color: '#00F0FF' },
  repos: { es: 'Repositorios GitHub', en: 'GitHub Repositories', color: '#c084fc' },
  skills: { es: 'Stack Técnico & Habilidades', en: 'Tech Stack & Skills', color: '#38bdf8' },
  actions: { es: 'Acciones & Documentos', en: 'Actions & Documents', color: '#2EE6A0' },
  social: { es: 'Contacto & Redes', en: 'Contact & Social', color: '#fbbf24' }
};

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

  // Focus input and lock background scroll when opened
  useEffect(() => {
    if (isOpen) {
      playSound('open');
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Global Escape key listener while open
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playSound('close');
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
  }, [isOpen, onClose]);

  const showToast = (msg: string) => {
    playSound('success');
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
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
    // -------------------------------------------------------------
    // 1. Navigation Sections
    // -------------------------------------------------------------
    {
      id: 'nav-home',
      category: 'navigation',
      title: { es: 'Inicio / Portada', en: 'Home / Hero' },
      subtitle: { es: 'Volver a la cabecera principal y esfera 3D', en: 'Jump to main hero section & 3D core' },
      icon: <Sparkles className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'SECCIÓN',
      keywords: ['inicio', 'home', 'top', 'hero', 'portada', 'esfera', '3d'],
      action: () => {
        onClose();
        smoothScrollTo(0);
      }
    },
    {
      id: 'nav-projects',
      category: 'navigation',
      title: { es: 'Casos de Estudio & Proyectos', en: 'Case Studies & Projects' },
      subtitle: { es: 'Smart NVR, Odoo WhatsApp Chatter, WhatsBot CRM', en: 'Smart NVR, Odoo WhatsApp Chatter, WhatsBot CRM' },
      icon: <Cpu className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'SECCIÓN',
      keywords: ['proyectos', 'projects', 'casos', 'estudios', 'nvr', 'odoo', 'whatsbot'],
      action: () => {
        onClose();
        smoothScrollTo('#projects');
      }
    },
    {
      id: 'nav-philosophy',
      category: 'navigation',
      title: { es: 'Filosofía & Arquitectura de Software', en: 'Engineering Philosophy & Architecture' },
      subtitle: { es: 'POO 10/10 en UDO, Clean Architecture, Concurrencia y Calidad', en: 'OOP 10/10 at UDO, Clean Architecture, Concurrency and Quality' },
      icon: <Layers className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'SECCIÓN',
      keywords: ['filosofia', 'philosophy', 'arquitectura', 'architecture', 'poo', 'clean', 'solid', '10/10', 'concurrencia'],
      action: () => {
        onClose();
        smoothScrollTo('#philosophy');
      }
    },
    {
      id: 'nav-repos',
      category: 'navigation',
      title: { es: 'Explorador de Repositorios GitHub', en: 'GitHub Repositories Explorer' },
      subtitle: { es: 'Código fuente abierto, commits y sincronización en vivo', en: 'Open-source code, commits, and live sync' },
      icon: <FolderGit2 className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'SECCIÓN',
      keywords: ['repos', 'github', 'codigo', 'commits', 'repositorios', 'open source'],
      action: () => {
        onClose();
        smoothScrollTo('#repos');
      }
    },
    {
      id: 'nav-skills',
      category: 'navigation',
      title: { es: 'Stack Técnico & Habilidades', en: 'Technical Stack & Skills' },
      subtitle: { es: 'Python, FastAPI, Odoo ERP, OpenCV, TypeScript, Docker', en: 'Python, FastAPI, Odoo ERP, OpenCV, TypeScript, Docker' },
      icon: <Code className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'SECCIÓN',
      keywords: ['habilidades', 'skills', 'stack', 'python', 'odoo', 'fastapi', 'typescript', 'docker'],
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
      badge: 'SECCIÓN',
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
      subtitle: { es: 'Email, WhatsApp, LinkedIn y formulario de propuesta', en: 'Email, WhatsApp, LinkedIn and project proposal form' },
      icon: <Mail className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'SECCIÓN',
      keywords: ['contacto', 'contact', 'email', 'whatsapp', 'telefono', 'contratar'],
      action: () => {
        onClose();
        smoothScrollTo('#contact');
      }
    },

    // -------------------------------------------------------------
    // 2. Individual Projects (Deep-links)
    // -------------------------------------------------------------
    {
      id: 'proj-smart-nvr',
      category: 'projects',
      title: { es: 'Proyecto: Smart NVR Videovigilancia IA', en: 'Project: Smart NVR Video Surveillance AI' },
      subtitle: { es: 'Pipeline híbrido OpenCV MOG2 + YOLOv8 ONNX, streaming ultrarrápido <75ms', en: 'OpenCV MOG2 + YOLOv8 ONNX hybrid pipeline, <75ms ultra-low latency streaming' },
      icon: <Cpu className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'NVR / AI',
      badgeColor: '#2EE6A0',
      keywords: ['nvr', 'videovigilancia', 'opencv', 'yolov8', 'onnx', 'camaras', 'vision', 'ia', 'inteligente', 'surveillance'],
      action: () => {
        onClose();
        smoothScrollTo('#smart-nvr-vision-ai');
      }
    },
    {
      id: 'proj-odoo-whatsapp',
      category: 'projects',
      title: { es: 'Proyecto: Odoo WhatsApp Chatter Meta', en: 'Project: Odoo WhatsApp Chatter Meta' },
      subtitle: { es: 'Módulo ERP nativo, PDFs en memoria RAM (0 bytes en disco) y HMAC-SHA256', en: 'Native ERP module, in-memory PDFs (0 disk footprint), and HMAC-SHA256' },
      icon: <Server className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'ERP / META',
      badgeColor: '#00F0FF',
      keywords: ['odoo', 'whatsapp', 'erp', 'meta', 'chatter', 'facturas', 'pdf', 'hmac', 'webhook'],
      action: () => {
        onClose();
        smoothScrollTo('#odoo-whatsapp-chatter');
      }
    },
    {
      id: 'proj-whatsbot-fsm',
      category: 'projects',
      title: { es: 'Proyecto: WhatsBot Glam Nails CRM', en: 'Project: WhatsBot Glam Nails CRM' },
      subtitle: { es: 'Bot conversacional con Máquina de Estados Finitos (FSM) y locks atómicos', en: 'High-availability conversational bot with FSM & PostgreSQL atomic locks' },
      icon: <Bot className="w-4 h-4 text-[#c084fc]" />,
      badge: 'BOT / FSM',
      badgeColor: '#c084fc',
      keywords: ['whatsbot', 'bot', 'fsm', 'citas', 'crm', 'typescript', 'postgresql', 'glam', 'nails'],
      action: () => {
        onClose();
        smoothScrollTo('#whatsbot-glam-nails');
      }
    },

    // -------------------------------------------------------------
    // 3. GitHub Repositories (Direct open)
    // -------------------------------------------------------------
    {
      id: 'repo-nvr',
      category: 'repos',
      title: { es: 'Repo: proyecto-videovigilancia-inteligente', en: 'Repo: proyecto-videovigilancia-inteligente' },
      subtitle: { es: 'github.com/jyersonrp/proyecto-videovigilancia-inteligente', en: 'github.com/jyersonrp/proyecto-videovigilancia-inteligente' },
      icon: <GithubIcon className="w-4 h-4 text-white" />,
      badge: 'GITHUB',
      keywords: ['repo', 'github', 'videovigilancia', 'nvr', 'codigo', 'fuente'],
      action: () => {
        window.open('https://github.com/jyersonrp/proyecto-videovigilancia-inteligente', '_blank');
        onClose();
      }
    },
    {
      id: 'repo-odoo',
      category: 'repos',
      title: { es: 'Repo: odoo-whatsapp-chatter-meta', en: 'Repo: odoo-whatsapp-chatter-meta' },
      subtitle: { es: 'github.com/jyersonrp/odoo-whatsapp-chatter-meta', en: 'github.com/jyersonrp/odoo-whatsapp-chatter-meta' },
      icon: <GithubIcon className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'GITHUB',
      keywords: ['repo', 'github', 'odoo', 'whatsapp', 'meta', 'codigo', 'fuente'],
      action: () => {
        window.open('https://github.com/jyersonrp/odoo-whatsapp-chatter-meta', '_blank');
        onClose();
      }
    },
    {
      id: 'repo-whatsbot',
      category: 'repos',
      title: { es: 'Repo: WhatsBot-GlamNails', en: 'Repo: WhatsBot-GlamNails' },
      subtitle: { es: 'github.com/jyersonrp/WhatsBot-GlamNails', en: 'github.com/jyersonrp/WhatsBot-GlamNails' },
      icon: <GithubIcon className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'GITHUB',
      keywords: ['repo', 'github', 'whatsbot', 'bot', 'fsm', 'typescript', 'codigo'],
      action: () => {
        window.open('https://github.com/jyersonrp/WhatsBot-GlamNails', '_blank');
        onClose();
      }
    },
    {
      id: 'repo-portfolio',
      category: 'repos',
      title: { es: 'Repo: Portafolio Web Personal (Source Code)', en: 'Repo: Personal Portfolio Website (Source Code)' },
      subtitle: { es: 'github.com/jyersonrp/jyersonrp.github.io', en: 'github.com/jyersonrp/jyersonrp.github.io' },
      icon: <GithubIcon className="w-4 h-4 text-neutral-300" />,
      badge: 'VITE+REACT',
      keywords: ['repo', 'github', 'portafolio', 'portfolio', 'web', 'react', 'vite'],
      action: () => {
        window.open('https://github.com/jyersonrp/jyersonrp.github.io', '_blank');
        onClose();
      }
    },
    {
      id: 'repo-profile',
      category: 'repos',
      title: { es: 'Perfil Oficial de GitHub (@jyersonrp)', en: 'Official GitHub Profile (@jyersonrp)' },
      subtitle: { es: 'github.com/jyersonrp', en: 'github.com/jyersonrp' },
      icon: <GithubIcon className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'PROFILE',
      keywords: ['github', 'perfil', 'profile', 'jyersonrp', 'repositorios'],
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      }
    },

    // -------------------------------------------------------------
    // 4. Skills & Technical Stack (Direct jump & highlight)
    // -------------------------------------------------------------
    {
      id: 'skill-python-fastapi',
      category: 'skills',
      title: { es: 'Habilidad: Python 3 & FastAPI Asíncrono', en: 'Skill: Python 3 & Async FastAPI' },
      subtitle: { es: 'APIs asíncronas de alto throughput, WebSockets y Clean Architecture', en: 'High-throughput async APIs, WebSockets, and Clean Architecture' },
      icon: <Code className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'BACKEND',
      keywords: ['python', 'fastapi', 'async', 'backend', 'api', 'habilidad', 'skill'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-odoo-erp',
      category: 'skills',
      title: { es: 'Habilidad: Odoo ERP (ORM & Módulos Nativos)', en: 'Skill: Odoo ERP (ORM & Native Modules)' },
      subtitle: { es: 'Desarrollo de módulos desacoplados, modelos de negocio e integraciones', en: 'Decoupled module development, business models, and integrations' },
      icon: <Server className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'ERP',
      keywords: ['odoo', 'erp', 'orm', 'python', 'enterprise', 'habilidad', 'skill'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-opencv-yolo',
      category: 'skills',
      title: { es: 'Habilidad: OpenCV (MOG2) & YOLOv8 / YOLOv11', en: 'Skill: OpenCV (MOG2) & YOLOv8 / YOLOv11' },
      subtitle: { es: 'Detección en tiempo real, sustracción de fondo e inferencia acelerada', en: 'Real-time object detection, background subtraction, and fast inference' },
      icon: <Cpu className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'AI / VISION',
      keywords: ['opencv', 'yolo', 'yolov8', 'yolov11', 'vision', 'ia', 'ai', 'mog2', 'deteccion'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-onnx-runtime',
      category: 'skills',
      title: { es: 'Habilidad: ONNX Runtime (Inferencia Óptima)', en: 'Skill: ONNX Runtime (Optimized Inference)' },
      subtitle: { es: 'Inferencia neuronal en hardware modesto sin saturar CPU ni generar calor', en: 'Neural inference on edge/CPU without thermal throttling' },
      icon: <Cpu className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'AI ENGINE',
      keywords: ['onnx', 'runtime', 'inferencia', 'optimizacion', 'ia', 'modelos'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-postgresql',
      category: 'skills',
      title: { es: 'Habilidad: PostgreSQL & Transacciones ACID', en: 'Skill: PostgreSQL & ACID Transactions' },
      subtitle: { es: 'Bloqueos pesimistas FOR UPDATE, modelado relacional y alta concurrencia', en: 'Pessimistic FOR UPDATE locking, relational modeling, and concurrency' },
      icon: <Database className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'DATABASE',
      keywords: ['postgres', 'postgresql', 'sql', 'bd', 'base de datos', 'locking', 'acid'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-docker-devops',
      category: 'skills',
      title: { es: 'Habilidad: Docker, CI/CD & Contenedores', en: 'Skill: Docker, CI/CD & Containers' },
      subtitle: { es: 'Compilaciones multi-stage, despliegues reproducibles y GitHub Actions', en: 'Multi-stage builds, reproducible deployments, and GitHub Actions' },
      icon: <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'DEVOPS',
      keywords: ['docker', 'devops', 'ci/cd', 'contenedores', 'github actions'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-typescript-react',
      category: 'skills',
      title: { es: 'Habilidad: TypeScript, React & Node.js', en: 'Skill: TypeScript, React & Node.js' },
      subtitle: { es: 'Tipado estricto, interfaces reactivas modernas y FSMs concurrentes', en: 'Strict typing, modern reactive interfaces, and concurrent FSMs' },
      icon: <Code className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'FULL-STACK',
      keywords: ['typescript', 'react', 'nodejs', 'frontend', 'javascript'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },
    {
      id: 'skill-pytest-tdd',
      category: 'skills',
      title: { es: 'Habilidad: Pytest, TDD & Contratos Tipados', en: 'Skill: Pytest, TDD & Typing Contracts' },
      subtitle: { es: 'Testing riguroso de webhooks, emulación de caídas y suites automatizadas', en: 'Rigorous webhook testing, network partition mocks, and automated suites' },
      icon: <Award className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'QUALITY',
      keywords: ['pytest', 'tdd', 'testing', 'tests', 'calidad', 'type hints'],
      action: () => {
        onClose();
        smoothScrollTo('#skills');
      }
    },

    // -------------------------------------------------------------
    // 5. Actions & Direct Downloads
    // -------------------------------------------------------------
    {
      id: 'act-download-cv',
      category: 'actions',
      title: { es: 'Descargar CV Oficial en PDF', en: 'Download Official PDF Resume' },
      subtitle: { es: 'Descarga directa de CV_Yerson_Rodriguez.pdf (24.2 KB)', en: 'Direct download of CV_Yerson_Rodriguez.pdf (24.2 KB)' },
      icon: <Download className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'PDF',
      keywords: ['cv', 'curriculum', 'resume', 'pdf', 'descargar', 'download', 'archivo'],
      action: downloadCvDirect
    },
    {
      id: 'act-view-cv',
      category: 'actions',
      title: { es: 'Ver Currículum en Pantalla (Modal)', en: 'View Resume Onscreen (Modal)' },
      subtitle: { es: 'Abrir visor interactivo, imprimible y descargable', en: 'Open interactive, printable, and downloadable viewer' },
      icon: <FileText className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'MODAL',
      keywords: ['cv', 'curriculum', 'resume', 'ver', 'view', 'modal', 'pantalla', 'online'],
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
      badge: 'COPY',
      keywords: ['email', 'correo', 'copiar', 'copy'],
      action: () => copyToClipboard(PERSONAL_INFO.email, language === 'es' ? 'Correo' : 'Email')
    },
    {
      id: 'act-copy-phone',
      category: 'actions',
      title: { es: 'Copiar Teléfono / WhatsApp', en: 'Copy Phone / WhatsApp' },
      subtitle: { es: PERSONAL_INFO.phone, en: PERSONAL_INFO.phone },
      icon: <Phone className="w-4 h-4 text-neutral-300" />,
      badge: 'COPY',
      keywords: ['telefono', 'phone', 'whatsapp', 'celular', 'copiar'],
      action: () => copyToClipboard(PERSONAL_INFO.phoneClean, language === 'es' ? 'Teléfono' : 'Phone')
    },
    {
      id: 'act-toggle-lang',
      category: 'actions',
      title: {
        es: 'Cambiar Idioma a Inglés (Switch to English)',
        en: 'Cambiar Idioma a Español (Switch to Spanish)'
      },
      subtitle: {
        es: 'Actual: Español (ES)',
        en: 'Current: English (EN)'
      },
      icon: <Globe className="w-4 h-4 text-[#00F0FF]" />,
      badge: language.toUpperCase(),
      keywords: ['idioma', 'language', 'english', 'espanol', 'ingles', 'spanish', 'toggle'],
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
        es: soundEnabled ? 'Sonido Web Audio activo (haz clic para silenciar)' : 'Sonido desactivado (haz clic para activar)',
        en: soundEnabled ? 'Web Audio sound active (click to mute)' : 'Sound currently muted (click to enable)'
      },
      icon: soundEnabled ? <Volume2 className="w-4 h-4 text-[#2EE6A0]" /> : <VolumeX className="w-4 h-4 text-neutral-500" />,
      badge: soundEnabled ? 'ON' : 'MUTED',
      keywords: ['sonido', 'sound', 'audio', 'mute', 'volumen', 'haptic', 'clics', 'silencio'],
      action: () => {
        onToggleSound();
      }
    },

    // -------------------------------------------------------------
    // 6. Social / Direct Contact
    // -------------------------------------------------------------
    {
      id: 'soc-whatsapp',
      category: 'social',
      title: { es: 'Abrir Chat Directo de WhatsApp', en: 'Start Direct WhatsApp Chat' },
      subtitle: { es: PERSONAL_INFO.phone, en: PERSONAL_INFO.phone },
      icon: <Phone className="w-4 h-4 text-[#2EE6A0]" />,
      badge: 'CHAT',
      keywords: ['whatsapp', 'mensaje', 'chat', 'directo', 'contacto'],
      action: () => {
        window.open(`https://wa.me/${PERSONAL_INFO.phoneClean}`, '_blank');
        onClose();
      }
    },
    {
      id: 'soc-linkedin',
      category: 'social',
      title: { es: 'Conectar en LinkedIn', en: 'Connect on LinkedIn' },
      subtitle: { es: 'linkedin.com/in/yerson-jose-rodriguez-perez', en: 'linkedin.com/in/yerson-jose-rodriguez-perez' },
      icon: <LinkedinIcon className="w-4 h-4 text-[#00F0FF]" />,
      badge: 'RED',
      keywords: ['linkedin', 'red', 'trabajo', 'conectar', 'perfil'],
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
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
    const badgeMatch = cmd.badge ? cmd.badge.toLowerCase().includes(q) : false;
    const categoryMatch = CATEGORY_META[cmd.category][language].toLowerCase().includes(q);
    return titleMatch || subMatch || keyMatch || badgeMatch || categoryMatch;
  });

  // Ensure selectedIndex is within valid range when filtered list changes
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Auto-scroll to selected command item smoothly
  useEffect(() => {
    if (!isOpen) return;
    const activeItem = document.getElementById(`cmd-item-${selectedIndex}`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, isOpen]);

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
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-start justify-center p-3 sm:p-6 pt-14 sm:pt-20 animate-in fade-in duration-200"
    >
      <div
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        className="w-full max-w-2xl bg-[#0b0b12] border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[85vh] outline-none"
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.08] bg-[#0f0f18]/70">
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
                ? 'Escribe para buscar proyectos, repos, habilidades, CV...'
                : 'Type to search projects, repos, skills, resume...'
            }
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base outline-none font-sans"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-white"
              aria-label="Clear query"
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
        <div
          ref={listRef}
          className="overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-white/[0.03] scrollbar-thin"
        >
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
              const catMeta = CATEGORY_META[item.category];

              return (
                <div
                  key={item.id}
                  id={`cmd-item-${idx}`}
                  onClick={() => {
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 sm:px-4 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/[0.09] text-white border border-white/[0.12] shadow-md'
                      : 'text-neutral-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`p-2 rounded-lg transition-colors shrink-0 ${
                        isSelected ? 'bg-white/15' : 'bg-white/5'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {item.title[language]}
                        </span>
                        {item.badge && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[9.5px] font-mono shrink-0"
                            style={{
                              backgroundColor: `${catMeta.color}18`,
                              color: catMeta.color,
                              border: `1px solid ${catMeta.color}35`
                            }}
                          >
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
                        <span className="hidden sm:inline">{language === 'es' ? 'Ejecutar' : 'Select'}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Bar with Keyboard Cheatsheet */}
        <div className="px-4 py-2.5 sm:py-3 bg-[#08080d] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-3 sm:gap-4">
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

          <div className="flex items-center gap-1.5">
            <span className="text-[#2EE6A0] font-semibold">{filteredCommands.length}</span>
            <span>{language === 'es' ? 'opciones' : 'commands'}</span>
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

export default CommandPalette;
