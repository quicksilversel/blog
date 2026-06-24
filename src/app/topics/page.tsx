import type { Metadata } from 'next'

import { TopicsList } from '@/components/Pages/Topics'
import { getTopics } from '@/libs/getTopics'

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse articles, snippets, and projects by topic.',
}

export default async function TopicsPage() {
  const topics = await getTopics()

  return (
    <main>
      <TopicsList topics={topics} />
    </main>
  )
}
