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
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {IMPACT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#2EE6A0]/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle accent glow line on top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EE6A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {icons[idx]}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  {`KPI_0${idx + 1}`}
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight mb-2 group-hover:text-[#2EE6A0] transition-colors">
                {metric.value}
              </div>

              <div className="text-sm font-semibold text-neutral-200 mb-1">
                {metric.label[language]}
              </div>

              <div className="text-xs text-neutral-400 font-mono">
                {metric.sub[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
