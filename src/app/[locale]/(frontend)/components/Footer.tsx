'use client'

import React from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Linkedin, } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import TikTokIcon from '@/components/icons/TikTokIcon'

interface FooterProps {
  contact?: {
    whatsapp?: string | null
    email?: string | null
    address?: string | null
  }
  socialLinks?: {
    instagram?: string | null
    linkedin?: string | null
    tiktok?: string | null
  }
}

const Footer = ({ contact, socialLinks }: FooterProps) => {
  const locale = useLocale()
  const t = useTranslations('footer')
  const navT = useTranslations('navigation')
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: navT('home'), href: '#hero' },
    { label: navT('services'), href: '#services' },
    { label: navT('projects'), href: '#projects' },
    { label: navT('whyUs'), href: '#why-us' },
  ]

  const services = [
    t('servicesList.architecturalDesign'),
    t('servicesList.realEstateDevelopment'),
    t('servicesList.projectManagement'),
    t('servicesList.consultation')
  ]

  const socialLinksArray = [
    ...(socialLinks?.instagram ? [{ icon: Instagram, href: socialLinks.instagram, label: 'Instagram' }] : []),
    ...(socialLinks?.linkedin ? [{ icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' }] : []),
    ...(socialLinks?.tiktok ? [{ icon: TikTokIcon, href: socialLinks.tiktok, label: 'TikTok' }] : []),
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      const navHeight = 80
      const elementPosition = element.offsetTop - navHeight

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-[#302c30] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/Finaa-Logo.svg"
                alt="Finaa Design & Build"
                width={210}
                height={60}
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              {t('quickLinks')}
              <div className={`absolute -bottom-2 w-12 h-0.5 bg-[#9c5748] ${locale === 'ar' ? 'right-0' : 'left-0'}`}></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-gray-300 hover:text-[#9c5748] transition-colors cursor-pointer block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              {t('services')}
              <div className={`absolute -bottom-2 w-12 h-0.5 bg-[#9c5748] ${locale === 'ar' ? 'right-0' : 'left-0'}`}></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              <div className={`absolute -bottom-2 w-12 h-0.5 bg-[#9c5748] ${locale === 'ar' ? 'right-0' : 'left-0'}`}></div>
            </h3>
            <div className="space-y-4">
              {contact?.address && (
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-[#9c5748] mt-1 flex-shrink-0" />
                  <div>
                    <p>{contact.address}</p>
                  </div>
                </div>
              )}

              {contact?.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '').replace(/[^\d+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#9c5748] transition-colors cursor-pointer group"
                >
                  <Phone className="w-5 h-5 text-[#9c5748] flex-shrink-0 group-hover:text-white" />
                  <div>
                    <p dir="ltr">{contact.whatsapp}</p>
                  </div>
                </a>
              )}

              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#9c5748] transition-colors cursor-pointer group"
                >
                  <Mail className="w-5 h-5 text-[#9c5748] flex-shrink-0 group-hover:text-white" />
                  <div>
                    <p>{contact.email}</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} {t('copyright')}
            </div>
            <div className="flex gap-4">
              {socialLinksArray.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center rounded-full bg-[#9c5748] justify-center hover:bg-white hover:text-[#302c30] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer