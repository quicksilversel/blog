import type { Article } from '@/utils/types/article'

export const getRecentArticles = (articles: Article[]) => {
  const recentArticles = articles.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  )

  return recentArticles.slice(0, 6)
}
