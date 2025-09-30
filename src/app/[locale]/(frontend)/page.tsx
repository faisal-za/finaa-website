import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUsOption3 from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getCachedProjects, getCachedCategories, getCachedContent } from '@/lib/actions'
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
  const projects = await getCachedProjects(locale)
  const categories = await getCachedCategories(locale)
  const content = await getCachedContent(locale)

  // Transform stats data to match component interface
  const statsData = content?.stats?.map(stat => ({
    title: stat.title,
    number: stat.number
  })) || []

  return (
    <>
      <main className=" bg-white">
        <Hero stats={statsData} />
        <Services services={[]} />
        <Projects projects={projects} categories={categories} />
        <WhyUsOption3 stats={statsData} />
        <Contact contact={content?.contact} />
      </main>
      <Footer contact={content?.contact} socialLinks={content?.social_links} />
    </>
  )
}
