const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sistema de cores semânticas que se adaptam ao tema
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",
        popover: "rgb(var(--popover) / <alpha-value>)",
        "popover-foreground": "rgb(var(--popover-foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "rgb(var(--destructive-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        
        // Sistema de cores Oasis específicas
        'oasis-blue': {
          DEFAULT: 'rgb(var(--oasis-blue) / <alpha-value>)',
          dark: 'rgb(var(--oasis-blue-dark) / <alpha-value>)',
          light: 'rgb(var(--oasis-blue-light) / <alpha-value>)',
          5: 'rgb(var(--oasis-blue-5) / <alpha-value>)',
          600: '#4A8BD8',
        },
        
        // Neutros refinados
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        
        // Cores funcionais
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
      },
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05)', 
        'medium': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'strong': '0 10px 15px rgba(0, 0, 0, 0.1)',
        // Sombras Oasis específicas - como na LP
        'oasis': '0 1px 3px rgba(91, 154, 225, 0.06), 0 1px 2px rgba(91, 154, 225, 0.04)',
        'oasis-lg': '0 4px 6px rgba(91, 154, 225, 0.05), 0 2px 4px rgba(91, 154, 225, 0.03)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
