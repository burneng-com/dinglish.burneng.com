import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dinglish.burneng.com',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
