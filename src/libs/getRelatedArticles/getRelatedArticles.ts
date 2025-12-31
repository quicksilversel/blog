import type { Article } from '../getArticles/types'

import { sortByDateDesc } from '@/libs/utils'

import { getArticles } from '../getArticles/getArticles'

interface ArticleIdentifier {
  slug: string
  topics?: string[]
  category: string
}

function calculateTopicIDF(articles: Article[]): Map<string, number> {
  const topicCounts = new Map<string, number>()

  for (const article of articles) {
    const topics = article.topics || []
    for (const topic of topics) {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
    }
  }

  const idfWeights = new Map<string, number>()
  const totalArticles = articles.length

  for (const [topic, count] of topicCounts) {
    const idf = Math.log(totalArticles / count)
    idfWeights.set(topic, idf)
  }

  return idfWeights
}

function calculateSimilarity(
  current: ArticleIdentifier,
  other: Article,
  topicIDF: Map<string, number>,
): number {
  const currentTopics = current.topics || []
  const otherTopics = new Set(other.topics || [])

  if (currentTopics.length === 0 || otherTopics.size === 0) return 0

  let matchedWeight = 0
  let totalWeight = 0
  let rareMatchCount = 0

  for (const topic of currentTopics) {
    const weight = topicIDF.get(topic) || 1
    totalWeight += weight

    if (otherTopics.has(topic)) {
      matchedWeight += weight
      if (weight > 2.0) {
        rareMatchCount++
      }
    }
  }

  if (totalWeight === 0) return 0

  let similarity = matchedWeight / totalWeight

  if (rareMatchCount >= 2) {
    similarity += 0.1
  }

  const categoryBoost = current.category === other.category ? 0.05 : 0

  return Math.min(similarity + categoryBoost, 1)
}

export async function getRelatedArticles(
  currentSlug: string,
  currentTopics: string[] | undefined,
  currentCategory: string,
  maxResults: number = 3,
): Promise<Article[]> {
  const allArticles = await getArticles()

  const topicIDF = calculateTopicIDF(allArticles)

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
    score: calculateSimilarity(current, article, topicIDF),
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
