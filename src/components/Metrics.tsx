import React, { useEffect, useRef, useState } from 'react';
import { IMPACT_METRICS } from '../data/portfolioData';
import { Language } from '../types';
import { Award, Globe2, Zap, CheckCircle2 } from 'lucide-react';

interface MetricsProps {
  language: Language;
}

const AnimatedMetricValue: React.FC<{ value: string; isInView: boolean }> = ({ value, isInView }) => {
  // Match values that start with pure digits (e.g. "10/10", "70%", "100%").
  // Alphanumeric badges like "C1" do not match and are rendered directly without NaN.
  const numericMatch = /^(\d+)(.*)$/.exec(value.trim());
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? numericMatch[2] : '';

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView || targetNumber === null || Number.isNaN(targetNumber)) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(targetNumber);
      return;
    }

    let rafId: number;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * targetNumber));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, targetNumber]);

  if (targetNumber === null) {
    return (
      <span
        className={`inline-block transition-all duration-700 ease-out ${
          isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        {value}
      </span>
    );
  }

  return (
    <span className="tabular-nums">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
};

export const Metrics: React.FC<MetricsProps> = ({ language }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const icons = [
    <Award className="w-6 h-6 text-[var(--accent-primary)]" />,
    <Globe2 className="w-6 h-6 text-[var(--accent-secondary)]" />,
    <Zap className="w-6 h-6 text-[var(--accent-primary)]" />,
    <CheckCircle2 className="w-6 h-6 text-[var(--accent-secondary)]" />
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel-card bg-white/90 dark:bg-[#09090f]/75 p-7 rounded-3xl border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-xl hover:border-[var(--accent-primary)]/50 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden h-full flex flex-col justify-between shadow-lg dark:shadow-none"
            >
              {/* Subtle accent glow line on top */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${
                  idx % 2 === 0 ? 'via-[var(--accent-primary)]/50' : 'via-[var(--accent-secondary)]/50'
                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="flex items-center justify-between mb-5">
                <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] group-hover:bg-slate-200 dark:group-hover:bg-white/[0.06] transition-colors">
                  {icons[idx]}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-neutral-400">
                  {`KPI 0${idx + 1}`}
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                <AnimatedMetricValue value={metric.value} isInView={isInView} />
              </div>

              <div className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mb-1 tracking-tight">
                {metric.label[language]}
              </div>

              <div className="text-xs text-slate-500 dark:text-neutral-400 font-mono tracking-wide">
                {metric.sub[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
