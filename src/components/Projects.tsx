import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Language, Project } from '../types';
import {
  ExternalLink,
  Check,
  AlertTriangle,
  Lightbulb,
  Layers,
  Cpu,
  Shield,
  Activity,
  ChevronRight,
  Code
} from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<{ [key: string]: 'overview' | 'architecture' | 'code' }>({
    'smart-nvr-vision-ai': 'overview',
    'odoo-whatsapp-chatter': 'overview',
    'whatsbot-glam-nails': 'overview'
  });

  const getVisualPreview = (project: Project) => {
    if (project.type === 'nvr') {
      return (
        <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-5 font-mono text-xs overflow-hidden relative shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-white text-[11px] ml-2 font-semibold">FastAPI NVR Stream — Camera_01 [MJPEG 1080p]</span>
            </div>
            <div className="flex items-center gap-2 text-[#2EE6A0] text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#2EE6A0] animate-pulse" />
              <span>ECO_MODE: ACTIVE (1 FPS → 30 FPS)</span>
            </div>
          </div>

          {/* Simulated Detection View */}
          <div className="relative h-48 sm:h-56 bg-[#14141d] rounded-xl overflow-hidden flex flex-col justify-between p-4 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Simulated Bounding Box */}
            <div className="absolute top-10 left-12 sm:left-20 w-36 h-36 border-2 border-[#2EE6A0] bg-[#2EE6A0]/10 rounded-md p-1.5 animate-pulse">
              <div className="inline-block bg-[#2EE6A0] text-black font-bold text-[9px] px-1.5 py-0.5 rounded">
                PERSON 98.4% [YOLOv8 ONNX]
              </div>
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="space-y-1">
                <span className="bg-black/70 px-2 py-1 rounded text-white text-[10px] border border-white/10">
                  FPS: 30.2 | LATENCY: 68ms
                </span>
              </div>
              <div className="bg-black/70 px-2 py-1 rounded text-[#00F0FF] text-[10px] border border-white/10">
                TRIGGER: MOG2_CONTOUR_AREA &gt; 1200px²
              </div>
            </div>

            <div className="z-10 flex flex-wrap gap-2 text-[10px]">
              <span className="bg-black/70 px-2 py-1 rounded text-neutral-300">
                Pipeline: OpenCV MOG2 → Bounding ROI → ONNX Runtime (CPU)
              </span>
              <span className="bg-[#2EE6A0]/20 text-[#2EE6A0] px-2 py-1 rounded border border-[#2EE6A0]/40 font-bold">
                CPU DRAW: 14% (Optimizado)
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (project.type === 'odoo') {
      return (
        <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-5 font-mono text-xs overflow-hidden relative shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-white text-[11px] ml-2 font-semibold">Odoo Enterprise Chatter &lt;&gt; Meta Cloud API</span>
            </div>
            <span className="text-[10px] text-[#00F0FF]">HMAC-SHA256: VERIFIED</span>
          </div>

          <div className="space-y-3 bg-[#13131b] p-4 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-white/5">
              <span>POST /api/v1/whatsapp/webhook</span>
              <span className="text-[#2EE6A0]">200 OK (12ms)</span>
            </div>
            <div className="text-neutral-300 space-y-1.5 text-[11px]">
              <div className="text-[#2EE6A0]">✓ Webhook payload decrypted &amp; signature validated</div>
              <div className="text-neutral-400">→ Sales Order #SO-2025-084 updated in Odoo ORM</div>
              <div className="text-neutral-400">→ Invoice PDF generated into in-memory BytesIO (0 bytes written to disk)</div>
              <div className="text-[#00F0FF]">✓ Dispatched via Meta Graph API (24-Hour window active)</div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
              <span>HSM Template: 'order_status_update'</span>
              <span className="text-neutral-400 font-bold">Delivery Status: READ (double blue check)</span>
            </div>
          </div>
        </div>
      );
    }

    // Default or Bot
    return (
      <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-5 font-mono text-xs overflow-hidden relative shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-white text-[11px] ml-2 font-semibold">WhatsBot FSM Engine — Glam Nails Salon</span>
          </div>
          <span className="text-[10px] text-[#2EE6A0]">FSM: TRANSACTION_COMMITTED</span>
        </div>

        <div className="space-y-2.5 bg-[#13131b] p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-neutral-500">[Client]</span>
            <span className="text-white">"Hola, quisiera agendar manicura para el viernes a las 3pm"</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#00F0FF]">
            <span className="text-neutral-500">[FSM Bot]</span>
            <span>State: 'SELECTING_SLOT' → Query PostgreSQL available slots</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#2EE6A0]">
            <span className="text-neutral-500">[DB Lock]</span>
            <span>Atomic slot reserve acquired for 2025-09-18 15:00. No collision possible.</span>
          </div>
          <div className="text-[10px] text-neutral-400 pt-2 border-t border-white/5 flex justify-between">
            <span>Uptime: 99.98%</span>
            <span>PostgreSQL Tx ID: #TX-984210</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Casos de Estudio de Ingeniería' : 'Engineering Case Studies'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {language === 'es' ? (
              <>
                Sistemas desarrollados para <span className="font-serif italic font-normal text-[#2EE6A0]">resolver</span> problemas críticos.
              </>
            ) : (
              <>
                Engineered to <span className="font-serif italic font-normal text-[#2EE6A0]">solve</span> real-world critical bottlenecks.
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg max-w-2xl font-light">
            {language === 'es'
              ? 'Proyectos de ingeniería reales con código modular, arquitecturas limpias, alta concurrencia y métricas verificables.'
              : 'Production-grade engineering projects with modular code, clean architecture, high concurrency, and quantifiable impact.'}
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Glow accent */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2EE6A0]/5 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Details */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                      {`PROYECTO 0${idx + 1}`}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-[#2EE6A0] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Ver Código en GitHub' : 'View Code on GitHub'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      {project.title[language]}
                    </h3>
                    <p className="mt-2 text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {project.tagline[language]}
                    </p>
                  </div>

                  {/* Problem & Solution Accordion/Card */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                      <div className="flex items-center gap-2 text-red-400 font-semibold text-xs mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{language === 'es' ? 'El Desafío / Cuello de Botella' : 'The Challenge / Bottleneck'}</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {project.problem[language]}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#2EE6A0]/10 border border-[#2EE6A0]/25">
                      <div className="flex items-center gap-2 text-[#2EE6A0] font-semibold text-xs mb-1">
                        <Lightbulb className="w-4 h-4" />
                        <span>{language === 'es' ? 'La Solución Arquitectónica' : 'The Architectural Solution'}</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        {project.solution[language]}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-xl sm:text-2xl font-extrabold text-[#2EE6A0] font-sans">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-1">
                          {m.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 hover:border-[#2EE6A0]/50 hover:text-white transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Visual Architecture Preview */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  {getVisualPreview(project)}

                  {/* Architecture Stack Checklist */}
                  <div className="p-5 rounded-2xl bg-[#0e0e14] border border-white/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#2EE6A0]" />
                      <span>{language === 'es' ? 'Componentes del Sistema' : 'System Components'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.architecture.map((item, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                          <Check className="w-3.5 h-3.5 text-[#2EE6A0] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Link button */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors group"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{language === 'es' ? 'Explorar Código Fuente y Commits' : 'Explore Source Code & Commits'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
