<template>
  <div class="header-wrapper">
    <v-container class="header-container px-0">
      <v-row align="center" justify="space-between">
        <!-- Left: Logo container + Label container in horizontal flow -->
        <v-col cols="auto">
          <div class="brand d-flex align-center cursor-pointer">
            <div class="logo-container d-flex align-center justify-center">
              <div class="logo-circle">{{ initials || 'UM' }}</div>
            </div>
            <div class="label-container ml-3 d-flex align-center">
              <span class="brand-label font-weight-medium text-h6">{{ profile?.hero_name || 'Umair Masood' }}</span>
            </div>
          </div>
        </v-col>

        <!-- Right: Navigation -->
        <v-col cols="auto">
          <div class="d-flex align-center">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProfile } from '.././composables/useProfile'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
  // { label: 'User Management', to: '/usermanagement' },
  // { label: 'Project Management', to: '/projectmanagement' },
]

const route = useRoute()
const currentPath = computed(() => route.path)

// Profile data for header brand/initials
const { profile, initials } = useProfile()
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  background: transparent;
  height: 56px;

  /* 300px left & right alignment */
  padding-inline: 300px;
}

/* Use full width; padding handled by wrapper */
.header-container {
  max-width: unset;
  margin: 0 auto;
  height: 100%;
}

.brand { min-height: 40px; }

/* Explicit containers (as requested) */
.logo-container { display: inline-flex; }
.label-container { display: inline-flex; }

.logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #A53DFF;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand-label { white-space: nowrap; }

.nav-btn {
  color: inherit;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: rgba(165, 61, 255, 0.1);
    color: #A53DFF;
  }
}

.active-link {
  background-color: #A53DFF !important;
  color: white !important;
}

/* Responsive paddings for smaller screens */
@media (max-width: 1400px) {
  .header-wrapper { padding-inline: 200px; }
}

@media (max-width: 1200px) {
  .header-wrapper { padding-inline: 100px; }
}

@media (max-width: 768px) {
  .header-wrapper {
    padding-inline: 24px;
    margin-top: 20px;
  }
}
</style>
