import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'

import type { Metadata } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getProjects } from '@/libs/getProjects'
import { PROJECTS_PATH } from '@/utils/constants'

type Props = {
  params: Promise<{ project: string; slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.flatMap((project) =>
    project.articles.map((article) => {
      const [projectName, articleSlug] = article.slug.split('/')
      return {
        project: projectName,
        slug: articleSlug,
      }
    }),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectName, slug } = await params
  const filePath = path.join(
    process.cwd(),
    PROJECTS_PATH,
    projectName,
    `${slug}.mdx`,
  )

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(postFile)

    return {
      title: `${frontmatter.title} - Project`,
      description: String(frontmatter.description),
      openGraph: {
        title: String(frontmatter.title),
        description: String(frontmatter.description),
      },
    }
  } catch {
    return { title: 'Article Not Found' }
  }
}

export default async function ProjectArticlePage({ params }: Props) {
  const { project: projectName, slug } = await params
  const filePath = path.join(
    process.cwd(),
    PROJECTS_PATH,
    projectName,
    `${slug}.mdx`,
  )

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const postFile = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(postFile)
  const stats = readingTime(postFile)

  const projects = await getProjects()
  const project = projects.find((p) => p.slug === projectName)

  if (!project) {
    notFound()
  }

  const currentSlug = `${projectName}/${slug}`

  return (
    <ArticleDetail
      content={content}
      frontmatter={{
        title: String(frontmatter.title),
        date: frontmatter.date ? String(frontmatter.date) : undefined,
        topics: frontmatter.topics as string[] | undefined,
      }}
      rawContent={postFile}
      isProject
      readingTime={stats.text}
      project={{
        title: project.title,
        articles: project.articles,
        currentSlug,
      }}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: project.title, href: `/projects/${project.slug}` },
        { label: String(frontmatter.title) },
      ]}
    />
  )
}
