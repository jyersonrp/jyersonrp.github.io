import { ThemeMode, ColorPalette, PaletteConfig } from '../types';

export const PALETTES: Record<ColorPalette, PaletteConfig> = {
  emerald: {
    id: 'emerald',
    name: { es: 'Cyber Emerald', en: 'Cyber Emerald' },
    primary: '#2EE6A0',
    secondary: '#00F0FF',
    primaryHover: '#26c589',
    glow: 'rgba(46, 230, 160, 0.35)',
    gradient: 'linear-gradient(135deg, #2EE6A0 0%, #00F0FF 100%)',
    dotColorDark: ['#2EE6A0', '#00F0FF', '#E2E8F0', '#94A3B8'],
    dotColorLight: ['#059669', '#0284C7', '#1E293B', '#334155', '#475569'],
  },
  ultraviolet: {
    id: 'ultraviolet',
    name: { es: 'Ultraviolet Pulse', en: 'Ultraviolet Pulse' },
    primary: '#A855F7',
    secondary: '#38BDF8',
    primaryHover: '#9333ea',
    glow: 'rgba(168, 85, 247, 0.35)',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #38BDF8 100%)',
    dotColorDark: ['#A855F7', '#38BDF8', '#E2E8F0', '#C084FC'],
    dotColorLight: ['#7E22CE', '#0284C7', '#1E293B', '#334155', '#475569'],
  },
  amber: {
    id: 'amber',
    name: { es: 'Solar Amber', en: 'Solar Amber' },
    primary: '#F59E0B',
    secondary: '#F97316',
    primaryHover: '#d97706',
    glow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    dotColorDark: ['#F59E0B', '#F97316', '#FEF08A', '#FDBA74'],
    dotColorLight: ['#D97706', '#EA580C', '#1E293B', '#334155', '#475569'],
  },
};

export const THEME_STORAGE_KEY = 'portfolio_theme_mode';
export const PALETTE_STORAGE_KEY = 'portfolio_color_palette';

export const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // fallback
  }
  return 'dark'; // Default: Deep Obsidian
};

export const getInitialColorPalette = (): ColorPalette => {
  if (typeof window === 'undefined') return 'emerald';
  try {
    const saved = localStorage.getItem(PALETTE_STORAGE_KEY) as ColorPalette;
    if (saved === 'emerald' || saved === 'ultraviolet' || saved === 'amber') return saved;
  } catch {
    // fallback
  }
  return 'emerald'; // Default: Cyber Emerald
};

export const applyTheme = (theme: ThemeMode, palette: ColorPalette) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const body = document.body;

  // 1. Toggle Tailwind dark/light classes on <html> and <body>
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    if (body) {
      body.classList.add('dark');
      body.classList.remove('light');
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    if (body) {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }

  // 2. Set dataset attributes for precise CSS selectors
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-palette', palette);

  // 3. Set dynamic CSS custom properties on :root
  const pal = PALETTES[palette] || PALETTES.emerald;
  const isDark = theme === 'dark';

  // In light mode, use calibrated tones for AAA text contrast and clean frosted glass
  const primaryColor = isDark
    ? pal.primary
    : palette === 'emerald'
    ? '#059669'
    : palette === 'ultraviolet'
    ? '#7E22CE'
    : '#D97706';

  const secondaryColor = isDark
    ? pal.secondary
    : palette === 'emerald'
    ? '#0284C7'
    : palette === 'ultraviolet'
    ? '#0284C7'
    : '#EA580C';

  const glowColor = isDark ? pal.glow : pal.glow.replace('0.35', '0.22');
  const glowSecondary = isDark
    ? palette === 'emerald'
      ? 'rgba(0, 240, 255, 0.35)'
      : palette === 'ultraviolet'
      ? 'rgba(56, 189, 248, 0.35)'
      : 'rgba(249, 115, 22, 0.35)'
    : palette === 'emerald'
    ? 'rgba(2, 132, 199, 0.22)'
    : palette === 'ultraviolet'
    ? 'rgba(2, 132, 199, 0.22)'
    : 'rgba(234, 88, 12, 0.22)';

  root.style.setProperty('--accent-primary', primaryColor);
  root.style.setProperty('--accent-secondary', secondaryColor);
  root.style.setProperty('--accent-hover', pal.primaryHover);
  root.style.setProperty('--accent-glow', glowColor);
  root.style.setProperty('--glow-color', glowColor);
  root.style.setProperty('--accent-glow-secondary', glowSecondary);

  root.style.setProperty(
    '--accent-gradient',
    `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
  );

  const midPrimary =
    palette === 'emerald' ? '#34d399' : palette === 'ultraviolet' ? '#c084fc' : '#fbbf24';
  const midSecondary =
    palette === 'emerald' ? '#38bdf8' : palette === 'ultraviolet' ? '#818cf8' : '#fb923c';

  root.style.setProperty(
    '--accent-gradient-primary',
    `linear-gradient(to right, ${primaryColor}, ${midPrimary}, ${secondaryColor})`
  );
  root.style.setProperty(
    '--accent-gradient-secondary',
    `linear-gradient(to right, ${secondaryColor}, ${midSecondary}, ${primaryColor})`
  );

  // Background, card, border & text variables
  if (isDark) {
    root.style.setProperty('--bg-primary', '#070709');
    root.style.setProperty('--bg-secondary', '#0a0a0f');
    root.style.setProperty('--bg-card', 'rgba(9, 9, 15, 0.75)');
    root.style.setProperty('--bg-card-hover', 'rgba(13, 13, 20, 0.85)');
    root.style.setProperty('--border-subtle', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--text-main', '#FFFFFF');
    root.style.setProperty('--text-body', '#E2E8F0');
    root.style.setProperty('--text-muted', '#94A3B8');
  } else {
    root.style.setProperty('--bg-primary', '#F8FAFC');
    root.style.setProperty('--bg-secondary', '#F1F5F9');
    root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.88)');
    root.style.setProperty('--bg-card-hover', 'rgba(255, 255, 255, 0.98)');
    root.style.setProperty('--border-subtle', 'rgba(15, 23, 42, 0.08)');
    root.style.setProperty('--text-main', '#0F172A');
    root.style.setProperty('--text-body', '#334155');
    root.style.setProperty('--text-muted', '#64748B');
  }

  // Persist preferences securely
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(PALETTE_STORAGE_KEY, palette);
  } catch {
    // Ignore storage quota or disabled storage in sandboxed iframes
  }
};

