import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0F1A',
        'bg-card': '#111827',
        'bg-card-hover': '#1A2335',
        accent: '#38BDF8',
        amber: '#F59E0B',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#8590A6',
        'border-subtle': '#1E293B',
        // ── Dovetail-flavor tokens (additive, light theme) ──
        'bg-canvas': '#FAFAFA',
        'bg-elevated': '#FFFFFF',
        'bg-muted': '#F4F4F5',
        'ink-primary': '#0A0A0B',
        'ink-secondary': '#52525B',
        'ink-tertiary': '#A1A1AA',
        'border-soft': 'rgba(10, 10, 11, 0.08)',
        'accent-from': '#01C4CC',
        'accent-to': '#7436E5',
        'accent-soft-from': 'rgba(1, 196, 204, 0.12)',
        'accent-soft-to': 'rgba(116, 54, 229, 0.12)',
      },
      fontFamily: {
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
