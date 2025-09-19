import Head from 'next/head'

import type { Article } from '@/libs/getArticles/types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { SnippetsList } from '@/components/Pages/Snippets'
import { getArticles } from '@/libs/getArticles'
import { SNIPPETS_PATH } from '@/utils/constants'

export const getStaticProps: GetStaticProps<{
  snippets: Article[]
}> = async () => {
  const allSnippets = await getArticles(SNIPPETS_PATH)

  const sortedSnippets = allSnippets
    .filter((snippet) => snippet.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      snippets: sortedSnippets,
    },
  }
}

export default function SnippetsPage({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Code Snippets - Zoe.log()</title>
        <meta
          name="description"
          content="A collection of useful code snippets and mini-tutorials"
        />
      </Head>
      <SnippetsList snippets={snippets} />
    </>
  )
}
