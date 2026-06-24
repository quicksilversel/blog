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
  const title = String(frontmatter.title)
  const description = String(frontmatter.description)

  const ogParams = new URLSearchParams({ title })
  if (frontmatter.date) {
    ogParams.set('date', String(frontmatter.date))
  }
  if (Array.isArray(frontmatter.topics) && frontmatter.topics.length > 0) {
    ogParams.set('topics', frontmatter.topics.join(','))
  }

  return {
    title: `${title} - Code Snippet`,
    description,
    alternates: {
      canonical: `/snippets/${category}/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/snippets/${category}/${slug}`,
      images: [`/og?${ogParams.toString()}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og?${ogParams.toString()}`],
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
            updated: frontmatter.updated
              ? String(frontmatter.updated)
              : undefined,
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
