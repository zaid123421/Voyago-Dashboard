import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        voyago: {
          purple: '#6c30ba',
          dark: '#1c1c1c',
          card: '#282828',
          accent: '#a04df6',
          deep: '#5724a2',
        },
      },
    },
  },
  plugins: [],
};

export default config;
