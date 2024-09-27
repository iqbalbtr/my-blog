// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '~/assets/main.css'
  ],

  srcDir: 'src/',

  postcss: {
    plugins: {
      tailwindcss: {
      },
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/image'],
  
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css'
        }
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        }
      ]
    }
  }
})