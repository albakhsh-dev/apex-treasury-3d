/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary, #E11D48)',
          'primary-hover': 'var(--brand-primary-hover, #BE123C)',
          'primary-glow': 'var(--brand-primary-glow, rgba(225, 29, 72, 0.4))',
          secondary: 'var(--brand-secondary, #0F172A)',
          accent: 'var(--brand-accent, #00F0FF)',
          'accent-glow': 'var(--brand-accent-glow, rgba(0, 240, 255, 0.35))',
          bg: 'var(--brand-bg, #08090C)',
          surface: 'var(--brand-surface, #0E1017)',
          glass: 'var(--brand-glass, rgba(14, 16, 23, 0.75))',
          border: 'var(--brand-border, rgba(255, 255, 255, 0.08))',
          'border-hover': 'var(--brand-border-hover, rgba(225, 29, 72, 0.4))',
          text: 'var(--brand-text, #F8FAFC)',
          muted: 'var(--brand-muted, #94A3B8)',
        },
      },
      fontFamily: {
        display: ['Outfit', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'luxury-glow': '0 0 50px -10px var(--brand-primary-glow, rgba(225, 29, 72, 0.4))',
        'accent-glow': '0 0 40px -10px var(--brand-accent-glow, rgba(0, 240, 255, 0.35))',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'floating-dock': '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(225, 29, 72, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.98)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
