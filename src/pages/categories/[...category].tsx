import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import { ArticleSection } from '@/components/Pages/Home/Articles'
import { getArticles } from '@/libs/getArticles'

// Cache articles to avoid duplicate file reads/serializations
let cachedArticles: Article[] | null = null
async function fetchAllArticles(): Promise<Article[]> {
  if (cachedArticles) return cachedArticles
  cachedArticles = await getArticles()
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
    params: { category: [category] },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  articles: Article[]
  category: string
}> = async ({ params }) => {
  const categoryParam = Array.isArray(params?.category)
    ? params.category[0]
    : (params?.category as string)

  const categories = await getCategories()
  if (!categoryParam || !categories.includes(categoryParam)) {
    return { notFound: true }
  }

  const articles = await getArticlesByCategory(categoryParam)

  return {
    props: { articles, category: categoryParam },
    revalidate: 60,
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
        <ArticleSection
          articles={articles}
          category={category}
          isCategoryPage
        />
      </main>
    </>
  )
}
