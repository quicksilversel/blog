import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { TopicArticles } from '@/components/Pages/Topics'
import { getArticlesByTopic, getTopics } from '@/libs/getTopics'

type Props = {
  params: Promise<{ topic: string }>
}

export async function generateStaticParams() {
  const topics = await getTopics()
  return topics.map(({ slug }) => ({ topic: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params
  const result = await getArticlesByTopic(slug)

  if (!result) {
    return { title: 'Topic Not Found' }
  }

  return {
    title: `#${result.topic}`,
    description: `Articles, snippets, and projects tagged ${result.topic}.`,
    alternates: {
      canonical: `/topics/${slug}`,
    },
  }
}

export default async function TopicPage({ params }: Props) {
  const { topic: slug } = await params
  const result = await getArticlesByTopic(slug)

  if (!result) {
    notFound()
  }

  return (
    <main>
      <TopicArticles topic={result.topic} articles={result.articles} />
    </main>
  )
}
