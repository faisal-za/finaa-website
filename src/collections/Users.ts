import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: {
      ar: "المستخدمين"
    },
    singular: {
      ar: "مستخدم"
    }
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {},
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
