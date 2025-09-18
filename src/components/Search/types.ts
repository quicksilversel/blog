import type { Article } from '@/libs/getArticles/types'

export interface SearchResult extends Article {
  type: 'article' | 'snippet'
}
