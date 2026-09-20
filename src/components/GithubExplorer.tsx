import React, { useState, useEffect } from 'react';
import { FALLBACK_REPOS, PERSONAL_INFO } from '../data/portfolioData';
import { GithubRepo, Language } from '../types';
import {
  Star,
  GitFork,
  Search,
  ExternalLink,
  Code,
  RefreshCw,
  Clock,
  Sparkles,
  FolderGit2
} from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { getTechSkillMeta } from './icons/TechIcons';

interface GithubExplorerProps {
  language: Language;
}

const isAllowedRepo = (repoName: string) => {
  const lower = repoName.toLowerCase();
  return (
    lower !== 'jyersonrp' &&
    !lower.includes('fastapi-microservices') &&
    !lower.includes('python-data-structures')
  );
};

const REPO_TITLES: Record<string, { es: string; en: string; primaryTech: string }> = {
  'proyecto-videovigilancia-inteligente': {
    es: 'NVR Inteligente & Visión Artificial',
    en: 'Smart AI NVR & Computer Vision',
    primaryTech: 'OpenCV'
  },
  'odoo-whatsapp-chatter-meta': {
    es: 'Odoo ERP — WhatsApp Cloud API',
    en: 'Odoo ERP — WhatsApp Cloud API',
    primaryTech: 'Odoo ERP'
  },
  'WhatsBot-GlamNails': {
    es: 'WhatsBot CRM — FSM & Concurrencia',
    en: 'WhatsBot CRM — FSM & Concurrency',
    primaryTech: 'TypeScript'
  },
  'docaudit-ai': {
    es: 'DocAudit AI — Auditoría Inteligente & RAG',
    en: 'DocAudit AI — Enterprise RAG & Risk Engine',
    primaryTech: 'FastAPI'
  },
  'jyersonrp.github.io': {
    es: 'Portafolio de Ingeniería & Experiencia Interactiva',
    en: 'Engineering Portfolio — Interactive 3D & UI/UX',
    primaryTech: 'React'
  }
};

const REPO_DESCRIPTIONS: Record<string, { es: string; en: string }> = {
  'proyecto-videovigilancia-inteligente': {
    es: 'Sistema NVR inteligente modular con IA, streaming MJPEG de ultrabaja latencia, detección híbrida (OpenCV MOG2 + YOLOv8 ONNX), modo ECO con FPS adaptativo y dashboard FastAPI.',
    en: 'Modular smart NVR system with AI, ultra-low latency MJPEG streaming, hybrid detection (OpenCV MOG2 + YOLOv8 ONNX), adaptive FPS ECO mode, and FastAPI dashboard.'
  },
  'odoo-whatsapp-chatter-meta': {
    es: 'Módulo nativo para Odoo ERP conectado a WhatsApp Cloud API oficial de Meta. Despacho de facturas en RAM y webhook seguro con HMAC-SHA256.',
    en: "Native Odoo ERP module integrated with Meta's official WhatsApp Cloud API. In-memory invoice dispatch and secure HMAC-SHA256 signature webhook."
  },
  'WhatsBot-GlamNails': {
    es: 'Bot automatizado de citas y atención al cliente para salón Glam Nails Maturín vía WhatsApp con TypeScript, FSM y persistencia en base de datos.',
    en: 'Automated booking & customer service WhatsApp bot for Glam Nails Maturín salon with TypeScript, FSM architecture, and PostgreSQL persistence.'
  },
  'docaudit-ai': {
    es: 'Motor RAG asíncrono para extracción de riesgos legales y normativos con esquemas estrictos Pydantic v2, factoría Multi-Provider LLM y reportes ReportLab PDF.',
    en: 'Enterprise asynchronous document intelligence and risk audit engine built with FastAPI, Pydantic v2, React, and hybrid RAG retrieval.'
  },
  'jyersonrp.github.io': {
    es: 'Portafolio profesional de alto impacto con React 18, TypeScript, Tailwind CSS, animaciones interactivas, paleta de comandos y diseño editorial obsidian.',
    en: 'Official engineering portfolio of Yerson Rodríguez — Full-Stack & Python Developer specializing in Odoo ERP, FastAPI backends, AI & Computer Vision.'
  }
};

const TOPIC_DISPLAY_NAMES: Record<string, string> = {
  fastapi: 'FastAPI',
  opencv: 'OpenCV',
  yolov8: 'YOLOv8',
  onnx: 'ONNX',
  nvr: 'NVR',
  'computer-vision': 'Vision',
  odoo: 'Odoo ERP',
  'whatsapp-cloud-api': 'WhatsApp API',
  meta: 'Meta',
  hmac: 'HMAC',
  erp: 'ERP',
  python: 'Python',
  typescript: 'TypeScript',
  fsm: 'FSM',
  whatsapp: 'WhatsApp',
  postgresql: 'PostgreSQL',
  crm: 'CRM',
  hono: 'Hono',
  rag: 'RAG',
  pydantic: 'Pydantic',
  llm: 'LLM',
  'document-intelligence': 'DocAI',
  reportlab: 'ReportLab',
  react: 'React',
  tailwindcss: 'Tailwind CSS',
  vite: 'Vite',
  portfolio: 'Portfolio'
};

const formatTopicTag = (topic: string): string => {
  const lower = topic.toLowerCase();
  if (TOPIC_DISPLAY_NAMES[lower]) {
    return TOPIC_DISPLAY_NAMES[lower];
  }
  return topic
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatLanguage = (lang: string | null | undefined): string => {
  if (!lang) return 'Python';
  const lower = lang.toLowerCase();
  if (lower === 'typescript') return 'TypeScript';
  if (lower === 'javascript') return 'JavaScript';
  if (lower === 'python') return 'Python';
  if (lower === 'html') return 'HTML';
  if (lower === 'css') return 'CSS';
  return lang.charAt(0).toUpperCase() + lang.slice(1);
};

export const GithubExplorer: React.FC<GithubExplorerProps> = ({ language }) => {
  const [repos, setRepos] = useState<GithubRepo[]>(
    (FALLBACK_REPOS as GithubRepo[]).filter((r) => isAllowedRepo(r.name))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.github.com/users/jyersonrp/repos?sort=updated&per_page=30');
      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }
      const data: GithubRepo[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // Filter out non-code profile config and uncurated repos
        const softwareRepos = data.filter(
          (repo) => isAllowedRepo(repo.name)
        );

        // Enrich live repos with curated tags & metadata if missing from GitHub API
        const enriched = softwareRepos.map((repo) => {
          const fallbackMatch = (FALLBACK_REPOS as GithubRepo[]).find(
            (fb) => fb.name.toLowerCase() === repo.name.toLowerCase()
          );
          return {
            ...repo,
            language: formatLanguage(repo.language || fallbackMatch?.language || 'Python'),
            description: repo.description || fallbackMatch?.description || '',
            topics:
              repo.topics && repo.topics.length > 0
                ? repo.topics
                : fallbackMatch?.topics || [],
            stargazers_count: repo.stargazers_count || fallbackMatch?.stargazers_count || 0,
            forks_count: repo.forks_count || fallbackMatch?.forks_count || 0
          };
        });

        // Merge additional curated implementations for a rich, balanced portfolio grid
        const existingNames = new Set(enriched.map((r) => r.name.toLowerCase()));
        const additionalCurated = (FALLBACK_REPOS as GithubRepo[]).filter(
          (fb) => !existingNames.has(fb.name.toLowerCase()) && isAllowedRepo(fb.name)
        );

        setRepos([...enriched, ...additionalCurated]);
        setIsLiveApi(true);
      } else {
        setRepos(
          (FALLBACK_REPOS as GithubRepo[]).filter((r) => isAllowedRepo(r.name))
        );
        setIsLiveApi(false);
      }
    } catch (err) {
      console.warn('Using offline fallback repos:', err);
      setRepos(
        (FALLBACK_REPOS as GithubRepo[]).filter((r) => isAllowedRepo(r.name))
      );
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const getRepoDescription = (repo: GithubRepo) => {
    const custom = REPO_DESCRIPTIONS[repo.name];
    if (custom) {
      return custom[language];
    }
    return repo.description || (language === 'es' ? 'Sin descripción provista.' : 'No description provided.');
  };

  const getRepoTitle = (repo: GithubRepo) => {
    const custom = REPO_TITLES[repo.name];
    if (custom) {
      return custom[language];
    }
    return repo.name
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getRepoPrimaryTech = (repo: GithubRepo) => {
    const custom = REPO_TITLES[repo.name];
    if (custom?.primaryTech) {
      return custom.primaryTech;
    }
    return repo.language || 'Python';
  };

  // Filter & sort repos
  const filteredRepos = repos
    .filter((repo) => {
      const desc = getRepoDescription(repo).toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.includes(searchTerm.toLowerCase());

      const matchesLang =
        selectedLanguage === 'all' ||
        (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());

      return matchesSearch && matchesLang;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      }
      return new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime();
    });

  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ) as string[];

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'python':
        return '#3572A5';
      case 'typescript':
        return '#3178C6';
      case 'javascript':
        return '#F7DF1E';
      case 'html':
        return '#E34F26';
      default:
        return 'var(--accent-primary)';
    }
  };

  return (
    <section id="repos" className="scroll-mt-28 sm:scroll-mt-32 pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-[var(--accent-secondary)]/[0.035] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-cyanNeon uppercase font-semibold">
                03 / {language === 'es' ? 'REPOSITORIOS GITHUB' : 'GITHUB REPOSITORIES'}
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-cyanNeon/40 to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              {language === 'es' ? (
                <>
                  Repositorios de <span className="editorial-accent-cyan">código abierto</span> en vivo.
                </>
              ) : (
                <>
                  Live <span className="editorial-accent-cyan">open source</span> repositories.
                </>
              )}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-neutral-400 text-base sm:text-lg max-w-xl font-normal dark:font-light leading-relaxed">
              {language === 'es'
                ? 'Conectado a la API oficial de GitHub de @jyersonrp con fallback offline verificado.'
                : 'Direct connection to @jyersonrp GitHub API with resilient offline fallback.'}
            </p>
          </div>

          {/* Live indicator & reload */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-neutral-300">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLiveApi ? 'bg-emeraldNeon animate-pulse shadow-[0_0_8px_var(--accent-glow)]' : 'bg-amber-400'
                }`}
              />
              <span>
                {isLiveApi
                  ? language === 'es'
                    ? 'API en vivo'
                    : 'Live API sync'
                  : language === 'es'
                  ? 'Modo Resiliente'
                  : 'Cached Mode'}
              </span>
            </div>

            <button
              onClick={fetchRepos}
              disabled={loading}
              title={language === 'es' ? 'Sincronizar repositorios' : 'Sync repos'}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-600 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyanNeon' : ''}`} />
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] text-xs font-mono text-slate-900 dark:text-white flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>@jyersonrp</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/[0.08] mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:shadow-none">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                language === 'es'
                  ? 'Buscar por nombre, tecnología o descripción...'
                  : 'Search by repo name, tech, or description...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/[0.08] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyanNeon transition-colors"
            />
          </div>

          {/* Language and Sort filter pills */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Sort Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.03] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
              <button
                onClick={() => setSortBy('updated')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  sortBy === 'updated'
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-semibold shadow-sm dark:shadow-none'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={language === 'es' ? 'Más recientes' : 'Recently updated'}
              >
                {language === 'es' ? 'Recientes' : 'Recent'}
              </button>
              <button
                onClick={() => setSortBy('stars')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  sortBy === 'stars'
                    ? 'bg-amber-400/20 text-amber-600 dark:text-amber-300 font-semibold border border-amber-400/30'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={language === 'es' ? 'Más estrellas' : 'Most stars'}
              >
                <Star className="w-3 h-3 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                <span>Stars</span>
              </button>
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedLanguage('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors ${
                  selectedLanguage === 'all'
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-semibold shadow-md'
                    : 'bg-slate-100 dark:bg-white/[0.03] text-slate-800 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/[0.08]'
                }`}
              >
                {language === 'es' ? 'Todos' : 'All'}
              </button>
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedLanguage === lang
                      ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-semibold shadow-md'
                      : 'bg-slate-100 dark:bg-white/[0.03] text-slate-800 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/[0.08]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  />
                  <span>{lang}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Repos Grid - Balanced 3-Column Layout for Curated Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => {
            const primaryTech = getRepoPrimaryTech(repo);
            const techMeta = getTechSkillMeta(primaryTech);
            const TechIcon = techMeta.icon;

            return (
              <div
                key={repo.id}
                className="glass-panel-card group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden border border-slate-200 dark:border-white/[0.09] hover:border-cyanNeon/40 backdrop-blur-2xl shadow-[0_15px_35px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_35px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-12px_var(--accent-glow-secondary)] hover:-translate-y-1.5 h-full"
              >
                {/* Holographic light sweep sheen */}
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none -skew-x-12" />

                {/* Top edge iridescent accent line matching tech brand */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, transparent, ${techMeta.brandColor}, transparent)`
                  }}
                />

                {/* Ambient radial glow inside card on hover */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-20"
                  style={{ backgroundColor: techMeta.brandColor }}
                />

                {/* Micro-security grid background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                <div>
                  {/* Card Header: Tech Icon Tile + Title & Slug + External Link */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Tech Icon Tile */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0"
                        style={{
                          backgroundColor: `${techMeta.brandColor}15`,
                          borderColor: `${techMeta.brandColor}40`,
                          boxShadow: `0 0 16px ${techMeta.glowColor}`
                        }}
                      >
                        <TechIcon className="w-5 h-5" style={{ color: techMeta.brandColor }} />
                      </div>

                      {/* Title & Full Slug */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-sans font-bold text-slate-900 dark:text-white group-hover:text-cyanNeon transition-colors leading-snug line-clamp-2">
                          {getRepoTitle(repo)}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-neutral-400 mt-1">
                          <FolderGit2 className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 shrink-0" />
                          <span className="text-slate-600 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-neutral-200 transition-colors truncate">
                            {repo.full_name || `jyersonrp/${repo.name}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* External Link Icon */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open repository ${repo.name}`}
                      className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-all shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-xs sm:text-[13px] text-slate-700 dark:text-neutral-300 line-clamp-3 leading-relaxed my-4 min-h-[52px] font-normal dark:font-light">
                    {getRepoDescription(repo)}
                  </p>

                  {/* Topics Tags with glowing cyan micro-dot */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-1.5 mb-5 min-h-[28px]">
                      {repo.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-white/[0.03] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.07] group-hover:border-slate-300 dark:group-hover:border-white/[0.12] hover:border-[#00F0FF]/50 hover:text-[#00F0FF] hover:bg-[#00F0FF]/[0.04] transition-all"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: '#00F0FF',
                              boxShadow: '0 0 6px rgba(0, 240, 255, 0.7)'
                            }}
                          />
                          <span>{formatTopicTag(topic)}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metrics & Action Button */}
                <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400 gap-2 flex-wrap">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* Language Badge */}
                    {repo.language && (
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-sans font-semibold text-slate-700 dark:text-neutral-200">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: getLanguageColor(repo.language),
                            boxShadow: `0 0 6px ${getLanguageColor(repo.language)}`
                          }}
                        />
                        <span>{formatLanguage(repo.language)}</span>
                      </span>
                    )}

                    {/* Stars Badge with Gold Glow */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/[0.08] border border-amber-400/20 text-amber-600 dark:text-amber-300 text-[11px] font-mono font-medium shadow-[0_0_8px_rgba(251,191,36,0.12)]">
                      <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>

                    {/* Forks Badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 text-[11px] font-mono">
                      <GitFork className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>

                  {/* Interactive Button */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)] text-[var(--accent-primary)] hover:text-black border border-[var(--accent-primary)]/25 hover:border-[var(--accent-primary)] text-xs font-mono font-semibold transition-all duration-200 shadow-[0_0_12px_var(--accent-glow)] hover:shadow-[0_0_20px_var(--accent-glow)] hover:scale-[1.02]"
                  >
                    <span>{language === 'es' ? 'Ver Código' : 'View Code'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#09090d] rounded-3xl border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-neutral-400 font-mono text-xs">
            {language === 'es'
              ? 'No se encontraron repositorios con ese criterio de búsqueda.'
              : 'No repositories found matching your query.'}
          </div>
        )}
      </div>
    </section>
  );
};
