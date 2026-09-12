import React, { useEffect } from 'react';
import { PERSONAL_INFO, FEATURED_PROJECTS, EDUCATION_ITEMS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { X, Printer, Download, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, language }) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const isEs = language === 'es';
    const content = `# ${PERSONAL_INFO.fullName}
${PERSONAL_INFO.title[language]}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email} | Phone / WhatsApp: ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

---

## ${isEs ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL SUMMARY'}
${PERSONAL_INFO.about[language]}

---

## ${isEs ? 'EDUCACIÓN & HONORES ACADÉMICOS' : 'EDUCATION & ACADEMIC HONORS'}
${EDUCATION_ITEMS.map(
  (edu) => `### ${edu.degree[language]} (${edu.badge})
*${edu.institution}* | ${edu.period}
${edu.details[language]}`
).join('\n\n')}

---

## ${isEs ? 'CERTIFICACIONES OFICIALES' : 'OFFICIAL CERTIFICATIONS'}
${CERTIFICATIONS.map(
  (c) => `- **${c.name[language]}** — ${c.issuer} (${c.year})
  Skills: ${c.skills.join(', ')}`
).join('\n')}

---

## ${isEs ? 'PROYECTOS DESTACADOS' : 'FEATURED ENGINEERING PROJECTS'}
${FEATURED_PROJECTS.map(
  (p) => `### ${p.title[language]}
*GitHub:* ${p.githubUrl}
*Stack:* ${p.tags.join(', ')}

**${isEs ? 'Problema:' : 'Problem:'}** ${p.problem[language]}
**${isEs ? 'Solución Arquitectónica:' : 'Solution:'}** ${p.solution[language]}
**${isEs ? 'Métricas Clave:' : 'Key Metrics:'}**
${p.metrics.map((m) => `  - ${m.label[language]}: ${m.value}`).join('\n')}
`
).join('\n')}

---

## ${isEs ? 'HABILIDADES TÉCNICAS' : 'TECHNICAL SKILLS'}
${SKILL_CATEGORIES.map(
  (cat) => `### ${cat.title[language]}
${cat.skills.map((s) => `- ${s.name} (${s.level})`).join('\n')}`
).join('\n\n')}

---

## ${isEs ? 'IDIOMAS' : 'LANGUAGES'}
- ${isEs ? 'Español: Nativo' : 'Spanish: Native'}
- ${isEs ? 'Inglés: Avanzado C1 (Fluidez Profesional Completa)' : 'English: Advanced C1 (Full Professional Fluency)'}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${PERSONAL_INFO.fullName.replace(/\s+/g, '_')}_${language.toUpperCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="cv-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in"
    >
      <div
        id="cv-modal-container"
        className="relative w-full max-w-4xl bg-[#0c0c10] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#E2E8F0] my-8"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121218] sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2EE6A0]" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              CURRICULUM VITAE // YERSON RODRÍGUEZ
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadMarkdown}
              title={language === 'es' ? 'Descargar archivo de CV en Markdown' : 'Download Markdown CV file'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="hidden sm:inline">{language === 'es' ? 'Descargar .MD' : 'Download .MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              title={language === 'es' ? 'Imprimir o guardar como PDF' : 'Print or save as PDF'}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2EE6A0]/15 hover:bg-[#2EE6A0]/25 border border-[#2EE6A0]/40 text-xs font-mono text-[#2EE6A0] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Imprimir / Guardar PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-400 hover:text-white transition-colors"
              aria-label={language === 'es' ? 'Cerrar modal' : 'Close modal'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div id="cv-printable-content" className="p-8 sm:p-12 space-y-8 print:p-0">
          {/* Header */}
          <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.fullName}
              </h1>
              <p className="text-sm sm:text-base text-[#2EE6A0] font-mono mt-1 font-semibold">
                {PERSONAL_INFO.title[language]}
              </p>
              <p className="text-xs text-neutral-400 mt-2 max-w-xl leading-relaxed">
                {PERSONAL_INFO.about[language]}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-1.5 text-xs font-mono text-neutral-300 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2EE6A0]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-white">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2EE6A0]" />
                <a href={`tel:${PERSONAL_INFO.phoneClean}`} className="hover:underline text-white">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400" />
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#00F0FF]">
                  github.com/jyersonrp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-neutral-400" />
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#00F0FF]">
                  linkedin.com/in/yerson-jose-rodriguez-perez
                </a>
              </div>
            </div>
          </div>

          {/* Education & Academic Honors */}
          <div>
            <h2 className="cv-section-title text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-4 font-bold">
              {language === 'es' ? 'Educación & Méritos Académicos' : 'Education & Academic Honors'}
            </h2>
            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-white text-sm">{edu.degree[language]}</span>
                    <span className="text-xs font-mono text-[#00F0FF] font-bold">{edu.badge}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    {edu.institution} | {edu.period}
                  </div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {edu.details[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="cv-section-title text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3 font-bold">
              {language === 'es' ? 'Certificaciones Profesionales' : 'Professional Certifications'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <div className="font-bold text-white">{cert.name[language]}</div>
                  <div className="text-neutral-400 font-mono text-[11px]">{cert.issuer} • {cert.year}</div>
                  <div className="text-neutral-300 text-[10px] mt-1">{cert.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Projects */}
          <div>
            <h2 className="cv-section-title text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-4 font-bold">
              {language === 'es' ? 'Proyectos Relevantes & Casos de Estudio' : 'Relevant Projects & Case Studies'}
            </h2>
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{proj.title[language]}</span>
                    <span className="text-[11px] font-mono text-[#2EE6A0]">{proj.tags.slice(0, 3).join(' • ')}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {proj.solution[language]}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-mono text-[#00F0FF]">
                    {proj.metrics.map((m, mIdx) => (
                      <span key={mIdx}>
                        {m.label[language]}: <strong className="text-white">{m.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="cv-section-title text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3 font-bold">
              {language === 'es' ? 'Habilidades & Tecnologías' : 'Technical Skills & Proficiencies'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white mb-1">{cat.title[language]}</div>
                  <div className="text-neutral-300 text-[11px] leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div>
              <strong className="text-white">Idiomas / Languages:</strong> Español (Nativo) • Inglés (Avanzado C1 – Fluidez Profesional)
            </div>
            <div>Maturín, Monagas, Venezuela</div>
          </div>
        </div>
      </div>
    </div>
  );
};
