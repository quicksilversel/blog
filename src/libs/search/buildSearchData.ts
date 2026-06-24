import { promises as fs } from 'fs'
import path from 'path'

import type { SearchDocument } from './searchIndex'
import type { Article } from '@/libs/getArticles/types'

import { getArticles } from '@/libs/getArticles/getArticles'
import { getProjects } from '@/libs/getProjects/getProjects'
import { ARTICLE_PATH, PROJECTS_PATH, SNIPPETS_PATH } from '@/utils/constants'

export function toPlainText(source: string): string {
  return source
    .replace(/^---[\s\S]*?---/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images keep their text
    .replace(/[#>*_~|>-]/g, ' ') // markdown punctuation
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}

async function loadContent(slug: string, basePath: string): Promise<string> {
  try {
    const [dir, fileName] = slug.split('/')
    const absolutePath = path.isAbsolute(basePath)
      ? basePath
      : path.join(process.cwd(), basePath)
    const filePath = path.join(absolutePath, dir, `${fileName}.mdx`)
    const source = await fs.readFile(filePath, 'utf8')
    return toPlainText(source)
  } catch (error) {
    console.warn(`Failed to load search content for ${slug}:`, error)
    return ''
  }
}

async function toDocument(
  article: Article & { project?: string },
  type: SearchDocument['type'],
  basePath: string,
): Promise<SearchDocument> {
  return {
    title: article.title,
    description: article.description,
    topics: article.topics,
    date: article.date,
    slug: article.slug,
    fileName: article.fileName,
    category: article.category,
    readingTime: article.readingTime,
    type,
    ...(article.project ? { project: article.project } : {}),
    content: await loadContent(article.slug, basePath),
  }
}

export async function buildSearchDocuments(): Promise<SearchDocument[]> {
  const [articles, snippets, projects] = await Promise.all([
    getArticles(ARTICLE_PATH),
    getArticles(SNIPPETS_PATH),
    getProjects(),
  ])

  const projectArticles = projects.flatMap((project) => project.articles)

  const [articleDocs, projectDocs, snippetDocs] = await Promise.all([
    Promise.all(articles.map((a) => toDocument(a, 'article', ARTICLE_PATH))),
    Promise.all(
      projectArticles.map((a) => toDocument(a, 'article', PROJECTS_PATH)),
    ),
    Promise.all(snippets.map((s) => toDocument(s, 'snippet', SNIPPETS_PATH))),
  ])

  return [...articleDocs, ...projectDocs, ...snippetDocs]
}
