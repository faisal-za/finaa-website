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
  auth: { useAPIKey: true },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      localized: true,
      label: {
        en: 'Role',
        ar: 'الدور',
      },
      options: [
        {
          label: {
            en: 'Admin',
            ar: 'مدير النظام',
          },
          value: 'admin',
        },
        {
          label: {
            en: 'Trainee',
            ar: 'متدرب',
          },
          value: 'trainee',
        },
      ],
      defaultValue: 'admin',
    },
  ],
}
