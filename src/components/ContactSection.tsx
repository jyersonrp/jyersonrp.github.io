import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types';
import { playSound } from '../utils/audioSystem';
import {
  sanitizeInput,
  validateEmail,
  checkRateLimit,
  getPublicEmail
} from '../utils/security';
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
  RotateCcw,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const publicEmail = getPublicEmail();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'opportunity',
    message: ''
  });

  const handleCopyEmail = () => {
    playSound('success');
    navigator.clipboard.writeText(publicEmail);
    setCopied(true);

    // Trigger subtle confetti celebration
    try {
      const pCol = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#2EE6A0';
      const sCol = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary').trim() || '#00F0FF';
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: [pCol, sCol, '#ffffff']
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
    setSecurityError(null);

    // Anti-bot honeypot detection
    if (honeypot.trim().length > 0) {
      // Drop bot submission silently and display faux success
      setFormSubmitted(true);
      return;
    }

    // Strict input sanitization and boundary checks (disallow CRLF on single-line inputs)
    const sanitizedName = sanitizeInput(formData.name, 80, false);
    const sanitizedEmail = sanitizeInput(formData.email, 100, false);
    const sanitizedMessage = sanitizeInput(formData.message, 2000, true);
    const allowedSubjects = ['opportunity', 'freelance', 'odoo', 'other'];
    const sanitizedSubject = allowedSubjects.includes(formData.subject) ? formData.subject : 'other';

    if (sanitizedName.length < 2) {
      playSound('close');
      setSecurityError(
        language === 'es'
          ? 'Por favor ingresa un nombre o empresa válido (mínimo 2 caracteres).'
          : 'Please enter a valid name or company (minimum 2 characters).'
      );
      return;
    }

    const emailCheck = validateEmail(sanitizedEmail);
    if (!emailCheck.isValid) {
      playSound('close');
      setSecurityError(
        language === 'es'
          ? 'Por favor ingresa una dirección de correo electrónico válida.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    if (sanitizedMessage.length < 5) {
      playSound('close');
      setSecurityError(
        language === 'es'
          ? 'Por favor ingresa un mensaje más detallado (mínimo 5 caracteres).'
          : 'Please enter a more detailed message (minimum 5 characters).'
      );
      return;
    }

    // In-memory rate limiting check (3 submissions per 40s) - only consumed on valid submissions
    const rateLimit = checkRateLimit('contact_form_submit', 3, 40000);
    if (!rateLimit.allowed) {
      playSound('close');
      setSecurityError(
        language === 'es'
          ? `Límite de envíos alcanzado por seguridad. Por favor espera ${rateLimit.retryAfterSeconds} segundos antes de enviar otro mensaje.`
          : `Submission rate limit exceeded for security. Please wait ${rateLimit.retryAfterSeconds} seconds before sending another message.`
      );
      return;
    }

    // Store sanitized data
    setFormData({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage
    });

    playSound('success');
    setFormSubmitted(true);

    // Trigger subtle celebratory confetti
    try {
      const pCol = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#2EE6A0';
      const sCol = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary').trim() || '#00F0FF';
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: [pCol, sCol, '#ffffff']
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

    const subjectText = `[Portfolio] ${subjectMap[sanitizedSubject] || sanitizedSubject}: ${sanitizedName}`;
    const bodyText = `Hola Yerson,\n\nNombre / Empresa: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMensaje:\n${sanitizedMessage}`;
    const mailtoUrl = `mailto:${publicEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mailto link error:', err);
    }
  };

  const handleCopyFormattedMessage = () => {
    playSound('success');
    const sName = sanitizeInput(formData.name, 80, false);
    const sEmail = sanitizeInput(formData.email, 100, false);
    const sMsg = sanitizeInput(formData.message, 2000, true);
    const formatted = `Nombre / Empresa: ${sName}\nEmail: ${sEmail}\nAsunto: ${formData.subject}\nMensaje:\n${sMsg}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const getWhatsAppLink = () => {
    const sName = sanitizeInput(formData.name, 80, false);
    const sEmail = sanitizeInput(formData.email, 100, false);
    const sMsg = sanitizeInput(formData.message, 2000, true);
    const text = encodeURIComponent(
      language === 'es'
        ? `Hola Yerson, te contacto desde tu portafolio:\n\n*Nombre:* ${sName}\n*Email:* ${sEmail}\n\n*Mensaje:* ${sMsg}`
        : `Hello Yerson, reaching out from your portfolio:\n\n*Name:* ${sName}\n*Email:* ${sEmail}\n\n*Message:* ${sMsg}`
    );
    return `https://wa.me/${PERSONAL_INFO.phoneClean}?text=${text}`;
  };

  const getMailtoLink = () => {
    const sName = sanitizeInput(formData.name, 80, false) || 'Contacto Web';
    const sEmail = sanitizeInput(formData.email, 100, false);
    const sMsg = sanitizeInput(formData.message, 2000, true);
    const subjectText = `[Portfolio] Consulta: ${sName}`;
    const bodyText = `Nombre / Empresa: ${sName}\nEmail: ${sEmail}\n\nMensaje:\n${sMsg}`;
    return `mailto:${publicEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: 'opportunity', message: '' });
    setHoneypot('');
    setSecurityError(null);
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent-primary)]/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-[var(--accent-primary)]/50 to-transparent" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent-primary)] uppercase font-semibold">
              06 / {language === 'es' ? 'CONTACTO & CONTRATACIÓN' : 'GET IN TOUCH & HIRE'}
            </span>
            <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-[var(--accent-primary)]/50 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
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
          <p className="mt-4 text-slate-600 dark:text-neutral-400 text-base sm:text-lg font-normal dark:font-light leading-relaxed">
            {language === 'es'
              ? 'Disponible para contrataciones a tiempo completo, roles remotos internacionales y proyectos de ingeniería avanzada.'
              : 'Available for full-time engineering roles, international remote positions, and high-impact software projects.'}
          </p>
        </div>

        {/* Heroic Centered Email Copier & Direct Action Channels */}
        <div className="max-w-3xl mx-auto mb-14">
          {/* 1-Click Interactive Email Capsule */}
          <div className="glass-panel-card border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl hover:border-emeraldNeon/40 transition-all duration-300 p-6 sm:p-9 rounded-3xl text-center relative overflow-hidden group shadow-[0_12px_35px_-12px_rgba(0,0,0,0.06)] dark:shadow-none">
            {/* Subtle top card accent glow on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emeraldNeon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-neutral-400 mb-3 font-medium">
              {language === 'es' ? 'CANAL DIRECTO // CORREO OFICIAL' : 'DIRECT CHANNEL // OFFICIAL EMAIL'}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-slate-900 dark:text-white tracking-tight mb-6 select-all break-all">
              {publicEmail}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl bg-emeraldNeon hover:bg-emeraldNeon-hover text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_var(--accent-glow)] active:scale-95"
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
                href={`mailto:${publicEmail}`}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] hover:border-slate-400 dark:hover:border-white/[0.2] text-slate-900 dark:text-white text-xs font-mono transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyanNeon" />
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
              className="glass-panel-card p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-emeraldNeon/40 transition-all flex items-center justify-between group shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] dark:shadow-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-emeraldNeon">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-card p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-cyanNeon/40 transition-all flex items-center justify-between group shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] dark:shadow-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-cyanNeon">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">/in/yerson-rodriguez</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-card p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.2] transition-all flex items-center justify-between group shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] dark:shadow-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">GitHub</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">@jyersonrp</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Location & Timezone info */}
          <div className="mt-3.5 p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emeraldNeon" />
              <span className="text-slate-700 dark:text-neutral-300">Maturín, Venezuela</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-cyanNeon" />
              <span>{language === 'es' ? 'Zona Horaria: UTC-4 (AST)' : 'Timezone: UTC-4 (AST)'}</span>
            </div>
          </div>
        </div>

        {/* Centered Direct Message Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-panel-card border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl hover:border-emeraldNeon/30 transition-all duration-300 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-[0_12px_35px_-12px_rgba(0,0,0,0.06)] dark:shadow-none">
            {/* Subtle top card accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emeraldNeon/40 to-transparent opacity-50 pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white tracking-tight mb-2 text-center">
              {language === 'es' ? 'Enviar un Mensaje Directo' : 'Send a Direct Message'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mb-8 font-normal dark:font-light text-center">
              {language === 'es'
                ? 'Completa el formulario y te responderé en menos de 24 horas hábiles.'
                : 'Fill in the form and I will get back to you within 24 business hours.'}
            </p>

            {formSubmitted ? (
              <div className="py-10 px-6 sm:px-8 text-center space-y-5 bg-emeraldNeon/[0.06] border border-emeraldNeon/25 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emeraldNeon/20 text-emeraldNeon flex items-center justify-center mx-auto shadow-[0_0_20px_var(--accent-glow)]">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {language === 'es' ? '¡Mensaje Preparado con Éxito!' : 'Message Prepared Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed font-normal dark:font-light">
                    {language === 'es'
                      ? 'Se ha intentado abrir tu cliente de correo predeterminado. También puedes despacharlo de inmediato vía WhatsApp o copiar el texto:'
                      : 'We attempted to open your mail client. You can also send directly via WhatsApp or copy the prepared message:'}
                  </p>
                </div>

                {/* Direct Action Capsules */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emeraldNeon text-black font-semibold text-xs hover:bg-emeraldNeon-hover transition-all shadow-[0_0_20px_var(--accent-glow)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{language === 'es' ? 'Abrir en Correo' : 'Open in Email'}</span>
                  </a>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-300 dark:border-white/[0.1] hover:border-slate-400 dark:hover:border-emeraldNeon/40 text-slate-900 dark:text-white text-xs font-medium transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emeraldNeon" />
                    <span>{language === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}</span>
                  </a>

                  <button
                    onClick={handleCopyFormattedMessage}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.08] text-slate-700 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white text-xs font-mono transition-all"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emeraldNeon" />
                        <span className="text-emeraldNeon">{language === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyanNeon" />
                        <span>{language === 'es' ? 'Copiar Texto' : 'Copy Text'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08]">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white font-mono transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'es' ? 'Redactar otro mensaje' : 'Compose another message'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 text-xs sm:text-sm">
                {/* Anti-spam Bot Honeypot field (hidden from legitimate humans) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}>
                  <label htmlFor="company_website_url_hp">Leave this empty</label>
                  <input
                    id="company_website_url_hp"
                    type="text"
                    name="_hp_company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Security Error Banner */}
                {securityError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{securityError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-neutral-400 mb-2 font-medium">
                      {language === 'es' ? 'Nombre o Empresa *' : 'Name or Company *'}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={formData.name}
                      onChange={(e) => {
                        setSecurityError(null);
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      placeholder={language === 'es' ? 'Ej. Ana Gómez / TechCorp' : 'e.g. Jane Doe / TechCorp'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emeraldNeon transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-neutral-400 mb-2 font-medium">
                      {language === 'es' ? 'Correo de Contacto *' : 'Your Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => {
                        setSecurityError(null);
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      placeholder="ejemplo@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emeraldNeon transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-neutral-400 mb-2 font-medium">
                    {language === 'es' ? 'Motivo del Contacto' : 'Subject / Inquiring About'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#09090d] border border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-emeraldNeon transition-colors font-sans"
                  >
                    <option value="opportunity" className="bg-white dark:bg-[#09090d] text-slate-900 dark:text-white">
                      {language === 'es' ? 'Oferta de Empleo / Rol de Desarrollador' : 'Job Offer / Developer Role'}
                    </option>
                    <option value="freelance" className="bg-white dark:bg-[#09090d] text-slate-900 dark:text-white">
                      {language === 'es' ? 'Proyecto Freelance / Consultoría' : 'Freelance Project / Consulting'}
                    </option>
                    <option value="odoo" className="bg-white dark:bg-[#09090d] text-slate-900 dark:text-white">
                      {language === 'es' ? 'Implementación Odoo ERP / WhatsApp' : 'Odoo ERP / WhatsApp Implementation'}
                    </option>
                    <option value="other" className="bg-white dark:bg-[#09090d] text-slate-900 dark:text-white">
                      {language === 'es' ? 'Otro Asunto' : 'Other Inquiries'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-neutral-400 mb-2 font-medium">
                    {language === 'es' ? 'Mensaje o Detalles del Proyecto *' : 'Message or Project Details *'}
                  </label>
                  <textarea
                    required
                    maxLength={2000}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setSecurityError(null);
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    placeholder={
                      language === 'es'
                        ? 'Cuéntame sobre la posición, requerimientos técnicos o visión del proyecto...'
                        : 'Tell me about the open position, technical stack, or project vision...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emeraldNeon transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emeraldNeon hover:bg-emeraldNeon-hover text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_var(--accent-glow)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'es' ? 'Enviar Mensaje Ahora' : 'Send Message Now'}</span>
                </button>

                {/* Security trust badge */}
                <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-slate-500 dark:text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emeraldNeon" />
                  <span>
                    {language === 'es'
                      ? 'Sanitización estricta de inputs & protección anti-spam en cliente activa'
                      : 'Strict input sanitization & active client-side anti-spam defense'}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
