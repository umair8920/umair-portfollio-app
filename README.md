# Umair Masood — Portfolio (Nuxt 3 + Vuetify + PostgreSQL)

Single-user portfolio web app built with Nuxt 3 (Vue 3 + Vite), Vuetify for UI, and a Nitro server with Sequelize/PostgreSQL for data persistence.

The site publishes public pages (Home, Projects, Contact) while keeping simple, non-auth “admin” pages hidden (they are accessible only by direct URL).

## Features

- Public Portfolio
  - Hero section with name, role, description, and profile image
  - Projects carousel with title, description, tech chips, links/repo
  - Contact page with email, phone, LinkedIn, GitHub, and location

- Content Management (single-user)
  - Manage Profile (create/update/delete)
  - Manage Projects (list/create/edit/delete)
  - Image upload to `public/images/` (stores public path in DB)

- Backend API (Nitro/H3 + Sequelize + PostgreSQL)
  - User profile and projects CRUD
  - Single-user by design (no authentication)
  - Projects linked to the single user via `user_profile_id`

## Tech Stack

- Frontend: Nuxt 3, Vue 3, Vite, TypeScript, Vuetify 3, SCSS
- Backend: Nuxt Nitro server, H3 handlers
- ORM/DB: Sequelize + PostgreSQL
- Uploads: Nitro endpoint saving files under `public/images`

## Project Structure

```
app/
  components/layout/          # Header/Footer
  layouts/default.vue         # Wraps pages with <v-app> and <v-main>
  pages/                      # Public and admin pages
    index.vue                 # Home (Hero)
    projects.vue              # Public projects carousel
    contact.vue               # Public contact page
    usermanagement.vue        # Admin: Profile (hidden, direct URL)
    projectmanagement.vue     # Admin: Projects (hidden, direct URL)

plugins/                      # Root-level Nuxt plugins
  api.ts                      # Provides $api via $fetch.create()
  vuetify.ts                  # Registers Vuetify + vuetify-use-dialog

server/
  api/
    portfolio.ts              # REST-like endpoint (?resource=profile|projects)
    upload.ts                 # Multipart upload -> saves to public/images
  controllers/
    portfolio.controller.ts   # Business logic for profile/projects
  db/                         # Sequelize configuration/connection
  models/
    models.ts                 # Sequelize models & associations
  migrations/                 # DB schema migrations

composables/
  useProfile.ts               # Fetches and normalizes profile
  useProjects.ts              # Fetches and normalizes projects

public/
  images/                     # Uploaded images (publicly served)

types/
  nuxt-app.d.ts               # $api type augmentation for NuxtApp
```

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure environment variables

Create a `.env` with your DB settings (or use system env). Example:

```
NUXT_DB_HOST=localhost
NUXT_DB_PORT=5432
NUXT_DB_USER=postgres
NUXT_DB_PASSWORD=your_password
NUXT_DB_NAME=mydb

# Frontend -> API base (Nitro serves /api by default)
API_BASE_URL=/api
```

3) Database

- Make sure PostgreSQL is running and accessible with the above credentials.
- Run migrations (via your Sequelize migration commands). The repo includes migrations for profile and projects.

4) Run the app (dev)

```bash
npm run dev
# App: http://localhost:3000
```

## Runtime Notes

- Plugins are at project root under `plugins/` and explicitly loaded in `nuxt.config.ts`.
- Vuetify is mounted once in `app/layouts/default.vue` using `<v-app>` and `<v-main>`.
- Do not mount `<VApp>` in `app/app.vue` to avoid SSR provider errors.

## API Overview

Base URL: `/api/portfolio`

Query param `resource`: `profile` or `projects`.

- Profile
  - GET `/api/portfolio?resource=profile` → returns single profile or null
  - POST `/api/portfolio?resource=profile` → create profile (single-user)
  - PUT `/api/portfolio?resource=profile` → update profile
  - DELETE `/api/portfolio?resource=profile` → delete profile (projects cascade)

- Projects
  - GET `/api/portfolio?resource=projects` → list projects for the single profile
  - GET `/api/portfolio?resource=projects&id=1` → get one project
  - POST `/api/portfolio?resource=projects` → create project
  - PUT `/api/portfolio?resource=projects&id=1` → update project
  - DELETE `/api/portfolio?resource=projects&id=1` → delete project

- Uploads
  - POST `/api/upload` (multipart/form-data with key `file`)
  - Saves to `public/images/<filename>` and returns `{ path: "/images/<filename>" }`

## Data Model (simplified)

- UserProfile
  - hero_name, hero_role, hero_description
  - gmail (email), phone_number (phone)
  - linkedin, github
  - work_location, profile_image
  - login_initials (auto-derived if missing)

- Project
  - user_profile_id (FK → UserProfile)
  - title, description
  - skills (string[])
  - link, repo, image_path (public path)

## Frontend Integration

- Composables
  - `useProfile()` → returns `{ profile, initials, pending, error, refresh }`
  - `useProjects()` → returns `{ projects, pending, error, refresh, createProject, updateProject, deleteProject }`

- Pages
  - `pages/index.vue` uses `useProfile()` to populate hero text/image
  - `pages/projects.vue` uses `useProjects()` to render a Vuetify carousel (one project per slide)
  - `pages/contact.vue` uses `useProfile()` for email/phone/links/location

## Admin Pages (hidden by design)

These pages are not linked in the header and are intended to be accessed via direct URL only:

- `/usermanagement` — manage profile
- `/projectmanagement` — manage projects (with image upload)

Tips to keep them hidden (no authentication used):

- Remove links from header (already done)
- Add `noindex, nofollow` meta to admin pages:

```ts
<script setup lang="ts">
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
</script>
```

- Optionally add a lightweight client-only guard (localStorage flag) if you want to avoid accidental access; not security, just obscurity.

## Troubleshooting

- Vuetify SSR errors (defaults injection):
  - Ensure only `app/layouts/default.vue` wraps with `<v-app>` and `<v-main>`.
  - Do not wrap `app/app.vue` with `<VApp>`.
  - `nuxt.config.ts` should include `css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css']` and transpile Vuetify.

- 503 on API calls:
  - Confirm DB is reachable and env vars are set.
  - Check server logs; controller errors are logged in `server/api/portfolio.ts`.

## Scripts

Common scripts (check your `package.json`):

```bash
npm run dev       # start Nuxt in development
npm run build     # build for production
npm run preview   # preview the production build locally
```

## License

This project is for personal portfolio use.
