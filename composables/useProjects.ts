// composables/useProjects.ts
import { computed } from 'vue'
import { useNuxtApp, useAsyncData } from 'nuxt/app'

export type ProjectDTO = {
  id: number
  title: string
  description: string
  skills: string[]
  link?: string | null
  repo?: string | null
  image_path?: string | null
}

export type Project = {
  id: number
  title: string
  description: string
  skills: string[]
  link?: string | null
  repo?: string | null
  image: string | null // mapped from image_path
}

export type ProjectInput = {
  title: string
  description: string
  skills: string[]
  link?: string | null
  repo?: string | null
  image_path?: string | null
}

function normalize(p: ProjectDTO): Project {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    skills: Array.isArray(p.skills) ? p.skills : [],
    link: p.link ?? null,
    repo: p.repo ?? null,
    image: p.image_path ?? null,
  }
}

export function useProjects() {
  const nuxtApp = useNuxtApp()
  const { $api } = nuxtApp

  const { data, pending, error, refresh } = useAsyncData('projects', async () => {
    const res: any = await $api('/portfolio', { method: 'GET', query: { resource: 'projects' } })
    const list: ProjectDTO[] = Array.isArray(res) ? res : []
    return list.map(normalize)
  })

  const projects = computed(() => data.value || [])

  async function createProject(input: ProjectInput) {
    await $api('/portfolio', { method: 'POST', query: { resource: 'projects' }, body: input })
    await refresh()
  }

  async function updateProject(id: number, input: ProjectInput) {
    await $api('/portfolio', { method: 'PUT', query: { resource: 'projects', id: String(id) }, body: input })
    await refresh()
  }

  async function deleteProject(id: number) {
    await $api('/portfolio', { method: 'DELETE', query: { resource: 'projects', id: String(id) } })
    await refresh()
  }

  return { projects, pending, error, refresh, createProject, updateProject, deleteProject }
}
