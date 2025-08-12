import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Archive } from '@/components/Pages/Archive'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'

type ArchiveItem = Article & { isProject: boolean }

const ym = (d: string | Date) => new Date(d).toISOString().slice(0, 7)

const groupByMonth = (items: ArchiveItem[]) =>
  items.reduce(
    (acc, it) => ((acc[ym(it.date)] ??= []).push(it), acc),
    {} as Record<string, ArchiveItem[]>,
  )

export const getStaticProps: GetStaticProps = async () => {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()])

  const allArticles: ArchiveItem[] = [
    ...articles.map((article) => ({ ...article, isProject: false })),
    ...projects.flatMap((project) =>
      project.articles.map((article) => ({
        ...article,
        isProject: true,
      })),
    ),
  ]
    .filter((article) => article.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return { props: { articles: groupByMonth(allArticles) } }
}

export default function ArchivePage({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Archive - Zoe.log()</title>
        <meta name="description" content="Archive of all blog posts" />
      </Head>
      <main>
        <Archive articles={articles} />
      </main>
    </>
  )
}
