<template>
  <v-container class="py-16">
    <h2 class="section-title text-center mb-10">My Projects</h2>

    <v-carousel
      height="600"
      hide-delimiters
      show-arrows="hover"
      class="project-carousel"
    >
      <v-carousel-item
        v-for="(project, i) in projects"
        :key="i"
      >
        <v-row align="center" justify="center">
          <!-- Left: Project Image -->
          <v-col cols="12" md="5" class="d-flex justify-center">
            <v-img
              :src="project.image"
              :alt="project.title"
              class="project-img"
              cover
            />
          </v-col>

          <!-- Right: Project Details -->
          <v-col cols="12" md="7">
            <h3 class="project-title mb-4">{{ project.title }}</h3>
            <p class="project-description mb-6">
              {{ project.description }}
            </p>

            <!-- Skills / Tech Stack -->
            <div class="d-flex flex-wrap ga-3 mb-6">
              <v-chip
                v-for="(skill, idx) in project.skills"
                :key="idx"
                color="buttonBg"
                text-color="white"
                variant="flat"
              >
                {{ skill }}
              </v-chip>
            </div>

            <!-- Links -->
            <div class="d-flex ga-4">
              <v-btn
                v-if="project.link"
                :href="project.link"
                target="_blank"
                color="buttonBg"
                variant="flat"
              >
                View Project
              </v-btn>
              <v-btn
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                color="buttonBg"
                variant="outlined"
              >
                GitHub Repo
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'Micasi Search Console Tracker – Apimio',
    description:
      'Designed and developed a SaaS application for marketing analytics and management with scalable microservice-based architecture. Implemented billing, multi-workspace management, and a high-performance backend with FastAPI and MongoDB.',
    image: new URL('~/assets/images/profile.png', import.meta.url).href,
    skills: [
      'FastAPI',
      'MongoDB',
      'Redis',
      'JWT',
      'React',
      'Tailwind',
      'Redux Toolkit',
      'RTK Query',
      'Google Cloud Run',
    ],
    link: 'https://app.micasi.com/',
  },
  {
    title: 'Code Analyzer – Apimio',
    description:
      'Refactored and optimized an AI-powered repository analysis platform built with Next.js (TypeScript). Integrated Firebase Auth with Google OAuth and structured state management with Redux Toolkit.',
    image: new URL('~/assets/images/profile.png', import.meta.url).href,
    skills: ['Next.js', 'TypeScript', 'Firebase Auth', 'Google OAuth', 'Redux Toolkit'],
  },
  {
    title: 'Real-time Multiplayer Chess – Freelance',
    description:
      'Built a fully responsive chess platform with real-time matches, timers, resign/draw options, and an emoji chat system. Designed both frontend and backend using Node.js, Express, Socket.IO, and MongoDB.',
    image: new URL('~/assets/images/profile.png', import.meta.url).href,
    skills: ['Node.js', 'Express', 'Socket.IO', 'MongoDB', 'JWT', 'chess.js', 'chessboard.js'],
    repo: 'https://github.com/umair8920/chess-app.git',
  },
]
</script>

<style scoped lang="scss">
.section-title {
  font-family: 'Work Sans', sans-serif;
  font-size: 42px;
  font-weight: 700;
}

.project-img {
  max-width: 380px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.project-title {
  font-family: 'Work Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
}

.project-description {
  font-size: 16px;
  line-height: 1.6;
  color: #374151; // gray-700
}
</style>
