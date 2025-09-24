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
            name: 'slug',
            type: 'text',
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
    ],
}