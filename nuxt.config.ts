export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ignore: ['**/*.nuxt.test.ts'],
  css: ['~/assets/main.scss'],
  app: { head: { htmlAttrs: { lang: 'fa', dir: 'rtl' } } },
  eslint: { config: { stylistic: false } }
})
