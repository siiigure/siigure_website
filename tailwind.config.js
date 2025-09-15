/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        siigureBlue: '#5f6cff',
        siigurePurple: '#8b5cf6'
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-120vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(120vh)', opacity: '0' }
        }
      },
      animation: {
        fall: 'fall linear infinite'
      }
    }
  },
  plugins: []
};
