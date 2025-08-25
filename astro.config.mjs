// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.arcodavellaarzua.com',

  i18n: {
    // 👇 sin 'zh-Hant'
    locales: ['es', 'en', 'fr', 'it', 'ko'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
    fallback: {
      // 'zh-Hant': 'en',   // ← desactivado
      'ko': 'en',
    },
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      // exclude: ['/404'],
    })
  ],
})



