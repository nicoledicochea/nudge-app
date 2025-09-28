/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nudge brand colors - gentle, calming palette
        sage: {
          50: '#f0f4f0',
          100: '#dde8dd',
          200: '#bcd1bc',
          300: '#8fb08f',
          400: '#6b8a6b',
          500: '#4a6b4a',
          600: '#3a553a',
          700: '#2f452f',
          800: '#283828',
          900: '#232f23',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf1e4',
          300: '#f6e6d0',
          400: '#f0d5b5',
          500: '#e8c299',
          600: '#d4a574',
          700: '#b88a5a',
          800: '#9a7149',
          900: '#7d5c3e',
        },
        coral: {
          50: '#fef7f4',
          100: '#fdeee6',
          200: '#fad9c8',
          300: '#f6bda0',
          400: '#f09672',
          500: '#e8754a',
          600: '#d95d2e',
          700: '#b64a24',
          800: '#933d24',
          900: '#773421',
        },
        // Food category colors
        protein: '#fecaca', // light red
        vegetables: '#bbf7d0', // light green
        carbs: '#fef3c7', // light yellow
        fats: '#fed7aa', // light orange
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'gentle': '12px',
        'soft': '16px',
      },
      animation: {
        'gentle-bounce': 'gentle-bounce 0.6s ease-in-out',
        'soft-fade': 'soft-fade 0.3s ease-in-out',
      },
      keyframes: {
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'soft-fade': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
