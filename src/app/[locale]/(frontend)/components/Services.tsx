import ServiceCard from './ServiceCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface ServicesProps {
  services: any[]
}

const Services = ({ services }: ServicesProps) => {
  const t = useTranslations('services')

  // Static services as fallback if no data from CMS
  const defaultServices = [
    {
      id: 'architecturalDesign',
      name: t('architecturalDesign.title'),
      description: t('architecturalDesign.description'),
    },
    {
      id: 'construction',
      name: t('construction.title'),
      description: t('construction.description'),
    },
    {
      id: 'realEstateDevelopment',
      name: t('realEstateDevelopment.title'),
      description: t('realEstateDevelopment.description'),
    },
    {
      id: 'projectManagement',
      name: t('projectManagement.title'),
      description: t('projectManagement.description'),
    },
    {
      id: 'consultation',
      name: t('consultation.title'),
      description: t('consultation.description'),
    },
    {
      id: 'interiorDesign',
      name: t('interiorDesign.title'),
      description: t('interiorDesign.description'),
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Separator className="w-12 bg-[#9c5748]" />
            <span className="text-[#9c5748] font-medium">{t('title')}</span>
            <Separator className="w-12 bg-[#9c5748]" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#302c30] mb-6">
            {t('title')}
          </h2>

          <p className="text-lg text-[#505248] sm:px-24">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayServices.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}

        {/* Decorative Elements */}
        <div className="relative mt-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 sm:gap-8 opacity-5">
              {[...Array(3)].map((_, i) => (
                <svg key={i} viewBox="0 0 200 200" className="w-24 sm:w-34">
                  <path
                    d="M40,40 L160,40 L180,60 L180,180 L60,180 L40,160 Z"
                    fill="#302c30"
                    transform={`rotate(${i * 30} 100 100)`}
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services