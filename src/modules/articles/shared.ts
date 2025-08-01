import type { Article, ArticleWithCategory } from '@/utils/types/article'

import { CATEGORY_LABELS } from './constants'

/**
 * Get display name for a category
 */
export const getCategoryDisplayName = (
  category: string | undefined | null
): string => {
  if (!category) return 'Other'
  return CATEGORY_LABELS[category] || category.charAt(0).toUpperCase() + category.slice(1)
}

/**
 * Group articles by their categories
 */
export const groupArticlesByCategory = (
  articles: ArticleWithCategory[]
): Record<string, ArticleWithCategory[]> => {
  const grouped: Record<string, ArticleWithCategory[]> = {}

  articles.forEach((article) => {
    const category = article.category || 'other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(article)
  })

  return grouped
}

/**
 * Get all unique topics from articles
 */
export const extractAllTopics = (articles: Article[]): string[] => {
  const topicsSet = new Set<string>()
  
  articles.forEach((article) => {
    if (article.topics && article.published) {
      article.topics.forEach((topic) => topicsSet.add(topic))
    }
  })
  
  return Array.from(topicsSet).sort()
}

/**
 * Filter articles by selected topic
 */
export const filterArticlesByTopic = (
  articles: Article[],
  selectedTopic: string | null
): Article[] => {
  if (!selectedTopic) return articles
  
  return articles.filter(
    (article) => article.topics && article.topics.includes(selectedTopic)
  )
}

/**
 * Sort articles by date (newest first)
 */
export const sortArticlesByDate = (articles: ArticleWithCategory[]): ArticleWithCategory[] => {
  return [...articles].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

/**
 * Filter published articles
 */
export const filterPublishedArticles = (articles: ArticleWithCategory[]): ArticleWithCategory[] => {
  return articles.filter((article) => article.published)
}