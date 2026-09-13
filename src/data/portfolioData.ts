import { Project, ExperienceItem, EducationItem, CertificationItem, SkillCategory } from '../types';

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
  email: "jyerson@gmail.com",
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
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-08-10T14:59:10Z",
    topics: ["typescript", "fsm", "whatsapp", "postgresql", "crm"]
  }
];
