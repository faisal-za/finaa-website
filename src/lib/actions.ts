"use server";
import { getPayload } from 'payload'
import config from '@/payload.config'

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

export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  projectType?: string
  message: string
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    // TODO: missing payload field ContactUs collection - create ContactUs collection in Payload CMS
    // For now, we'll just log the submission and return success
    console.log('Contact form submission:', formData)

    // When ContactUs collection exists, use this:
    // const contact = await payload.create({
    //   collection: 'contactUs',
    //   data: {
    //     name: formData.name,
    //     email: formData.email,
    //     phone: formData.phone || '',
    //     projectType: formData.projectType || '',
    //     message: formData.message,
    //     submittedAt: new Date(),
    //   }
    // })

    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}