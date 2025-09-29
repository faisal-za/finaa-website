import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUsOption3 from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getServices, getProjects, getCategories, getContent } from '@/lib/actions'

interface HomePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const services = await getServices(locale)
  const projects = await getProjects(locale)
  const categories = await getCategories(locale)
  const content = await getContent(locale)

  // Transform stats data to match component interface
  const statsData = content?.stats?.map(stat => ({
    title: stat.title,
    number: stat.number
  })) || []

  return (
    <>
      <main className=" bg-white">
        <Hero stats={statsData} />
        <Services services={services} />
        <Projects projects={projects} categories={categories} />
        <WhyUsOption3 stats={statsData} />
        <Contact contact={content?.contact} />
      </main>
      <Footer />
    </>
  )
}
