/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f', // Very dark navy/charcoal
        panel: 'rgba(20, 20, 25, 0.7)',
        primary: {
          DEFAULT: '#e50914', // Netflix-like red, but maybe we adjust to deep purple/red
          500: '#e11d48', // rose-600
          600: '#be123c', // rose-700
        },
        accent: '#8b5cf6', // purple
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10, 10, 15, 0.2), rgba(10, 10, 15, 1))',
      }
    },
  },
  plugins: [],
}
