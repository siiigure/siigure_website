/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ], // 根据你项目路径调整
  theme: {
    extend: {
      fontFamily: {
        alan: ['Alan Sans', 'sans-serif'] // 新增
      }
    }
  },
  plugins: []
};
