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
        'neon-blue': '#00d4ff',
        'neon-purple': '#b44ffd',
        'neon-cyan': '#00fff5',
        'neon-pink': '#ff2d78',
        'dark-bg': '#050816',
        'dark-surface': '#0a0f1e',
        'dark-card': '#0d1427',
        'dark-border': '#1a2a4a',
        'glass': 'rgba(13,20,39,0.7)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00d4ff 0%, #b44ffd 50%, #00fff5 100%)',
        'gradient-dark': 'linear-gradient(135deg, #050816 0%, #0a0f1e 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(180,79,253,0.05) 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)',
        'neon-purple': '0 0 20px rgba(180,79,253,0.5), 0 0 40px rgba(180,79,253,0.2)',
        'neon-cyan': '0 0 20px rgba(0,255,245,0.5), 0 0 40px rgba(0,255,245,0.2)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 30px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.7s step-end infinite',
        'slide-up': 'slide-up 0.7s ease-out',
        'slide-in-left': 'slide-in-left 0.7s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
