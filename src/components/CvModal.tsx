import React from 'react';
import { PERSONAL_INFO, FEATURED_PROJECTS, EDUCATION_ITEMS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0c0c10] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#E2E8F0] my-8">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121218] sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2EE6A0]" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              CURRICULUM VITAE // YERSON RODRÍGUEZ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#2EE6A0]" />
              <span>{language === 'es' ? 'Imprimir / Guardar PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-400 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-8 sm:p-12 space-y-8 print:p-0 print:text-black print:bg-white">
          {/* Header */}
          <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 print:border-black/20">
            <div>
              <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight print:text-black">
                {PERSONAL_INFO.fullName}
              </h1>
              <p className="text-sm sm:text-base text-[#2EE6A0] font-mono mt-1 font-semibold print:text-emerald-700">
                {PERSONAL_INFO.title[language]}
              </p>
              <p className="text-xs text-neutral-400 mt-2 max-w-xl leading-relaxed print:text-neutral-700">
                {PERSONAL_INFO.about[language]}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-1.5 text-xs font-mono text-neutral-300 print:text-black shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2EE6A0]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-white print:text-black">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2EE6A0]" />
                <a href={`tel:${PERSONAL_INFO.phoneClean}`} className="hover:underline text-white print:text-black">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400" />
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#00F0FF] print:text-blue-700">
                  github.com/jyersonrp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-neutral-400" />
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#00F0FF] print:text-blue-700">
                  linkedin.com/in/yerson-jose-rodriguez-perez
                </a>
              </div>
            </div>
          </div>

          {/* Education & Academic Honors */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-4 print:text-emerald-800 font-bold">
              {language === 'es' ? 'Educación & Méritos Académicos' : 'Education & Academic Honors'}
            </h2>
            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 print:bg-neutral-100 print:border-neutral-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-white text-sm print:text-black">{edu.degree[language]}</span>
                    <span className="text-xs font-mono text-[#00F0FF] print:text-blue-700 font-bold">{edu.badge}</span>
                  </div>
                  <div className="text-xs text-neutral-400 print:text-neutral-700 font-mono mt-0.5">
                    {edu.institution} | {edu.period}
                  </div>
                  <p className="text-xs text-neutral-300 print:text-neutral-800 mt-2 leading-relaxed">
                    {edu.details[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3 print:text-blue-800 font-bold">
              {language === 'es' ? 'Certificaciones Profesionales' : 'Professional Certifications'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 print:bg-neutral-100 print:border-neutral-300 text-xs">
                  <div className="font-bold text-white print:text-black">{cert.name[language]}</div>
                  <div className="text-neutral-400 font-mono text-[11px] print:text-neutral-700">{cert.issuer} • {cert.year}</div>
                  <div className="text-neutral-300 text-[10px] mt-1 print:text-neutral-800">{cert.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-4 print:text-emerald-800 font-bold">
              {language === 'es' ? 'Proyectos Relevantes & Casos de Estudio' : 'Relevant Projects & Case Studies'}
            </h2>
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/5 print:bg-neutral-100 print:border-neutral-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white print:text-black">{proj.title[language]}</span>
                    <span className="text-[11px] font-mono text-[#2EE6A0] print:text-emerald-700">{proj.tags.slice(0, 3).join(' • ')}</span>
                  </div>
                  <p className="text-xs text-neutral-300 print:text-neutral-800 leading-relaxed">
                    {proj.solution[language]}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-mono text-[#00F0FF] print:text-blue-700">
                    {proj.metrics.map((m, mIdx) => (
                      <span key={mIdx}>
                        {m.label[language]}: <strong className="text-white print:text-black">{m.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3 print:text-blue-800 font-bold">
              {language === 'es' ? 'Habilidades & Tecnologías' : 'Technical Skills & Proficiencies'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 print:bg-neutral-100 print:border-neutral-300">
                  <div className="font-bold text-white print:text-black mb-1">{cat.title[language]}</div>
                  <div className="text-neutral-300 print:text-neutral-800 text-[11px] leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="pt-4 border-t border-white/10 print:border-black/20 flex items-center justify-between text-xs font-mono text-neutral-400 print:text-neutral-700">
            <div>
              <strong className="text-white print:text-black">Idiomas / Languages:</strong> Español (Nativo) • Inglés (Avanzado C1 – Fluidez Profesional)
            </div>
            <div>Maturín, Monagas, Venezuela</div>
          </div>
        </div>
      </div>
    </div>
  );
};
