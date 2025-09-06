// composables/useProfile.ts
import { computed } from 'vue'
import { useNuxtApp, useAsyncData } from 'nuxt/app'

export type ProfileDTO = {
  id?: number
  hero_name?: string
  hero_role?: string
  hero_description?: string
  gmail?: string
  phone_number?: string
  linkedin?: string
  github?: string
  work_location?: string
  profile_image?: string
  login_initials?: string
}

export type Profile = {
  id?: number
  hero_name: string
  hero_role: string
  hero_description: string
  email: string
  phone: string
  linkedin?: string
  github?: string
  work_location?: string
  profile_image?: string
  login_initials?: string
}

function normalize(res: ProfileDTO | null): Profile | null {
  if (!res) return null
  return {
    id: res.id,
    hero_name: res.hero_name ?? '',
    hero_role: res.hero_role ?? '',
    hero_description: res.hero_description ?? '',
    email: (res as any).email ?? res.gmail ?? '',
    phone: (res as any).phone ?? res.phone_number ?? '',
    linkedin: res.linkedin ?? '',
    github: res.github ?? '',
    work_location: res.work_location ?? '',
    profile_image: res.profile_image ?? '',
    login_initials: res.login_initials ?? ''
  }
}

function deriveInitials(name: string): string {
  const parts = (name || '').trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : ''
  return (first + last).toUpperCase().slice(0, 2)
}

export function useProfile() {
  const nuxtApp = useNuxtApp()
  const { $api } = nuxtApp

  const { data, pending, error, refresh } = useAsyncData('profile', async () => {
    const res = await $api('/portfolio', { method: 'GET', query: { resource: 'profile' } })
    return normalize(res)
  })

  const profile = computed(() => data.value)
  const initials = computed(() => profile.value?.login_initials || deriveInitials(profile.value?.hero_name || ''))

  return { profile, initials, pending, error, refresh }
}
