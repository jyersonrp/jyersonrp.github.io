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
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
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
    // Reset after 5s
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'opportunity', message: '' });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono uppercase tracking-widest text-[#2EE6A0] mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Contacto & Oportunidades' : 'Get In Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {language === 'es' ? (
              <>
                Construyamos algo <span className="font-serif italic font-normal text-[#2EE6A0]">extraordinario</span> juntos.
              </>
            ) : (
              <>
                Let's build something <span className="font-serif italic font-normal text-[#2EE6A0]">extraordinary</span> together.
              </>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            {language === 'es'
              ? 'Disponible para contrataciones a tiempo completo, roles remotos internacionales y proyectos de ingeniería avanzada.'
              : 'Available for full-time engineering roles, international remote positions, and high-impact software projects.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1-Click Email Copier Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#2EE6A0]/40 transition-all relative overflow-hidden group">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                {language === 'es' ? 'Correo Electrónico Oficial' : 'Official Email'}
              </div>
              <div className="text-xl font-bold text-white font-mono mb-4 break-all">
                {PERSONAL_INFO.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full py-3 px-4 rounded-xl bg-[#2EE6A0] hover:bg-[#26c589] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(46,230,160,0.3)] active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'es' ? '¡Copiado al portapapeles!' : 'Copied to clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{language === 'es' ? 'Copiar Email en 1 Clic' : 'Copy Email in 1 Click'}</span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Direct Card */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.phoneClean}?text=${encodeURIComponent(
                language === 'es'
                  ? 'Hola Yerson, vi tu portafolio y me interesa tu perfil para una vacante.'
                  : 'Hello Yerson, I reviewed your portfolio and would like to talk about an opportunity.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#25D366]/50 transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#25D366]">
                  WhatsApp Business
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-xl font-bold text-white font-mono mb-1">
                {PERSONAL_INFO.phone}
              </div>
              <div className="text-xs text-neutral-400">
                {language === 'es'
                  ? 'Respuesta rápida en minutos por chat o llamada.'
                  : 'Quick direct response via text or voice call.'}
              </div>
            </a>

            {/* LinkedIn & GitHub Links */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#00F0FF]/50 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <LinkedinIcon className="w-5 h-5 text-[#00F0FF]" />
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">LinkedIn</div>
                  <div className="text-[11px] text-neutral-400 font-mono">Conectar red</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/40 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <GithubIcon className="w-5 h-5 text-white" />
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">GitHub</div>
                  <div className="text-[11px] text-neutral-400 font-mono">@jyersonrp</div>
                </div>
              </a>
            </div>

            {/* Location & Timezone info */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2EE6A0]" />
                <span>Maturín, Venezuela</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-4 h-4 text-[#00F0FF]" />
                <span>UTC-4 (AST)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">
                {language === 'es' ? 'Enviar un Mensaje Directo' : 'Send a Direct Message'}
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                {language === 'es'
                  ? 'Completa el formulario y te responderé en menos de 24 horas hábiles.'
                  : 'Fill in the form and I will get back to you within 24 hours.'}
              </p>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3 bg-[#2EE6A0]/10 border border-[#2EE6A0]/30 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-[#2EE6A0]/20 text-[#2EE6A0] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {language === 'es' ? '¡Mensaje Enviado con Éxito!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                    {language === 'es'
                      ? 'Gracias por contactarme. He recibido tu solicitud y te escribiré a tu correo pronto.'
                      : 'Thank you for reaching out. I will respond to your provided email address shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        {language === 'es' ? 'Nombre o Empresa *' : 'Name or Company *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'es' ? 'Ej. Ana Gómez / TechCorp' : 'e.g. Jane Doe / TechCorp'}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        {language === 'es' ? 'Correo de Contacto *' : 'Your Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ejemplo@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      {language === 'es' ? 'Motivo del Contacto' : 'Subject / Inquiring About'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#2EE6A0] transition-colors"
                    >
                      <option value="opportunity" className="bg-[#121218] text-white">
                        {language === 'es' ? 'Oferta de Empleo / Rol de Desarrollador' : 'Job Offer / Developer Role'}
                      </option>
                      <option value="freelance" className="bg-[#121218] text-white">
                        {language === 'es' ? 'Proyecto Freelance / Consultoría' : 'Freelance Project / Consulting'}
                      </option>
                      <option value="odoo" className="bg-[#121218] text-white">
                        {language === 'es' ? 'Implementación Odoo ERP / WhatsApp' : 'Odoo ERP / WhatsApp Implementation'}
                      </option>
                      <option value="other" className="bg-[#121218] text-white">
                        {language === 'es' ? 'Otro Asunto' : 'Other Inquiries'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2EE6A0] to-[#00F0FF] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(46,230,160,0.5)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'es' ? 'Enviar Mensaje Ahora' : 'Send Message Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
