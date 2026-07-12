const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#dbeeff',
          200: '#b7dbff',
          300: '#83b7ff',
          400: '#4b88ff',
          500: '#2063f5',
          600: '#1d4fe1',
          700: '#1d3fbb',
          800: '#223690',
          900: '#1d2f77',
        },
        ink: {
          950: '#070b14',
          900: '#0b1120',
          800: '#111a2e',
          700: '#182238',
          600: '#233047',
          500: '#324259',
        },
        accent: {
          400: '#fbb03b',
          500: '#f59e0b',
          600: '#d97e06',
        },
      },
      boxShadow: {
        soft: '0 25px 60px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
