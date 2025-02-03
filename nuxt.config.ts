// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '~/assets/main.css'
  ],

  srcDir: 'src/',

  content: {
    highlight: {
      theme: 'one-dark-pro',
      langs: [
        'r',
        "javascript",
        "json",
        "php",
        "html",
        "typescript",
        "cmd"
      ],
    },
    markdown: {

      remarkPlugins: {

      },

      tags: {

      },
    },

    documentDriven: true
  },

  postcss: {
    plugins: {
      tailwindcss: {
      },
      autoprefixer: {},
    },
  },
  
  

  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap'
  ],

  site: {
    _context: ""
  },

  app: {
    head: {
      title: 'Iqbal Bahtiar',
    }
  },

})