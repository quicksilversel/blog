import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'

import { ArticleSection } from '@/components/Pages/Home/Articles'
import { Hero } from '@/components/Pages/Home/Hero'
import { Box } from '@/components/UI/Box'
import { getArticles } from '@/libs/getArticles'

export async function getStaticProps() {
  const allArticles = await getArticles()
  const articles: Record<string, Article[]> = {}

  allArticles.forEach((article) => {
    const category = article.category || 'other'
    if (!articles[category]) {
      articles[category] = []
    }
    articles[category].push(article)
  })

  return {
    props: {
      articles,
    },
  }
}

export default function Index({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const categoryEntries = Object.entries(articles)

  return (
    <>
      <Head>
        <title>Zoe.log()</title>
        <meta
          name="description"
          content={
            'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.'
          }
        />
      </Head>
      <main>
        <Box>
          <Hero />
        </Box>
        {categoryEntries.map(([category, categoryArticles]) => (
          <ArticleSection
            key={category}
            category={category}
            articles={categoryArticles}
          />
        ))}
      </main>
    </>
  )
}
