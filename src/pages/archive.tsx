import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Archive } from '@/components/Pages/Archive'
import { getArticles } from '@/libs/getArticles'
import { ARTICLE_PATH } from '@/utils/constants'

interface GroupedArticles {
  [key: string]: Article[]
}

export const getStaticProps: GetStaticProps<{
  groupedArticles: GroupedArticles
}> = async () => {
  const allArticles = await getArticles(ARTICLE_PATH)

  const sortedArticles = allArticles
    .filter((article) => article.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const groupedArticles: GroupedArticles = {}

  sortedArticles.forEach((article) => {
    const date = new Date(article.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!groupedArticles[monthKey]) {
      groupedArticles[monthKey] = []
    }

    groupedArticles[monthKey].push(article)
  })

  return {
    props: {
      groupedArticles,
    },
  }
}

export default function ArchivePage({
  groupedArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Archive - Zoe.log()</title>
        <meta name="description" content="Archive of all blog posts" />
      </Head>
      <main>
        <Archive groupedArticles={groupedArticles} />
      </main>
    </>
  )
}
