import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'

import { ArticleSection } from '@/components/Pages/Home/Articles'
import { Hero } from '@/components/Pages/Home/Hero'
import { Box } from '@/components/UI/Box'
import { getArticles } from '@/libs/getArticles'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticProps() {
  const allArticles = await getArticles(ARTICLE_PATH)
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
  const categories = Object.entries(articles).sort(([a], [b]) =>
    a.localeCompare(b),
  )

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
        {categories.map(([category, articles]) => (
          <ArticleSection
            key={category}
            category={category}
            articles={articles}
          />
        ))}
      </main>
    </>
  )
}
