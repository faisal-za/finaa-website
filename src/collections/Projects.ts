import type { CollectionConfig } from 'payload'
import { revalidateProjects } from '@/hooks/revalidate'

export const Projects: CollectionConfig = {
    slug: 'projects',
    hooks: {
        afterChange: [revalidateProjects],
    },
    labels: {
        singular: {
            en: 'Project',
            ar: 'مشروع',
        },
        plural: {
            en: 'Projects',
            ar: 'المشاريع',
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
            name: "end_date",
            label: {
                ar: "تاريخ الإ‘نشاء",
                en: "End Date"
            },
            type: "date",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: "monthOnly",
                }
            }
        },
        {
            name: "more_details",
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
                position: 'sidebar',
            },
        },
    ],
}