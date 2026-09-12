import React from 'react';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle, Languages } from 'lucide-react';

interface ExperienceEducationProps {
  language: Language;
}

export const ExperienceEducation: React.FC<ExperienceEducationProps> = ({ language }) => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Trayectoria & Formación' : 'Experience & Education'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {language === 'es' ? (
              <>
                Formación rigurosa y experiencia en <span className="font-serif italic font-normal text-[#00F0FF]">soluciones reales</span>.
              </>
            ) : (
              <>
                Rigorous training and track record in <span className="font-serif italic font-normal text-[#00F0FF]">real solutions</span>.
              </>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
            {language === 'es'
              ? 'Un perfil que combina excelencia teórica de ingeniería con ejecución práctica orientada a resultados.'
              : 'A profile blending theoretical engineering excellence with result-driven practical execution.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Professional Experience */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <Briefcase className="w-5 h-5 text-[#2EE6A0]" />
              <h3 className="text-xl font-bold text-white">
                {language === 'es' ? 'Experiencia Técnica Aplicada' : 'Technical Work Experience'}
              </h3>
            </div>

            <div className="space-y-6">
              {EXPERIENCE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-white/20 transition-all relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="text-lg font-bold text-white">
                      {item.role[language]}
                    </h4>
                    <span className="text-xs font-mono text-[#2EE6A0] bg-[#2EE6A0]/10 border border-[#2EE6A0]/20 px-3 py-1 rounded-full self-start sm:self-auto">
                      {item.period[language]}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-4">
                    <span className="text-white font-medium">{item.company[language]}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {item.location[language]}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {item.description[language]}
                  </p>

                  <div className="space-y-2 mb-5">
                    {item.achievements[language].map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2EE6A0] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-neutral-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education, Certifications & Languages */}
          <div className="lg:col-span-5 space-y-8">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
                <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'es' ? 'Educación Universitaria' : 'University Education'}
                </h3>
              </div>

              {EDUCATION_ITEMS.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-base font-bold text-white">
                      {edu.degree[language]}
                    </h4>
                    {edu.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-mono font-bold whitespace-nowrap">
                        {edu.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-medium text-neutral-300 mb-1">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mb-3">
                    {edu.period}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {edu.details[language]}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
                <Award className="w-5 h-5 text-[#2EE6A0]" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'es' ? 'Certificaciones Oficiales' : 'Official Certifications'}
                </h3>
              </div>

              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-[#2EE6A0]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-sm text-white">
                        {cert.name[language]}
                      </h5>
                      <span className="text-xs font-mono text-[#2EE6A0]">
                        {cert.year}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mb-2">
                      {cert.issuer}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <Languages className="w-4 h-4 text-[#00F0FF]" />
                <span>{language === 'es' ? 'Dominio de Idiomas' : 'Language Fluency'}</span>
              </div>
              <div className="space-y-2">
                {PERSONAL_INFO.languages.map((langItem, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                    <span className="font-semibold text-white">{langItem.name[language]}</span>
                    <span className="text-neutral-300 font-mono">{langItem.level[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
