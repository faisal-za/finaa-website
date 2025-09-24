import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description?: string
    image?: {
      url?: string
      alt?: string
    }
  }
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const locale = useLocale()
  const t = useTranslations('services')
  const colors = ['#9c5748', '#505248', '#302c30']
  const accentColor = colors[index % colors.length]

  return (
    <Link href={`/services/${service.id}`} className="group block h-full">
      <div
        className="relative bg-white p-8 h-full transition-all duration-500 hover:shadow-2xl group"
        style={{
          clipPath: 'polygon(3% 0, 100% 0, 100% 85%, 97% 100%, 0 100%, 0 15%)',
        }}
      >
        {/* Geometric accent */}
        <div
          className={`absolute top-0 w-8 h-8 ${locale === 'ar' ? 'left-0' : 'right-0'}`}
          style={{
            backgroundColor: accentColor,
            clipPath: locale === 'ar' ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)'
          }}
        />

        {/* Blueprint grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute bg-[#302c30]"
              style={{
                left: `${(i + 1) * 16}%`,
                top: 0,
                bottom: 0,
                width: '1px',
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute bg-[#302c30]"
              style={{
                top: `${(i + 1) * 16}%`,
                left: 0,
                right: 0,
                height: '1px',
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Service Visual */}
          <div className="mb-6">
            {service.image?.url ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={service.image.url}
                  alt={service.image.alt || service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#302c30]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute bottom-4 right-4">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced Geometric Pattern Placeholder */
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#f7f2ee] to-white">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <pattern id={`pattern-${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <polygon points="15,0 30,15 15,30 0,15" fill={accentColor} opacity="0.1" />
                      <polygon points="15,15 22,8 22,22 15,15" fill={accentColor} opacity="0.2" />
                    </pattern>
                    <pattern id={`lines-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="10" x2="20" y2="10" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                      <line x1="10" y1="0" x2="10" y2="20" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill={`url(#pattern-${index})`} />
                  <rect width="200" height="200" fill={`url(#lines-${index})`} />
                </svg>

                {/* Service Icon/Letter with architectural styling */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-3xl font-bold transform transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: accentColor }}
                    >
                      {service.name.charAt(0)}
                    </div>
                    {/* Small accent line */}
                    <div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-0.5 transition-all duration-300 group-hover:w-12"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#302c30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                </div>
              </div>
            )}
          </div>

          {/* Service Content */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-[#302c30] mb-3 group-hover:text-[#9c5748] transition-colors duration-300">
                {service.name}
              </h3>
              {/* Architectural accent line */}
              <div
                className="w-12 h-1 transition-all duration-300 group-hover:w-20"
                style={{ backgroundColor: accentColor }}
              />
            </div>

            {service.description && (
              <p className="text-[#505248] text-sm lg:text-base leading-relaxed flex-1">
                {service.description}
              </p>
            )}

          </div>
        </div>
      </div>
    </Link>
  )
}

export default ServiceCard