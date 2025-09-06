<template>
  <v-app>
    <AppHeader />

    <v-main class="main-content">
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
  
</template>

<style lang="scss" scoped>
.main-content {
  padding-top: 0; // No extra padding needed since header is no longer fixed
}
</style>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
