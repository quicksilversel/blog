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
  const title = String(frontmatter.title)
  const description = String(frontmatter.description)
  const keywords = Array.isArray(frontmatter.topics)
    ? frontmatter.topics.join(', ')
    : ''

  const ogParams = new URLSearchParams({ title })
  if (frontmatter.date) {
    ogParams.set('date', String(frontmatter.date))
  }
  if (Array.isArray(frontmatter.topics) && frontmatter.topics.length > 0) {
    ogParams.set('topics', frontmatter.topics.join(','))
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/articles/${category}/${slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/articles/${category}/${slug}`,
      images: [`/og?${ogParams.toString()}`],
      publishedTime: frontmatter.date ? String(frontmatter.date) : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og?${ogParams.toString()}`],
    },
  }
}

const SITE_URL = 'https://zoelog.vercel.app'

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: String(frontmatter.title),
    description: frontmatter.description
      ? String(frontmatter.description)
      : undefined,
    datePublished: frontmatter.date ? String(frontmatter.date) : undefined,
    keywords: Array.isArray(frontmatter.topics)
      ? frontmatter.topics.join(', ')
      : undefined,
    url: `${SITE_URL}/articles/${category}/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Zoe',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Zoe',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
