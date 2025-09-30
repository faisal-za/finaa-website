"use client"
import ServiceCard from './ServiceCard'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import FadeContent from '@/components/ui/FadeContent'
interface ServicesProps {
  services: any[]
}

const Services = ({ services }: ServicesProps) => {
  const t = useTranslations('services')

  const defaultServices = [
    {
      id: 'architecturalDesign',
      name: t('architecturalDesign.title'),
      description: t('architecturalDesign.description'),
    },
    {
      id: 'projectManagement',
      name: t('projectManagement.title'),
      description: t('projectManagement.description'),
    },
    {
      id: 'constructionSupervision',
      name: t('constructionSupervision.title'),
      description: t('constructionSupervision.description'),
    },
    {
      id: 'interiorDesign',
      name: t('interiorDesign.title'),
      description: t('interiorDesign.description'),
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (<FadeContent duration={500}>
    <section id="services" className="py-24 sm:py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-0 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#302c30] mb-6 relative">
            {t('title')}
            {/* Architectural line accent */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-[#9c5748]"></div>
          </h2>
          <p className="text-xl text-[#505248] max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          {displayServices.map((service, index) => (
            <div key={service.id} className="bg-white border border-gray-100">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* CTA Section */}

        {/* Decorative Elements */}

      </div>
    </section>
    <div className="relative px-6">
      <div className="flex items-center justify-center">
        <div className="opacity-5">
          <Image
            src={"/Finaa-name.svg"}
            width={500}
            height={300}
            alt=''
          />
        </div>
      </div>
    </div>
  </FadeContent>)
}

export default Services