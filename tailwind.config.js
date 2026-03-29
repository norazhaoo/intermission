/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        // Primary
        'primary': '#5d000a',
        'on-primary': '#ffffff',
        'primary-container': '#81131a',
        'on-primary-container': '#ffdad4',

        // Secondary
        'secondary': '#775a19',
        'on-secondary': '#ffffff',
        'secondary-container': '#fed488',
        'on-secondary-container': '#5c4305',
        'secondary-fixed': '#ffdea5',
        'on-secondary-fixed': '#261a00',
        'secondary-fixed-dim': '#e4c26c',
        'on-secondary-fixed-variant': '#5c4305',

        // Tertiary
        'tertiary': '#3c251f',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#553a34',
        'on-tertiary-container': '#ffdad2',
        'tertiary-fixed': '#ffdad2',
        'on-tertiary-fixed': '#2c1510',
        'tertiary-fixed-dim': '#e8bdb3',
        'on-tertiary-fixed-variant': '#553a34',

        // Error
        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#410002',

        // Surface
        'surface': '#fff9ed',
        'on-surface': '#1f1c0b',
        'surface-variant': '#ebe2c8',
        'on-surface-variant': '#4c4733',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fef3df',
        'surface-container': '#f8edd9',
        'surface-container-high': '#f2e7d4',
        'surface-container-highest': '#ece2ce',
        'surface-dim': '#e1d8c4',
        'surface-bright': '#fff9ed',

        // Outline
        'outline': '#8b716f',
        'outline-variant': '#dfbfbd',

        // Inverse
        'inverse-surface': '#353120',
        'inverse-on-surface': '#f8f0dc',
        'inverse-primary': '#ffb4a8',

        // Special
        'scrim': '#000000',
        'shadow': '#000000',

        // Custom theatrical
        'gold': '#d4af37',
        'gold-light': '#fed488',
        'parchment': '#fcf3d8',
        'parchment-dark': '#f5e6be',
        'velvet-dark': '#3a0008',
        'curtain-red': '#8b0000',
      },
      fontFamily: {
        'headline': ['"Noto Serif"', 'serif'],
        'body': ['"Manrope"', 'sans-serif'],
        'label': ['"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      }
    }
  },
  plugins: []
}
