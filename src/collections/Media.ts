import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: {
      ar: "الملفات"
    },
    singular: {
      ar: "ملف"
    }
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: {
        en: 'Alt Text',
        ar: 'النص البديل',
      },
    },
  ],
  upload: true,
}
