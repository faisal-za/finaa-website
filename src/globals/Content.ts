import type { GlobalConfig } from "payload";

export const Content: GlobalConfig = {
    slug: "content",
    label: {
        ar: "المحتوى",
        en: "Content"
    },
    fields: [
        {
            name: 'stats',
            type: 'array',
            label: 'Website Statistics',
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: 'Title'
                },
                {
                    name: 'number',
                    type: 'text',
                    required: true,
                    label: 'Number',
                    admin: {
                        description: 'Examples: 150+, 98%, 24/7, etc.'
                    }
                }
            ]
        },
        {
            name: 'contact',
            type: 'group',
            label: 'Contact Information',
            fields: [
                {
                    name: 'whatsapp',
                    type: 'text',
                    required: true,
                    label: 'WhatsApp Number',
                    admin: {
                        description: 'Include country code (e.g., +966555123456)'
                    }
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                    label: 'Email Address'
                },
                {
                    name: 'address',
                    type: 'group',
                    label: 'Address',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            localized: true,
                            label: 'Address Title'
                        },
                        {
                            name: 'link',
                            type: 'text',
                            required: true,
                            label: 'Map Link',
                            admin: {
                                description: 'Google Maps or other map service URL'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}