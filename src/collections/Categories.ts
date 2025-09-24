import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
    slug: 'categories',
    labels: {
        singular: {
            en: 'Category',
            ar: 'تصنيف',
        },
        plural: {
            en: 'Categories',
            ar: 'التصنيفات',
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
            localized: true,
            label: {
                en: 'Description',
                ar: 'الوصف',
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