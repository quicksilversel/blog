import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'

import { ArticleHome } from '@/components/Pages/Article/ArticleHome'
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

export default function Articles({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <ArticleHome articles={articles} />
    </>
  )
}
