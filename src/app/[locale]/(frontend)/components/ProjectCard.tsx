'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Maximize2, DotIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useLocale, useTranslations } from 'next-intl'

interface ProjectCardProps {
  project: any
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const locale = useLocale()
  const t = useTranslations('projects')

  const images = project.images || []

  // Debug logging
  console.log('ProjectCard Debug:', {
    projectName: project.name,
    imagesCount: images.length,
    images: images.map((img: any, idx: number) => ({
      index: idx,
      url: img.image?.url,
      hasImage: !!img.image,
      imageObject: img.image
    })),
    currentIndex: current,
    fullProject: project
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbnailApi) return
      mainApi.scrollTo(index)
    },
    [mainApi, thumbnailApi]
  )

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbnailApi) return
    const newIndex = mainApi.selectedScrollSnap()
    console.log('Carousel Selection:', {
      newIndex,
      totalImages: images.length,
      selectedImageUrl: images[newIndex]?.image?.url
    })
    setCurrent(newIndex)
    thumbnailApi.scrollTo(newIndex)
  }, [mainApi, thumbnailApi, images])

  useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on('select', onSelect)
    return () => {
      mainApi.off('select', onSelect)
    }
  }, [mainApi, onSelect])

  return (
    <Card
      className="group cursor-pointer bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative rounded-0 border-0"
      style={{
        clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
        background: '#f7f2ee'
      }}
    >
      {/* Image Gallery Section */}
      <div className="relative h-80 bg-gradient-to-br from-[#302c30] to-[#505248] w-full">
        <Carousel
          setApi={setMainApi}
          className="w-full h-full"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          opts={{
            loop: true,
            direction: locale === 'ar' ? 'rtl' : 'ltr',
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: false,
            })
          ]}
        >
          <CarouselContent className="h-80">
            {images.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="w-full h-80">
                <div className="relative w-full h-full">
                  <Image
                    src={img.image?.url || '/api/placeholder/600/400'}
                    alt={`${project.name} - ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3 && idx === 0}
                    onLoad={() => console.log('Image loaded:', img.image?.url, 'at index:', idx)}
                    onError={() => console.error('Image failed to load:', img.image?.url, 'at index:', idx)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Thumbnails - Only show if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 px-12">
            <Carousel
              setApi={setThumbnailApi}
              className="w-full max-w-xs mx-auto"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              opts={{
                containScroll: 'keepSnaps',
                dragFree: true,
                direction: locale === 'ar' ? 'rtl' : 'ltr',
              }}
            >
              <CarouselContent className="flex flex-row justify-center">
                {images.map((img: any, idx: number) => (
                  <CarouselItem key={idx} className="pl-2 md:pl-4 basis-1/6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onThumbClick(idx)
                      }}
                      className={`relative w-full aspect-square rounded overflow-hidden border-2 transition-all ${idx === current
                        ? 'border-white opacity-100'
                        : 'border-white/50 opacity-60 hover:opacity-80'
                        }`}
                    >
                      <Image
                        src={img.image?.url || '/api/placeholder/100/100'}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100px"
                        onLoad={() => console.log('Thumbnail loaded:', img.image?.url, 'at index:', idx)}
                        onError={() => console.error('Thumbnail failed to load:', img.image?.url, 'at index:', idx)}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" /> */}

        {/* Expand Button - Mobile Only */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#302c30] p-2 rounded-full opacity-100 sm:hidden transition-all duration-300 z-10"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-col justify-between p-6 gap-y-6 rounded-0 border-0">
        {/* Title with geometric accent */}
        <div className="relative">
          <div className={`absolute top-0 w-1 h-full bg-[#9c5748] ${locale === 'ar' ? '-left-6' : '-right-6'}`} />
          <h3 className="text-2xl font-extrabold text-[#302c30] mb-2">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#505248] leading-relaxed">
          {project.description}
        </p>

        {/* Project Meta Info */}
        <div className="flex flex-wrap gap-4 items-center text-sm">
          {project.location && (
            <div className="flex items-center gap-1.5 text-[#505248]">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
          )}
          {project.year && (
            <div className="flex items-center gap-1.5 text-[#505248]">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
          )}
          {project.categories && project.categories.length > 0 && (
            <div className="">
              {project.categories.map((category: any) => (
                <span
                  key={category.id}
                  className="relative px-4 py-1 bg-[#9c5748] text-white text-xs font-semibold rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Categories with custom design */}
        <Separator />
        {project.details && (
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded
            ? 'block max-h-96 opacity-100'
            : 'sm:block sm:max-h-none sm:opacity-100 max-h-0 opacity-0'
            }`}>
            <h4 className="font-bold text-[#302c30] mb-2">{t('projectDetails')}</h4>
            <ul className="text-sm text-[#505248]">
              {project.details.map((detail: string, idx: number) => (
                <li key={idx} className="flex flex-row items-center">
                  <DotIcon size={30} className="text-[#9c5748]" />
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectCard