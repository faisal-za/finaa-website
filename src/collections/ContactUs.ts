import type { CollectionConfig } from 'payload'

export const ContactUs: CollectionConfig = {
    slug: 'contactUs',
    labels: {
        singular: {
            en: 'Contact Submission',
            ar: 'رسالة تواصل',
        },
        plural: {
            en: 'Contact Submissions',
            ar: 'رسائل التواصل',
        },
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'projectType', 'submittedAt'],
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
            type: 'select',
            label: {
                en: 'Project Type',
                ar: 'نوع المشروع',
            },
            options: [
                { label: { en: 'Residential', ar: 'سكني' }, value: 'residential' },
                { label: { en: 'Commercial', ar: 'تجاري' }, value: 'commercial' },
                { label: { en: 'Institutional', ar: 'مؤسسي' }, value: 'institutional' },
                { label: { en: 'Tourism', ar: 'سياحي' }, value: 'tourism' },
                { label: { en: 'Other', ar: 'أخرى' }, value: 'other' },
            ],
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
            name: 'submittedAt',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
            label: {
                en: 'Submitted At',
                ar: 'تاريخ الإرسال',
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
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
        {
            name: 'status',
            type: 'select',
            label: {
                en: 'Status',
                ar: 'الحالة',
            },
            defaultValue: 'new',
            options: [
                { label: { en: 'New', ar: 'جديد' }, value: 'new' },
                { label: { en: 'In Progress', ar: 'قيد المعالجة' }, value: 'in_progress' },
                { label: { en: 'Replied', ar: 'تم الرد' }, value: 'replied' },
                { label: { en: 'Closed', ar: 'مغلق' }, value: 'closed' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'notes',
            type: 'textarea',
            label: {
                en: 'Internal Notes',
                ar: 'ملاحظات داخلية',
            },
            admin: {
                description: 'Internal notes for team members (not visible to client)',
            },
        },
    ],
    timestamps: true,
}