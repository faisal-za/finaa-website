// This page redirects root to default locale (Arabic)
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/ar')
}