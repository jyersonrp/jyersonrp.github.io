/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
          DEFAULT: '#2EE6A0',
          hover: '#26c589',
          light: '#65f1ba',
          dark: '#1ea672',
          glow: 'rgba(46, 230, 160, 0.25)',
        },
        cyanNeon: {
          DEFAULT: '#00F0FF',
          hover: '#00cbe0',
          light: '#64f6ff',
          glow: 'rgba(0, 240, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
  plugins: [],
}
