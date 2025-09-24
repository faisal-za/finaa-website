import type { GlobalConfig } from "payload";

export const Content: GlobalConfig = {
    slug: "content",
    label: {
        ar: "المحتوى"
    },
    fields: [
        {
            name: "services_section",
            label: {
                ar: "قسم الخدمات"
            },
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    localized: true,
                    label: {
                        ar: "العنوان"
                    }
                },
                {
                    name: "description",
                    localized: true,
                    label: {
                        ar: "الوصف"
                    },
                    type: "textarea",
                    admin: {
                        rows: 3
                    }
                }
            ]
        },
        {
            name: "projects_section",
            label: {
                ar: "قسم المشاريع"
            },
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    localized: true,
                    label: {
                        ar: "العنوان"
                    }
                },
                {
                    name: "description",
                    localized: true,
                    label: {
                        ar: "الوصف"
                    },
                    type: "textarea",
                    admin: {
                        rows: 3
                    }
                }
            ]
        }
    ]
}