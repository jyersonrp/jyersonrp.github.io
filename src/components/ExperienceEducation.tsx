import React from 'react';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, Languages, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';
import { getTechSkillMeta } from './icons/TechIcons';

interface ExperienceEducationProps {
  language: Language;
}

export const ExperienceEducation: React.FC<ExperienceEducationProps> = ({ language }) => {
  return (
    <section id="experience" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[350px] bg-[#2EE6A0]/[0.035] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase font-semibold">
              05 / {language === 'es' ? 'EXPERIENCIA & TRAYECTORIA' : 'EXPERIENCE & EDUCATION'}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#00F0FF]/40 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15] max-w-4xl">
            {language === 'es' ? (
              <>
                Formación rigurosa y trayectoria en <span className="editorial-accent-cyan">soluciones reales.</span>
              </>
            ) : (
              <>
                Rigorous training & track record in <span className="editorial-accent-cyan">real solutions.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'Un perfil que combina excelencia teórica en ingeniería de software con ejecución práctica orientada a resultados empresariales.'
              : 'A profile blending theoretical software engineering excellence with result-driven practical execution.'}
          </p>
        </div>

        {/* Perfectly Balanced Two-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN (6 COLS): Technical Experience & Languages    */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* --- Block 1: Technical Work Experience --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-5 h-5 text-[#2EE6A0]" />
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    {language === 'es' ? 'Experiencia Técnica Aplicada' : 'Technical Work Experience'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2EE6A0] bg-[#2EE6A0]/10 border border-[#2EE6A0]/25 px-2.5 py-0.5 rounded-full font-medium">
                  {language === 'es' ? 'Producción Real' : 'Production Systems'}
                </span>
              </div>

              {EXPERIENCE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel-card bg-[#09090f]/75 border border-white/[0.08] backdrop-blur-xl hover:border-[#2EE6A0]/40 transition-all duration-300 p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-[0_12px_35px_-12px_rgba(0,0,0,0.5)]"
                >
                  {/* Subtle top card accent glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EE6A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header: Role & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                      {item.role[language]}
                    </h4>
                    <span className="text-xs font-mono text-[#2EE6A0] bg-[#2EE6A0]/[0.08] border border-[#2EE6A0]/20 px-3 py-1 rounded-full self-start sm:self-auto tracking-wider font-medium shrink-0">
                      {item.period[language]}
                    </span>
                  </div>

                  {/* Company & Location */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-neutral-400 mb-5">
                    <span className="text-white font-medium">{item.company[language]}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#2EE6A0]/90">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {item.location[language]}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-[13px] text-neutral-300/90 leading-relaxed mb-5 font-light">
                    {item.description[language]}
                  </p>

                  {/* Key Engineering Deliverables */}
                  <div className="space-y-3 mb-6 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
                    {item.achievements[language].map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#2EE6A0] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills with Official Brand Icons */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 mb-3">
                      {language === 'es' ? 'Stack Tecnológico en Producción:' : 'Production Tech Stack:'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => {
                        const meta = getTechSkillMeta(skill);
                        const SkillIcon = meta.icon;
                        return (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono bg-white/[0.03] text-neutral-300 border border-white/[0.08] hover:border-[#2EE6A0]/40 transition-colors"
                          >
                            <SkillIcon className="w-3.5 h-3.5 shrink-0" style={{ color: meta.brandColor }} />
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Block 2: Language Proficiency & Global Readiness --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <Languages className="w-5 h-5 text-[#00F0FF]" />
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    {language === 'es' ? 'Dominio de Idiomas & Entorno Global' : 'Languages & Global Readiness'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-full font-medium">
                  Bilingual C1
                </span>
              </div>

              <div className="glass-panel-card bg-[#09090f]/75 border border-white/[0.08] backdrop-blur-xl hover:border-[#00F0FF]/40 transition-all duration-300 p-6 sm:p-7 rounded-3xl relative overflow-hidden group shadow-[0_12px_35px_-12px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {/* Spanish */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        {language === 'es' ? 'Lengua Materna' : 'Native Language'}
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {language === 'es' ? 'Español' : 'Spanish'}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#2EE6A0] bg-[#2EE6A0]/10 border border-[#2EE6A0]/25 px-2.5 py-1 rounded-full font-semibold">
                      {language === 'es' ? 'Nativo' : 'Native'}
                    </span>
                  </div>

                  {/* English C1 */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00F0FF]/[0.08] to-transparent border border-[#00F0FF]/25 flex items-center justify-between shadow-[0_0_20px_rgba(0,240,255,0.08)]">
                    <div>
                      <div className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
                        <span>{language === 'es' ? 'Nivel Avanzado C1' : 'Advanced Level C1'}</span>
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {language === 'es' ? 'Inglés' : 'English'}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/15 border border-[#00F0FF]/35 px-2.5 py-1 rounded-full font-semibold shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      C1 Fluency
                    </span>
                  </div>
                </div>

                {/* Recruiter Footnote */}
                <div className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed pt-3 border-t border-white/[0.06]">
                  <Globe2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                  <span>
                    {language === 'es'
                      ? 'Capacidad verificada para colaborar con equipos internacionales distribuidos, participar activamente en standups técnicos, redactar documentación de arquitectura y realizar revisiones de código en inglés.'
                      : 'Verified capability to collaborate across distributed international engineering teams, participate in technical standups, draft architecture specifications, and conduct code reviews in English.'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (6 COLS): University Education & Academos    */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* --- Block 1: University Education (UDO) --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    {language === 'es' ? 'Educación Universitaria' : 'University Education'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-full font-medium">
                  UDO • 9no Semestre
                </span>
              </div>

              {EDUCATION_ITEMS.map((edu, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden border border-white/[0.1] hover:border-[#00F0FF]/50 bg-gradient-to-br from-[#0c0d16]/90 via-[#0a0c14]/85 to-[#07080e]/95 backdrop-blur-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,240,255,0.18)]"
                >
                  {/* Holographic light sweep sheen on hover */}
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none -skew-x-12" />

                  {/* Top edge iridescent crystal accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Micro-security grid background pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Holographic Credential Header Bar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                      <span className="text-white font-semibold tracking-wider uppercase">
                        {language === 'es' ? 'CREDENCIAL UNIVERSITARIA' : 'ACADEMIC CREDENTIAL'}
                      </span>
                      <span className="text-neutral-600">|</span>
                      <span className="text-[#00F0FF]/80">#UDO-SIS-2021</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'EN CURSO • VERIFICADO' : 'ACTIVE • VERIFIED'}</span>
                    </div>
                  </div>

                  {/* Degree Title & Institution */}
                  <div className="relative z-10 mb-4">
                    <h4 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
                      {edu.degree[language]}
                    </h4>
                    <div className="text-sm font-medium text-neutral-300 mt-1 flex items-center gap-2">
                      <span>{edu.institution}</span>
                    </div>
                    <div className="text-xs font-mono text-[#00F0FF]/80 mt-1.5 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Holographic Récord Académico: 10/10 en POO */}
                  <div className="relative z-10 my-4 p-4 rounded-2xl bg-gradient-to-r from-[#00F0FF]/[0.12] via-[#2EE6A0]/[0.1] to-white/[0.02] border border-[#00F0FF]/35 shadow-[0_0_25px_rgba(0,240,255,0.12)]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF]/25 to-[#2EE6A0]/20 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_14px_rgba(0,240,255,0.3)] shrink-0">
                          <Award className="w-5 h-5 text-[#00F0FF]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase font-bold flex items-center gap-1.5">
                            <span>{language === 'es' ? 'HONOR ACADÉMICO MÁXIMO' : 'MAXIMUM ACADEMIC HONOR'}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2EE6A0]" />
                          </div>
                          <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                            <span>POO & SOLID: 10 / 10</span>
                            <span className="text-xs font-mono text-[#2EE6A0] font-normal hidden sm:inline">
                              ({language === 'es' ? 'Récord Perfecto' : 'Perfect Record'})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#2EE6A0]/15 text-[#2EE6A0] border border-[#2EE6A0]/35 shadow-[0_0_10px_rgba(46,230,160,0.3)]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          10 / 10
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                          {language === 'es' ? 'Certificado UDO' : 'UDO Certified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Details */}
                  <p className="relative z-10 text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-light">
                    {edu.details[language]}
                  </p>

                  {/* Verification Footer Pill */}
                  <div className="relative z-10 mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2EE6A0]" />
                      <span>{language === 'es' ? 'Régimen Presencial Oficial' : 'Official On-Campus Track'}</span>
                    </span>
                    <span className="text-neutral-500">
                      {language === 'es' ? 'Maturín, Venezuela' : 'Maturin, Venezuela'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Block 2: Official Certifications (Academos Dual Grid) --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#2EE6A0]" />
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                    {language === 'es' ? 'Certificaciones Oficiales' : 'Official Certifications'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2EE6A0] bg-[#2EE6A0]/10 border border-[#2EE6A0]/25 px-2.5 py-0.5 rounded-full font-medium">
                  Academos 2024
                </span>
              </div>

              {/* 2-Column Symmetrical Grid for Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert, idx) => {
                  const certCode = idx === 0 ? 'ACAD-PY-2024' : 'ACAD-DS-OOP-2024';
                  return (
                    <div
                      key={idx}
                      className="group relative rounded-3xl p-5 sm:p-6 transition-all duration-500 overflow-hidden border border-white/[0.1] hover:border-[#2EE6A0]/50 bg-gradient-to-br from-[#0c0e14]/90 via-[#0a0d14]/85 to-[#07090f]/95 backdrop-blur-2xl shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(46,230,160,0.16)] flex flex-col justify-between"
                    >
                      {/* Holographic light sweep sheen */}
                      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none -skew-x-12" />

                      {/* Top edge emerald accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EE6A0] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Micro-security grid */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                      <div>
                        {/* Credential Header Bar */}
                        <div className="relative z-10 flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/[0.06]">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2EE6A0]" />
                            <span className="text-[#2EE6A0]/90 font-medium">#{certCode}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wider bg-[#2EE6A0]/10 text-[#2EE6A0] border border-[#2EE6A0]/25">
                            {cert.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h5 className="relative z-10 font-sans font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-[#2EE6A0] transition-colors duration-200 mb-2 leading-snug">
                          {cert.name[language]}
                        </h5>

                        <div className="relative z-10 text-[11px] font-mono text-neutral-400 mb-3 flex items-center gap-1.5">
                          <span>{cert.issuer} Academy</span>
                          <span className="text-neutral-600">•</span>
                          <span className="text-[#2EE6A0]/80">{language === 'es' ? 'Vigencia Permanente' : 'Permanent'}</span>
                        </div>
                      </div>

                      {/* Skills Chips */}
                      <div className="relative z-10 flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.05]">
                        {cert.skills.map((s, sIdx) => {
                          const skillMeta = getTechSkillMeta(s);
                          const SkillIcon = skillMeta.icon;
                          return (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-mono bg-white/[0.04] text-neutral-300 border border-white/[0.07] group-hover:border-[#2EE6A0]/25 transition-colors"
                            >
                              <SkillIcon className="w-2.5 h-2.5 shrink-0" />
                              <span>{s}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
