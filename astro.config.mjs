import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcodavellaarzua.com',  // 👈 muy importante, pon tu dominio
  integrations: [sitemap()],
});

