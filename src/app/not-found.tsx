// This page renders when a route is not found.
// Since we use locale-based routing, we redirect to Arabic (default)
import { redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/ar')
}