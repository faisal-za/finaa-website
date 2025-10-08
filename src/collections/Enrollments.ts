import type { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: {
      en: 'Enrollment',
      ar: 'تسجيل',
    },
    plural: {
      en: 'Enrollments',
      ar: 'التسجيلات',
    },
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'trainingProgram', 'status', 'enrolledAt'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: {
        en: 'User',
        ar: 'المستخدم',
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      label: {
        en: 'Status',
        ar: 'الحالة',
      },
      options: [
        {
          label: {
            en: 'Pending',
            ar: 'قيد الانتظار',
          },
          value: 'pending',
        },
        {
          label: {
            en: 'Approved',
            ar: 'موافق عليه',
          },
          value: 'approved',
        },
        {
          label: {
            en: 'Rejected',
            ar: 'مرفوض',
          },
          value: 'rejected',
        },
        {
          label: {
            en: 'Completed',
            ar: 'مكتمل',
          },
          value: 'completed',
        },
        {
          label: {
            en: 'Cancelled',
            ar: 'ملغي',
          },
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'enrolledAt',
      type: 'date',
      label: {
        en: 'Enrollment Date',
        ar: 'تاريخ التسجيل',
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      label: {
        en: 'Completion Date',
        ar: 'تاريخ الإنجاز',
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      label: {
        en: 'Progress (%)',
        ar: 'التقدم (%)',
      },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Course completion progress percentage',
          ar: 'نسبة التقدم في إنجاز الدورة',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Notes',
        ar: 'ملاحظات',
      },
      admin: {
        description: {
          en: 'Additional notes or comments',
          ar: 'ملاحظات أو تعليقات إضافية',
        },
      },
    },
  ],
  indexes: [
    {
      fields: ['user', 'trainingProgram'],
      unique: true,
    },
  ],
}
