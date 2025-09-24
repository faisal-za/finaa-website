'use client'

import React from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const Footer = () => {
  const locale = useLocale()
  const t = useTranslations('footer')
  const navT = useTranslations('navigation')
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: navT('home'), href: '#hero' },
    { label: navT('services'), href: '#services' },
    { label: navT('projects'), href: '#projects' },
    { label: navT('whyUs'), href: '#why-us' },
    { label: navT('contact'), href: '#contact' }
  ]

  const services = [
    t('servicesList.architecturalDesign'),
    t('servicesList.construction'),
    t('servicesList.realEstateDevelopment'),
    t('servicesList.projectManagement'),
    t('servicesList.consultation')
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
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
              {""}
              <div className={`absolute -bottom-2 w-12 h-0.5 bg-[#9c5748] ${locale === 'ar' ? 'right-0' : 'left-0'}`}></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9c5748] mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#9c5748] flex-shrink-0" />
                <div className="text-gray-300">
                  <p>+966 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#9c5748] flex-shrink-0" />
                <div className="text-gray-300">
                  <p>info@finaa.sa</p>
                </div>
              </div>
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
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-[#9c5748] rounded-full flex items-center justify-center hover:bg-white hover:text-[#302c30] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer