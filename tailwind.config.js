/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./login.html",
    "./registro.html",
    "./pages/**/*.{html,js}",
    "./cliente/**/*.{html,js}",
    "./js/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a855f7',
          hover: '#6b21a8',
        },
        secondary: '#64748B',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        background: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        text: {
          primary: {
            light: '#0F172A',
            dark: '#F8FAFC',
          },
          secondary: {
            light: '#475569',
            dark: '#CBD5E1',
          },
        },
        border: {
          light: '#E2E8F0',
          dark: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
