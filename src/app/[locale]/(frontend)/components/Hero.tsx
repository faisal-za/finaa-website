'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import CountUp from '@/components/ui/CountUp'
import FadeContent from '@/components/ui/FadeContent'

interface HeroProps {
  stats?: Array<{
    title: string
    number: string
  }>
}

const Hero = ({ stats = [] }: HeroProps) => {
  const t = useTranslations('hero')
  const statsT = useTranslations('whyUs.stats')
  const locale = useLocale()

  // Helper function to format numbers using Intl for proper localization
  const formatNumber = (str: string, locale: string): string => {
    return str.replace(/\d+/g, (match) => {
      const num = parseInt(match)
      return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
        useGrouping: false
      }).format(num)
    })
  }

  // Fallback to hardcoded values if no stats provided
  const displayStats = stats.length > 0 ? stats : [
    { title: statsT('projects'), number: '120+' },
    { title: statsT('team'), number: '50+' },
    { title: statsT('satisfaction'), number: '98%' }
  ]

  // Helper function to extract numeric value from stat number
  const extractNumber = (numberStr: string): number => {
    const match = numberStr.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  }

  // Helper function to extract prefix/suffix
  const extractPrefixSuffix = (numberStr: string) => {
    const numMatch = numberStr.match(/\d+/)
    if (!numMatch) return { prefix: '', suffix: '' }

    const num = numMatch[0]
    const beforeNum = numberStr.substring(0, numberStr.indexOf(num))
    const afterNum = numberStr.substring(numberStr.indexOf(num) + num.length)

    return { prefix: beforeNum, suffix: afterNum }
  }

  const handleSmoothScroll = (targetId: string) => {
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
    <FadeContent blur={true} duration={300} easing="ease-out" initialOpacity={0}>
      <section id="hero" className="relative bg-gradient-to-b from-[#f7f2ee] mt-18 to-white overflow-hidden">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className={`absolute top-4 ${locale == "ar" ? "left" : "right"}-10 sm:top-8 sm:right-8 aspect-square w-24 sm:w-24 lg:w-32`}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M40,40 L160,40 L180,60 L180,180 L60,180 L40,160 Z" fill="#302c30" />
            </svg>
          </div>
          <div className={`absolute bottom-4 ${locale == "ar" ? "right" : "left"}-4 sm:bottom-8 sm:left-8 aspect-square w-24 sm:w-24 lg:w-24`}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M20,80 L80,20 L180,20 L180,120 L120,180 L20,180 Z" fill="#9c5748" />
            </svg>
          </div>
        </div>
        {/* Hero Grid */}
        <div className="container grid grid-cols-1 xl:grid-cols-2 mx-auto w-full px-4 sm:px-6 lg:px-8 sm:mt-36">
          {/* Content Section */}
          <div className="flex flex-col justify-center py-8 lg:py-12 pb-8 space-y-12 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="flex flex-col xl:flex-col gap-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#302c30] leading-tight">
                {t('title')}
                <span className="block text-[#9c5748] mt-1 sm:mt-2">{t('subtitle')}</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#505248] leading-relaxed max-w-lg">
                {t('description')}
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-[#302c30] hover:bg-[#505248] text-white text-base sm:text-lg px-6 py-3 sm:py-4"
                onClick={() => handleSmoothScroll('contact')}
              >
                {t('getQuote')}
                <ArrowLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${locale === 'ar' ? '' : 'rotate-180'}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#302c30] text-[#302c30] hover:bg-[#f7f2ee] text-base sm:text-lg px-6 py-3 sm:py-4"
                onClick={() => handleSmoothScroll('projects')}
              >
                {t('viewProjects')}
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-gray-200">
              {displayStats.slice(0, 3).map((stat, index) => {
                const { prefix, suffix } = extractPrefixSuffix(stat.number)
                const number = extractNumber(stat.number)

                return (
                  <div key={index} className={`text-center ${locale === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="flex flex-row items-center justify-center sm:justify-start text-xl sm:text-2xl lg:text-3xl font-bold text-[#302c30]">
                      {prefix && <p>{formatNumber(prefix, locale)}</p>}
                      <CountUp
                        from={0}
                        to={number}
                        separator=","
                        direction="up"
                        duration={0.5 + index * 0.25}
                        locale={locale === 'ar' ? 'ar-SA' : 'en-US'} />
                      {suffix && <p>{formatNumber(suffix, locale)}</p>}
                    </div>
                    <div className="text-sm text-[#505248] mt-1">{stat.title}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual Section */}
          <div className="hidden xl:flex items-center justify-center py-8 lg:py-12">
            <div className={`relative w-full max-w-md ${locale === 'ar' ? 'mr-auto' : 'ml-auto'}`} style={{ height: 'min(60vh, 400px)' }}>
              {/* Main Building Blocks */}
              <div className="absolute top-0 right-0 w-48 h-64 bg-[#302c30] transform rotate-3 rounded-lg shadow-2xl"></div>
              <div className="absolute top-10 left-0 w-48 h-64 bg-[#9c5748] transform -rotate-3 rounded-lg shadow-2xl"></div>
              <div className="absolute top-20 left-1/4 w-48 h-64 bg-[#505248] rounded-lg shadow-2xl"></div>

              {/* Floating Elements */}
              <div className="absolute -top-10 right-10 w-20 h-20 border-4 border-[#9c5748] rounded-full"></div>
              <div className="absolute -top-12 left-10 w-16 h-16 bg-[#302c30] rounded-full opacity-5"></div>

              {/* Brand Text Overlay */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 text-[#302c30] bg-white/90 px-6 py-2 rounded-lg">{t('brandName', { default: 'فِناء' })}</div>
                  <div className="text-lg sm:text-xl text-[#302c30] bg-white/90 px-4 py-1 rounded">{t('brandTagline', { default: 'بـناء وتصمـيم' })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:flex justify-center pt-24">
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#302c30]" />
          </div>
        </div>
      </section>
    </FadeContent>
  )
}

export default Hero