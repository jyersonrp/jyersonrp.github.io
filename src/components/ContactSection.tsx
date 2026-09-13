import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import {
  Mail,
  Copy,
  Check,
  MessageCircle,
  Send,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'opportunity',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);

    // Trigger subtle confetti celebration
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2EE6A0', '#00F0FF', '#ffffff']
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#2EE6A0', '#00F0FF', '#ffffff']
      });
    } catch (err) {
      // ignore
    }

    const subjectMap: Record<string, string> = {
      opportunity: language === 'es' ? 'Oferta de Empleo' : 'Job Opportunity',
      freelance: language === 'es' ? 'Proyecto Freelance' : 'Freelance Project',
      odoo: language === 'es' ? 'Implementación Odoo ERP' : 'Odoo ERP Implementation',
      other: language === 'es' ? 'Consulta General' : 'General Inquiry'
    };

    const subjectText = `[Portfolio] ${subjectMap[formData.subject] || formData.subject}: ${formData.name}`;
    const bodyText = `Hola Yerson,\n\nNombre / Empresa: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mailto link error:', err);
    }
  };

  const handleCopyFormattedMessage = () => {
    const formatted = `Nombre / Empresa: ${formData.name}\nEmail: ${formData.email}\nAsunto: ${formData.subject}\nMensaje:\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      language === 'es'
        ? `Hola Yerson, te contacto desde tu portafolio:\n\n*Nombre:* ${formData.name}\n*Email:* ${formData.email}\n\n*Mensaje:* ${formData.message}`
        : `Hello Yerson, reaching out from your portfolio:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Message:* ${formData.message}`
    );
    return `https://wa.me/${PERSONAL_INFO.phoneClean}?text=${text}`;
  };

  const getMailtoLink = () => {
    const subjectText = `[Portfolio] Consulta: ${formData.name || 'Contacto Web'}`;
    const bodyText = `Nombre / Empresa: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: 'opportunity', message: '' });
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2EE6A0]/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-[#2EE6A0]/50 to-transparent" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#2EE6A0] uppercase font-semibold">
              05 / {language === 'es' ? 'CONTACTO' : 'GET IN TOUCH'}
            </span>
            <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-[#2EE6A0]/50 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
            {language === 'es' ? (
              <>
                Construyamos algo <span className="editorial-accent-emerald">extraordinario</span> juntos.
              </>
            ) : (
              <>
                Let's build something <span className="editorial-accent-emerald">extraordinary</span> together.
              </>
            )}
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
            {language === 'es'
              ? 'Disponible para contrataciones a tiempo completo, roles remotos internacionales y proyectos de ingeniería avanzada.'
              : 'Available for full-time engineering roles, international remote positions, and high-impact software projects.'}
          </p>
        </div>

        {/* Heroic Centered Email Copier & Direct Action Channels */}
        <div className="max-w-3xl mx-auto mb-14">
          {/* 1-Click Interactive Email Capsule */}
          <div className="glass-panel-card bg-[#09090f]/75 border border-white/[0.08] backdrop-blur-xl hover:border-[#2EE6A0]/40 transition-all duration-300 p-6 sm:p-9 rounded-3xl text-center relative overflow-hidden group">
            {/* Subtle top card accent glow on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EE6A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-3">
              {language === 'es' ? 'CANAL DIRECTO // CORREO OFICIAL' : 'DIRECT CHANNEL // OFFICIAL EMAIL'}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight mb-6 select-all break-all">
              {PERSONAL_INFO.email}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl bg-[#2EE6A0] hover:bg-[#26c589] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(46,230,160,0.35)] active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'es' ? '¡Copiado con Éxito!' : 'Copied to Clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{language === 'es' ? 'Copiar Email en 1 Clic' : 'Copy Email in 1 Click'}</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] text-white text-xs font-mono transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#00F0FF]" />
                <span>{language === 'es' ? 'Abrir en Correo' : 'Open Email Client'}</span>
              </a>
            </div>
          </div>

          {/* Quick Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.phoneClean}?text=${encodeURIComponent(
                language === 'es'
                  ? 'Hola Yerson, vi tu portafolio y me interesa tu perfil para una vacante.'
                  : 'Hello Yerson, I reviewed your portfolio and would like to talk about an opportunity.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-card p-4 rounded-2xl border border-white/[0.08] hover:border-[#2EE6A0]/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#2EE6A0]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">WhatsApp</div>
                  <div className="text-[11px] font-mono text-neutral-400">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-card p-4 rounded-2xl border border-white/[0.08] hover:border-[#00F0FF]/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#00F0FF]">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[11px] font-mono text-neutral-400">/in/yerson-rodriguez</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-card p-4 rounded-2xl border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">GitHub</div>
                  <div className="text-[11px] font-mono text-neutral-400">@jyersonrp</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Location & Timezone info */}
          <div className="mt-3.5 p-3.5 rounded-2xl bg-[#09090d] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#2EE6A0]" />
              <span>Maturín, Venezuela</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{language === 'es' ? 'Zona Horaria: UTC-4 (AST)' : 'Timezone: UTC-4 (AST)'}</span>
            </div>
          </div>
        </div>

        {/* Centered Direct Message Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-panel-card bg-[#09090f]/75 border border-white/[0.08] backdrop-blur-xl hover:border-[#2EE6A0]/30 transition-all duration-300 p-8 sm:p-10 rounded-3xl relative overflow-hidden">
            {/* Subtle top card accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EE6A0]/40 to-transparent opacity-50 pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight mb-2 text-center">
              {language === 'es' ? 'Enviar un Mensaje Directo' : 'Send a Direct Message'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-8 font-light text-center">
              {language === 'es'
                ? 'Completa el formulario y te responderé en menos de 24 horas hábiles.'
                : 'Fill in the form and I will get back to you within 24 business hours.'}
            </p>

            {formSubmitted ? (
              <div className="py-10 px-6 sm:px-8 text-center space-y-5 bg-[#2EE6A0]/[0.06] border border-[#2EE6A0]/25 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-[#2EE6A0]/20 text-[#2EE6A0] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(46,230,160,0.3)]">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {language === 'es' ? '¡Mensaje Preparado con Éxito!' : 'Message Prepared Successfully!'}
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed font-light">
                    {language === 'es'
                      ? 'Se ha intentado abrir tu cliente de correo predeterminado. También puedes despacharlo de inmediato vía WhatsApp o copiar el texto:'
                      : 'We attempted to open your mail client. You can also send directly via WhatsApp or copy the prepared message:'}
                  </p>
                </div>

                {/* Direct Action Capsules */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2EE6A0] text-black font-semibold text-xs hover:bg-[#26c589] transition-all shadow-[0_0_20px_rgba(46,230,160,0.3)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{language === 'es' ? 'Abrir en Correo' : 'Open in Email'}</span>
                  </a>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#2EE6A0]/40 text-white text-xs font-medium transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2EE6A0]" />
                    <span>{language === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}</span>
                  </a>

                  <button
                    onClick={handleCopyFormattedMessage}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-all"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2EE6A0]" />
                        <span className="text-[#2EE6A0]">{language === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>{language === 'es' ? 'Copiar Texto' : 'Copy Text'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-mono transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'es' ? 'Redactar otro mensaje' : 'Compose another message'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">
                      {language === 'es' ? 'Nombre o Empresa *' : 'Name or Company *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'es' ? 'Ej. Ana Gómez / TechCorp' : 'e.g. Jane Doe / TechCorp'}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">
                      {language === 'es' ? 'Correo de Contacto *' : 'Your Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2">
                    {language === 'es' ? 'Motivo del Contacto' : 'Subject / Inquiring About'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#09090d] border border-white/[0.08] text-white focus:outline-none focus:border-[#2EE6A0] transition-colors font-sans"
                  >
                    <option value="opportunity" className="bg-[#09090d] text-white">
                      {language === 'es' ? 'Oferta de Empleo / Rol de Desarrollador' : 'Job Offer / Developer Role'}
                    </option>
                    <option value="freelance" className="bg-[#09090d] text-white">
                      {language === 'es' ? 'Proyecto Freelance / Consultoría' : 'Freelance Project / Consulting'}
                    </option>
                    <option value="odoo" className="bg-[#09090d] text-white">
                      {language === 'es' ? 'Implementación Odoo ERP / WhatsApp' : 'Odoo ERP / WhatsApp Implementation'}
                    </option>
                    <option value="other" className="bg-[#09090d] text-white">
                      {language === 'es' ? 'Otro Asunto' : 'Other Inquiries'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2">
                    {language === 'es' ? 'Mensaje o Detalles del Proyecto *' : 'Message or Project Details *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Cuéntame sobre la posición, requerimientos técnicos o visión del proyecto...'
                        : 'Tell me about the open position, technical stack, or project vision...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#2EE6A0] hover:bg-[#26c589] text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(46,230,160,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'es' ? 'Enviar Mensaje Ahora' : 'Send Message Now'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
