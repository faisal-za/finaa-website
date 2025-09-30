import type { CollectionConfig } from 'payload'

export const ContactUs: CollectionConfig = {
    slug: 'contact-us',
    labels: {
        singular: {
            en: 'Contact Submission',
            ar: 'طلب تواصل',
        },
        plural: {
            en: 'Contact Submissions',
            ar: 'طلبات التواصل',
        },
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'projectType'],
        listSearchableFields: ['name', 'email', 'message'],
    },
    access: {
        create: () => true, // Allow form submissions
        read: ({ req: { user } }) => !!user, // Only authenticated users can read
        update: ({ req: { user } }) => !!user, // Only authenticated users can update
        delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: {
                en: 'Full Name',
                ar: 'الاسم الكامل',
            },
        },
        {
            name: 'email',
            type: 'email',
            label: {
                en: 'Email Address',
                ar: 'البريد الإلكتروني',
            },
        },
        {
            name: 'phone',
            type: 'text',
            label: {
                en: 'Phone Number',
                ar: 'رقم الهاتف',
            },
        },
        {
            name: 'projectType',
            type: 'relationship',
            relationTo: 'categories',
            label: {
                en: 'Project Type',
                ar: 'نوع المشروع',
            },
            admin: {
                description: {
                    en: 'Select the category that best describes this project inquiry',
                    ar: 'اختر الفئة التي تصف استفسار المشروع بأفضل شكل'
                }
            }
        },
        {
            name: 'message',
            type: 'textarea',
            required: true,
            label: {
                en: 'Message',
                ar: 'الرسالة',
            },
        },
        {
            name: 'clientIP',
            type: 'text',
            label: {
                en: 'Client IP',
                ar: 'عنوان IP',
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
        },
        {
            name: 'userAgent',
            type: 'text',
            label: {
                en: 'User Agent',
                ar: 'معرف المتصفح',
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
        },
    ],
    timestamps: true,
}