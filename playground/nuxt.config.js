export default defineNuxtConfig({
  modules: ['../module', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-07-05',
  runtimeConfig: {
    public: {
      urls: {
        dev: process.env.DEV_URL,
        test: process.env.TEST_URL,
        staging: process.env.STAGING_URL,
        live: process.env.LIVE_URL
      }
    }
  }
});
