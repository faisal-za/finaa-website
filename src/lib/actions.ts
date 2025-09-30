"use server";
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { z } from 'zod'
import rateLimit from '@/lib/rate-limit'
import type { ContactUs } from '@/payload-types'

export async function getProjects(locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const projects = await payload.find({
      collection: 'projects',
      limit: 6,
      depth: 2,
      sort: '-createdAt',
      locale: (locale as 'ar' | 'en') || 'en',
    })

    return projects.docs
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Cached versions with revalidation
export const getCachedProjects = cache(
  unstable_cache(
    async (locale?: string) => getProjects(locale),
    ['projects'],
    { revalidate: 3600, tags: ['projects'] }
  )
)

export const getCachedCategories = cache(
  unstable_cache(
    async (locale?: string) => getCategories(locale),
    ['categories'],
    { revalidate: 3600, tags: ['categories'] }
  )
)

export const getCachedContent = cache(
  unstable_cache(
    async (locale?: string) => getContent(locale),
    ['content'],
    { revalidate: 1800, tags: ['content'] }
  )
)

export async function getCategories(locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const categories = await payload.find({
      collection: 'categories',
      limit: 20,
      sort: 'name',
      locale: (locale as 'ar' | 'en') || 'en',
    })

    return categories.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getContent(locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const content = await payload.findGlobal({
      slug: 'content',
      locale: (locale as 'ar' | 'en') || 'en',
    })

    return content
  } catch (error) {
    console.error('Error fetching content:', error)
    return { stats: [], contact: undefined, social_links: undefined }
  }
}

// Security schema for contact form validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  projectType: z.enum(['residential', 'commercial', 'institutional', 'tourism', 'other'])
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .regex(/^[^<>{}]*$/, 'Message contains invalid characters'),
})

// Rate limiter instances
const contactFormLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

const contactFormDailyLimiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24 hours
  uniqueTokenPerInterval: 1000,
})

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>{}]/g, '') // Remove potential script tags
    .replace(/\s+/g, ' ') // Normalize whitespace
}

async function getClientIP(): Promise<string> {
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIP = headersList.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}

export async function submitContactForm(formData: {
  name: string
  email?: string
  phone?: string
  projectType?: string
  message: string
}) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const headersList = await headers()
    const clientIP = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'

    // Basic rate limiting - 5 submissions per minute per IP
    try {
      await contactFormLimiter.check(5, `contact_${clientIP}`)
    } catch {
      return {
        success: false,
        error: 'Too many requests. Please try again later.'
      }
    }

    // Basic sanitization - remove dangerous HTML/script tags
    const sanitize = (text: string) => text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim()

    // Find category by slug if projectType is provided
    let categoryId: number | undefined = undefined
    if (formData.projectType) {
      const categories = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: formData.projectType }
        },
        limit: 1
      })
      if (categories.docs.length > 0) {
        categoryId = categories.docs[0].id
      }
    }

    // Save to ContactUs collection
    await payload.create({
      collection: 'contact-us',
      data: {
        name: sanitize(formData.name),
        email: formData.email ? sanitize(formData.email) : undefined,
        phone: formData.phone ? sanitize(formData.phone) : undefined,
        projectType: categoryId,
        message: sanitize(formData.message),
        clientIP: clientIP,
        userAgent: headersList.get('user-agent') || 'unknown',
      }
    })

    return {
      success: true,
      message: 'Form submitted successfully'
    }

  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      error: 'Failed to submit form. Please try again later.'
    }
  }
}