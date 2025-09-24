import React from 'react'
import './styles.css'
import Navigation from './components/Navigation'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/Finaa-letter-icon.svg", media: "(prefers-color-scheme: light)" },
      { url: "/Finaa-letter-white.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
