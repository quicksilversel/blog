import type { Article } from './types'

import { sortByDateDesc } from '@/libs/utils'

import { getArticles } from './getArticles'

interface ArticleIdentifier {
  slug: string
  topics?: string[]
  category: string
}

function calculateSimilarity(
  current: ArticleIdentifier,
  other: Article,
): number {
  const topics1 = new Set(current.topics || [])
  const topics2 = new Set(other.topics || [])

  if (topics1.size === 0 || topics2.size === 0) return 0

  const commonTopics = [...topics1].filter((topic) => topics2.has(topic)).length

  const union = new Set([...topics1, ...topics2]).size
  const similarity = commonTopics / union

  const categoryBoost = current.category === other.category ? 0.2 : 0

  return Math.min(similarity + categoryBoost, 1)
}

export async function getRelatedArticles(
  currentSlug: string,
  currentTopics: string[] | undefined,
  currentCategory: string,
  maxResults: number = 3,
): Promise<Article[]> {
  const allArticles = await getArticles()

  const current: ArticleIdentifier = {
    slug: currentSlug,
    topics: currentTopics,
    category: currentCategory,
  }

  const otherArticles = allArticles.filter(
    (article) => article.slug !== currentSlug,
  )

  const articlesWithScores = otherArticles.map((article) => ({
    article,
    score: calculateSimilarity(current, article),
  }))

  return articlesWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.article)
}

export function getArticlesByTopic(
  topic: string,
  allArticles: Article[],
  excludeSlug?: string,
): Article[] {
  const filtered = allArticles.filter(
    (article) =>
      article.slug !== excludeSlug && article.topics?.includes(topic),
  )
  return sortByDateDesc(filtered)
}
