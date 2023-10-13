// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/html-validator',
    'nuxt-link-checker',
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-directus',
    'vue-email/nuxt',
    '@nuxtjs/web-vitals',
    '@nuxtjs/fontaine',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    directus: {
      url: "localhost:8085",
      autoRefresh: true,
      cookieNameToken: 'd_auth_token',
      cookieNameRefreshToken: 'd_refresh_token',
      devtools: true,
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    injectPosition: 0,
  }
})
