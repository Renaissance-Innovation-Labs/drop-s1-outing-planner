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
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
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
        fadeIn: 'fadeIn 4s',
        expand: 'expand 0.5s ease-out forwards',
        collapse: 'collapse 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
