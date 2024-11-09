import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig } from '@unocss/vite';
import presetTheme from 'unocss-preset-theme';
import transformerDirectives from '@unocss/transformer-directives';

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
    presetTheme({
      theme: {
        // Configure dark themes
        dark: {
          colors: {
            main: '#ffffff',
            secondary: '#4d38ca',
            nav: {
              back: '#000000',
              fore: '#ffffff',
            },
            back: {
              white: '#363232',
              grey: '#E0E0E0',
            },
          },
        },
        // Configure compact themes
        compact: {},
        colors: {
          main: '#000000',
          secondary: '#4d38ca',
          nav: {
            back: '#FFFFFF',
            fore: '#000000',
          },
          back: {
            white: '#F5F5F5',
            grey: '#E0E0E0',
          },
        },
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
