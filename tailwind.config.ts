import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'glass-bg': "url('/icons/outyn-glass.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        slightFadeIn: {
          '0%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '0',
          },
        },
        expand: {
          '0%': { height: '0px' },
          '100%': { height: '13rem' }, // 52 / 4 = 13rem
        },
        collapse: {
          '0%': { height: '13rem' },
          '100%': { height: '0px' },
        },
      },
      animation: {
        typewriter: 'typewriter 4s steps(28) forwards infinite',
        fadeIn: 'fadeIn 3s',
        slightFadeIn: 'slightFadeIn 1s ease-in',
        fadeOut: 'fadeOut 3s',
        expand: 'expand 0.5s ease-out forwards',
        collapse: 'collapse 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
