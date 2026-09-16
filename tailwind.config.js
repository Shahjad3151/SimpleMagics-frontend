/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // SimpleMagics brand blue (anchored on logo color #004B7F)
        brand: {
          50: '#eaf3fa',
          100: '#d0e4f2',
          200: '#a3c9e6',
          300: '#71a9d6',
          400: '#3f89c4',
          500: '#1f6da8',
          600: '#0f5789',
          700: '#004B7F',
          800: '#013a63',
          900: '#022a48',
          950: '#011c30',
        },
        // Growth green accent, used sparingly for CTAs/success states
        accent: {
          50: '#eafbf1',
          100: '#cdf3dd',
          200: '#9de6bf',
          300: '#64d29c',
          400: '#34b87c',
          500: '#1f9d55',
          600: '#167f45',
          700: '#126537',
          800: '#10502e',
          900: '#0d4227',
        },
        // Neutral charcoal from logo wordmark, used for surfaces/text
        surface: {
          50: '#f5f6f6',
          100: '#e9eaea',
          200: '#cfd0d1',
          800: '#242527',
          900: '#18191a',
          950: '#0e0f10',
        },
        charcoal: '#414042',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: { from: { boxShadow: '0 0 20px rgba(0, 75, 127, 0.3)' }, to: { boxShadow: '0 0 40px rgba(0, 75, 127, 0.6)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(0,75,127,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(31,157,85,0.25) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0,75,127,0.2) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
