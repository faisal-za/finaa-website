"use server";
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { z } from 'zod'
import rateLimit from '@/lib/rate-limit'

export async function getServices() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const services = await payload.find({
      collection: 'services',
      limit: 10,
      sort: '-createdAt',
    })

    return services.docs
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getProjects() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const projects = await payload.find({
      collection: 'projects',
      limit: 6,
      depth: 2,
      sort: '-createdAt',
    })

    return projects.docs
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getCategories() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const categories = await payload.find({
      collection: 'categories',
      limit: 20,
      sort: 'name',
    })

    return categories.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
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
    // Get client IP for rate limiting
    const clientIP = await getClientIP()

    // Rate limiting checks
    try {
      await contactFormLimiter.check(3, `contact_${clientIP}`) // 3 submissions per minute
      await contactFormDailyLimiter.check(10, `contact_daily_${clientIP}`) // 10 submissions per day
    } catch (rateLimitError) {
      return {
        success: false,
        error: 'Too many requests. Please try again later.',
        rateLimited: true
      }
    }

    // Validate and sanitize input data
    const validationResult = contactFormSchema.safeParse({
      name: sanitizeInput(formData.name),
      email: formData.email ? sanitizeInput(formData.email) : '',
      phone: formData.phone ? sanitizeInput(formData.phone) : '',
      projectType: formData.projectType || '',
      message: sanitizeInput(formData.message),
    })

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid form data',
        validationErrors: validationResult.error.issues
      }
    }

    const sanitizedData = validationResult.data

    // Additional security checks
    const suspiciousPatterns = [
      /script/i,
      /javascript/i,
      /onclick/i,
      /onerror/i,
      /eval\(/i,
      /document\./i,
      /window\./i,
      /<[^>]*>/g, // HTML tags
    ]

    const textToCheck = `${sanitizedData.name} ${sanitizedData.email} ${sanitizedData.message}`

    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      return {
        success: false,
        error: 'Invalid content detected',
        security: true
      }
    }

    // Check for spam keywords
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'winner', 'congratulations',
      'bitcoin', 'cryptocurrency', 'investment', 'urgent', 'click here'
    ]

    const messageWords = sanitizedData.message.toLowerCase().split(' ')
    const spamCount = messageWords.filter(word =>
      spamKeywords.some(spam => word.includes(spam))
    ).length

    if (spamCount > 2) {
      return {
        success: false,
        error: 'Message flagged as spam',
        spam: true
      }
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Store form submission with metadata
    const headersList = await headers()
    const submissionData = {
      ...sanitizedData,
      submittedAt: new Date(),
      clientIP: clientIP,
      userAgent: headersList.get('user-agent') || 'unknown',
      verified: false,
    }

    // Log the submission securely (without sensitive data in logs)
    console.log('Contact form submission received:', {
      timestamp: submissionData.submittedAt,
      hasName: !!sanitizedData.name,
      hasEmail: !!sanitizedData.email,
      hasPhone: !!sanitizedData.phone,
      hasMessage: !!sanitizedData.message,
      messageLength: sanitizedData.message.length,
      clientIP: clientIP.replace(/\d+$/, 'xxx'), // Partial IP for privacy
    })

    // TODO: When ContactUs collection exists, use this:
    // const contact = await payload.create({
    //   collection: 'contactUs',
    //   data: submissionData
    // })

    return {
      success: true,
      message: 'Form submitted successfully'
    }

  } catch (error) {
    console.error('Error submitting contact form:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    })

    return {
      success: false,
      error: 'Failed to submit form. Please try again later.'
    }
  }
}