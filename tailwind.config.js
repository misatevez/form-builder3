import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#f3f4f6',
        foreground: '#37352f',
        primary: {
          DEFAULT: '#315755',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#ffffff',
          foreground: '#315755',
        },
        border: '#d1d5db',
        input: '#e5e7eb',
        ring: '#9ca3af',
        card: '#ffffff',
        popover: '#ffffff',
        muted: '#f9fafb',
        accent: '#e5e7eb',
        destructive: '#ef4444',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  };
  export default config;
