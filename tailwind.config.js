/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#ffffff'
      },
      fontFamily: {
        alan: ['Alan Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
