/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#111827',
        'ping-color': '#3B82F6',
        'download-color': '#10B981',
        'upload-color-start': '#8B5CF6',
        'upload-color-end': '#EC4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gauge': '0 4px 12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};