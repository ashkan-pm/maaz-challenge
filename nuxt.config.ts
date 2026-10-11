export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: { public: { apiBaseUrl: 'https://fakestoreapi.com' } },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ignore: ['**/*.nuxt.test.ts'],
  css: ['~/assets/main.scss'],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      link: [
        {
          rel: 'stylesheet',
          href: '/fonts/fonts.css',
          tagPriority: 'critical'
        },
        {
          rel: 'preload',
          tagPriority: 'critical',
          href: '/fonts/yekan-bakh-variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          tagPriority: 'critical',
          href: '/fonts/iran-yekan-variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  eslint: { config: { stylistic: false } }
})
