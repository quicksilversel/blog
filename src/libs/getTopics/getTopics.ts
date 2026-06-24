import type { Article } from '@/libs/getArticles/types'

import { getArticles } from '@/libs/getArticles/getArticles'
import { getProjects } from '@/libs/getProjects/getProjects'
import { sortByDateDesc } from '@/libs/utils'
import { ARTICLE_PATH, SNIPPETS_PATH } from '@/utils/constants'

import { slugifyTopic } from './slugify'

export type ArticleWithHref = Article & { href: string }

export type TopicSummary = {
  topic: string
  slug: string
  count: number
}

export type TopicWithArticles = {
  topic: string
  slug: string
  articles: ArticleWithHref[]
}

async function getAllArticles(): Promise<ArticleWithHref[]> {
  const [articles, snippets, projects] = await Promise.all([
    getArticles(ARTICLE_PATH),
    getArticles(SNIPPETS_PATH),
    getProjects(),
  ])

  return [
    ...articles.map((a) => ({ ...a, href: `/articles/${a.slug}` })),
    ...snippets.map((a) => ({ ...a, href: `/snippets/${a.slug}` })),
    ...projects
      .flatMap((p) => p.articles)
      .map((a) => ({ ...a, href: `/projects/${a.slug}` })),
  ]
}

export async function getTopics(): Promise<TopicSummary[]> {
  const all = await getAllArticles()
  const counts = new Map<string, { topic: string; count: number }>()

  for (const article of all) {
    for (const topic of article.topics ?? []) {
      const slug = slugifyTopic(topic)
      const existing = counts.get(slug)
      if (existing) {
        existing.count += 1
      } else {
        counts.set(slug, { topic, count: 1 })
      }
    }
  }

  return Array.from(counts.entries())
    .map(([slug, { topic, count }]) => ({ slug, topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic))
}

export async function getArticlesByTopic(
  slug: string,
): Promise<TopicWithArticles | null> {
  const all = await getAllArticles()
  const matching = all.filter((article) =>
    (article.topics ?? []).some((topic) => slugifyTopic(topic) === slug),
  )

  if (matching.length === 0) return null

  const topic =
    matching[0].topics?.find((t) => slugifyTopic(t) === slug) ?? slug

  return {
    topic,
    slug,
    articles: sortByDateDesc(matching),
  }
}
