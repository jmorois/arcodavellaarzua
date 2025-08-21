// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.arcodavellaarzua.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',        // opcional
      priority: 0.8,               // opcional
      // exclude: ['/404'],         // si la tienes
    })
  ],
})

