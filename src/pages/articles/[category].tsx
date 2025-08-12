import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import { ArticleCategoryHome } from '@/components/Pages/Article/ArticleCategoryHome'
import { getArticles } from '@/libs/getArticles'
import { ARTICLE_PATH } from '@/utils/constants'

let cachedArticles: Article[] | null = null
async function fetchAllArticles(): Promise<Article[]> {
  if (cachedArticles) return cachedArticles
  cachedArticles = await getArticles(ARTICLE_PATH)
  return cachedArticles
}

async function getCategories(): Promise<string[]> {
  const articles = await fetchAllArticles()
  return Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean)),
  ).sort()
}

async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles.filter((a) => a.category === category)
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories()
  const paths = categories.map((category) => ({
    params: { category },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  articles: Article[]
  category: string
}> = async ({ params }) => {
  const categoryParam = params?.category as string

  const categories = await getCategories()
  if (!categoryParam || !categories.includes(categoryParam)) {
    return { notFound: true }
  }

  const articles = await getArticlesByCategory(categoryParam)

  return {
    props: { articles, category: categoryParam },
  }
}

export default function CategoryPage({
  articles,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>
          {category} Articles - {category}
        </title>
        <meta name="description" content={`${category} articles`} />
      </Head>
      <main>
        <ArticleCategoryHome articles={articles} category={category} />
      </main>
    </>
  )
}
