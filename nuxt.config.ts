// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config


export default defineNuxtConfig({
  build: {
    transpile: [
      '@contentful/rich-text-types', '@contentful/rich-text-html-renderer'
    ],
  },

  typescript: {
    strict: true
  },

})
