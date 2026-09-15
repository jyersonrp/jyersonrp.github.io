import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { Cpu, Database, Layout, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getTechSkillMeta } from './icons/TechIcons';
import { playSound } from '../utils/audioSystem';

interface SkillsMatrixProps {
  language: Language;
}

interface SkillCardProps {
  skill: {
    name: string;
    level: string;
    highlight?: boolean;
  };
  language: Language;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, language }) => {
  const [isHovered, setIsHovered] = useState(false);
  const meta = getTechSkillMeta(skill.name);
  const IconComponent = meta.icon;

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group/card relative overflow-hidden cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[#2EE6A0]/50"
      style={{
        borderColor: isHovered
          ? meta.brandColor
          : skill.highlight
          ? 'var(--accent-primary)'
          : 'var(--border-subtle)',
        backgroundColor: isHovered
          ? 'var(--bg-card-hover)'
          : skill.highlight
          ? 'var(--bg-card)'
          : 'var(--bg-card)',
        boxShadow: isHovered
          ? `0 12px 30px -10px ${meta.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`
          : skill.highlight
          ? '0 0 20px var(--accent-glow)'
          : 'none',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0px)',
      }}
    >
      {/* Dynamic ambient radial illumination inside the card */}
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-500 blur-2xl"
        style={{
          backgroundColor: meta.brandColor,
          opacity: isHovered ? 0.22 : 0,
        }}
      />

      {/* Card Header: Icon + Name + Highlight */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{
              backgroundColor: isHovered ? `${meta.brandColor}18` : 'rgba(255, 255, 255, 0.03)',
              borderColor: isHovered ? `${meta.brandColor}65` : 'rgba(255, 255, 255, 0.08)',
              boxShadow: isHovered ? `0 0 16px ${meta.glowColor}` : 'none',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <IconComponent
              className="w-5 h-5 transition-all duration-300"
              style={{
                filter: isHovered ? `drop-shadow(0 0 6px ${meta.brandColor})` : 'none',
              }}
            />
          </div>

          {skill.highlight && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider bg-[#2EE6A0]/10 text-[#2EE6A0] border border-[#2EE6A0]/25 shadow-[0_0_8px_rgba(46,230,160,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EE6A0] animate-pulse" />
              {language === 'es' ? 'CORE' : 'KEY'}
            </span>
          )}
        </div>

        <h4
          className="font-sans font-bold text-white text-[15px] tracking-tight transition-colors duration-200"
          style={{
            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
            textShadow: isHovered ? `0 0 16px ${meta.glowColor}` : 'none',
          }}
        >
          {skill.name}
        </h4>
      </div>

      {/* Card Footer: Level */}
      <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2
            className="w-3.5 h-3.5 transition-colors duration-300"
            style={{ color: isHovered ? meta.brandColor : '#00F0FF' }}
          />
          <span className="text-[11px] text-neutral-300">{skill.level}</span>
        </div>
      </div>
    </div>
  );
};

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const icons = [
    <Database className="w-4 h-4 text-emeraldNeon" />,
    <Cpu className="w-4 h-4 text-cyanNeon" />,
    <Layout className="w-4 h-4 text-emeraldNeon" />,
    <ShieldCheck className="w-4 h-4 text-cyanNeon" />
  ];

  return (
    <section id="skills" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-cyanNeon/[0.035] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-emeraldNeon uppercase font-semibold">
              04 / {language === 'es' ? 'STACK TÉCNICO & IA' : 'TECH STACK & AI'}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-emeraldNeon/40 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
            {language === 'es' ? (
              <>
                Ingeniería basada en <span className="editorial-accent-emerald">fundamentos</span> y visión de vanguardia.
              </>
            ) : (
              <>
                Engineered upon solid <span className="editorial-accent-emerald">foundations</span> and cutting-edge vision.
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'Conocimiento profundo respaldado por excelencia académica en la Universidad de Oriente (UDO) y ejecución en producción.'
              : 'Deep technical proficiency proven through academic honors at Universidad de Oriente (UDO) and production battle-testing.'}
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSound('switch');
                setActiveCategory(idx);
              }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === idx
                  ? 'bg-white text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
              }`}
            >
              <span>{icons[idx]}</span>
              <span>{cat.title[language]}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="glass-panel-card border border-white/[0.08] backdrop-blur-xl hover:border-emeraldNeon/40 transition-all duration-300 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
          {/* Subtle top card accent glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emeraldNeon/40 to-transparent opacity-70 pointer-events-none" />

          <div className="mb-8 pb-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                {SKILL_CATEGORIES[activeCategory].title[language]}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-light">
                {SKILL_CATEGORIES[activeCategory].description[language]}
              </p>
            </div>
            <div className="text-xs font-mono text-emeraldNeon bg-emeraldNeon/[0.08] border border-emeraldNeon/20 px-3.5 py-1.5 rounded-full self-start sm:self-auto tracking-wider">
              {language === 'es' ? 'Especialidad Verificada' : 'Verified Proficiency'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill, sIdx) => (
              <SkillCard
                key={sIdx}
                skill={skill}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
