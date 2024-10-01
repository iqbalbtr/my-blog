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
        "js",
        "json",
        "php"
      ],
    },
    markdown: {
      tags: {}
    }
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
    '@vueuse/motion/nuxt'
  ],
  
  app: {
    head: {
     title: 'Iqbal Bahtiar',
    }
  }
})