'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Maximize2, DotIcon, X } from 'lucide-react'
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
  const [popupMainApi, setPopupMainApi] = useState<CarouselApi>()
  const [popupThumbnailApi, setPopupThumbnailApi] = useState<CarouselApi>()
  const [popupCurrent, setPopupCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const t = useTranslations('projects')

  const images = project.images || []

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

    setCurrent(newIndex)
    thumbnailApi.scrollTo(newIndex)
  }, [mainApi, thumbnailApi])

  // Popup carousel handlers
  const onPopupThumbClick = useCallback(
    (index: number) => {
      if (!popupMainApi || !popupThumbnailApi) return
      popupMainApi.scrollTo(index)
    },
    [popupMainApi, popupThumbnailApi]
  )

  const onPopupSelect = useCallback(() => {
    if (!popupMainApi || !popupThumbnailApi) return
    const newIndex = popupMainApi.selectedScrollSnap()

    setPopupCurrent(newIndex)
    popupThumbnailApi.scrollTo(newIndex)
  }, [popupMainApi, popupThumbnailApi])

  useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on('select', onSelect)
    return () => {
      mainApi.off('select', onSelect)
    }
  }, [mainApi, onSelect])

  useEffect(() => {
    if (!popupMainApi) return
    onPopupSelect()
    popupMainApi.on('select', onPopupSelect)
    return () => {
      popupMainApi.off('select', onPopupSelect)
    }
  }, [popupMainApi, onPopupSelect])

  // Handle popup open/close with smooth animation
  const handleToggleExpand = useCallback(() => {
    if (isExpanded) {
      // Closing
      setIsAnimating(true)
      setTimeout(() => {
        setIsExpanded(false)
        setIsAnimating(false)
        // Restore scrollbar without layout shift
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }, 300)
    } else {
      // Opening
      const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024

      if (isLargeScreen) {
        // Large screen popup logic
        const scrollbarWidth = typeof window !== 'undefined' ? window.innerWidth - document.documentElement.clientWidth : 0
        setIsAnimating(true)
        setIsExpanded(true)
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`

        // Sync popup carousel with main carousel
        setTimeout(() => {
          if (popupMainApi) {
            popupMainApi.scrollTo(current)
          }
          setIsAnimating(false)
        }, 100)
      } else {
        // Mobile/tablet expand logic
        setIsExpanded(true)

        // Auto-scroll to show project details after expansion
        setTimeout(() => {
          if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect()
            const cardBottom = cardRect.bottom + window.scrollY
            const viewportHeight = window.innerHeight
            const targetScroll = cardBottom - viewportHeight + 100 // 100px padding from bottom

            window.scrollTo({
              top: Math.max(0, targetScroll),
              behavior: 'smooth'
            })
          }
        }, 250) // Small delay to allow expansion animation to start
      }
    }
  }, [isExpanded, current, popupMainApi, cardRef])

  const enClipPath = 'polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)'
  const arClipPath = 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)'
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  return (
    <>
      <Card
        ref={cardRef}
        className="group cursor-pointer bg-white transition-all duration-300 hover:-translate-y-1 relative border-0 rounded-none"
        style={{
          clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
          background: '#f7f2ee'
        }}
        onClick={typeof window !== 'undefined' && window.innerWidth >= 1024 ? handleToggleExpand : undefined}
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

          {/* Expand Button - Mobile/Tablet Only */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleExpand()
            }}
            className="lg:hidden absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#302c30] p-2 rounded-full transition-all duration-300 z-10"
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
          {/* <div className="flex flex-wrap gap-4 items-center text-sm">
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
                  <p
                    key={category.id}
                    className="relative px-4 py-1 bg-[#9c5748] text-white text-xs font-semibold rounded-full"
                  >
                    {category.name}
                  </p>
                ))}
              </div>
            )}
          </div> */}

          {/* Project Details - Only show on mobile/tablet when expanded */}
          {project.more_details && project.more_details.length > 0 && (
            <>
              <Separator className="lg:hidden" />
              <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isExpanded
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
                }`}>
                <h4 className="font-bold text-[#302c30] mb-2">{t('projectDetails')}</h4>
                <ul className="text-sm text-[#505248]">
                  {project.more_details.map((detail: any, idx: number) => (
                    <li key={idx} className="flex flex-row items-center">
                      <DotIcon size={30} className="text-[#9c5748]" />
                      <p>{detail.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* iOS-style 3D Touch Popup - Large Screens Only */}
      {(isExpanded || isAnimating) && (
        <div className="hidden lg:block fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with blur */}
          <div
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-500 ease-out ${isExpanded && !isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={handleToggleExpand}
          />

          {/* Centered Popup Card */}
          <div className="flex items-center justify-center min-h-screen p-8">
            <div
              className={`relative bg-white shadow-2xl max-w-5xl w-full  overflow-hidden transform transition-all duration-500 ease-out ${isExpanded && !isAnimating
                ? 'scale-100 opacity-100 translate-y-0'
                : 'scale-95 opacity-0 translate-y-4'
                }`}
              style={{
                clipPath: locale == "ar" ? arClipPath : enClipPath,
                background: '#f7f2ee'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleToggleExpand}
                className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} bg-white/90 hover:bg-white text-[#302c30] p-2 rounded-full duration-300 z-20`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

                {/* Content Section */}
                <div className="flex flex-col p-8 overflow-y-auto ">
                  {/* Title with geometric accent */}
                  <div className="relative mb-6">
                    <div className={`absolute top-0 w-1 h-full bg-[#9c5748] ${locale === 'ar' ? '-right-8' : '-left-8'}`} />
                    <h3 className="text-3xl font-extrabold text-[#302c30] mb-2">
                      {project.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[#505248] leading-relaxed mb-6 text-lg">
                    {project.description}
                  </p>

                  {/* Project Meta Info */}
                  <div className="flex flex-wrap gap-4 items-center text-sm mb-6">
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
                          <p
                            key={category.id}
                            className="relative px-4 py-1 bg-[#9c5748] text-white text-xs font-semibold rounded-full"
                          >
                            {category.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  {project.more_details && project.more_details.length > 0 && (
                    <>
                      <Separator className="mb-6" />
                      <div>
                        <h4 className="font-bold text-[#302c30] mb-4 text-xl">{t('projectDetails')}</h4>
                        <ul className="text-[#505248] space-y-2">
                          {project.more_details.map((detail: any, idx: number) => (
                            <li key={idx} className="flex flex-row items-center">
                              <DotIcon size={30} className="text-[#9c5748] flex-shrink-0" />
                              <p className="text-base">{detail.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* Image Gallery Section */}
                <div className={`relative h-full bg-gradient-to-br from-[#302c30] to-[#505248]`}>
                  <Carousel
                    setApi={setPopupMainApi}
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
                    <CarouselContent>
                      {images.map((img: any, idx: number) => (
                        <CarouselItem key={`popup-${idx}`} className="w-full h-[60vmin]">
                          <div className="relative w-full h-full">
                            <Image
                              src={img.image?.url || '/api/placeholder/600/400'}
                              alt={`${project.name} - ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={index < 3 && idx === 0}
                            />
                          </div>
                        </CarouselItem>

                      ))}
                    </CarouselContent>
                  </Carousel>

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 px-12">
                      <Carousel
                        setApi={setPopupThumbnailApi}
                        className="w-full max-w-sm mx-auto"
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                        opts={{
                          containScroll: 'keepSnaps',
                          dragFree: true,
                          direction: locale === 'ar' ? 'rtl' : 'ltr',
                        }}
                      >
                        <CarouselContent className="flex flex-row justify-center">
                          {images.map((img: any, idx: number) => (
                            <CarouselItem key={`popup-thumb-${idx}`} className="pl-2 md:pl-4 basis-1/6">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onPopupThumbClick(idx)
                                }}
                                className={`relative w-full aspect-square rounded overflow-hidden border-2 transition-all ${idx === popupCurrent
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
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                              </button>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  )
}

export default ProjectCard