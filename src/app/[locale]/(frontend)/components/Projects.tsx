'use client'

import React, { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import FadeContent from '@/components/ui/FadeContent'
interface ProjectsProps {
  projects: any[]
  categories: any[]
}

const Projects: React.FC<ProjectsProps> = ({ projects, categories }) => {
  const t = useTranslations('projects')
  const locale = useLocale()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const displayProjects = projects

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return displayProjects

    return displayProjects.filter(project =>
      project.categories?.some((cat: any) =>
        cat.id === selectedCategory || cat.slug === selectedCategory
      )
    )
  }, [displayProjects, selectedCategory])

  // Use Payload categories if available, otherwise fallback to translations
  const displayCategories = useMemo(() => {
    const allCategory = { id: 'all', name: t('categories.all'), slug: 'all' }

    if (categories.length > 0) {
      const payloadCategories = categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name, // Payload returns localized content based on locale parameter
        slug: cat.slug
      }))
      return [allCategory, ...payloadCategories]
    }

    // Return only "All" if no categories from CMS
    return [allCategory]
  }, [categories, t])

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302c30] mb-6 relative">
            {t('title')}
            {/* Architectural line accent */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-[#9c5748]"></div>
          </h2>
          <p className="text-lg text-[#505248] mx-auto max-w-3xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {displayCategories.map((category) => (
            <Button
              key={category.id || category.slug}
              variant={selectedCategory === (category.id || category.slug) ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id || category.slug)}
              className={
                selectedCategory === (category.id || category.slug)
                  ? 'bg-[#302c30] text-white hover:bg-[#505248] cursor-pointer'
                  : 'border-[#302c30] text-[#302c30] hover:bg-[#f7f2ee] cursor-pointer'
              }
            >
              {category.name || 'Unnamed Category'}
            </Button>
          ))}
          {displayCategories.length === 0 && (
            <div className="text-red-500 text-sm">No categories found!</div>
          )}
        </div>

        {/* Projects Grid - Creative Masonry Layout */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-[#505248] text-lg mb-4">
              {selectedCategory === 'all'
                ? (locale === 'ar' ? 'لا توجد مشاريع متاحة حالياً' : 'No projects available at the moment')
                : (locale === 'ar' ? 'لا توجد مشاريع في هذه الفئة' : 'No projects found in this category')
              }
            </div>
            <div className="text-[#505248] text-sm">
              {locale === 'ar' ? 'يرجى المحاولة مرة أخرى لاحقاً' : 'Please try again later'}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects