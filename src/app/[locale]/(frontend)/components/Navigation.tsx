'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X, Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('navigation')
  const pathname = usePathname()
  const router = useRouter()

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Mobile menu handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleLanguageSwitch = useCallback(() => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    router.replace(pathname, { locale: newLocale })
  }, [locale, pathname, router])

  const navLinks = useMemo(() => [
    { href: '#hero', label: t('home') },
    { href: '#services', label: t('services') },
    { href: '#projects', label: t('projects') },
    { href: '#why-us', label: t('whyUs') },
    { href: '#contact', label: t('contact') },
  ], [t])

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white py-4'
          }`}
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 50,
          width: '100%',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/finaa-black.svg"
                alt="Finaa Design & Build"
                width={100}
                height={140}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-[#302c30] hover:text-[#9c5748] transition-colors font-medium cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Switcher */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLanguageSwitch}
                className="text-[#302c30] hover:text-[#9c5748] hover:bg-[#f7f2ee]"
                aria-label="Switch language"
              >
                <Globe className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="border-[#302c30]  text-[#302c30] hover:bg-[#302c30] hover:text-white"
              >
                <Phone className={`w-4 h-4 `} />
                {t('contactUs')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#302c30]" />
              ) : (
                <Menu className="w-6 h-6 text-[#302c30]" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-22 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 lg:hidden ${isMobileMenuOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`text-lg text-[#302c30] hover:text-[#9c5748] font-medium cursor-pointer py-2 px-3 rounded-lg hover:bg-[#f7f2ee] transform transition-all duration-300 ${isMobileMenuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
                  }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 my-2" />

            {/* Language Switcher Mobile */}
            <Button
              variant="outline"
              className="border-[#302c30] text-[#302c30] hover:bg-[#302c30] hover:text-white w-full py-3"
              onClick={() => {
                handleLanguageSwitch()
                setIsMobileMenuOpen(false)
              }}
            >
              <Globe className={`w-4 h-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {locale === 'ar' ? 'English' : 'العربية'}
            </Button>

            <Button
              className="bg-[#302c30] hover:bg-[#505248] text-white w-full py-3 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className={`w-4 h-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </div>

      {/* No spacer needed as Hero has its own padding */}
    </>
  )
}

export default Navigation