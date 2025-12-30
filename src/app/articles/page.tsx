import type { Article } from '@/libs/getArticles/types'
import type { Metadata } from 'next'


import { ArticleHome } from '@/components/Pages/Article/ArticleHome'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'
import { ARTICLE_PATH } from '@/utils/constants'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.',
}

export default async function ArticlesPage() {
  const regularArticles = await getArticles(ARTICLE_PATH)
  const projects = await getProjects()

  const projectArticles = projects.flatMap((project) => project.articles)
  const allArticles = [...regularArticles, ...projectArticles]

  const articles: Record<string, Article[]> = {}

  allArticles.forEach((article) => {
    const category = article.category || 'other'
    if (!articles[category]) {
      articles[category] = []
    }
    articles[category].push(article)
  })

  for (const category of Object.keys(articles)) {
    articles[category].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }

  return <ArticleHome articles={articles} />
}
