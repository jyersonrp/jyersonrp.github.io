import React, { useState } from 'react';
import { ENGINEERING_PHILOSOPHY, ENGINEERING_TENETS } from '../data/portfolioData';
import { Language, ArchitecturePillar } from '../types';
import {
  Layers,
  Cpu,
  ShieldCheck,
  Code2,
  Terminal,
  Sparkles,
  CheckCircle2,
  Zap,
  Boxes,
  ArrowRight,
  Server,
  Award
} from 'lucide-react';
import { playSound } from '../utils/audioSystem';

interface EngineeringPhilosophyProps {
  language: Language;
}

// Lightweight syntax tokenizer for architecture code tabs
const CodeSnippetView: React.FC<{ code: string; filename: string }> = ({ code, filename }) => {
  const lines = code.split('\n');

  const highlight = (line: string) => {
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return <span className="text-neutral-500 italic">{line}</span>;
    }

    const tokenRegex = /(#[^\n]*|\/\/[^\n]*|"""[\s\S]*?"""|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:class|def|return|if|else|elif|for|while|import|from|as|async|await|with|yield|pass|assert|True|False|None)\b|\b(?:VisionDetector|OnnxYoloAdapter|BoundingBox|Protocol|InferenceSession|AsyncRateLimiter|WebhookSecurityVerifier|SecuritySignatureMismatchError|bytes|str|float|int|List)\b|\b(?:self)\b|\b\d+(?:\.\d+)?(?:ms|fps|px|%)?\b)/g;

    const elements = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        elements.push(line.substring(lastIdx, match.index));
      }
      const tok = match[0];
      if (tok.startsWith('#') || tok.startsWith('//') || tok.startsWith('"""')) {
        elements.push(<span key={match.index} className="text-neutral-500 italic">{tok}</span>);
      } else if (tok.startsWith('"') || tok.startsWith("'") || tok.startsWith('`')) {
        elements.push(<span key={match.index} className="text-[#38bdf8]">{tok}</span>);
      } else if (/^(?:class|def|return|if|else|elif|for|while|import|from|as|async|await|with|yield|pass|assert|True|False|None)$/.test(tok)) {
        elements.push(<span key={match.index} className="text-[var(--accent-primary)] font-semibold">{tok}</span>);
      } else if (/^(?:VisionDetector|OnnxYoloAdapter|BoundingBox|Protocol|InferenceSession|AsyncRateLimiter|WebhookSecurityVerifier|SecuritySignatureMismatchError|bytes|str|float|int|List)$/.test(tok)) {
        elements.push(<span key={match.index} className="text-[#c084fc] font-medium">{tok}</span>);
      } else if (tok === 'self') {
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
    <div className="rounded-2xl bg-[#09090f] border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* File Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span className="text-neutral-300 font-medium">{filename}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
      </div>

      <pre className="p-4 text-[11px] sm:text-xs text-neutral-300 font-mono leading-relaxed overflow-x-auto max-h-80 scrollbar-thin">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="flex hover:bg-white/[0.03] px-1 rounded transition-colors">
              <span className="w-7 text-neutral-600 select-none text-right pr-3 shrink-0 text-[10px]">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <span className="flex-1 whitespace-pre">{highlight(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export const EngineeringPhilosophy: React.FC<EngineeringPhilosophyProps> = ({ language }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(ENGINEERING_PHILOSOPHY[0].id);
  const [activeTab, setActiveTab] = useState<'principles' | 'code'>('principles');

  const selectedPillar = ENGINEERING_PHILOSOPHY.find((p) => p.id === selectedPillarId) || ENGINEERING_PHILOSOPHY[0];

  const handlePillarChange = (id: string) => {
    playSound('switch');
    setSelectedPillarId(id);
  };

  const handleTabChange = (tab: 'principles' | 'code') => {
    playSound('click');
    setActiveTab(tab);
  };

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-5 h-5 text-emeraldNeon" />;
      case 1:
        return <Cpu className="w-5 h-5 text-cyanNeon" />;
      case 2:
      default:
        return <ShieldCheck className="w-5 h-5 text-emeraldNeon" />;
    }
  };

  return (
    <section id="philosophy" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emeraldNeon/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-cyanNeon/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-mono tracking-[0.25em] text-emeraldNeon uppercase font-semibold">
              02 / {language === 'es' ? 'FILOSOFÍA & ARQUITECTURA' : 'ENGINEERING ETHOS & DESIGN'}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-emeraldNeon/40 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {language === 'es' ? (
              <>
                Sistemas <span className="editorial-accent-emerald">desacoplados</span>, alta concurrencia y código preparado para <span className="editorial-accent-cyan">producción</span>.
              </>
            ) : (
              <>
                Engineered for <span className="editorial-accent-emerald">decoupling</span>, high concurrency, and resilient <span className="editorial-accent-cyan">production</span> durability.
              </>
            )}
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            {language === 'es' ? (
              <>
                Mi enfoque técnico no se limita a que el código compile: diseño pensando en la <strong>escalabilidad de recursos</strong> (CPU, RAM, red), el aislamiento de dominio y la tolerancia a fallos. Desde mi calificación perfecta (<strong>10/10 en POO</strong> en la Universidad de Oriente) hasta sistemas de videovigilancia con IA y ERPs empresariales, cada decisión responde a principios formales de arquitectura.
              </>
            ) : (
              <>
                My engineering approach goes beyond making code run: I design with <strong>compute efficiency</strong> (CPU, RAM, network), strict domain isolation, and fault tolerance in mind. From academic rigor (<strong>10/10 in OOP</strong> at Universidad de Oriente) to AI video surveillance and enterprise ERPs, every decision follows proven system architecture principles.
              </>
            )}
          </p>
        </div>

        {/* Pillar Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {ENGINEERING_PHILOSOPHY.map((pillar, idx) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarChange(pillar.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between gap-4 group ${
                  isSelected
                    ? 'glass-panel border-emeraldNeon/50 shadow-[0_10px_30px_-10px_var(--accent-glow)]'
                    : 'glass-panel border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/15 text-slate-600 dark:text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-slate-200/80 dark:bg-white/10' : 'bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200/80 dark:group-hover:bg-white/10'}`}>
                      {getPillarIcon(idx)}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-neutral-400">
                      PILLAR // {pillar.number}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emeraldNeon shadow-[0_0_8px_var(--accent-primary)]" />
                  )}
                </div>

                <div>
                  <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-neutral-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {pillar.title[language]}
                  </h3>
                  <p className="text-xs font-mono text-cyanNeon mt-1">
                    {pillar.category[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive Card */}
        <div className="glass-panel-card rounded-3xl border border-slate-200 dark:border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          {/* Top Banner: Thesis & Academic/Real Case Badge */}
          <div className="border-b border-slate-200 dark:border-white/[0.08] pb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emeraldNeon">
                <Award className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">
                  {language === 'es' ? 'Caso de Estudio & Evidencia Formal' : 'Case Study & Verified Foundation'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/[0.04] px-3 py-1 rounded-full border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-neutral-300">
                <Server className="w-3.5 h-3.5 text-cyanNeon" />
                <span>{selectedPillar.tags.slice(0, 3).join(' • ')}</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
              "{selectedPillar.thesis[language]}"
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-700 dark:text-neutral-300 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emeraldNeon mt-1.5 shrink-0" />
              <span>{selectedPillar.academicOrRealCase[language]}</span>
            </div>
          </div>

          {/* Subtabs: Principles vs Code */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#12121c] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => handleTabChange('principles')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'principles'
                    ? 'bg-emeraldNeon text-black shadow-md font-bold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Pilares & Reglas de Diseño' : 'Principles & Architecture Rules'}</span>
              </button>

              {selectedPillar.codeSnippet && (
                <button
                  onClick={() => handleTabChange('code')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === 'code'
                      ? 'bg-cyanNeon text-black shadow-md font-bold'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Contrato de Código' : 'Code Contract'}</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono">
              {selectedPillar.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="flex items-baseline gap-1.5">
                  <span className="text-slate-500 dark:text-neutral-400">{metric.label[language]}:</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'principles' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {selectedPillar.principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100/70 dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emeraldNeon/15 text-emeraldNeon flex items-center justify-center font-mono text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {principle.title[language]}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-normal dark:font-light">
                      {principle.detail[language]}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono text-emeraldNeon">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Validado en Producción' : 'Production Verified'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            selectedPillar.codeSnippet && (
              <div className="pt-2">
                <CodeSnippetView
                  code={selectedPillar.codeSnippet.code}
                  filename={selectedPillar.codeSnippet.filename}
                />
              </div>
            )
          )}
        </div>

        {/* The 4 Engineering Tenets / Mandamientos */}
        <div className="glass-panel-card rounded-3xl border border-slate-200 dark:border-white/[0.09] p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-5">
            <div>
              <span className="text-xs font-mono text-emeraldNeon uppercase tracking-wider font-bold">
                {language === 'es' ? '// LOS 4 MANDAMIENTOS // ESTÁNDAR DE CÓDIGO' : '// THE 4 TENETS // CODE STANDARD'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                {language === 'es' ? 'Principios no negociables al programar' : 'Non-negotiable principles when building'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
              Yerson Rodríguez • Systems Engineer
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGINEERING_TENETS.map((tenet) => (
              <div
                key={tenet.number}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] space-y-2 hover:border-emeraldNeon/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-cyanNeon">
                  {tenet.number} //
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {tenet.title[language]}
                </h4>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed font-normal dark:font-light">
                  {tenet.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
