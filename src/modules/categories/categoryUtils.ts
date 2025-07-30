import type { Article, Category } from '@/utils/types/article'

export const normalizeCategory = (category?: Category): Category => {
  return category || 'other'
}

export const groupArticlesByCategory = (articles: Article[]): Record<Category, Article[]> => {
  const grouped: Record<Category, Article[]> = {
    sre: [],
    frontend: [],
    other: []
  }
  
  articles.forEach(article => {
    const category = normalizeCategory(article.category)
    grouped[category].push(article)
  })
  
  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key as Category].length === 0) {
      delete grouped[key as Category]
    }
  })
  
  return grouped
}

export const getCategoryDisplayName = (category: Category): string => {
  const displayNames: Record<Category, string> = {
    sre: 'SRE',
    frontend: 'Frontend',
    other: 'Other'
  }
  return displayNames[category]
}