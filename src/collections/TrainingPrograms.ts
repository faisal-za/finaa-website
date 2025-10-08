import type { CollectionConfig } from 'payload'
import { revalidateProjects } from '@/hooks/revalidate'

export const TrainingProgram: CollectionConfig = {
    slug: 'training-programs',
    hooks: {
        afterChange: [revalidateProjects],
    },
    labels: {
        singular: {
            en: 'Training Program',
            ar: 'برنامج تدريبي',
        },
        plural: {
            en: 'Training Programs',
            ar: 'البرامج التدريبية',
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
            name: 'images',
            label: {
                ar: "الصور"
            },
            type: 'array',
            required: false, // Temporarily made optional for seeding
            minRows: 1,
            maxRows: 10,
            labels: {
                singular: {
                    en: 'Image',
                    ar: 'صورة',
                },
                plural: {
                    en: 'Images',
                    ar: 'الصور',
                },
            },
            fields: [
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
                    name: 'caption',
                    type: 'text',
                    localized: true,
                    label: {
                        en: 'Caption',
                        ar: 'الوصف',
                    },
                },
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            required: true,
            label: {
                en: 'Categories',
                ar: 'الفئات',
            },
        },
        {
            name: "location",
            label: {
                ar: "الموقع",
                en: "location"
            },
            admin: {
                position: "sidebar"
            },
            type: "group",
            required: true,
            fields: [
                {
                    name: "title",
                    type: "text",
                    label: {
                        en: "Title",
                        ar: "النص"
                    }
                },
                {
                    name: "link",
                    type: "text",
                    label: {
                        en: "Link",
                        ar: "الرابط"
                    }
                }
            ]
        },
        {
            name: "start_date",
            type: "date",
            label: {
                ar: "تاريخ البداية",
                en: "Start Date"
            },
            admin: {
                position: "sidebar",
                date: {
                    minDate: new Date().toISOString(),
                    pickerAppearance: "dayOnly",
                }
            }
        },
        {
            name: "end_date",
            label: {
                ar: "تاريخ الانتهاء",
                en: "End Date"
            },
            type: "date",
            admin: {
                position: "sidebar",
                date: {
                    minDate: new Date().toISOString(),
                    pickerAppearance: "dayOnly",
                }
            }
        },
        {
            name: "more_details",
            label: {
                ar: "تفاصيل البرنامج",
                en: "Program Details"
            },
            type: "array",
            maxRows: 10,
            labels: {
                singular: {
                    ar: "فقرة",
                    en: "Point"
                },
                plural: {
                    ar: "تفاصيل المشروع",
                    en: "Proejct Details"
                }
            },
            fields: [
                {
                    name: "text",
                    type: "text",
                    label: {
                        ar: "فقرة",
                        an: "point"
                    },
                }
            ]
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
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
        {
            name: 'courses',
            type: 'join',
            collection: 'courses',
            on: 'trainingProgram',
            label: {
                en: 'Courses',
                ar: 'الدورات',
            },
        },
    ],
}