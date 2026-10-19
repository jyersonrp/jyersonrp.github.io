/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        obsidian: {
          950: '#050507',
          900: '#0a0a0d',
          850: '#101015',
          800: '#16161f',
          750: '#1d1d28',
          700: '#262635',
          600: '#38384a',
        },
        emeraldNeon: {
          DEFAULT: 'rgb(var(--accent-primary-rgb, 46 230 160) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-rgb, 38 197 137) / <alpha-value>)',
          light: 'rgb(var(--accent-primary-rgb, 46 230 160) / <alpha-value>)',
          dark: 'rgb(var(--accent-hover-rgb, 38 197 137) / <alpha-value>)',
          glow: 'var(--accent-glow, rgba(46, 230, 160, 0.25))',
        },
        cyanNeon: {
          DEFAULT: 'rgb(var(--accent-secondary-rgb, 0 240 255) / <alpha-value>)',
          hover: 'rgb(var(--accent-secondary-rgb, 0 240 255) / <alpha-value>)',
          light: 'rgb(var(--accent-secondary-rgb, 0 240 255) / <alpha-value>)',
          glow: 'var(--accent-glow-secondary, rgba(0, 240, 255, 0.25))',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: 0.4, filter: 'blur(20px)' },
          '100%': { opacity: 0.8, filter: 'blur(30px)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities, e }) {
      const vars = [
        { token: '--accent-primary', rgbVar: '--accent-primary-rgb', fallback: '46 230 160' },
        { token: '--accent-secondary', rgbVar: '--accent-secondary-rgb', fallback: '0 240 255' },
      ];
      const intSteps = [5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90, 95];
      const decSteps = [0.03, 0.035, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.12, 0.15, 0.2];
      const utilities = {};

      const registerStep = (token, rgbVar, fallback, suffix, alpha) => {
        const colorVal = `rgb(var(${rgbVar}, ${fallback}) / ${alpha})`;
        utilities[`.${e(`bg-[var(${token})]/${suffix}`)}`] = { backgroundColor: colorVal };
        utilities[`.${e(`text-[var(${token})]/${suffix}`)}`] = { color: colorVal };
        utilities[`.${e(`border-[var(${token})]/${suffix}`)}`] = { borderColor: colorVal };
        utilities[`.${e(`ring-[var(${token})]/${suffix}`)}`] = { '--tw-ring-color': colorVal };
        utilities[`.${e(`from-[var(${token})]/${suffix}`)}`] = {
          '--tw-gradient-from': `${colorVal} var(--tw-gradient-from-position)`,
          '--tw-gradient-to': 'rgb(255 255 255 / 0) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
        };
        utilities[`.${e(`via-[var(${token})]/${suffix}`)}`] = {
          '--tw-gradient-to': 'rgb(255 255 255 / 0) var(--tw-gradient-to-position)',
          '--tw-gradient-stops': `var(--tw-gradient-from), ${colorVal} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
        };
        utilities[`.${e(`to-[var(${token})]/${suffix}`)}`] = {
          '--tw-gradient-to': `${colorVal} var(--tw-gradient-to-position)`,
        };
      };

      for (const { token, rgbVar, fallback } of vars) {
        for (const step of intSteps) {
          registerStep(token, rgbVar, fallback, `${step}`, step / 100);
        }
        for (const dec of decSteps) {
          registerStep(token, rgbVar, fallback, `[${dec}]`, dec);
        }
      }
      addUtilities(utilities);
    },
  ],
}
