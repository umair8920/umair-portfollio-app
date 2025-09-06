<template>
  <v-container class="py-16">
    <v-row align="start" justify="space-between" class="mb-12">
      <!-- Left Column (Text Content) -->
      <v-col cols="12" md="6">
        <h1 class="hero-name mb-4">
          Hello, I’m {{ profile?.hero_name }}
        </h1>
        <h2 class="hero-role mb-6">
          {{ profile?.hero_role }}
        </h2>
        <p class="hero-description">
          {{
            profile?.hero_description ||
            'Full Stack Developer with a B.Sc. in Computer Science from COMSATS University. Delivered scalable SaaS applications and high-performance web solutions while collaborating with cross-functional teams. An AI-first developer who prioritizes AI tools to save working hours, accelerate development, and streamline workflows to deliver innovative solutions.'
          }}
        </p>
      </v-col>

      <!-- Right Column (Profile Image) -->
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-img
          v-if="profile?.profile_image"
          :src="profile.profile_image"
          alt="Profile"
          class="profile-img"
          cover
          aspect-ratio="1"
          transition="fade-transition"
        />
        <v-img
          v-else
          lazy-src="~/assets/images/profile-placeholder.png"
          alt="Profile"
          class="profile-img"
          cover
          aspect-ratio="1"
          transition="fade-transition"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProfile } from '.././composables/useProfile'

const { profile } = useProfile()
</script>

<style scoped lang="scss">
.hero-name {
  font-family: 'Work Sans', sans-serif;
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  font-weight: 700;
  line-height: 84px;
  letter-spacing: 0%;
}

.hero-role {
  font-family: 'Work Sans', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #4b5563; // grey-darken-1
}

.hero-description {
  font-family: 'Work Sans', sans-serif;
  font-size: 18px;
  line-height: 1.3;
  color: #556070;
}

.profile-img {
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
</style>
