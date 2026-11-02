import type { Metadata } from 'next'

import { NotFoundPage } from '@/components/Pages/NotFound'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page does not exist.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundPage />
}
