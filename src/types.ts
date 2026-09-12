export type Language = 'es' | 'en';

export interface ProjectMetric {
  label: { es: string; en: string };
  value: string;
}

export interface Project {
  id: string;
  title: { es: string; en: string };
  tagline: { es: string; en: string };
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  architecture: string[];
  metrics: ProjectMetric[];
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  featured: boolean;
  type: 'nvr' | 'odoo' | 'bot' | 'ml' | 'web';
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export interface ExperienceItem {
  period: { es: string; en: string };
  role: { es: string; en: string };
  company: { es: string; en: string };
  location: { es: string; en: string };
  description: { es: string; en: string };
  achievements: { es: string[]; en: string[] };
  skills: string[];
}

export interface EducationItem {
  degree: { es: string; en: string };
  institution: string;
  period: string;
  details: { es: string; en: string };
  badge?: string;
}

export interface CertificationItem {
  name: { es: string; en: string };
  issuer: string;
  year: string;
  skills: string[];
}

export interface SkillCategory {
  title: { es: string; en: string };
  description: { es: string; en: string };
  skills: {
    name: string;
    level: string; // e.g. "Avanzado" / "Advanced" or percentage/years
    highlight?: boolean;
  }[];
}
