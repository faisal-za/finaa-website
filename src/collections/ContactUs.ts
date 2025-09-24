import type { CollectionConfig } from 'payload'

export const ContactUs: CollectionConfig = {
    slug: 'contact-us',
    labels: {
        singular: {
            en: 'Contact Request',
            ar: 'طلب التواصل',
        },
        plural: {
            en: 'Contact Requests',
            ar: 'طلبات التواصل',
        },
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            localized: true,
            label: {
                en: 'Name',
                ar: 'الاسم',
            },
        },
        {
            name: 'email',
            type: 'email',
            required: false,
            label: {
                en: 'Email',
                ar: 'البريد الإلكتروني',
            },
        },
        {
            name: 'serviceType',
            type: 'select',
            required: false,
            label: {
                en: 'Service Type',
                ar: 'نوع الخدمة',
            },
            admin: {
                isClearable: true,
            },
            options: [
                {
                    label: {
                        en: 'Residential Development',
                        ar: 'التطوير السكني',
                    },
                    value: 'residential-development',
                },
                {
                    label: {
                        en: 'Commercial Construction',
                        ar: 'البناء التجاري',
                    },
                    value: 'commercial-construction',
                },
                {
                    label: {
                        en: 'Project Management',
                        ar: 'إدارة المشاريع',
                    },
                    value: 'project-management',
                },
                {
                    label: {
                        en: 'Architectural Design',
                        ar: 'التصميم المعماري',
                    },
                    value: 'architectural-design',
                },
                {
                    label: {
                        en: 'Renovation & Remodeling',
                        ar: 'التجديد وإعادة التصميم',
                    },
                    value: 'renovation-remodeling',
                },
                {
                    label: {
                        en: 'Land Development',
                        ar: 'تطوير الأراضي',
                    },
                    value: 'land-development',
                },
                {
                    label: {
                        en: 'Consultation Services',
                        ar: 'خدمات الاستشارة',
                    },
                    value: 'consultation-services',
                },
                {
                    label: {
                        en: 'Other',
                        ar: 'أخرى',
                    },
                    value: 'other',
                },
            ],
        },
        {
            name: 'notes',
            type: 'textarea',
            required: false,
            localized: true,
            label: {
                en: 'Notes',
                ar: 'ملاحظات',
            },
        },
    ],
}