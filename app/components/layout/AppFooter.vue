<template>
  <footer class="footer-wrapper">
    <v-container fluid class="footer-container">
      <div class="footer-content d-flex flex-row align-center justify-center ga-10 text-center">
        <!-- Copyright -->
        <p class="footer-text">© {{ new Date().getFullYear() }} Umair Masood</p>

        <!-- Social icons -->
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
      </div>
    </v-container>
  </footer>
</template>

<script setup lang="ts">
const icons = [
  { icon: 'mdi-github', href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: 'mdi-linkedin', href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: 'mdi-twitter', href: 'https://twitter.com/yourusername', label: 'Twitter/X' },
]
</script>

<style scoped lang="scss">
.footer-wrapper {
  width: 100%;
  min-height: 330px;
  background-color: #2B384C;
  color: white;
  position: relative;
  margin-top: auto;
}

.footer-container {
  height: 100%;
  min-height: 330px;
  padding: 0;
}

.footer-content {
  height: 100%;
  min-height: 330px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-text {
  color: white;
  font-size: 16px;
  margin: 0;
}

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

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px !important;
    padding: 40px 24px;
  }
  
  .footer-wrapper {
    min-height: 250px;
  }
  
  .footer-container {
    min-height: 250px;
  }
  
  .footer-content {
    min-height: 250px;
  }
}
</style>
