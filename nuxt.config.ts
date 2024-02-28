// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxthq/studio',
    '@nuxt/content',
    'nuxt-content-git',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@hypernym/nuxt-gsap',
  ],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    injectPosition: 0,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  site: {
    url: 'https://new.teamsurtes.com/',
  },
  googleFonts: {
    families: {
      Onest: true
    },
    fontsDir: 'fonts'
  },
})