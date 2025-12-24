import { promises as fs } from 'fs'
import path from 'path'

import { Feed } from 'feed'

const SITE_URL = 'https://zoelog.vercel.app'
const AUTHOR = {
  name: 'Zoe',
  link: SITE_URL,
}

type Article = {
  title: string
  description?: string
  slug: string
  date: string
  topics?: string[]
}

async function parseFrontmatter(
  filePath: string,
): Promise<Record<string, unknown>> {
  const content = await fs.readFile(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter: Record<string, unknown> = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        frontmatter[key] = JSON.parse(value.replace(/'/g, '"'))
      } catch {
        frontmatter[key] = value
      }
    } else if (value.startsWith("'") || value.startsWith('"')) {
      frontmatter[key] = value.slice(1, -1)
    } else {
      frontmatter[key] = value
    }
  }

  return frontmatter
}

async function getArticlesFromDir(basePath: string): Promise<Article[]> {
  const absolutePath = path.join(process.cwd(), basePath)
  const entries = await fs.readdir(absolutePath, { withFileTypes: true })
  const categories = entries.filter((e) => e.isDirectory()).map((e) => e.name)

  const articles: Article[] = []

  for (const category of categories) {
    const categoryDir = path.join(absolutePath, category)
    const files = await fs.readdir(categoryDir)
    const mdxFiles = files.filter((f) => f.endsWith('.mdx'))

    for (const fileName of mdxFiles) {
      const fullPath = path.join(categoryDir, fileName)
      const frontmatter = await parseFrontmatter(fullPath)

      if (
        frontmatter.published === 'false' ||
        frontmatter.published === false
      ) {
        continue
      }

      articles.push({
        title: frontmatter.title as string,
        description: frontmatter.description as string | undefined,
        slug: `${category}/${path.basename(fileName, '.mdx')}`,
        date: frontmatter.date as string,
        topics: frontmatter.topics as string[] | undefined,
      })
    }
  }

  return articles
}

async function getProjectArticles(basePath: string): Promise<Article[]> {
  const absolutePath = path.join(process.cwd(), basePath)
  const entries = await fs.readdir(absolutePath, { withFileTypes: true })
  const projectDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

  const articles: Article[] = []

  for (const project of projectDirs) {
    const projectDir = path.join(absolutePath, project)
    const files = await fs.readdir(projectDir)
    const mdxFiles = files.filter(
      (f) => f.endsWith('.mdx') && f !== 'index.mdx',
    )

    for (const fileName of mdxFiles) {
      const fullPath = path.join(projectDir, fileName)
      const frontmatter = await parseFrontmatter(fullPath)

      if (
        frontmatter.published === 'false' ||
        frontmatter.published === false
      ) {
        continue
      }

      articles.push({
        title: frontmatter.title as string,
        description: frontmatter.description as string | undefined,
        slug: `projects/${project}/${path.basename(fileName, '.mdx')}`,
        date: frontmatter.date as string,
        topics: frontmatter.topics as string[] | undefined,
      })
    }
  }

  return articles
}

async function generateRSS() {
  const regularArticles = await getArticlesFromDir('articles/articles')
  const projectArticles = await getProjectArticles('articles/projects')
  const allArticles = [...regularArticles, ...projectArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const feed = new Feed({
    title: 'Zoe.log()',
    description:
      'A space to document thoughts, technical musings, and creative ideas for future reference.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/og-image.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Zoe`,
    author: AUTHOR,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
    },
  })

  for (const article of allArticles) {
    const url = `${SITE_URL}/articles/${article.slug}`

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description || '',
      date: new Date(article.date),
      category: article.topics?.map((topic) => ({ name: topic })) || [],
      author: [AUTHOR],
    })
  }

  const publicDir = path.join(process.cwd(), 'public')
  await fs.writeFile(path.join(publicDir, 'rss.xml'), feed.rss2())
  await fs.writeFile(path.join(publicDir, 'atom.xml'), feed.atom1())
}

// eslint-disable-next-line no-console
generateRSS().catch(console.error)
