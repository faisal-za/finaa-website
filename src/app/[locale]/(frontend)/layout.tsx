import React from 'react'
import './styles.css'
import Navigation from './components/Navigation'

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
