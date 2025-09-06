// nuxt.config.ts
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Fix SSR hydration issues
  ssr: true,
  
  // Ensure proper CSS handling
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  // Ensure plugins from project root load in correct order (Vuetify first)
  plugins: [
    '~~/plugins/vuetify',
    '~~/plugins/api',
  ],

  // Server config
  nitro: {
    devProxy: {
      // "/api": "http://localhost:5000"
    },
  },

  // App-level dev server options
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Transpile Vuetify because it ships untranspiled ESNext
  build: {
    transpile: ['vuetify'],
  },

  // Register Vuetify plugin for Vite
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins.push(
          vuetify({
            autoImport: true, // auto-import Vuetify components
          }),
        )
      })
    },
  ],

  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: ['vuetify'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables.scss" as *;`,
        },
      },
    },
    vue: {
      template: {
        transformAssetUrls, // required for Vuetify <v-img>, etc.
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || '/api'
    }
  }
})

