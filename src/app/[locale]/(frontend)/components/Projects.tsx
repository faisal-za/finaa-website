'use client'

import React, { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface ProjectsProps {
  projects: any[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const t = useTranslations('projects')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects

    return projects.filter(project =>
      project.categories?.some((cat: any) => cat.id === selectedCategory)
    )
  }, [projects, selectedCategory])

  // Fallback projects if none from CMS
  const fallbackProjects = [
    {
      id: '1',
      name: 'برج السلام التجاري',
      description: 'مشروع تجاري متعدد الاستخدامات في قلب المدينة مع تصميم عصري ومساحات مكتبية فاخرة. يتميز بواجهات زجاجية عاكسة وتقنيات ذكية لإدارة المبنى',
      categories: [{ id: '1', name: 'تجاري' }],
      location: 'الرياض',
      year: '2023',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop' } },
      ],
      details: [
        'مساحة بناء 15,000 متر مربع',
        '25 طابق مع 3 طوابق سفلية للمواقف',
        'تصميم صديق للبيئة بشهادة LEED',
        'قاعات اجتماعات ومرافق رياضية',
      ],
    },
    {
      id: '2',
      name: 'مجمع الواحة السكني',
      description: 'مجمع سكني متكامل يضم 120 وحدة سكنية مع كافة الخدمات والمرافق الترفيهية. يوفر بيئة معيشية راقية مع حدائق خضراء وممرات مشاة',
      categories: [{ id: '2', name: 'سكني' }],
      location: 'جدة',
      year: '2024',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop' } },
      ],
      details: [
        '120 وحدة سكنية متنوعة الأحجام',
        'مسابح ونوادي صحية',
        'مناطق لعب أطفال آمنة',
        'نظام أمني متطور على مدار الساعة',
      ],
    },
    {
      id: '3',
      name: 'فيلا النخيل',
      description: 'فيلا فاخرة بتصميم معماري مميز ومساحات خضراء واسعة. تجمع بين الأصالة والحداثة في تصميم يعكس الهوية المحلية',
      categories: [{ id: '2', name: 'سكني' }],
      location: 'الخبر',
      year: '2023',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop' } },
      ],
      details: [
        'مساحة أرض 2000 متر مربع',
        '6 غرف نوم مع حمامات خاصة',
        'مسبح خاص وحديقة منسقة',
        'مجلس خارجي ومنطقة شواء',
      ],
    },
    {
      id: '4',
      name: 'مول الحديقة',
      description: 'مركز تسوق عصري بمساحة 50,000 متر مربع يضم أشهر العلامات التجارية العالمية والمحلية مع مناطق ترفيهية متنوعة',
      categories: [{ id: '1', name: 'تجاري' }],
      location: 'الدمام',
      year: '2025',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop' } },
      ],
      details: [
        'مساحة إجمالية 50,000 متر مربع',
        '3 طوابق تسوق و طابق ترفيهي',
        '200 متجر ومطعم',
        'سينما وصالة ألعاب للأطفال',
        'مواقف سيارات لـ 800 مركبة',
      ],
    },
    {
      id: '5',
      name: 'مسجد النور',
      description: 'تصميم وبناء مسجد بطراز إسلامي حديث يتسع لـ 500 مصلي مع مرافق خدمية متكاملة ومواقف سيارات',
      categories: [{ id: '3', name: 'مؤسسي' }],
      location: 'المدينة المنورة',
      year: '2022',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop' } },
      ],
      details: [
        'مساحة بناء 1,200 متر مربع',
        'يتسع لـ 500 مصلي',
        'مئذنة بارتفاع 35 متر',
        'قاعة متعددة الأغراض',
        'مكتبة إسلامية ومرافق تعليمية',
        'مواقف سيارات لـ 100 مركبة',
      ],
    },
    {
      id: '6',
      name: 'منتجع الشاطئ',
      description: 'منتجع سياحي فاخر على الواجهة البحرية مع شاليهات ومرافق ترفيهية. يوفر تجربة إقامة استثنائية مع خدمات 5 نجوم',
      categories: [{ id: '4', name: 'سياحي' }],
      location: 'أملج',
      year: '2024',
      images: [
        { image: { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop' } },
        { image: { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop' } },
      ],
      details: [
        '50 شاليه فاخر بإطلالة بحرية',
        'مطاعم عالمية ومقاهي',
        'مركز غوص ورياضات مائية',
        'منتجع صحي وسبا',
      ],
    },
  ]

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : fallbackProjects

  // Always use fallback categories since we're not getting categories from CMS yet
  const displayCategories = [
    { id: 'all', name: t('categories.all') },
    { id: '1', name: t('categories.commercial') },
    { id: '2', name: t('categories.residential') },
    { id: '3', name: t('categories.institutional') },
    { id: '4', name: t('categories.tourism') },
  ]

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
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? 'bg-[#302c30] text-white hover:bg-[#505248]'
                  : 'border-[#302c30] text-[#302c30] hover:bg-[#f7f2ee]'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 lg:gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects