import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

const revalidateCache = async (tags: string[]) => {
  if (process.env.NODE_ENV !== 'production') return

  const secret = process.env.REVALIDATION_SECRET
  if (!secret) {
    console.warn('REVALIDATION_SECRET not set, skipping cache revalidation')
    return
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secret, tags }),
    })

    if (!response.ok) {
      console.error('Failed to revalidate cache:', await response.text())
    }
  } catch (error) {
    console.error('Error revalidating cache:', error)
  }
}

export const revalidateProjects: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCache(['projects'])
  return doc
}

export const revalidateCategories: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCache(['categories'])
  return doc
}

export const revalidateServices: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCache(['services'])
  return doc
}

export const revalidateContent: GlobalAfterChangeHook = async ({ doc, req }) => {
  await revalidateCache(['content'])
  return doc
}