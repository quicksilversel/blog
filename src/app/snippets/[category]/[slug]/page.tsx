import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
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

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(postFile)

    return {
      title: `${frontmatter.title} - Code Snippet`,
      description: String(frontmatter.description),
      openGraph: {
        title: String(frontmatter.title),
        description: String(frontmatter.description),
      },
    }
  } catch {
    return { title: 'Snippet Not Found' }
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

  const postFile = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(postFile)

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
