import { useMemo } from 'react'

import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { ArticleSection } from '@/components/Pages/Home/Articles'
import { Hero } from '@/components/Pages/Home/Hero'
import { Box } from '@/components/UI/Box'
import { getPublishedArticles } from '@/modules/articles/server'
import { groupArticlesByCategory } from '@/modules/articles/shared'
import { metadata } from '@/utils/constants/meta'

export async function getStaticProps() {
  const allArticles = await getPublishedArticles()
  const articles = groupArticlesByCategory(allArticles)

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}

export default function Index({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const categoryEntries = useMemo(() => Object.entries(articles), [articles])

  const articleSections = useMemo(
    () =>
      categoryEntries.map(([category, categoryArticles]) => (
        <ArticleSection
          key={category}
          category={category}
          articles={categoryArticles}
        />
      )),
    [categoryEntries],
  )

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <main>
        <Box>
          <Hero />
        </Box>
        {articleSections}
      </main>
    </>
  )
}
