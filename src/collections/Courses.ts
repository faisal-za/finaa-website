import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: {
      en: 'Course',
      ar: 'دورة',
    },
    plural: {
      en: 'Courses',
      ar: 'الدورات',
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
        en: 'Title',
        ar: 'العنوان',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Description',
        ar: 'الوصف',
      },
    },
    {
      name: 'trainingProgram',
      type: 'relationship',
      relationTo: 'training-programs',
      required: true,
      label: {
        en: 'Training Program',
        ar: 'البرنامج التدريبي',
      },
    },
    {
      name: 'instructor',
      type: 'text',
      localized: true,
      label: {
        en: 'Instructor',
        ar: 'المدرب',
      },
    },
    {
      name: 'duration',
      type: 'number',
      label: {
        en: 'Duration (hours)',
        ar: 'المدة (ساعات)',
      },
      admin: {
        description: {
          en: 'Course duration in hours',
          ar: 'مدة الدورة بالساعات',
        },
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: {
        en: 'Start Date',
        ar: 'تاريخ البداية',
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: {
        en: 'End Date',
        ar: 'تاريخ الانتهاء',
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'maxEnrollments',
      type: 'number',
      label: {
        en: 'Maximum Enrollments',
        ar: 'الحد الأقصى للتسجيلات',
      },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Maximum number of students allowed',
          ar: 'الحد الأقصى لعدد الطلاب المسموح به',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: {
        en: 'Status',
        ar: 'الحالة',
      },
      options: [
        {
          label: {
            en: 'Draft',
            ar: 'مسودة',
          },
          value: 'draft',
        },
        {
          label: {
            en: 'Published',
            ar: 'منشور',
          },
          value: 'published',
        },
        {
          label: {
            en: 'Closed',
            ar: 'مغلق',
          },
          value: 'closed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
