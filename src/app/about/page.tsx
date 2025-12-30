import type { Metadata } from 'next'

import { About } from '@/components/Pages/About'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my experience, projects, and skills',
  openGraph: {
    title: 'About - Zoe.log()',
    description: 'Learn more about me, my experience, projects, and skills',
  },
}

export default function AboutPage() {
  return <About />
}
