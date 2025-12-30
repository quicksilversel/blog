import { notFound } from 'next/navigation'

import type { Article } from '@/libs/getArticles/types'
import type { Metadata } from 'next'

import { ArticleCategoryHome } from '@/components/Pages/Article/ArticleCategoryHome'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'
import { ARTICLE_PATH } from '@/utils/constants'

type Props = {
  params: Promise<{ category: string }>
}

async function fetchAllArticles(): Promise<Article[]> {
  const regularArticles = await getArticles(ARTICLE_PATH)
  const projects = await getProjects()
  const projectArticles = projects.flatMap((project) => project.articles)
  return [...regularArticles, ...projectArticles]
}

async function getCategories(): Promise<string[]> {
  const articles = await fetchAllArticles()
  return Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean)),
  ).sort()
}

async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  return {
    title: `${category} Articles`,
    description: `${category} articles`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const categories = await getCategories()

  if (!categories.includes(category)) {
    notFound()
  }

  const articles = await getArticlesByCategory(category)

  return (
    <main>
      <ArticleCategoryHome articles={articles} category={category} />
    </main>
  )
}
