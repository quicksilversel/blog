import type { Article } from '../getArticles/types'

export type ProjectArticle = Article & {
  project: string
}

export type Project = {
  slug: string
  title: string
  description?: string
  topics?: string[]
  category?: string
  articles: ProjectArticle[]
}
