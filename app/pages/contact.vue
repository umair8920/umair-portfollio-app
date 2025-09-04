<template>
  <v-container class="py-16">
    <v-row align="center" justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-8 contact-card">
          <v-row align="center">
            <!-- Left: Profile Picture -->
            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-avatar size="220">
                <v-img src="~/assets/images/profile.png" alt="Umair Masood" cover />
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
                    <a href="mailto:umairdev89@gmail.com" class="contact-link">
                      umairdev89@gmail.com
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-phone</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a href="tel:+923400728009" class="contact-link">
                      +92 3400728009
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-linkedin</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a
                      href="https://www.linkedin.com/in/muhammad-umair-masood-b05805381"
                      target="_blank"
                      class="contact-link"
                    >
                      LinkedIn
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-github</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <a
                      href="https://github.com/umair8920"
                      target="_blank"
                      class="contact-link"
                    >
                      GitHub
                    </a>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon color="buttonBg">mdi-map-marker</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    Islamabad, Pakistan
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
