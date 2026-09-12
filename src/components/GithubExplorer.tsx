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

interface GithubExplorerProps {
  language: Language;
}

export const GithubExplorer: React.FC<GithubExplorerProps> = ({ language }) => {
  const [repos, setRepos] = useState<GithubRepo[]>(FALLBACK_REPOS as GithubRepo[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isLiveApi, setIsLiveApi] = useState(false);

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
        setRepos(data);
        setIsLiveApi(true);
      } else {
        setRepos(FALLBACK_REPOS as GithubRepo[]);
        setIsLiveApi(false);
      }
    } catch (err) {
      console.warn('Using offline fallback repos:', err);
      setRepos(FALLBACK_REPOS as GithubRepo[]);
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  // Filter repos
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLang =
      selectedLanguage === 'all' ||
      (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());

    return matchesSearch && matchesLang;
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
        return '#2EE6A0';
    }
  };

  return (
    <section id="repos" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Explorador de Código' : 'Code Explorer'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
              {language === 'es' ? (
                <>
                  Repositorios de <span className="font-serif italic font-normal text-[#00F0FF]">GitHub</span> en Vivo.
                </>
              ) : (
                <>
                  Live <span className="font-serif italic font-normal text-[#00F0FF]">GitHub</span> Repositories.
                </>
              )}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
              {language === 'es'
                ? 'Conectado a la API oficial de GitHub de @jyersonrp con fallback offline verificado.'
                : 'Direct connection to @jyersonrp GitHub API with resilient offline fallback.'}
            </p>
          </div>

          {/* Live indicator & reload */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLiveApi ? 'bg-[#2EE6A0] animate-pulse' : 'bg-amber-400'
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
              className="p-2 rounded-full glass-panel hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>@jyersonrp</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                language === 'es'
                  ? 'Buscar por nombre, tecnología o descripción...'
                  : 'Search by repo name, tech, or description...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#2EE6A0] transition-colors"
            />
          </div>

          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                selectedLanguage === 'all'
                  ? 'bg-[#2EE6A0] text-black font-semibold'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {language === 'es' ? 'Todos' : 'All'}
            </button>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedLanguage === lang
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
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

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#2EE6A0]" />
                    <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open repository ${repo.name}`}
                    className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4 min-h-[48px]">
                  {repo.description || (language === 'es' ? 'Sin descripción provista.' : 'No description provided.')}
                </p>
              </div>

              {/* Footer info */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-neutral-500" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2EE6A0] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Code</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-white/10 text-neutral-400 font-mono text-xs">
            {language === 'es'
              ? 'No se encontraron repositorios con ese criterio de búsqueda.'
              : 'No repositories found matching your query.'}
          </div>
        )}
      </div>
    </section>
  );
};
