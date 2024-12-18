import Colors from './src/theme/Colors';
import Borders from './src/theme/Borders';
import Shadows from './src/theme/Shadows';
import Fonts from './src/theme/Fonts';

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: '1232px',
          md: '850px',
        },
      },
      important: true,
      screens: {
        sm: '576px',
        md: '768px',
        lg: '1440px',
      },
      colors: {
        ...Colors,
      },
      boxShadow: {
        ...Shadows,
      },
      borderWidth: {
        ...Borders,
      },
      borderRadius: {
        ...Borders,
      },
      fontSize: {
        ...Fonts,
      },
      fontWeight: {
        light: '300',
        normal: '400',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        animloader: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
      },
      animation: {
        loader1: 'animloader 0.5s linear infinite',
        loader2: 'animloader 1s linear infinite 0.1s',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
