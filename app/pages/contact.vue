<template>
  <v-container class="py-16">
    <v-row align="center" justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-8 contact-card">
          <v-row align="center">
            <!-- Left: Profile Picture -->
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-avatar size="220">
                <v-img
                  v-if="profile?.profile_image"
                  :src="profile.profile_image"
                  alt="Profile"
                  cover
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
              </v-avatar>
            </v-col>

            <!-- Right: Contact Details -->
            <v-col cols="12" md="8">
              <h2 class="contact-title mb-6">Get in Touch</h2>
              <v-list density="comfortable" class="transparent">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-email</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a :href="profile?.email ? `mailto:${profile.email}` : '#'" class="contact-link">
                      {{ profile?.email || '—' }}
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-phone</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a :href="profile?.phone ? `tel:${profile.phone}` : '#'" class="contact-link">
                      {{ profile?.phone || '—' }}
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-linkedin</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a :href="profile?.linkedin || '#'" target="_blank" class="contact-link">LinkedIn</a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-github</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a :href="profile?.github || '#'" target="_blank" class="contact-link">GitHub</a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-map-marker</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    {{ profile?.work_location || '—' }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProfile } from '.././composables/useProfile'
const { profile } = useProfile()
</script>

<style scoped lang="scss">
.contact-card {
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.contact-title {
  font-family: 'Work Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  text-align: left;
}

.contact-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $button-bg; // highlight purple
  }
}
</style>
