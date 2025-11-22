import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig } from '@unocss/vite';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        width: '1.2em',
        height: '1.2em',
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        display: 'Bebas Neue',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      // Dive bar color palette inspired by the photos
      'dive-bg': '#1a1512', // Deep charcoal brown
      'dive-bg-light': '#2a2520', // Lighter brown-gray
      'dive-bg-lighter': '#3a3530', // Even lighter for cards/modals
      'dive-accent': '#ea580c', // Warm orange (like the lighting)
      'dive-accent-light': '#fb923c', // Lighter orange
      'dive-accent-dark': '#c2410c', // Darker orange
      'dive-red': '#dc2626', // Red accent (from walls/NASA logos)
      'dive-red-light': '#ef4444', // Lighter red
      'dive-text': '#fef3c7', // Warm cream text
      'dive-text-dim': '#fde68a', // Dimmer cream
      'dive-text-muted': '#a3a3a3', // Muted gray
      'dive-border': '#52443d', // Subtle brown border
      'dive-wood': '#8b6f47', // Wood tone accent
    },
  },
});
