import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
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
            required: true,
            minRows: 1,
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
            name: 'status',
            type: 'select',
            defaultValue: 'in-progress',
            label: {
                en: 'Status',
                ar: 'الحالة',
            },
            options: [
                {
                    label: {
                        en: 'Planning',
                        ar: 'التخطيط',
                    },
                    value: 'planning',
                },
                {
                    label: {
                        en: 'In Progress',
                        ar: 'قيد التنفيذ',
                    },
                    value: 'in-progress',
                },
                {
                    label: {
                        en: 'Completed',
                        ar: 'مكتمل',
                    },
                    value: 'completed',
                },
            ],
            admin: {
                position: 'sidebar',
            },
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