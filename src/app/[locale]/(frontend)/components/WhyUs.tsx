'use client'

import React from 'react'
import { Award, Users, Clock, Shield } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import CountUp from '@/components/ui/CountUp'

const WhyUs = () => {
  const locale = useLocale()
  const t = useTranslations('whyUs')
  const reasons = [
    {
      number: locale === 'ar' ? '٠١' : '01',
      icon: Award,
      title: t('experience.title'),
      description: t('experience.description')
    },
    {
      number: locale === 'ar' ? '٠٢' : '02',
      icon: Users,
      title: t('team.title'),
      description: t('team.description')
    },
    {
      number: locale === 'ar' ? '٠٣' : '03',
      icon: Clock,
      title: t('commitment.title'),
      description: t('commitment.description')
    },
    {
      number: locale === 'ar' ? '٠٤' : '04',
      icon: Shield,
      title: t('quality.title'),
      description: t('quality.description')
    }
  ]

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-[#f7f2ee] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - From Option 2 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#302c30] mb-6 relative">
            {t('title')}
            {/* Architectural line accent */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-[#9c5748]"></div>
          </h2>
          <p className="text-xl text-[#505248] max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Hybrid Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 transition-all duration-500 hover:shadow-2xl"
              style={{
                clipPath: locale === 'ar'
                  ? 'polygon(0 0, 95% 0, 100% 15%, 100% 100%, 3% 100%, 0 85%)'
                  : 'polygon(5% 0, 100% 0, 100% 85%, 97% 100%, 0 100%, 0 15%)',
              }}
            >

              {/* Geometric accent - From Option 1 */}
              <div className={`absolute top-0 w-8 h-8 bg-[#9c5748] ${locale === 'ar' ? 'left-0' : 'right-0'}`}
                style={{ clipPath: locale === 'ar' ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' }} />

              {/* Content Container */}
              <div className="relative z-10">
                {/* Icon and Title Row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#302c30] rounded-full flex items-center justify-center group-hover:bg-[#9c5748] transition-colors duration-300 flex-shrink-0">
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#302c30] mb-2">
                      {reason.title}
                    </h3>
                    {/* Architectural accent line */}
                    <div className="w-12 h-1 bg-[#9c5748] group-hover:w-20 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Description - From Option 2 content */}
                <p className="text-[#505248] leading-relaxed text-base lg:text-lg">
                  {reason.description}
                </p>
              </div>

              {/* Blueprint grid pattern - From Option 2 */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#302c30]"
                    style={{
                      left: `${(i + 1) * 16}%`,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                    }}
                  ></div>
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#302c30]"
                    style={{
                      top: `${(i + 1) * 16}%`,
                      left: 0,
                      right: 0,
                      height: '1px',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section - Combining both approaches */}
        <div className="bg-white p-8 lg:p-12 relative"
          style={{
            clipPath: locale === 'ar'
              ? 'polygon(0 0, 97% 0, 100% 15%, 100% 100%, 3% 100%, 0 85%)'
              : 'polygon(3% 0, 100% 0, 100% 85%, 97% 100%, 0 100%, 0 15%)',
          }}>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-[#302c30]"
                style={{
                  left: `${i * 10}%`,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                type: 'year',
                value: 2024,
                label: t('stats.founded'),
                accent: 'founded'
              },
              {
                type: 'projects',
                value: 150,
                suffix: '+',
                label: t('stats.projects'),
                accent: 'projects'
              },
              {
                type: 'team',
                value: 50,
                suffix: '+',
                label: t('stats.team'),
                accent: 'team'
              },
              {
                type: 'percentage',
                value: 98,
                prefix: '%',
                label: t('stats.satisfaction'),
                accent: 'satisfaction'
              }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl lg:text-4xl font-bold text-[#9c5748] mb-3 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUp
                    from={0}
                    to={stat.value}
                    duration={1.5}
                    delay={index * 0.2}
                    locale={locale === 'ar' ? 'ar-SA' : 'en-US'}
                  />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="text-[#505248] text-base lg:text-lg font-medium">{stat.label}</div>
                <div className="w-8 h-0.5 bg-[#9c5748] mx-auto mt-3 opacity-60 group-hover:opacity-100 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUs