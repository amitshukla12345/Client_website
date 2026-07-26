/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        saffron: {
          light: '#ffb84d',
          DEFAULT: '#ff9933',
          dark: '#e05a10',
          deep: '#b83a00',
        },
        gold: {
          light: '#fcf6ba',
          DEFAULT: '#d4af37',
          dark: '#b38728',
          deep: '#8a6f27',
        },
        cream: {
          light: '#fffdf9',
          DEFAULT: '#fdfbf7',
          dark: '#faf6f0',
          deep: '#f4ede2',
        },
        dark: {
          light: '#3d2b20',
          DEFAULT: '#2c1e15',
          dark: '#1e130c',
          charcoal: '#110b07',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(212, 175, 55, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(224, 90, 16, 0.25)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.3)',
        'saffron-glow': '0 0 15px rgba(255, 153, 51, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
