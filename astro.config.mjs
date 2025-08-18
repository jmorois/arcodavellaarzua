import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcodavellaarzua.com',  // ← pon tu dominio aquí
  integrations: [sitemap()],
});
