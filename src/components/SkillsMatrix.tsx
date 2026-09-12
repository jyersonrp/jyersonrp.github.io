import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { Terminal, Cpu, Database, Layout, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SkillsMatrixProps {
  language: Language;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const icons = [
    <Database className="w-4 h-4 text-[#2EE6A0]" />,
    <Cpu className="w-4 h-4 text-[#00F0FF]" />,
    <Layout className="w-4 h-4 text-[#2EE6A0]" />,
    <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Stack Tecnológico & Dominio' : 'Tech Stack & Capabilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {language === 'es' ? (
              <>
                Ingeniería basada en <span className="font-serif italic font-normal text-[#2EE6A0]">fundamentos</span> y visión de vanguardia.
              </>
            ) : (
              <>
                Engineered upon solid <span className="font-serif italic font-normal text-[#2EE6A0]">foundations</span> and cutting-edge vision.
              </>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
            {language === 'es'
              ? 'Conocimiento profundo respaldado por excelencia académica en la Universidad de Oriente (UDO) y experiencia en producción.'
              : 'Deep technical proficiency proven through academic honors at Universidad de Oriente (UDO) and production battle-testing.'}
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === idx
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'glass-panel text-neutral-400 hover:text-white hover:bg-white/5 border-white/10'
              }`}
            >
              <span>{icons[idx]}</span>
              <span>{cat.title[language]}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <div className="mb-6 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {SKILL_CATEGORIES[activeCategory].title[language]}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {SKILL_CATEGORIES[activeCategory].description[language]}
              </p>
            </div>
            <div className="text-xs font-mono text-[#2EE6A0] bg-[#2EE6A0]/10 border border-[#2EE6A0]/25 px-3 py-1 rounded-full self-start sm:self-auto">
              {language === 'es' ? 'Especialidad Verificada' : 'Verified Proficiency'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-xl border transition-all ${
                  skill.highlight
                    ? 'bg-white/[0.04] border-[#2EE6A0]/30 hover:border-[#2EE6A0]'
                    : 'bg-black/30 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-sm">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="w-2 h-2 rounded-full bg-[#2EE6A0] shadow-[0_0_6px_#2EE6A0]" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
