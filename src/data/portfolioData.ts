import { Project, ExperienceItem, EducationItem, CertificationItem, SkillCategory, ArchitecturePillar, EngineeringTenet } from '../types';
import { getPublicEmail } from '../utils/security';

export const PERSONAL_INFO = {
  name: "Yerson Rodríguez",
  fullName: "Yerson José Rodríguez Pérez",
  title: {
    es: "Full-Stack & Python Developer | Odoo ERP | IA & Visión por Computadora",
    en: "Full-Stack & Python Developer | Odoo ERP | AI & Computer Vision"
  },
  tagline: {
    es: "Ingeniería de software de alta precisión, arquitecturas resilientes e inteligencia artificial aplicada al mundo real.",
    en: "High-precision software engineering, resilient architectures, and real-world applied artificial intelligence."
  },
  about: {
    es: "Estudiante de 9no semestre de Ingeniería de Sistemas en la Universidad de Oriente (UDO) con calificación perfecta (10/10) en Programación Orientada a Objetos. Especialista en desarrollo backend con Python, FastAPI y Odoo ERP, integrando visión artificial (YOLOv8 + OpenCV) y automatizaciones de alta escala. Nivel de inglés C1 con fluidez técnica para colaborar con equipos internacionales.",
    en: "9th-semester Systems Engineering student at Universidad de Oriente (UDO) with a perfect grade (10/10) in Object-Oriented Programming. Specialist in backend development with Python, FastAPI, and Odoo ERP, integrating computer vision (YOLOv8 + OpenCV) and high-scale automations. C1 English level with full professional fluency to collaborate seamlessly in international teams."
  },
  location: "Maturín, Monagas, Venezuela",
  phone: "+58 416-1828027",
  phoneClean: "+584161828027",
  email: getPublicEmail(),
  linkedin: "https://www.linkedin.com/in/yerson-jose-rodriguez-perez",
  github: "https://github.com/jyersonrp",
  status: {
    es: "Disponible para contratación inmediata",
    en: "Available for immediate hire"
  },
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "Avanzado C1 – Fluidez Profesional", en: "Advanced C1 – Professional Fluency" } }
  ]
};

export const IMPACT_METRICS = [
  {
    value: "10/10",
    label: { es: "Calificación Máxima en POO", en: "Top Grade in OOP (UDO)" },
    sub: { es: "Ingeniería de Sistemas UDO", en: "Systems Engineering UDO" }
  },
  {
    value: "C1",
    label: { es: "Nivel de Inglés Avanzado", en: "Advanced English Level" },
    sub: { es: "Comunicación técnica fluida", en: "Fluid technical communication" }
  },
  {
    value: "70%",
    label: { es: "Ahorro de Cómputo en IA", en: "Compute Optimization in AI" },
    sub: { es: "Arquitectura Híbrida MOG2+YOLO", en: "Hybrid MOG2+YOLO Architecture" }
  },
  {
    value: "100%",
    label: { es: "Código Tipado y Testeado", en: "Typed & Tested Codebase" },
    sub: { es: "Clean Architecture & Pytest", en: "Clean Architecture & Pytest" }
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "smart-nvr-vision-ai",
    featured: true,
    type: "nvr",
    title: {
      es: "Sistema NVR de Videovigilancia Inteligente con IA",
      en: "Smart NVR Intelligent Video Surveillance with AI"
    },
    tagline: {
      es: "Detección híbrida de movimiento e inferencia YOLOv8 ONNX con modo ECO adaptativo y streaming MJPEG ultrarrápido.",
      en: "Hybrid motion detection and YOLOv8 ONNX inference with adaptive ECO mode and ultra-low latency MJPEG streaming."
    },
    problem: {
      es: "Los sistemas de videovigilancia convencionales saturan el procesador con inferencia neuronal continua 24/7, generando sobrecalentamiento, alto consumo eléctrico y latencias inaceptables en hardware modesto.",
      en: "Conventional surveillance systems max out CPU/GPU with continuous 24/7 neural inference, causing thermal throttling, huge electricity draw, and unacceptable latency on edge or modest hardware."
    },
    solution: {
      es: "Diseñé un pipeline en dos etapas: OpenCV MOG2 analiza sustracción de fondo ligera a bajo costo; al detectar movimiento real activa el motor ONNX Runtime con YOLOv8 para clasificar personas y vehículos. Implementé un modo ECO que baja a 1 FPS en reposo y escala a 30 FPS en eventos con streaming FastAPI multihilo.",
      en: "Engineered a dual-stage pipeline: lightweight OpenCV MOG2 performs background subtraction at minimal cost; once real motion is flagged, it spins up ONNX Runtime with YOLOv8 for precise classification. Built an adaptive ECO mode that drops to 1 FPS on idle and ramps to 30 FPS with multi-threaded FastAPI MJPEG streaming."
    },
    architecture: [
      "Python 3.11",
      "FastAPI Asíncrono",
      "OpenCV (MOG2)",
      "YOLOv8 (ONNX Runtime)",
      "WebSockets / SSE",
      "Threading & Ring Buffer"
    ],
    metrics: [
      { label: { es: "Ahorro CPU en reposo", en: "Idle CPU Savings" }, value: "70%" },
      { label: { es: "Latencia de Streaming", en: "Streaming Latency" }, value: "< 75ms" },
      { label: { es: "Precisión de Detección", en: "Detection Accuracy" }, value: "99.2%" }
    ],
    githubUrl: "https://github.com/jyersonrp/proyecto-videovigilancia-inteligente",
    tags: ["Python", "FastAPI", "OpenCV", "YOLOv8", "ONNX", "Computer Vision", "Clean Architecture"]
  },
  {
    id: "odoo-whatsapp-chatter",
    featured: true,
    type: "odoo",
    title: {
      es: "Odoo WhatsApp Chatter Meta Integration",
      en: "Odoo WhatsApp Chatter Meta Integration"
    },
    tagline: {
      es: "Módulo nativo Odoo ERP para mensajería omnicanal con WhatsApp Cloud API oficial, PDFs en memoria y validación HMAC.",
      en: "Native Odoo ERP module for omnichannel messaging via official WhatsApp Cloud API, in-memory PDFs, and HMAC verification."
    },
    problem: {
      es: "Las empresas pierden seguimiento de ventas y soporte al comunicarse fuera del ERP, además de vulnerabilidades al recibir webhooks sin verificación y sobrecarga de disco por almacenamiento temporal de PDFs.",
      en: "Enterprises lose critical sales context and support tracking when chatting outside the ERP, alongside security vulnerabilities from unverified webhooks and disk degradation from temp PDF files."
    },
    solution: {
      es: "Desarrollé un módulo desacoplado para Odoo que consume la Graph API de Meta. Gestiona el ciclo de vida de la ventana de 24 horas, despacha plantillas HSM verificadas, renderiza presupuestos y facturas en streams de bytes en memoria (RAM) y autentica webhooks mediante HMAC-SHA256 con reversión segura.",
      en: "Developed a decoupled Odoo module interfacing with Meta's Graph API. Manages 24-hour conversation windows, dispatches pre-approved HSM templates, streams generated invoice/quote PDFs directly from memory (RAM), and secures inbound webhooks via HMAC-SHA256 signature verification."
    },
    architecture: [
      "Python / Odoo ORM",
      "Meta WhatsApp Cloud API",
      "HMAC-SHA256 Auth",
      "BytesIO In-Memory PDF",
      "PostgreSQL",
      "JSON Webhook Engine"
    ],
    metrics: [
      { label: { es: "Reducción ciclo de ventas", en: "Sales Cycle Drop" }, value: "65%" },
      { label: { es: "I/O de disco temporal", en: "Temp Disk I/O" }, value: "0 bytes" },
      { label: { es: "Trazabilidad de mensajes", en: "Audit Traceability" }, value: "100%" }
    ],
    githubUrl: "https://github.com/jyersonrp/odoo-whatsapp-chatter-meta",
    tags: ["Python", "Odoo ERP", "Meta Graph API", "HMAC Security", "PostgreSQL", "Enterprise"]
  },
  {
    id: "whatsbot-glam-nails",
    featured: true,
    type: "bot",
    title: {
      es: "WhatsBot Glam Nails - Automated CRM",
      en: "WhatsBot Glam Nails - Automated CRM"
    },
    tagline: {
      es: "Bot conversacional de alta disponibilidad con Máquina de Estados Finitos (FSM) y gestión transaccional de citas.",
      en: "High-availability conversational bot powered by Finite State Machine (FSM) and transactional appointment scheduling."
    },
    problem: {
      es: "Alta tasa de inasistencia (no-shows) y saturación de operadores humanos atendiendo preguntas frecuentes repetitivas y coordinando horarios manualmente.",
      en: "High appointment no-show rates and human operator overload handling repetitive FAQs and manual scheduling across peak hours."
    },
    solution: {
      es: "Arquitectura basada en FSM determinista en TypeScript y PostgreSQL. Permite a los clientes agendar, reprogramar y consultar servicios 24/7, con validación de disponibilidad en tiempo real, bloqueos atómicos contra sobreturnos y recordatorios programados automatizados.",
      en: "Deterministic FSM architecture built with TypeScript and PostgreSQL. Enables customers to seamlessly book, reschedule, and explore service catalogs 24/7 with atomic concurrency locking against double bookings and scheduled automated reminders."
    },
    architecture: [
      "TypeScript / Node.js",
      "Finite State Machine (FSM)",
      "PostgreSQL / Prisma",
      "WhatsApp Webhook Engine",
      "Atomic Locking",
      "Cron Reminders"
    ],
    metrics: [
      { label: { es: "Consultas automatizadas", en: "Automated Inquiries" }, value: "80%" },
      { label: { es: "Reducción de No-Shows", en: "Drop in No-Shows" }, value: "45%" },
      { label: { es: "Disponibilidad del Bot", en: "Service Uptime" }, value: "99.9%" }
    ],
    githubUrl: "https://github.com/jyersonrp/WhatsBot-GlamNails",
    tags: ["TypeScript", "Node.js", "FSM", "PostgreSQL", "Automation", "CRM"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      es: "Backend & ERP",
      en: "Backend & ERP"
    },
    description: {
      es: "Sistemas robustos, APIs asíncronas de alto rendimiento y lógica empresarial empresarial.",
      en: "Robust distributed systems, high-performance async APIs, and enterprise business logic."
    },
    skills: [
      { name: "Python 3", level: "Avanzado / Advanced", highlight: true },
      { name: "FastAPI", level: "Avanzado / Advanced", highlight: true },
      { name: "Odoo ERP (ORM)", level: "Especialista / Specialist", highlight: true },
      { name: "Flask & Django", level: "Competente / Proficient" },
      { name: "PostgreSQL & SQL", level: "Avanzado / Advanced", highlight: true },
      { name: "RESTful APIs & Webhooks", level: "Avanzado / Advanced" },
      { name: "Pytest & TDD", level: "Avanzado / Advanced" }
    ]
  },
  {
    title: {
      es: "IA & Visión por Computadora",
      en: "AI & Computer Vision"
    },
    description: {
      es: "Modelos de detección en tiempo real, inferencia optimizada y visión artificial aplicada.",
      en: "Real-time edge detection models, accelerated inference, and applied computer vision."
    },
    skills: [
      { name: "OpenCV (MOG2, Video)", level: "Avanzado / Advanced", highlight: true },
      { name: "YOLOv8 / YOLOv11", level: "Avanzado / Advanced", highlight: true },
      { name: "ONNX Runtime", level: "Intermedio-Avanzado", highlight: true },
      { name: "NumPy & Data Ops", level: "Avanzado / Advanced" },
      { name: "Procesamiento de Video MJPEG/RTSP", level: "Avanzado / Advanced" },
      { name: "IA Generativa & LLM Prompts", level: "Competente / Proficient" }
    ]
  },
  {
    title: {
      es: "Frontend & Web Moderno",
      en: "Frontend & Modern Web"
    },
    description: {
      es: "Interfaces reactivas, tipado estricto y diseño editorial dark obsidian con microinteracciones.",
      en: "Reactive UIs, strict static typing, and dark obsidian editorial design with rich micro-interactions."
    },
    skills: [
      { name: "TypeScript", level: "Avanzado / Advanced", highlight: true },
      { name: "JavaScript (ESNext)", level: "Avanzado / Advanced" },
      { name: "React 18/19", level: "Avanzado / Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Avanzado / Advanced", highlight: true },
      { name: "HTML5 & CSS3 Moderno", level: "Avanzado / Advanced" },
      { name: "Framer Motion & Canvas API", level: "Competente / Proficient" }
    ]
  },
  {
    title: {
      es: "Arquitectura & Metodologías",
      en: "Architecture & Methodologies"
    },
    description: {
      es: "Fundamentos teóricos sólidos (POO 10/10), patrones de diseño y devops moderno.",
      en: "Rock-solid engineering foundations (OOP 10/10), design patterns, and modern devops."
    },
    skills: [
      { name: "POO & SOLID (10/10 UDO)", level: "Excelente / Master", highlight: true },
      { name: "Clean Architecture", level: "Avanzado / Advanced", highlight: true },
      { name: "Estructuras de Datos & Algoritmos", level: "Especialista / Specialist", highlight: true },
      { name: "Docker & Contenedores", level: "Competente / Proficient" },
      { name: "Git & GitHub CI/CD", level: "Avanzado / Advanced" },
      { name: "Linux / Bash", level: "Avanzado / Advanced" }
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: {
      es: "Agosto 2025 — Actualidad",
      en: "August 2025 — Present"
    },
    role: {
      es: "Desarrollador Full-Stack & Soluciones de Software",
      en: "Full-Stack Developer & Software Solutions Engineer"
    },
    company: {
      es: "Freelance & Proyectos de Ingeniería Aplicada",
      en: "Freelance & Applied Engineering Projects"
    },
    location: {
      es: "Remoto / Maturín, Venezuela",
      en: "Remote / Maturín, Venezuela"
    },
    description: {
      es: "Diseño e implementación de sistemas backend de alto impacto, automatización comercial para WhatsApp con Meta Cloud API y procesamiento de visión artificial en tiempo real.",
      en: "Design and deployment of high-impact backend systems, commercial WhatsApp automations via Meta Cloud API, and real-time computer vision processing pipelines."
    },
    achievements: {
      es: [
        "Desarrollo integral de módulo Odoo ERP para integración con WhatsApp Cloud API con cero degradación de disco (PDFs en RAM) y autenticación HMAC-SHA256.",
        "Implementación de NVR con IA híbrida (MOG2 + YOLOv8 ONNX) logrando un 70% de reducción en consumo de CPU frente a soluciones tradicionales.",
        "Automatización de procesos empresariales con TypeScript y máquinas de estados finitos garantizando integridad transaccional."
      ],
      en: [
        "End-to-end development of custom Odoo ERP module for WhatsApp Cloud API with zero temp disk footprint (in-RAM PDFs) and HMAC-SHA256 auth.",
        "Architected hybrid AI NVR (MOG2 + YOLOv8 ONNX), slashing CPU usage by 70% compared to traditional 24/7 inference setups.",
        "Built business automations with TypeScript and finite state machines, ensuring complete transactional consistency and zero double-bookings."
      ]
    },
    skills: ["Python", "FastAPI", "Odoo", "OpenCV", "YOLOv8", "TypeScript", "PostgreSQL", "Docker"]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: {
      es: "Ingeniería de Sistemas (9no Semestre)",
      en: "B.S. in Systems Engineering (9th Semester)"
    },
    institution: "Universidad de Oriente (UDO) — Núcleo Monagas",
    period: "2021 — Actualidad",
    details: {
      es: "Cursando el 9no semestre con destacado rendimiento académico. Calificación sobresaliente de 10/10 en Programación Orientada a Objetos (POO), bases de datos relacionales, estructuras de datos avanzadas e ingeniería de software.",
      en: "Currently in 9th semester with outstanding academic track record. Top score 10/10 in Object-Oriented Programming (OOP), relational databases, advanced data structures, and software engineering principles."
    },
    badge: "POO: 10 / 10"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: {
      es: "Programación Profesional en Python",
      en: "Professional Python Programming"
    },
    issuer: "Academos",
    year: "2024",
    skills: ["Python Moderno", "POO", "Manejo de Errores", "Módulos & Paquetes", "Buenas Prácticas"]
  },
  {
    name: {
      es: "Especialista en Estructuras de Datos y POO",
      en: "Data Structures & OOP Specialist"
    },
    issuer: "Academos",
    year: "2024",
    skills: ["Árboles", "Grafos", "Listas Enlazadas", "Complejidad Algorítmica Big-O", "Patrones de Diseño"]
  }
];

export const FALLBACK_REPOS = [
  {
    id: 101,
    name: "proyecto-videovigilancia-inteligente",
    full_name: "jyersonrp/proyecto-videovigilancia-inteligente",
    html_url: "https://github.com/jyersonrp/proyecto-videovigilancia-inteligente",
    description: "Sistema NVR inteligente modular con IA, streaming MJPEG de ultrabaja latencia, detección híbrida (OpenCV MOG2 + YOLOv8 ONNX), modo ECO con FPS adaptativo y dashboard FastAPI.",
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-09-07T21:01:18Z",
    topics: ["fastapi", "opencv", "yolov8", "onnx", "nvr", "computer-vision"]
  },
  {
    id: 102,
    name: "odoo-whatsapp-chatter-meta",
    full_name: "jyersonrp/odoo-whatsapp-chatter-meta",
    html_url: "https://github.com/jyersonrp/odoo-whatsapp-chatter-meta",
    description: "Módulo nativo para Odoo ERP conectado a WhatsApp Cloud API oficial de Meta. Despacho de facturas en RAM y webhook seguro con HMAC-SHA256.",
    language: "Python",
    stargazers_count: 1,
    forks_count: 1,
    updated_at: "2026-09-07T20:58:56Z",
    topics: ["odoo", "whatsapp-cloud-api", "meta", "hmac", "erp", "python"]
  },
  {
    id: 103,
    name: "WhatsBot-GlamNails",
    full_name: "jyersonrp/WhatsBot-GlamNails",
    html_url: "https://github.com/jyersonrp/WhatsBot-GlamNails",
    description: "Bot automatizado de citas y atención al cliente para salón Glam Nails Maturín vía WhatsApp con TypeScript, FSM y persistencia en base de datos.",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-08-10T14:59:10Z",
    topics: ["typescript", "fsm", "whatsapp", "postgresql", "crm", "hono"]
  },
  {
    id: 104,
    name: "docaudit-ai",
    full_name: "jyersonrp/docaudit-ai",
    html_url: "https://github.com/jyersonrp/docaudit-ai",
    description: "Motor RAG asíncrono para extracción de riesgos legales y financieros con esquemas estrictos Pydantic v2, factoría Multi-Provider LLM y reportes ReportLab PDF.",
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-09-19T23:50:00Z",
    topics: ["fastapi", "rag", "pydantic", "llm", "document-intelligence", "python"]
  },
  {
    id: 105,
    name: "jyersonrp.github.io",
    full_name: "jyersonrp/jyersonrp.github.io",
    html_url: "https://github.com/jyersonrp/jyersonrp.github.io",
    description: "Portafolio profesional de ingeniería de software con React 18, TypeScript, Tailwind CSS, animaciones interactivas, paleta de comandos y diseño editorial obsidian.",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-09-19T23:50:00Z",
    topics: ["react", "typescript", "tailwindcss", "vite", "portfolio"]
  }
];

export const ENGINEERING_PHILOSOPHY: ArchitecturePillar[] = [
  {
    id: "clean-architecture-oop",
    number: "01",
    title: {
      es: "Clean Architecture & POO de Alta Precisión",
      en: "Clean Architecture & High-Precision OOP"
    },
    category: {
      es: "Modularidad & Dominio Aislado",
      en: "Modularity & Isolated Domain"
    },
    thesis: {
      es: "El software duradero se fundamenta en desacoplar las reglas de negocio de cualquier framework o librería externa. La lógica de dominio es el núcleo inviolable; FastAPI, Odoo o PostgreSQL son adaptadores intercambiables.",
      en: "Enduring software is founded on decoupling business rules from any framework or external library. Domain logic is the inviolable core; FastAPI, Odoo, or PostgreSQL are interchangeable adapters."
    },
    academicOrRealCase: {
      es: "Fundamentado en mi calificación perfecta 10/10 en Programación Orientada a Objetos en la Universidad de Oriente (UDO) y aplicado en el diseño modular de extensiones ERP para Odoo y pipelines de visión.",
      en: "Grounded in my perfect 10/10 grade in Object-Oriented Programming at Universidad de Oriente (UDO) and applied to modular Odoo ERP extensions and vision pipelines."
    },
    principles: [
      {
        title: {
          es: "Inversión de Dependencias (DIP) & SOLID",
          en: "Dependency Inversion (DIP) & SOLID"
        },
        detail: {
          es: "Los módulos de alto nivel nunca dependen de implementaciones concretas. Definimos interfaces de dominio abstractas para captura de video, inferencia de IA o persistencia.",
          en: "High-level modules never depend on low-level details. Abstract domain interfaces govern video ingestion, AI inference, and persistence engines."
        }
      },
      {
        title: {
          es: "Patrones de Diseño Formales (Strategy & Factory)",
          en: "Formal Design Patterns (Strategy & Factory)"
        },
        detail: {
          es: "Strategy para alternar dinámicamente backends de inferencia (ONNX Runtime, OpenVINO, CPU/GPU) sin tocar la lógica de procesamiento; Factory para inicialización controlada.",
          en: "Strategy pattern to seamlessly swap AI execution backends (ONNX Runtime, OpenVINO, CPU/GPU) without mutating pipeline logic; Factory pattern for guarded instantiations."
        }
      },
      {
        title: {
          es: "Modelado de Dominio Hermético e Invariantes",
          en: "Encapsulated Domain & Invariant Protection"
        },
        detail: {
          es: "Entidades que validan su propio estado antes de persistir, eliminando estados anémicos y efectos secundarios colaterales en producción.",
          en: "Rich domain entities that guard their own invariants prior to persistence, eradicating anemic states and accidental production side-effects."
        }
      }
    ],
    codeSnippet: {
      filename: "domain_contracts.py",
      language: "python",
      code: `from abc import ABC, abstractmethod
from typing import Protocol, List
from dataclasses import dataclass

@dataclass(frozen=True)
class BoundingBox:
    x1: float; y1: float; x2: float; y2: float
    confidence: float
    label: str

class VisionDetector(Protocol):
    """Contrato abstracto inviolable de dominio."""
    def detect(self, frame_bytes: bytes) -> List[BoundingBox]:
        ...

# Adaptador de infraestructura desacoplado
class OnnxYoloAdapter(VisionDetector):
    def __init__(self, model_path: str):
        self._session = ort.InferenceSession(model_path)
    
    def detect(self, frame_bytes: bytes) -> List[BoundingBox]:
        tensor = self._preprocess(frame_bytes)
        return self._run_inference(tensor)`
    },
    metrics: [
      { label: { es: "Calificación POO (UDO)", en: "OOP Grade (UDO)" }, value: "10/10" },
      { label: { es: "Acoplamiento de Dominio", en: "Domain Coupling" }, value: "0%" },
      { label: { es: "Reutilización de Lógica", en: "Code Reusability" }, value: "98%" }
    ],
    tags: ["POO", "Clean Architecture", "SOLID", "Python", "Type Hints"]
  },
  {
    id: "concurrency-resilience",
    number: "02",
    title: {
      es: "Alta Concurrencia, Streaming y Sistemas Reactivos",
      en: "High Concurrency, Streaming & Reactive Systems"
    },
    category: {
      es: "Rendimiento & Visión Artificial",
      en: "Performance & Computer Vision"
    },
    thesis: {
      es: "Diseñar para alta concurrencia exige pensar en el flujo físico de datos: evitar cuellos de botella mediante buffers circulares en memoria, generadores asíncronos y desacoplo de tareas pesadas de los hilos de I/O.",
      en: "Architecting for high concurrency demands respect for data mechanics: avoiding bottlenecks via circular in-memory buffers, async generators, and decoupling heavy compute from I/O threads."
    },
    academicOrRealCase: {
      es: "Casos de producción reales: Sistema NVR inteligente con modo ECO adaptativo (ahorro de cómputo del 70%) y WhatsBot CRM con Máquina de Estados Finitos (FSM) y control de concurrencia atómico.",
      en: "Production case studies: Smart NVR with adaptive ECO mode (70% compute savings) and WhatsBot CRM with Finite State Machine (FSM) and atomic concurrency control."
    },
    principles: [
      {
        title: {
          es: "Pipeline Híbrido en Dos Etapas (MOG2 + YOLOv8)",
          en: "Two-Stage Hybrid Pipeline (MOG2 + YOLOv8)"
        },
        detail: {
          es: "OpenCV MOG2 vigila movimiento con costo casi nulo (~1 FPS en reposo). Solo ante movimiento genuino escala a 30 FPS y activa inferencia neuronal ONNX, ahorrando 70% de CPU.",
          en: "OpenCV MOG2 scans for background motion at negligible CPU cost (~1 FPS idle). Only confirmed motion spins up 30 FPS and ONNX neural inference, saving 70% CPU."
        }
      },
      {
        title: {
          es: "Ring Buffer Circular & Streaming MJPEG < 75ms",
          en: "Circular Ring Buffer & Sub-75ms MJPEG Streaming"
        },
        detail: {
          es: "Captura en hilo dedicado que alimenta un búfer circular de tamaño fijo. Si un cliente HTTP es lento, la política drop-tail descarta frames obsoletos sin provocar fuga de memoria ni acumulación de latencia.",
          en: "Dedicated capture thread feeds a fixed-size circular buffer. For sluggish HTTP clients, drop-tail shedding discards obsolete frames without memory leaks or latency lag."
        }
      },
      {
        title: {
          es: "Máquinas de Estados y Locks Atómicos Transaccionales",
          en: "Finite State Machines & Atomic Transactional Locks"
        },
        detail: {
          es: "FSM determinista con aislamiento serializable en PostgreSQL para gestionar turnos concurrentes sin condiciones de carrera (cero reservas dobles).",
          en: "Deterministic FSM with serializable database transaction isolation, orchestrating concurrent bookings with zero race conditions or double allocations."
        }
      }
    ],
    codeSnippet: {
      filename: "streaming_pipeline.py",
      language: "python",
      code: `async def stream_mjpeg_generator(camera_id: str):
    """Generador asíncrono no bloqueante con drop-tail policy."""
    ring_buffer = camera_hub.get_buffer(camera_id)
    fps_limiter = AsyncRateLimiter(target_fps=30)
    
    while camera_hub.is_active(camera_id):
        frame = await ring_buffer.get_latest_fresh_frame()
        await fps_limiter.tick()
        
        yield (
            b"--frame\\r\\n"
            b"Content-Type: image/jpeg\\r\\n"
            b"X-Latency-Ms: " + str(frame.latency_ms).encode() + b"\\r\\n\\r\\n"
            + frame.jpeg_bytes + b"\\r\\n"
        )`
    },
    metrics: [
      { label: { es: "Ahorro CPU en reposo", en: "Idle CPU Savings" }, value: "70%" },
      { label: { es: "Latencia de Streaming", en: "Streaming Latency" }, value: "< 75ms" },
      { label: { es: "Colisiones de Concurrencia", en: "Race Collisions" }, value: "0" }
    ],
    tags: ["FastAPI", "AsyncIO", "OpenCV", "YOLOv8", "FSM", "PostgreSQL"]
  },
  {
    id: "software-quality-testing",
    number: "03",
    title: {
      es: "Calidad de Software, Tipado Estricto & Docker",
      en: "Software Quality, Strict Typing & Docker"
    },
    category: {
      es: "Resiliencia & DevOps",
      en: "Resilience & DevOps"
    },
    thesis: {
      es: "La confiabilidad en producción no es un accidente, es el resultado de contratos tipados rigurosos, tests unitarios automatizados que verifican casos borde y entornos de ejecución inmutables.",
      en: "Production reliability is never an accident; it is the direct outcome of strict typing contracts, automated edge-case test suites, and immutable containerized execution environments."
    },
    academicOrRealCase: {
      es: "Implementación en módulo Odoo ERP para WhatsApp Cloud API con despacho de facturas y cotizaciones directamente desde RAM (0 bytes en disco) con verificación criptográfica HMAC-SHA256 y suites de Pytest.",
      en: "Implemented in native Odoo ERP WhatsApp Cloud API module, streaming quotes and invoice PDFs directly from RAM (0 disk footprint) with HMAC-SHA256 verification and full Pytest suites."
    },
    principles: [
      {
        title: {
          es: "Tipado Estricto de Extremo a Extremo",
          en: "End-to-End Strict Typing Contracts"
        },
        detail: {
          es: "TypeScript en modo estricto en frontend y bots; Python 3.11 con Type Hints exhaustivos y modelos Pydantic validados antes de procesar cualquier payload.",
          en: "Strict-mode TypeScript in frontend and bots; Python 3.11 with exhaustive Type Hints and Pydantic validation before touching any payload."
        }
      },
      {
        title: {
          es: "Testing Riguroso con Pytest & Mocks Aislados",
          en: "Rigorous Testing with Pytest & Isolated Mocks"
        },
        detail: {
          es: "Tests automatizados que emulan caídas de red, payloads maliciosos de webhooks y desconexiones RTSP, garantizando auto-recuperación sin crash.",
          en: "Automated test suites simulating network partitions, malformed webhook payloads, and RTSP stream drops, ensuring graceful recovery without crash."
        }
      },
      {
        title: {
          es: "Cero I/O Innecesario & Contenedores Frugales",
          en: "Zero Disk Footprint & Minimalist Containers"
        },
        detail: {
          es: "Flujos de memoria con io.BytesIO para generar PDFs sin tocar disco físico; imágenes Docker multi-stage optimizadas para arranque instantáneo.",
          en: "In-memory io.BytesIO pipelines rendering PDFs without wearing physical storage; multi-stage Docker builds tuned for instant cold starts."
        }
      }
    ],
    codeSnippet: {
      filename: "test_webhook_security.py",
      language: "python",
      code: `import hmac, hashlib, pytest

def test_webhook_hmac_signature_verification():
    payload = b'{"event":"message_received","id":"wam_1029"}'
    secret = b'super_secret_meta_app_key'
    expected_sig = "sha256=" + hmac.new(secret, payload, hashlib.sha256).hexdigest()
    
    verifier = WebhookSecurityVerifier(app_secret=secret)
    assert verifier.validate(payload=payload, header_signature=expected_sig) is True
    
    # Ataque de manipulación de payload
    tampered_payload = payload + b' '
    with pytest.raises(SecuritySignatureMismatchError):
        verifier.validate(payload=tampered_payload, header_signature=expected_sig)`
    },
    metrics: [
      { label: { es: "I/O de Disco Temporal", en: "Temp Disk I/O" }, value: "0 Bytes" },
      { label: { es: "Validación Criptográfica", en: "Cryptographic Auth" }, value: "HMAC-256" },
      { label: { es: "Ambientes Reproducibles", en: "Reproducible Builds" }, value: "Docker" }
    ],
    tags: ["Pytest", "Docker", "HMAC-SHA256", "TypeScript", "Pydantic", "CI/CD"]
  }
];

export const ENGINEERING_TENETS: EngineeringTenet[] = [
  {
    number: "01",
    title: {
      es: "Cero Acoplamiento Innecesario",
      en: "Zero Unnecessary Coupling"
    },
    desc: {
      es: "La lógica de negocio reside pura en el dominio. Frameworks, bases de datos y librerías externas son dependencias externas sustituibles.",
      en: "Business logic stays pure in the domain. Frameworks, databases, and third-party libraries are swappable external dependencies."
    }
  },
  {
    number: "02",
    title: {
      es: "Optimización por Métricas, No por Intuición",
      en: "Measure Before Optimizing"
    },
    desc: {
      es: "Cada milisegundo o kilobyte ahorrado se fundamenta en profiling, telemetría y benchmarks reproducibles.",
      en: "Every millisecond or kilobyte saved is verified through profiling, telemetry, and reproducible benchmarks."
    }
  },
  {
    number: "03",
    title: {
      es: "Tipado Estricto como Contrato Inmutable",
      en: "Strict Typing as an Immutable Contract"
    },
    desc: {
      es: "Los errores que el compilador y los linters detectan en tiempo de desarrollo nunca llegan a comprometer un servidor de producción.",
      en: "Errors caught by static types and linters during development never get the chance to jeopardize a production server."
    }
  },
  {
    number: "04",
    title: {
      es: "Respeto Radical a los Recursos del Host",
      en: "Radical Host Resource Frugality"
    },
    desc: {
      es: "Procesamiento en memoria RAM, ahorro de CPU en reposo y contención estricta de consumo eléctrico en despliegues reales.",
      en: "In-RAM stream pipelines, idle CPU preservation, and strict power consumption limits in real-world deployments."
    }
  }
];
