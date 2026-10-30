import type { Metadata } from 'next'

import { About } from '@/components/Pages/About'
import { getTopics } from '@/libs/getTopics'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sueun Lee, known as Zoe. Born in Korea, raised in the States, now a developer in Japan working on developer productivity, with a background in frontend and SRE.',
  openGraph: {
    title: 'About - Zoe.log()',
    description:
      'Sueun Lee, known as Zoe. Born in Korea, raised in the States, now a developer in Japan working on developer productivity, with a background in frontend and SRE.',
  },
}

export default async function AboutPage() {
  const topics = await getTopics()

  return <About topics={topics.slice(0, 8)} />
}
