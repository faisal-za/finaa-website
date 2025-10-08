'use client'

import React, { useState } from 'react'
import { Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLocale, useTranslations } from 'next-intl'
import { submitContactForm } from '@/lib/actions'

interface ContactProps {
  contact?: {
    whatsapp?: string | null
    email?: string | null
    address?: string | null
  }
}

const Contact = ({ contact }: ContactProps) => {
  const locale = useLocale()
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  // Form validation with basic security
  const formSchema = z.object({
    name: z.string()
      .min(2, { message: t('form.validation.nameRequired') })
      .max(100, { message: 'Name too long' }),
    email: z.string()
      .email({ message: t('form.validation.emailRequired') })
      .max(255, { message: 'Email too long' })
      .optional()
      .or(z.literal('')),
    phone: z.string()
      .min(1, { message: 'Phone number is required' })
      .max(20, { message: 'Phone too long' }),
    category: z.string().optional(),
    message: z.string()
      .min(10, { message: t('form.validation.messageRequired') })
      .max(2000, { message: 'Message too long' }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitContactForm({
        name: values.name.trim(),
        email: values.email?.trim(),
        phone: values.phone?.trim(),
        category: values.category,
        message: values.message.trim(),
      })

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: t('form.success')
        })
        form.reset()
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || t('form.error')
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: t('form.error')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MessageCircle,
      title: locale === 'ar' ? 'واتساب' : 'WhatsApp',
      details: [contact?.whatsapp || '+966 50 123 4567']
    },
    {
      icon: Mail,
      title: t('email'),
      details: [contact?.email || 'info@finaa.sa']
    },
    {
      icon: MapPin,
      title: t('address'),
      details: [contact?.address || t('addressDetails')]
    },
    {
      icon: Clock,
      title: t('workingHours'),
      details: [t('workingHoursDetails')]
    }
  ]

  const projectTypes = [
    { value: 'residential', label: t('form.projectTypes.residential') },
    { value: 'commercial', label: t('form.projectTypes.commercial') },
    { value: 'institutional', label: t('form.projectTypes.institutional') },
    { value: 'tourism', label: t('form.projectTypes.tourism') },
    { value: 'other', label: t('form.projectTypes.other') }
  ]

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#302c30] mb-6 relative">
            {t('title')}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-[#9c5748]"></div>
          </h2>
          <p className="text-xl text-[#505248] max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const getHref = () => {
                if (info.icon === MessageCircle) {
                  // Remove all non-digit characters except the leading +
                  const phoneNumber = (contact?.whatsapp || '+966501234567').replace(/\s+/g, '').replace(/[^\d+]/g, '')
                  return `https://wa.me/${phoneNumber}`
                }
                if (info.icon === Mail) return `mailto:${contact?.email || 'info@finaa.sa'}`
                return undefined
              }

              const href = getHref()
              const isClickable = href && (info.icon === MessageCircle || info.icon === Mail)

              const content = (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#302c30] rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 group-hover:bg-[#9c5748]">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#302c30] mb-3">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-[#505248] mb-1" dir={info.icon === MessageCircle ? 'ltr' : undefined}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              )

              return (
                <div
                  key={index}
                  className={`group bg-[#f7f2ee] p-6 transition-all duration-300 ${isClickable ? 'hover:bg-white cursor-pointer' : ''}`}
                  style={{ clipPath: 'polygon(3% 0, 100% 0, 100% 85%, 97% 100%, 0 100%, 0 15%)' }}
                >
                  {isClickable ? (
                    <a
                      href={href}
                      target={info.icon === MessageCircle ? "_blank" : undefined}
                      rel={info.icon === MessageCircle ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-[#f7f2ee] p-8 lg:p-12 h-full flex flex-col"
            style={{
              clipPath: 'polygon(3% 0, 100% 0, 100% 97%, 97% 100%, 0 100%, 0 3%)',
            }}>
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-[#302c30] mb-6">{t('sendMessage')}</h3>
              <div className="w-16 h-1 bg-[#9c5748]"></div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex-1 flex flex-col"
              >
                {/* Name - Full Width */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#302c30] font-medium">{t('form.fullName')} {t('form.required')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.fullNamePlaceholder')}
                          className={`bg-white border-[#302c30]/20 rounded-none focus-visible:ring-[#9c5748] ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email & Phone - 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#302c30] font-medium">{t('form.email')}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('form.emailPlaceholder')}
                            className={`bg-white border-[#302c30]/20 rounded-none focus-visible:ring-[#9c5748] ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#302c30] font-medium">{t('form.phone')} {t('form.required')}</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t('form.phonePlaceholder')}
                            className={`bg-white border-[#302c30]/20 rounded-none focus-visible:ring-[#9c5748] ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Category - Full Width */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#302c30] font-medium">{t('form.projectType')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                        <FormControl>
                          <SelectTrigger className={`bg-white border-[#302c30]/20 rounded-none focus:ring-[#9c5748] ${locale === 'ar' ? 'text-right' : 'text-left'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                            <SelectValue placeholder={t('form.projectTypePlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align={locale === 'ar' ? 'end' : 'start'} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className={locale === 'ar' ? 'text-right' : 'text-left'}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message - Full Width, Flexible Height */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel className="text-[#302c30] font-medium">{t('form.message')} {t('form.required')}</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          className={`bg-white border-[#302c30]/20 rounded-none focus-visible:ring-[#9c5748] resize-none flex-1 min-h-[150px] `}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status Message */}
                {submitStatus && (
                  <div className={`p-4 rounded-none text-center font-medium ${submitStatus.success
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#302c30] hover:bg-[#9c5748] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 font-medium transition-all duration-300 rounded-none"
                >
                  <Send className={`w-5 h-5 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {isSubmitting ? t('form.sending') : t('form.send')}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact