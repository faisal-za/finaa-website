import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

const revalidateCache = async (tags: string[]) => {
  try {
    console.log(`🔄 Revalidating cache tags: ${tags.join(', ')}`)

    // Direct revalidation using Next.js API - works in both dev and production
    for (const tag of tags) {
      revalidateTag(tag)
    }

    console.log(`✅ Successfully revalidated: ${tags.join(', ')}`)
  } catch (error) {
    console.error('❌ Error revalidating cache:', error)
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