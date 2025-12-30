import type { Metadata } from 'next'

import { SnippetsList } from '@/components/Pages/Snippets'
import { getArticles } from '@/libs/getArticles'
import { SNIPPETS_PATH } from '@/utils/constants'

export const metadata: Metadata = {
  title: 'Code Snippets',
  description: 'A collection of useful code snippets and mini-tutorials',
}

export default async function SnippetsPage() {
  const allSnippets = await getArticles(SNIPPETS_PATH)

  const sortedSnippets = allSnippets
    .filter((snippet) => snippet.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <SnippetsList snippets={sortedSnippets} />
}
