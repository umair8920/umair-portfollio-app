<template>
  <v-app-bar flat color="background" elevation="1">
    <v-container class="d-flex align-center justify-space-between">

      <!-- Logo + Name -->
      <div class="d-flex align-center cursor-pointer">
        <div class="logo-circle d-flex align-center justify-center">
          UM
        </div>
        <span class="ml-3 font-weight-medium text-h6">Umair Masood</span>
      </div>

      <!-- Navigation -->
      <div>
        <v-btn
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          variant="text"
          class="nav-btn mx-2"
          :class="{ 'active-link': currentPath === link.to }"
        >
          {{ link.label }}
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<style lang="scss" scoped>
.logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #A53DFF; // or use theme color
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
}

.nav-btn {
  color: inherit;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: rgba(165, 61, 255, 0.1); // light purple background
    color: #A53DFF;
  }
}

.active-link {
  background-color: #A53DFF !important;
  color: white !important;
}
</style>
