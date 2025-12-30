import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'

import type { Metadata } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
import { getRelatedArticles } from '@/libs/getArticles/getRelatedArticles'
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

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(postFile)

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
  } catch {
    return {
      title: 'Article Not Found',
    }
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

  const postFile = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(postFile)
  const stats = readingTime(postFile)

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
      rawContent={postFile}
      relatedArticles={relatedArticles}
      readingTime={stats.text}
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
