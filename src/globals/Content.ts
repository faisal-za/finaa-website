import type { GlobalConfig } from "payload";
import { revalidateContent } from '@/hooks/revalidate'

export const Content: GlobalConfig = {
    slug: "content",
    hooks: {
        afterChange: [revalidateContent],
    },
    label: {
        ar: "المحتوى",
        en: "Content"
    },
    fields: [
        {
            name: 'stats',
            type: 'array',
            labels: {
                singular: {
                    en: 'Statistic',
                    ar: 'إحصائية'
                },
                plural: {
                    en: 'Website Statistics',
                    ar: 'إحصائيات الموقع'
                }
            },
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: {
                        en: 'Title',
                        ar: 'العنوان'
                    }
                },
                {
                    name: 'number',
                    type: 'text',
                    required: true,
                    label: {
                        en: 'Number',
                        ar: 'الرقم'
                    },
                    admin: {
                        description: 'Examples: 150+, 98%, 24/7, etc.'
                    }
                }
            ]
        },
        {
            name: 'contact',
            type: 'group',
            label: {
                en: 'Contact Information',
                ar: 'معلومات التواصل'
            },
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: 'whatsapp',
                            type: 'text',
                            required: true,
                            label: {
                                en: 'WhatsApp Number',
                                ar: 'رقم الواتساب'
                            }
                        },
                        {
                            name: 'email',
                            type: 'email',
                            required: true,
                            label: {
                                en: 'Email Address',
                                ar: 'البريد الإلكتروني'
                            }
                        },
                        {
                            name: 'address',
                            type: 'text',
                            label: {
                                en: 'Address',
                                ar: 'العنوان'
                            },
                            localized: true,
                        }
                    ]
                },

            ]
        },
        {
            name: "social_links",
            type: "group",
            label: {
                en: 'Social Media Links',
                ar: 'روابط التواصل الاجتماعي'
            },
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: 'instagram',
                            type: 'text',
                            label: {
                                en: 'Instagram URL',
                                ar: 'رابط انستقرام'
                            },
                            admin: {
                                description: 'Full Instagram profile URL (e.g., https://instagram.com/username)'
                            }
                        },
                        {
                            name: 'linkedin',
                            type: 'text',
                            label: {
                                en: 'LinkedIn URL',
                                ar: 'رابط لينكد إن'
                            },
                            admin: {
                                description: 'Full LinkedIn profile URL (e.g., https://linkedin.com/company/name)'
                            }
                        },
                        {
                            name: 'tiktok',
                            type: 'text',
                            label: {
                                en: 'TikTok URL',
                                ar: 'رابط تيك توك'
                            },
                            admin: {
                                description: 'Full TikTok profile URL (e.g., https://tiktok.com/@username)'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}