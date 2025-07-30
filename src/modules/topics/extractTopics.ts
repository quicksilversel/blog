import type { Article } from '@/utils/types/article'

export const extractAllTopics = (articles: Article[]): string[] => {
  const topicsSet = new Set<string>()
  
  articles.forEach(article => {
    if (article.topics && article.published) {
      article.topics.forEach(topic => topicsSet.add(topic))
    }
  })
  
  return Array.from(topicsSet).sort()
}

export const filterArticlesByTopic = (articles: Article[], selectedTopic: string | null): Article[] => {
  if (!selectedTopic) return articles
  
  return articles.filter(article => 
    article.topics && article.topics.includes(selectedTopic)
  )
}