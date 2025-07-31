import type { Article, Category } from '@/utils/types/article'

import { CATEGORY_LIST } from '@/utils/constants'

export const normalizeCategory = (category?: Category): Category => {
  if (!category) return 'other'
  
  // Check if the category exists in CATEGORY_LIST
  const validCategory = CATEGORY_LIST.find(cat => cat.value === category)
  return validCategory ? category : 'other'
}

export const groupArticlesByCategory = (
  articles: Article[],
): Record<Category, Article[]> => {
  // Initialize grouped object with all categories from CATEGORY_LIST
  const grouped: Partial<Record<Category, Article[]>> = {}
  CATEGORY_LIST.forEach(cat => {
    grouped[cat.value as Category] = []
  })

  articles.forEach((article) => {
    const category = normalizeCategory(article.category)
    if (grouped[category]) {
      grouped[category].push(article)
    }
  })

  // Remove empty categories
  Object.keys(grouped).forEach((key) => {
    if (grouped[key as Category]?.length === 0) {
      delete grouped[key as Category]
    }
  })

  return grouped as Record<Category, Article[]>
}

export const getCategoryDisplayName = (category: Category | undefined | null): string => {
  if (!category) return 'Other'
  const categoryItem = CATEGORY_LIST.find((item) => item.value === category)
  return categoryItem?.label || 'Other'
}
