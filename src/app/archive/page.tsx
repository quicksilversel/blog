import type { Article } from '@/libs/getArticles/types'
import type { Metadata } from 'next'

import { Archive } from '@/components/Pages/Archive'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Archive of all blog posts',
}

type ArchiveItem = Article & { isProject: boolean }

const ym = (d: string | Date) => new Date(d).toISOString().slice(0, 7)

const groupByMonth = (items: ArchiveItem[]) =>
  items.reduce(
    (acc, it) => ((acc[ym(it.date)] ??= []).push(it), acc),
    {} as Record<string, ArchiveItem[]>,
  )

export default async function ArchivePage() {
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

  return (
    <main>
      <Archive articles={groupByMonth(allArticles)} />
    </main>
  )
}
