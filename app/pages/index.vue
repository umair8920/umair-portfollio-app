<template>
  <v-container class="py-16">
    <v-row align="start" justify="center" class="mb-12">
      <!-- Left Column (Text Content) -->
      <v-col cols="12" md="6">
        <h1 class="hero-name mb-4">
          M. Umair Masood
        </h1>
        <h2 class="hero-role mb-6">
          Full Stack Developer
        </h2>
        <p class="hero-description">
          Full Stack Developer with a B.Sc. in Computer Science from COMSATS University.
          Delivered scalable SaaS applications and high-performance web solutions while
          collaborating with cross-functional teams. An AI-first developer who prioritizes AI tools
          to save working hours, accelerate development, and streamline workflows to deliver
          innovative solutions.
        </p>
      </v-col>

      <!-- Right Column (Profile Image) -->
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-img
          src="~/assets/images/profile.png"
          alt="Umair Masood"
          class="profile-img"
          cover
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.hero-name {
  font-family: 'Work Sans', sans-serif;
  font-size: 72px;
  font-weight: 700;
  line-height: 84px;
  letter-spacing: 0%;
  text-align: left;
}

.hero-role {
  font-family: 'Work Sans', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #4b5563; // grey-darken-1
  text-align: left;
}

.hero-description {
  font-family: 'Work Sans', sans-serif;
  font-size: 18px;
  line-height: 1.3;
  text-align: left;
  color: #556070;
}

.profile-img {
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
</style>
