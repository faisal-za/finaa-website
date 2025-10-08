"use server";
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Training Programs
export async function getTrainingPrograms(locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const programs = await payload.find({
      collection: 'training-programs',
      depth: 2,
      sort: '-createdAt',
      locale: (locale as 'ar' | 'en') || 'en',
    })

    return programs.docs
  } catch (error) {
    console.error('Error fetching training programs:', error)
    return []
  }
}

export const getCachedTrainingPrograms = cache(
  unstable_cache(
    async (locale?: string) => getTrainingPrograms(locale),
    ['training-programs'],
    { revalidate: 3600, tags: ['training-programs'] }
  )
)

// Courses
export async function getCourses(locale?: string, trainingProgramId?: string | number) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const courses = await payload.find({
      collection: 'courses',
      depth: 2,
      sort: '-createdAt',
      locale: (locale as 'ar' | 'en') || 'en',
      where: trainingProgramId ? {
        trainingProgram: { equals: trainingProgramId }
      } : undefined,
    })

    return courses.docs
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export const getCachedCourses = cache(
  unstable_cache(
    async (locale?: string, trainingProgramId?: string | number) => getCourses(locale, trainingProgramId),
    ['courses'],
    { revalidate: 3600, tags: ['courses'] }
  )
)

// Categories
export async function getCategories(locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const categories = await payload.find({
      collection: 'categories',
      sort: 'name',
      locale: (locale as 'ar' | 'en') || 'en',
    })

    return categories.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const getCachedCategories = cache(
  unstable_cache(
    async (locale?: string) => getCategories(locale),
    ['categories'],
    { revalidate: 3600, tags: ['categories'] }
  )
)

// Enrollments
export async function getUserEnrollments(userId: string | number) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const enrollments = await payload.find({
      collection: 'enrollments',
      depth: 2,
      sort: '-enrolledAt',
      where: {
        user: { equals: userId }
      },
    })

    return enrollments.docs
  } catch (error) {
    console.error('Error fetching user enrollments:', error)
    return []
  }
}

export async function createEnrollment(data: {
  user: string | number
  trainingProgram: string | number
  status?: string
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const enrollment = await payload.create({
      collection: 'enrollments',
      data: {
        user: data.user,
        trainingProgram: data.trainingProgram,
        status: data.status || 'pending',
        enrolledAt: new Date().toISOString(),
        progress: 0,
      }
    })

    return { success: true, enrollment }
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return {
      success: false,
      error: 'Failed to create enrollment'
    }
  }
}

export async function updateEnrollmentProgress(
  enrollmentId: string | number,
  progress: number
) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const enrollment = await payload.update({
      collection: 'enrollments',
      id: enrollmentId,
      data: { progress }
    })

    return { success: true, enrollment }
  } catch (error) {
    console.error('Error updating enrollment progress:', error)
    return {
      success: false,
      error: 'Failed to update enrollment progress'
    }
  }
}
