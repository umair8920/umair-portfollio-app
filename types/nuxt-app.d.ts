// types/nuxt-app.d.ts
import type { $Fetch } from 'ofetch'

declare module 'nuxt/app' {
  interface NuxtApp {
    $api: $Fetch
  }
}

declare module '#app' {
  interface NuxtApp {
    $api: $Fetch
  }
}

export {}
