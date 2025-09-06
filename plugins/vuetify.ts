// app/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VuetifyUseDialog from 'vuetify-use-dialog'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true, // Enable SSR support
    theme: {
      defaultTheme: 'portfolioTheme',
      themes: {
        portfolioTheme: {
          dark: false, // you can toggle later if you want dark mode
          colors: {
            background: '#FFFFFF', // base white/gray
            surface: '#FFFFFF',    // card & surfaces
            primary: '#3B82F6',    // Tailwind's primary/500 (blue-500)
            secondary: '#64748B',
            buttonBg: '#A53DFF',  // optional (slate/gray tone)
            footer: '#2B384C',     // Custom footer color
            error: '#EF4444',
            success: '#22C55E',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.use(VuetifyUseDialog)
})
