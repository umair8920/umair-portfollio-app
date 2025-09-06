// server/api/upload.ts
import { defineEventHandler, readMultipartFormData, H3Event } from 'h3'
import { promises as fsp } from 'fs'
import path from 'path'

async function ensureDir(dir: string) {
  try {
    await fsp.mkdir(dir, { recursive: true })
  } catch {}
}

export default defineEventHandler(async (event: H3Event) => {
  // Only allow POST multipart/form-data
  const method = event.node.req.method || 'GET'
  if (method !== 'POST') {
    event.node.res.statusCode = 405
    return { error: 'Method Not Allowed' }
  }

  const form = await readMultipartFormData(event)
  if (!form || form.length === 0) {
    event.node.res.statusCode = 400
    return { error: 'No file payload received' }
  }

  const filePart = form.find(p => p.name === 'file' && p.type && p.data) as any
  if (!filePart) {
    event.node.res.statusCode = 400
    return { error: 'Missing file field' }
  }

  const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
  if (!allowed.includes(filePart.type)) {
    event.node.res.statusCode = 415
    return { error: 'Unsupported media type' }
  }

  const imagesDir = path.join(process.cwd(), 'public', 'images')
  await ensureDir(imagesDir)

  const ext = (
    filePart.filename?.split('.').pop()?.toLowerCase() ||
    (filePart.type === 'image/png' ? 'png' : filePart.type === 'image/jpeg' ? 'jpg' : 'bin')
  )
  const safeBase = (filePart.filename || 'upload')
    .replace(/[^a-zA-Z0-9_.-]/g, '_')
    .replace(/_{2,}/g, '_')
  const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const filename = `${unique}_${safeBase}.${ext}`

  const absPath = path.join(imagesDir, filename)
  await fsp.writeFile(absPath, filePart.data)

  // Public path that frontend can use in <v-img>
  const publicPath = `/images/${filename}`

  return { path: publicPath }
})
