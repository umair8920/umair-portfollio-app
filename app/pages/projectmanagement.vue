<template>
  <v-container>
    <v-card class="mx-auto" max-width="1100">
      <v-card-title class="text-h5 d-flex align-center">
        <span>Project Management</span>
        <v-spacer />
        <v-btn color="primary" @click="openCreate">
          <v-icon class="mr-2" icon="mdi-plus" /> New Project
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-alert v-if="errorMsg" type="error" variant="tonal" class="mb-4">{{ errorMsg }}</v-alert>

        <v-data-table
          :headers="headers"
          :items="projects"
          :loading="loading"
          item-key="id"
          class="elevation-1"
          :items-per-page="5"
        >
          <template #item.image_path="{ item }">
            <v-avatar size="56" v-if="item.image_path">
              <v-img :src="item.image_path" alt="project" cover />
            </v-avatar>
            <span v-else class="text-disabled">—</span>
          </template>

          <template #item.skills="{ item }">
            <div class="d-flex flex-wrap ga-2">
              <v-chip v-for="(s, i) in item.skills" :key="i" size="small" color="buttonBg" text-color="white">{{ s }}</v-chip>
            </div>
          </template>

          <template #item.actions="{ item }">
            <v-btn size="small" color="primary" variant="text" @click="openEdit(item)">
              <v-icon icon="mdi-pencil" />
            </v-btn>
            <v-btn size="small" color="error" variant="text" @click="confirmDelete(item)">
              <v-icon icon="mdi-delete" />
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Create / Edit Dialog -->
    <v-dialog v-model="dialog" max-width="760">
      <v-card>
        <v-card-title class="text-h6">{{ editingId ? 'Edit Project' : 'Create Project' }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="formModel.title" label="Title" :rules="[r.required('Title')]" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formModel.link" label="Live Link" prepend-icon="mdi-open-in-new" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="formModel.description" label="Description" :rows="3" :rules="[r.required('Description')]" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formModel.repo" label="GitHub Repo" prepend-icon="mdi-github" />
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  v-model="skillsInput"
                  :items="skillsInput"
                  label="Skills (type and press enter)"
                  multiple
                  chips
                  clearable
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  v-model="selectedFile"
                  label="Project Image"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  @change="onFileSelected"
                  hint="Upload image to /public/images and save the path"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <div v-if="formModel.image_path" class="d-flex align-center ga-3">
                  <v-avatar size="56">
                    <v-img :src="formModel.image_path" alt="preview" cover />
                  </v-avatar>
                  <span class="text-caption">{{ formModel.image_path }}</span>
                </div>
                <div v-else class="text-disabled">No image</div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog" :disabled="saving">Cancel</v-btn>
          <v-btn color="primary" @click="saveProject" :loading="saving" :disabled="!valid">{{ editingId ? 'Update' : 'Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="420">
      <v-card>
        <v-card-title class="text-h6">Delete Project</v-card-title>
        <v-card-text>Are you sure you want to delete this project?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" :loading="deleting" @click="deleteProject">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

type Project = {
  id?: number
  title: string
  description: string
  skills: string[]
  link?: string | null
  repo?: string | null
  image_path?: string | null
}

const { $api } = useNuxtApp()
const snackbar = useSnackbar()

const headers = [
  { title: 'Image', value: 'image_path', sortable: false },
  { title: 'Title', value: 'title' },
  { title: 'Description', value: 'description' },
  { title: 'Skills', value: 'skills', sortable: false },
  { title: 'Actions', value: 'actions', sortable: false },
]

const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const errorMsg = ref('')

const projects = ref<Project[]>([])

const dialog = ref(false)
const deleteDialog = ref(false)
const valid = ref(false)
const form = ref<any>(null)
const editingId = ref<number | null>(null)

const selectedFile = ref<File | null>(null)
const skillsInput = ref<string[]>([])

const formModel = ref<Project>({ title: '', description: '', skills: [], link: null, repo: null, image_path: null })

const r = {
  required: (name: string) => (v: any) => (v && String(v).trim().length > 0) || `${name} is required`,
}

onMounted(fetchProjects)

async function fetchProjects() {
  try {
    loading.value = true
    const res: any = await $api('/portfolio', { method: 'GET', query: { resource: 'projects' } })
    projects.value = Array.isArray(res) ? res : []
  } catch (e) {
    console.error(e)
    errorMsg.value = 'Failed to load projects'
    snackbar({ text: 'Failed to load projects', color: 'error' })
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = null
  formModel.value = { title: '', description: '', skills: [], link: null, repo: null, image_path: null }
  skillsInput.value = []
  selectedFile.value = null
  dialog.value = true
}

function openEdit(item: Project) {
  editingId.value = item.id ?? null
  formModel.value = {
    id: item.id,
    title: item.title,
    description: item.description,
    skills: [...(item.skills || [])],
    link: item.link ?? null,
    repo: item.repo ?? null,
    image_path: item.image_path ?? null,
  }
  skillsInput.value = [...(item.skills || [])]
  selectedFile.value = null
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

async function onFileSelected() {
  if (!selectedFile.value) return
  try {
    saving.value = true
    const fd = new FormData()
    fd.append('file', selectedFile.value)
    const res: any = await $api('/upload', { method: 'POST', body: fd })
    if (res?.path) {
      formModel.value.image_path = res.path
      snackbar({ text: 'Image uploaded', color: 'success' })
    } else {
      snackbar({ text: 'Upload failed', color: 'error' })
    }
  } catch (e) {
    console.error(e)
    snackbar({ text: 'Upload failed', color: 'error' })
  } finally {
    saving.value = false
  }
}

async function saveProject() {
  const res = await form.value?.validate()
  if (!res?.valid) return

  try {
    saving.value = true
    const payload: any = {
      title: formModel.value.title,
      description: formModel.value.description,
      skills: Array.isArray(skillsInput.value) ? skillsInput.value : [],
      link: formModel.value.link || null,
      repo: formModel.value.repo || null,
      image_path: formModel.value.image_path || null,
    }

    if (editingId.value) {
      await $api('/portfolio', { method: 'PUT', query: { resource: 'projects', id: String(editingId.value) }, body: payload })
      snackbar({ text: 'Project updated', color: 'success' })
    } else {
      await $api('/portfolio', { method: 'POST', query: { resource: 'projects' }, body: payload })
      snackbar({ text: 'Project created', color: 'success' })
    }

    dialog.value = false
    await fetchProjects()
  } catch (e) {
    console.error(e)
    snackbar({ text: 'Failed to save project', color: 'error' })
  } finally {
    saving.value = false
  }
}

const toDeleteId = ref<number | null>(null)
function confirmDelete(item: Project) {
  toDeleteId.value = item.id ?? null
  deleteDialog.value = true
}

async function deleteProject() {
  if (!toDeleteId.value) return
  try {
    deleting.value = true
    await $api('/portfolio', { method: 'DELETE', query: { resource: 'projects', id: String(toDeleteId.value) } })
    snackbar({ text: 'Project deleted', color: 'success' })
    deleteDialog.value = false
    await fetchProjects()
  } catch (e) {
    console.error(e)
    snackbar({ text: 'Failed to delete project', color: 'error' })
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.v-card { margin-top: 24px; }
</style>