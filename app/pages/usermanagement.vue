<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5">
        {{ viewMode === 'list' ? 'Profile' : (isEditing ? 'Edit Profile' : 'Create Profile') }}
      </v-card-title>

      <!-- LIST VIEW -->
      <template v-if="viewMode === 'list'">
        <v-card-text>
          <template v-if="profile">
            <v-list density="comfortable">
              <v-list-item title="Full Name" :subtitle="profile.hero_name" />
              <v-divider />
              <v-list-item title="Role" :subtitle="profile.hero_role" />
              <v-divider />
              <v-list-item title="Email" :subtitle="profile.email" />
              <v-divider />
              <v-list-item title="Phone" :subtitle="profile.phone" />
              <v-divider />
              <v-list-item title="LinkedIn" :subtitle="profile.linkedin || '—'" />
              <v-divider />
              <v-list-item title="GitHub" :subtitle="profile.github || '—'" />
              <v-divider />
              <v-list-item title="About">
                <template #subtitle>
                  <div style="white-space: pre-line">{{ profile.hero_description }}</div>
                </template>
              </v-list-item>
            </v-list>
          </template>

          <v-alert v-else type="info" variant="tonal" class="my-4">
            No profile found. Create one to get started.
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <template v-if="profile">
            <v-btn color="primary" @click="startEdit" class="mr-2">
              <v-icon icon="mdi-pencil" class="mr-2" /> Edit
            </v-btn>
            <v-btn color="error" @click="confirmDelete">
              <v-icon icon="mdi-delete" class="mr-2" /> Delete
            </v-btn>
          </template>
          <template v-else>
            <v-btn color="primary" @click="startCreate">Create Profile</v-btn>
          </template>
        </v-card-actions>
      </template>

      <!-- FORM VIEW (CREATE / EDIT) -->
      <template v-else>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.hero_name"
                  label="Full Name"
                  :rules="[r.required('Name')]"
                  required
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.hero_role"
                  label="Professional Role"
                  :rules="[r.required('Role')]"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formModel.hero_description"
                  label="About You"
                  :rows="3"
                  :rules="[r.required('Description')]"
                  required
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.email"
                  label="Email"
                  type="email"
                  :rules="[r.required('Email'), r.email()]"
                  required
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.phone"
                  label="Phone Number"
                  :rules="[r.required('Phone')]"
                  required
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.linkedin"
                  label="LinkedIn Profile"
                  prepend-icon="mdi-linkedin"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.github"
                  label="GitHub Profile"
                  prepend-icon="mdi-github"
                />
              </v-col>

              <!-- Work Location -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formModel.work_location"
                  label="Work Location"
                  prepend-icon="mdi-map-marker"
                />
              </v-col>

              <!-- Profile Image Upload -->
              <v-col cols="12" md="6">
                <v-file-input
                  label="Profile Image"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  v-model="selectedFile"
                  @change="onFileSelected"
                  hint="Image will be uploaded to /public/images and path saved"
                  persistent-hint
                />
                <div v-if="formModel.profile_image" class="mt-2 d-flex align-center ga-3">
                  <v-avatar size="56">
                    <v-img :src="formModel.profile_image" alt="Profile preview" cover />
                  </v-avatar>
                  <span class="text-caption">{{ formModel.profile_image }}</span>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="cancelEdit" :disabled="loading">Cancel</v-btn>
          <v-btn color="primary" @click="saveProfile" :loading="loading" :disabled="!valid">
            {{ isEditing ? 'Update' : 'Create' }} Profile
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="420">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Delete your profile? This will also remove all associated projects.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteProfile" :loading="deleting">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

type Profile = {
  id?: number | string
  hero_name: string
  hero_role: string
  hero_description: string
  email: string
  phone: string
  linkedin?: string
  github?: string
  work_location?: string
  profile_image?: string
}

const { $api } = useNuxtApp()
const snackbar = useSnackbar()

const loading = ref(false)
const deleting = ref(false)
const deleteDialog = ref(false)
const valid = ref(false)
const form = ref<any>(null)
const selectedFile = ref<File | null>(null)

const profile = ref<Profile | null>(null)
const formModel = ref<Profile>(emptyProfile())

type ViewMode = 'list' | 'create' | 'edit'
const viewMode = ref<ViewMode>('list')
const isEditing = computed(() => viewMode.value === 'edit')

// Simple rule helpers
const r = {
  required: (name: string) => (v: string) => !!v || `${name} is required`,
  email: () => (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
}

onMounted(fetchProfile)

function emptyProfile(): Profile {
  return {
    hero_name: '',
    hero_role: '',
    hero_description: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    work_location: '',
    profile_image: ''
  }
}

function normalizeFromServer(res: any): Profile | null {
  if (!res) return null
  return {
    id: res.id,
    hero_name: res.hero_name ?? '',
    hero_role: res.hero_role ?? '',
    hero_description: res.hero_description ?? '',
    email: res.gmail ?? res.email ?? '',
    phone: res.phone_number ?? res.phone ?? '',
    linkedin: res.linkedin ?? '',
    github: res.github ?? '',
    work_location: res.work_location ?? '',
    profile_image: res.profile_image ?? ''
  }
}

async function onFileSelected() {
  if (!selectedFile.value) return
  try {
    loading.value = true
    const fd = new FormData()
    fd.append('file', selectedFile.value)
    // Upload to /api/upload; $api has baseURL '/api'
    const res: any = await $api('/upload', { method: 'POST', body: fd })
    if (res?.path) {
      formModel.value.profile_image = res.path // e.g., '/images/filename.png'
      snackbar({ text: 'Image uploaded', color: 'success' })
    } else {
      snackbar({ text: 'Upload failed: no path returned', color: 'error' })
    }
  } catch (e) {
    console.error('Upload error', e)
    snackbar({ text: 'Failed to upload image', color: 'error' })
  } finally {
    loading.value = false
  }
}

async function fetchProfile() {
  try {
    loading.value = true
    const res = await $api('/portfolio', { method: 'GET', query: { resource: 'profile' } })
    profile.value = normalizeFromServer(res)
  } catch (e) {
    console.error('Error fetching profile:', e)
    snackbar({ text: 'Failed to load profile', color: 'error' })
  } finally {
    loading.value = false
  }
}

function startCreate() {
  formModel.value = emptyProfile()
  viewMode.value = 'create'
}

function startEdit() {
  if (!profile.value) return
  // Prefill form with existing data
  formModel.value = { ...profile.value }
  viewMode.value = 'edit'
}

function cancelEdit() {
  viewMode.value = 'list'
}

async function saveProfile() {
  const result = await form.value?.validate()
  if (!result?.valid) return

  try {
    loading.value = true
    const isUpdate = isEditing.value && !!formModel.value.id
    const method = isUpdate ? 'put' : 'post'
    const res = await $api('/portfolio', { method, query: { resource: 'profile' }, body: formModel.value })
    profile.value = normalizeFromServer(res)
    snackbar({ text: `Profile ${isUpdate ? 'updated' : 'created'} successfully`, color: 'success' })
    viewMode.value = 'list'
  } catch (e) {
    console.error('Error saving profile:', e)
    snackbar({ text: 'Failed to save profile', color: 'error' })
  } finally {
    loading.value = false
  }
}

function confirmDelete() {
  deleteDialog.value = true
}

async function deleteProfile() {
  try {
    deleting.value = true
    await $api('/portfolio', { method: 'DELETE', query: { resource: 'profile' } })
    profile.value = null
    snackbar({ text: 'Profile deleted successfully', color: 'success' })
    deleteDialog.value = false
    viewMode.value = 'list'
  } catch (e) {
    console.error('Error deleting profile:', e)
    snackbar({ text: 'Failed to delete profile', color: 'error' })
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.v-card { margin-top: 24px; }
</style>
