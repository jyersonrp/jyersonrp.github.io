import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Language, Project } from '../types';
import {
  ExternalLink,
  Check,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Activity,
  ChevronRight,
  Code,
  Workflow,
  Monitor,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { ProjectTiltCard } from './ProjectTiltCard';
import { NvrMockupView, OdooMockupView, WhatsBotMockupView } from './ProjectMockups';
import { playSound } from '../utils/audioSystem';

interface ProjectsProps {
  language: Language;
}

type TabType = 'mockup' | 'overview' | 'flow' | 'code';

// High-fidelity syntax tokenizer and colorizer for terminal code tabs
const CodeHighlighter: React.FC<{ code: string }> = ({ code }) => {
  const lines = code.split('\n');

  const highlightLine = (line: string) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
      return <span className="text-neutral-500 italic">{line}</span>;
    }

    const tokenRegex = /(#[^\n]*|\/\/[^\n]*|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:class|def|return|if|else|elif|for|while|import|from|export|async|function|await|const|let|var|throw|new|try|catch|true|false|True|False|None|null)\b|\b(?:models|ir|BytesIO|models\.Model|PrismaClient|DetectionResult|InferenceSession|HybridDetector|WhatsAppConnector|SlotAlreadyReservedError|Date|Promise|cv2|np|ort|tx|db)\b|\b(?:self|this)\b|\b\d+(?:\.\d+)?(?:ms|fps|px|%)?\b)/g;

    const elements = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        elements.push(line.substring(lastIdx, match.index));
      }
      const tok = match[0];
      if (tok.startsWith('#') || tok.startsWith('//')) {
        elements.push(<span key={match.index} className="text-neutral-500 italic">{tok}</span>);
      } else if (tok.startsWith('"') || tok.startsWith("'") || tok.startsWith('`')) {
        elements.push(<span key={match.index} className="text-[#38bdf8]">{tok}</span>);
      } else if (/^(?:class|def|return|if|else|elif|for|while|import|from|export|async|function|await|const|let|var|throw|new|try|catch|true|false|True|False|None|null)$/.test(tok)) {
        elements.push(<span key={match.index} className="text-[var(--accent-primary)] font-semibold">{tok}</span>);
      } else if (/^(?:models|ir|BytesIO|models\.Model|PrismaClient|DetectionResult|InferenceSession|HybridDetector|WhatsAppConnector|SlotAlreadyReservedError|Date|Promise|cv2|np|ort|tx|db)$/.test(tok)) {
        elements.push(<span key={match.index} className="text-[#c084fc] font-medium">{tok}</span>);
      } else if (/^(?:self|this)$/.test(tok)) {
        elements.push(<span key={match.index} className="text-rose-400 italic">{tok}</span>);
      } else if (/^\d/.test(tok)) {
        elements.push(<span key={match.index} className="text-amber-300">{tok}</span>);
      } else {
        elements.push(tok);
      }
      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < line.length) {
      elements.push(line.substring(lastIdx));
    }

    return elements;
  };

  return (
    <pre className="text-[11px] text-neutral-300 overflow-x-auto leading-relaxed max-h-72 scrollbar-none font-mono py-1">
      <code>
        {lines.map((line, idx) => (
          <div key={idx} className="flex hover:bg-white/[0.03] px-1 rounded transition-colors">
            <span className="w-6 text-neutral-600 select-none text-right pr-3 text-[10px] shrink-0 font-mono">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
            <span className="flex-1 whitespace-pre">{highlightLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  // Default to 'mockup' (Vista de Producto) as prominent initial view
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: TabType }>({
    'smart-nvr-vision-ai': 'mockup',
    'odoo-whatsapp-chatter': 'mockup',
    'whatsbot-glam-nails': 'mockup'
  });

  const setProjectTab = (projectId: string, tab: TabType) => {
    switch (tab) {
      case 'mockup':
        playSound('simulation');
        break;
      case 'overview':
        playSound('scan');
        break;
      case 'flow':
        playSound('switch');
        break;
      case 'code':
        playSound('click');
        break;
    }
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  const getCodeSnippet = (project: Project) => {
    if (project.type === 'nvr') {
      return {
        file: 'pipeline/hybrid_detector.py',
        lang: 'python',
        code: `# OpenCV MOG2 + YOLOv8 ONNX Hybrid Trigger
class HybridDetector:
    def __init__(self, model_path: str):
        self.mog2 = cv2.createBackgroundSubtractorMOG2(history=500, varThreshold=25)
        self.session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])

    def process_frame(self, frame: np.ndarray) -> DetectionResult:
        fg_mask = self.mog2.apply(frame)
        contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        motion_area = sum(cv2.contourArea(c) for c in contours)

        # ECO Mode: Skip heavy neural inference when scene is static
        if motion_area < 1200:
            return DetectionResult(mode="ECO_1FPS", alert=False)

        # High-Fidelity Inference: ONNX YOLOv8 triggered on dynamic ROI
        tensor = self._preprocess_roi(frame, contours)
        outputs = self.session.run(None, {self.session.get_inputs()[0].name: tensor})
        return self._postprocess(outputs, fps_target=30)`
      };
    }

    if (project.type === 'odoo') {
      return {
        file: 'models/whatsapp_connector.py',
        lang: 'python',
        code: `# In-Memory PDF Streaming & HMAC-SHA256 Auth
from io import BytesIO
import hmac, hashlib

class WhatsAppConnector(models.Model):
    _inherit = 'mail.thread'

    def send_quote_pdf(self, sale_order_id, recipient_wa_id):
        # 0 bytes written to disk: Stream PDF directly from RAM buffer
        pdf_content = self.env['ir.actions.report']._render_qweb_pdf(
            'sale.report_saleorder', [sale_order_id]
        )[0]
        ram_buffer = BytesIO(pdf_content)

        media_id = self._upload_meta_media(ram_buffer.getvalue())
        return self._dispatch_hsm_template(recipient_wa_id, media_id=media_id)

    def verify_webhook(self, raw_payload: bytes, signature_header: str) -> bool:
        expected = hmac.new(self.app_secret.encode(), raw_payload, hashlib.sha256).hexdigest()
        return hmac.compare_digest(f"sha256={expected}", signature_header)`
      };
    }

    return {
      file: 'src/fsm/appointmentMachine.ts',
      lang: 'typescript',
      code: `// Deterministic FSM with PostgreSQL Row-Level Locking
export async function bookSlot(clientId: string, slotTime: Date, db: PrismaClient) {
  return await db.$transaction(async (tx) => {
    // Acquire pessimistic row lock to prevent race conditions
    const existing = await tx.$queryRaw\`
      SELECT id FROM "Appointment"
      WHERE "slotTime" = \${slotTime}
      FOR UPDATE NOWAIT
    \`;
    if (existing.length > 0) {
      throw new SlotAlreadyReservedError("Time slot is no longer available");
    }

    const booking = await tx.appointment.create({
      data: { clientId, slotTime, status: 'CONFIRMED' }
    });
    return { state: 'TRANSACTION_COMMITTED', bookingId: booking.id };
  });
}`
    };
  };

  const getFlowDiagram = (project: Project) => {
    if (project.type === 'nvr') {
      return [
        { step: '01', title: language === 'es' ? 'Cámara RTSP' : 'RTSP Camera', desc: language === 'es' ? 'Captura continua de cuadros 1080p' : 'Continuous 1080p frame grab' },
        { step: '02', title: 'OpenCV MOG2', desc: language === 'es' ? 'Filtro ultraligero de movimiento (1 FPS)' : 'Ultra-lightweight motion filter (1 FPS)' },
        { step: '03', title: 'ONNX YOLOv8', desc: language === 'es' ? 'Inferencia de alta precisión en evento' : 'Precision inference on motion events' },
        { step: '04', title: 'FastAPI Stream', desc: language === 'es' ? 'MJPEG con búfer circular multihilo (<75ms)' : 'Multi-threaded ring-buffered MJPEG (<75ms)' }
      ];
    }

    if (project.type === 'odoo') {
      return [
        { step: '01', title: 'Meta Cloud API', desc: language === 'es' ? 'Recepción de webhook WhatsApp cifrado' : 'Inbound encrypted WhatsApp webhook' },
        { step: '02', title: 'HMAC-SHA256', desc: language === 'es' ? 'Verificación de firma criptográfica' : 'Cryptographic signature validation' },
        { step: '03', title: 'Odoo ORM', desc: language === 'es' ? 'Sincronización en chatter y CRM' : 'Live sync into chatter & CRM pipeline' },
        { step: '04', title: 'BytesIO RAM', desc: language === 'es' ? 'Generación de facturas PDF sin tocar disco' : 'In-RAM PDF generation (zero disk I/O)' }
      ];
    }

    return [
      { step: '01', title: 'WhatsApp Inbound', desc: language === 'es' ? 'Mensaje entrante del cliente' : 'Customer inbound message' },
      { step: '02', title: 'FSM Engine', desc: language === 'es' ? 'Evaluación de estado determinista' : 'Deterministic state evaluation' },
      { step: '03', title: 'PostgreSQL Lock', desc: language === 'es' ? 'Bloqueo atómico FOR UPDATE' : 'Atomic FOR UPDATE pessimistic lock' },
      { step: '04', title: 'Confirmation HSM', desc: language === 'es' ? 'Disparo de recordatorio automático' : 'Automated reminder scheduled' }
    ];
  };

  const renderTerminalWindow = (project: Project) => {
    const currentTab = activeTabs[project.id] || 'mockup';
    const snippet = getCodeSnippet(project);
    const flow = getFlowDiagram(project);

    return (
      <div className="bg-white dark:bg-[#09090d] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl flex flex-col transition-all duration-300 hover:border-slate-300 dark:hover:border-white/[0.14]">
        {/* Terminal Chrome Header with Traffic Lights & Integrated Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06]">
          {/* Traffic lights & window title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emeraldNeon/70" />
            </div>
            <span className="text-slate-600 dark:text-neutral-400 font-mono text-[11px] font-medium hidden sm:inline">
              {project.type === 'nvr' ? 'nvr-vision://console' : project.type === 'odoo' ? 'odoo-meta://chatter' : 'fsm-bot://simulator'}
            </span>
          </div>

          {/* Integrated Navigation Tabs: UI Mockup (Default), Telemetry, Pipeline, Code */}
          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-slate-100 dark:bg-black/60 rounded-lg border border-slate-300 dark:border-white/[0.06]">
            {/* Primary Tab: Vista de Producto (UI Mockup) */}
            <button
              onClick={() => setProjectTab(project.id, 'mockup')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                currentTab === 'mockup'
                  ? 'bg-accent-gradient text-black font-bold shadow-[0_0_15px_var(--accent-glow)]'
                  : 'text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>{language === 'es' ? 'Vista de Producto' : 'UI Mockup'}</span>
            </button>

            {/* Secondary Tab: Telemetría */}
            <button
              onClick={() => setProjectTab(project.id, 'overview')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                currentTab === 'overview'
                  ? 'bg-emeraldNeon text-black font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>{language === 'es' ? 'Telemetría' : 'Telemetry'}</span>
            </button>

            {/* Tertiary Tab: Pipeline */}
            <button
              onClick={() => setProjectTab(project.id, 'flow')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                currentTab === 'flow'
                  ? 'bg-cyanNeon text-black font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Workflow className="w-3 h-3" />
              <span>Pipeline</span>
            </button>

            {/* Quaternary Tab: Código */}
            <button
              onClick={() => setProjectTab(project.id, 'code')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                currentTab === 'code'
                  ? 'bg-slate-800 dark:bg-white text-white dark:text-black font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>{language === 'es' ? 'Código' : 'Snippet'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Body Container */}
        <div className="p-4 sm:p-5 flex-1 min-h-[300px] flex flex-col justify-center">
          {/* TAB 1: Live Interactive UI Mockup */}
          {currentTab === 'mockup' && (
            <div className="w-full">
              {project.type === 'nvr' && <NvrMockupView language={language} />}
              {project.type === 'odoo' && <OdooMockupView language={language} />}
              {project.type === 'bot' && <WhatsBotMockupView language={language} />}
            </div>
          )}

          {/* TAB 2: Code Snippet */}
          {currentTab === 'code' && (
            <div className="font-mono text-xs">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-emeraldNeon" />
                  <span className="text-white text-[11px] font-semibold">{snippet.file}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emeraldNeon" />
                  <span className="text-[10px] text-cyanNeon uppercase tracking-wider font-semibold">{snippet.lang}</span>
                </div>
              </div>
              <CodeHighlighter code={snippet.code} />
            </div>
          )}

          {/* TAB 3: Execution Pipeline */}
          {currentTab === 'flow' && (
            <div className="font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-400">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {language === 'es' ? 'Flujo de Ejecución Verificado' : 'Verified Execution Flow'}
                </span>
                <span className="text-[10px] text-emeraldNeon tracking-wider uppercase font-semibold">
                  100% Deterministic
                </span>
              </div>
              {flow.map((node) => (
                <div key={node.step} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/[0.1] transition-colors">
                  <span className="w-5 h-5 rounded-md bg-emeraldNeon/10 text-emeraldNeon font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {node.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">{node.title}</div>
                    <div className="text-[10px] text-slate-600 dark:text-neutral-400 truncate font-normal dark:font-light">{node.desc}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-600 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Telemetry Overview */}
          {currentTab === 'overview' && project.type === 'nvr' && (
            <div className="font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-400">
                <span className="text-slate-900 dark:text-white text-xs font-medium">Cam_01 [1080p RTSP Stream]</span>
                <div className="flex items-center gap-2 text-[var(--accent-primary)] text-[10px] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span>ECO: 1 FPS → 30 FPS</span>
                </div>
              </div>

              {/* Simulated Detection View */}
              <div className="relative h-44 sm:h-48 bg-[#0c0c12] rounded-xl overflow-hidden flex flex-col justify-between p-3.5 border border-white/[0.05]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Responsive Bounding Box */}
                <div className="absolute top-6 left-6 sm:left-12 w-28 sm:w-36 h-28 sm:h-36 border-2 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 rounded-lg p-1.5 animate-pulse">
                  <div className="inline-block bg-[var(--accent-primary)] text-black font-bold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded tracking-wide">
                    PERSON 98.4% [YOLOv8]
                  </div>
                </div>

                <div className="flex justify-between items-start z-10 text-[10px]">
                  <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/[0.08]">
                    FPS: 30.2 | LATENCY: 68ms
                  </span>
                  <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[var(--accent-secondary)] border border-white/[0.08]">
                    MOG2_MOTION: TRIGGERED
                  </span>
                </div>

                <div className="z-10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-neutral-300">
                    OpenCV MOG2 → ROI → ONNX Runtime
                  </span>
                  <span className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-2 py-0.5 rounded border border-[var(--accent-primary)]/30 font-semibold">
                    CPU: 14% (Eco Mode)
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'overview' && project.type === 'odoo' && (
            <div className="font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-400">
                <span className="text-slate-900 dark:text-white text-xs font-medium">Meta Cloud API &lt;&gt; Odoo Chatter</span>
                <div className="flex items-center gap-2 text-[var(--accent-primary)] text-[10px] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_6px_var(--accent-glow)]" />
                  <span>RAM STREAM: 0 BYTES DISK</span>
                </div>
              </div>

              <div className="bg-[#0c0c12] p-4 rounded-xl border border-white/[0.05] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] pb-2 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold">POST</span>
                    <span className="text-neutral-300">/api/v1/whatsapp/webhook</span>
                  </div>
                  <span className="text-[var(--accent-primary)] font-semibold bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 px-2 py-0.5 rounded-full">
                    HMAC-SHA256: VALID
                  </span>
                </div>

                {/* RAM Allocation Gauge */}
                <div className="bg-black/40 p-2.5 rounded-lg border border-white/[0.04] space-y-1.5">
                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="text-neutral-400">{language === 'es' ? 'Búfer BytesIO (Factura PDF):' : 'BytesIO Buffer (PDF Stream):'}</span>
                    <span className="text-[var(--accent-secondary)] font-semibold">1,428 KB in RAM</span>
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full w-[45%]" />
                  </div>
                  <div className="flex justify-between items-center text-[9.5px] text-neutral-400">
                    <span>{language === 'es' ? 'Escritura en disco: 0 bytes' : 'Disk writes: 0 bytes'}</span>
                    <span className="text-[var(--accent-primary)] font-medium">{language === 'es' ? 'Cero latencia I/O' : 'Zero I/O bottleneck'}</span>
                  </div>
                </div>

                <div className="text-[10.5px] text-neutral-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-primary)]">✓</span>
                    <span className="text-neutral-400">{language === 'es' ? 'Orden #SO-2025-084 sincronizada en Odoo ORM (12ms)' : 'Order #SO-2025-084 live synced into Odoo ORM (12ms)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-secondary)]">✓</span>
                    <span className="text-neutral-400">{language === 'es' ? 'Despacho HSM vía Meta Graph API (Ventana 24h)' : 'HSM Template dispatched via Meta Graph API (24h window)'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'overview' && project.type === 'bot' && (
            <div className="font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-400">
                <span className="text-slate-900 dark:text-white text-xs font-medium">WhatsBot FSM — Glam Nails CRM</span>
                <div className="flex items-center gap-2 text-[var(--accent-secondary)] text-[10px] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse shadow-[0_0_6px_var(--accent-glow-secondary)]" />
                  <span>FOR UPDATE NOWAIT</span>
                </div>
              </div>

              <div className="bg-[#0c0c12] p-4 rounded-xl border border-white/[0.05] space-y-3">
                {/* Dialogue Simulation */}
                <div className="space-y-2 bg-black/40 p-3 rounded-lg border border-white/[0.04]">
                  <div className="flex items-start gap-2 text-[10.5px]">
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400 font-semibold shrink-0">
                      {language === 'es' ? 'CLIENTE' : 'CLIENT'}
                    </span>
                    <span className="text-neutral-200">
                      {language === 'es'
                        ? '"Hola, quisiera agendar manicura para el viernes a las 3pm"'
                        : '"Hi, I would like to book a manicure for Friday at 3pm"'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-[10.5px]">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-semibold shrink-0">BOT FSM</span>
                    <span className="text-white">
                      {language === 'es'
                        ? '✓ Turno confirmado para Viernes 3:00 PM (Bloqueo pesimista adquirido)'
                        : '✓ Slot confirmed for Friday 3:00 PM (Pessimistic lock acquired)'}
                    </span>
                  </div>
                </div>

                {/* 4-Step FSM Pipeline */}
                <div className="grid grid-cols-4 gap-1.5 text-[9.5px] text-center">
                  <div className="p-1 rounded bg-white/[0.02] border border-white/[0.05] text-neutral-400">
                    <span className="text-neutral-500 font-bold block">01</span>
                    <span className="truncate block">INBOUND</span>
                  </div>
                  <div className="p-1 rounded bg-white/[0.02] border border-white/[0.05] text-neutral-400">
                    <span className="text-neutral-500 font-bold block">02</span>
                    <span className="truncate block">FSM_SLOT</span>
                  </div>
                  <div className="p-1 rounded bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/30 text-[var(--accent-secondary)] font-semibold">
                    <span className="text-[var(--accent-secondary)] font-bold block">03</span>
                    <span className="truncate block">ROW_LOCK</span>
                  </div>
                  <div className="p-1 rounded bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] font-semibold">
                    <span className="text-[var(--accent-primary)] font-bold block">04</span>
                    <span className="truncate block">COMMIT</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="text-[var(--accent-primary)] flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{language === 'es' ? '0 Colisiones de Turno' : '0 Slot Collisions'}</span>
                  </span>
                  <span className="text-neutral-500">PostgreSQL Serializable Tx</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Integrated Terminal Footer with Architecture Chips & Discreet GitHub Link */}
        <div className="px-4 sm:px-5 py-3.5 bg-slate-50 dark:bg-white/[0.015] border-t border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          {/* Architecture Components chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.architecture.slice(0, 3).map((item, aIdx) => (
              <span
                key={aIdx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-[10px] font-mono text-slate-700 dark:text-neutral-300"
              >
                <Check className="w-2.5 h-2.5 text-[var(--accent-primary)]" />
                <span>{item}</span>
              </span>
            ))}
            {project.architecture.length > 3 && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 px-1">
                +{project.architecture.length - 3}
              </span>
            )}
          </div>

          {/* Discreet GitHub Link Button */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.18] text-xs font-mono text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-slate-600 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            <span className="font-semibold">{language === 'es' ? 'Ver en GitHub' : 'View on GitHub'}</span>
            <ExternalLink className="w-3 h-3 text-slate-500 dark:text-neutral-500 group-hover:text-[var(--accent-secondary)] transition-colors" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-emeraldNeon/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-emeraldNeon uppercase font-semibold">
              01 / {language === 'es' ? 'PROYECTOS SELECCIONADOS' : 'SELECTED CASE STUDIES'}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-emeraldNeon/40 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
            {language === 'es' ? (
              <>
                Sistemas desarrollados para <span className="editorial-accent-emerald">resolver</span> problemas críticos.
              </>
            ) : (
              <>
                Engineered to <span className="editorial-accent-emerald">solve</span> real-world critical bottlenecks.
              </>
            )}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'Proyectos de ingeniería reales con código modular, arquitecturas limpias, alta concurrencia y métricas de impacto verificables.'
              : 'Production-grade engineering case studies with modular code, clean architecture, high concurrency, and quantifiable impact.'}
          </p>
        </div>

        {/* Projects List with 3D Tilt Physical Cards */}
        <div className="space-y-20 sm:space-y-24">
          {FEATURED_PROJECTS.map((project, idx) => (
            <div key={project.id} id={project.id} className="scroll-mt-28 sm:scroll-mt-32">
              <ProjectTiltCard maxTilt={5}>
                <div className="glass-panel-card border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl hover:border-emeraldNeon/40 transition-all duration-300 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group">
                {/* Subtle top card accent glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emeraldNeon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Ambient Glow Accent */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emeraldNeon/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Monospace Project Index */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emeraldNeon uppercase tracking-[0.25em] font-semibold">
                        {language === 'es' ? `0${idx + 1} // CASO DE ESTUDIO` : `0${idx + 1} // CASE STUDY`}
                      </span>
                      <span className="text-[11px] font-mono text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-2.5 py-0.5 rounded-full">
                        {project.tags[0]}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {project.title[language]}
                      </h3>
                      <p className="mt-3 text-slate-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
                        {project.tagline[language]}
                      </p>
                    </div>

                    {/* Problem & Solution: Editorial Callout Format */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                      <div className="border-l-2 border-rose-500 dark:border-rose-400/50 pl-4 py-1">
                        <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{language === 'es' ? 'El Desafío' : 'The Challenge'}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-normal dark:font-light">
                          {project.problem[language]}
                        </p>
                      </div>

                      <div className="border-l-2 border-emeraldNeon/70 pl-4 py-1">
                        <div className="flex items-center gap-1.5 text-emeraldNeon font-mono text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                          <span>{language === 'es' ? 'La Solución' : 'The Solution'}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-normal dark:font-light">
                          {project.solution[language]}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 py-4 border-y border-slate-200 dark:border-white/[0.06]">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-left">
                          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emeraldNeon font-sans tracking-tight leading-none mb-1">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-600 dark:text-neutral-400 font-mono tracking-tight leading-tight line-clamp-2">
                            {m.label[language]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Unified Interactive Terminal with Live UI Mockup */}
                  <div className="lg:col-span-6">
                    {renderTerminalWindow(project)}
                  </div>
                </div>
              </div>
            </ProjectTiltCard>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};
