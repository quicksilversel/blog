import fs from 'fs'
import path from 'path'

import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
import { getRelatedArticles } from '@/libs/getRelatedArticles'
import { parseMarkdownFile } from '@/libs/markdown'
import { ARTICLE_PATH } from '@/utils/constants'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const articles = await getArticles(ARTICLE_PATH)

  return articles.map(({ category, fileName }) => ({
    category,
    slug: fileName.replace('.mdx', ''),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const filePath = path.join(
    process.cwd(),
    ARTICLE_PATH,
    category,
    `${slug}.mdx`,
  )

  if (!fs.existsSync(filePath)) {
    return { title: 'Article Not Found' }
  }

  const { frontmatter } = await parseMarkdownFile(filePath)
  const keywords = Array.isArray(frontmatter.topics)
    ? frontmatter.topics.join(', ')
    : ''

  return {
    title: String(frontmatter.title),
    description: String(frontmatter.description),
    keywords,
    openGraph: {
      title: String(frontmatter.title),
      description: String(frontmatter.description),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params
  const filePath = path.join(
    process.cwd(),
    ARTICLE_PATH,
    category,
    `${slug}.mdx`,
  )

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const { frontmatter, content, readingTime, rawSource } =
    await parseMarkdownFile(filePath)

  const relatedArticles = await getRelatedArticles(
    `${category}/${slug}`,
    frontmatter.topics as string[] | undefined,
    category,
    3,
  )

  return (
    <ArticleDetail
      content={content}
      frontmatter={{
        title: String(frontmatter.title),
        date: frontmatter.date ? String(frontmatter.date) : undefined,
        topics: frontmatter.topics as string[] | undefined,
      }}
      rawContent={rawSource}
      relatedArticles={relatedArticles}
      readingTime={readingTime}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/articles' },
        {
          label: category,
          href: `/articles/${category}`,
        },
        { label: String(frontmatter.title) },
      ]}
    />
  )
}
