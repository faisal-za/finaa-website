import ServiceCard from './ServiceCard'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

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
      id: 'interiorDesign',
      name: t('interiorDesign.title'),
      description: t('interiorDesign.description'),
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <section id="services" className="py-36 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-0 lg:px-8">
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

        {/* Services Stack */}
        <div className="h-screen ">
          <ScrollStack
            itemStackDistance={30}
            stackPosition="10%"
            scaleEndPosition="100%"
            scaleDuration={3}
            baseScale={0.95}
            itemScale={0.02}
            blurAmount={1}
            enableScrollChaining={true}
            className="scroll-stack-root"
          >
            {displayServices.map((service, index) => (
              <ScrollStackItem
                key={service.id}
                itemClassName="bg-white border border-gray-100 scroll-stack-item"
              >
                <ServiceCard service={service} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* CTA Section */}

        {/* Decorative Elements */}
        <div className="relative mt-20">
          <div className="absolute inset-0 flex items-center justify-center">
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
      </div>
    </section>
  )
}

export default Services