import fs from 'fs'
import path from 'path'

import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
import { parseMarkdownFile } from '@/libs/markdown'
import { SNIPPETS_PATH } from '@/utils/constants'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const snippets = await getArticles(SNIPPETS_PATH)

  return snippets.map(({ category, fileName }) => ({
    category,
    slug: fileName.replace('.mdx', ''),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const filePath = path.join(
    process.cwd(),
    SNIPPETS_PATH,
    category,
    `${slug}.mdx`,
  )

  if (!fs.existsSync(filePath)) {
    return { title: 'Snippet Not Found' }
  }

  const { frontmatter } = await parseMarkdownFile(filePath)

  return {
    title: `${frontmatter.title} - Code Snippet`,
    description: String(frontmatter.description),
    openGraph: {
      title: String(frontmatter.title),
      description: String(frontmatter.description),
    },
  }
}

export default async function SnippetPage({ params }: Props) {
  const { category, slug } = await params
  const filePath = path.join(
    process.cwd(),
    SNIPPETS_PATH,
    category,
    `${slug}.mdx`,
  )

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const { frontmatter, content } = await parseMarkdownFile(filePath)

  return (
    <main>
      <article>
        <ArticleDetail
          content={content}
          frontmatter={{
            title: String(frontmatter.title),
            date: frontmatter.date ? String(frontmatter.date) : undefined,
            topics: frontmatter.topics as string[] | undefined,
          }}
          breadcrumbItems={[
            { label: 'Home', href: '/' },
            { label: 'Snippets', href: '/snippets' },
            { label: String(frontmatter.title) },
          ]}
        />
      </article>
    </main>
  )
}
