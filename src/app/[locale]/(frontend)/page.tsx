import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUsOption3 from './components/WhyUs'
import Footer from './components/Footer'
import { getCachedTrainingPrograms, getCachedCategories } from '@/lib/actions'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

interface HomePageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'فِناء - بناء وتصميم' : 'Finaa - Design & Build',
    description: locale === 'ar'
      ? 'شركة متخصصة في التصميم المعماري والتطوير العقاري وإدارة المشاريع'
      : 'Specialized company in architectural design, real estate development and project management',
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const trainingPrograms = await getCachedTrainingPrograms(locale)
  const categories = await getCachedCategories(locale)

  return (
    <>
      <main className=" bg-white">
        <Hero stats={[]} />
        <Services services={[]} />
        <Projects projects={trainingPrograms} categories={categories} />
        <WhyUsOption3 stats={[]} />
      </main>
      <Footer contact={undefined} socialLinks={undefined} />
    </>
  )
}
