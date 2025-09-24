import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: {
      en: 'Service',
      ar: 'خدمة',
    },
    plural: {
      en: 'Services',
      ar: 'الخدمات',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Name',
        ar: 'الاسم',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Image',
        ar: 'الصورة',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Description',
        ar: 'الوصف',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: {
        en: 'Slug',
        ar: 'الرابط',
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}