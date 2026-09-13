import React from 'react';
import { IMPACT_METRICS } from '../data/portfolioData';
import { Language } from '../types';
import { Award, Globe2, Zap, CheckCircle2 } from 'lucide-react';

interface MetricsProps {
  language: Language;
}

export const Metrics: React.FC<MetricsProps> = ({ language }) => {
  const icons = [
    <Award className="w-6 h-6 text-[#2EE6A0]" />,
    <Globe2 className="w-6 h-6 text-[#00F0FF]" />,
    <Zap className="w-6 h-6 text-[#2EE6A0]" />,
    <CheckCircle2 className="w-6 h-6 text-[#00F0FF]" />
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel-card bg-[#09090f]/75 p-7 rounded-3xl border border-white/[0.08] backdrop-blur-xl hover:border-[#2EE6A0]/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden h-full flex flex-col justify-between"
            >
              {/* Subtle accent glow line on top */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${
                  idx % 2 === 0 ? 'via-[#2EE6A0]/50' : 'via-[#00F0FF]/50'
                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="flex items-center justify-between mb-5">
                <span className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.06] transition-colors">
                  {icons[idx]}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                  {`KPI 0${idx + 1}`}
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-white tracking-tight mb-2 group-hover:text-[#2EE6A0] transition-colors">
                {metric.value}
              </div>

              <div className="text-sm font-semibold text-neutral-200 mb-1 tracking-tight">
                {metric.label[language]}
              </div>

              <div className="text-xs text-neutral-400 font-mono tracking-wide">
                {metric.sub[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
