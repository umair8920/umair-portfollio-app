<template>
  <!-- Footer background uses your theme "footer" color -->
  <v-footer app color="footer" class="text-white py-8">
    <v-container class="d-flex flex-row align-center justify-center ga-10 text-center">
      <!-- Column 1 -->
      <p>© {{ new Date().getFullYear() }} Umair Masood</p>

      <!-- Column 2, 3, 4 (social icons) -->
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        :href="icon.href"
        target="_blank"
        icon
        size="large"
        variant="text"
        class="social-btn"
        :aria-label="icon.label"
      >
        <v-icon :icon="icon.icon" size="28" />
      </v-btn>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const icons = [
  { icon: 'mdi-github', href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: 'mdi-linkedin', href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: 'mdi-twitter', href: 'https://twitter.com/yourusername', label: 'Twitter/X' },
]
</script>

<style scoped lang="scss">
.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;

  &:hover,
  &:focus-visible {
    background-color: rgba($button-bg, 0.18);
  }

  &:hover .v-icon,
  &:focus-visible .v-icon {
    color: $button-bg;
  }
}
</style>
