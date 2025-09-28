import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUsOption3 from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getServices, getProjects, getCategories } from '@/lib/actions'

export default async function HomePage() {
  const services = await getServices()
  const projects = await getProjects()
  const categories = await getCategories()

  return (
    <>
      <main className=" bg-white">
        <Hero />
        <Services services={services} />
        <Projects projects={projects} categories={categories} />
        <WhyUsOption3 />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
