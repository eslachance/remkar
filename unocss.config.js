import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig } from '@unocss/vite';

export default defineConfig({
  presets: [
    presetIcons({
      // Just some extra "defaults" for icons. You can edit this to your liking.
      // I like icons vertically aligned, for example.
      extraProperties: {
        width: '1.2em',
        height: '1.2em',
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetUno(),
    presetWebFonts({
      // Defaults used for the main site as well as any "pre" block for code.
      fonts: {
        sans: 'Noto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  theme: {
    // Theme colors used by the helper classes, for example, using the white background:
    // bg-back-white
    colors: {
      main: '#000000',
      secondary: '#4d38ca',
      back: {
        white: '#F5F5F5',
        grey: '#E0E0E0',
      },
    },
  },
});
