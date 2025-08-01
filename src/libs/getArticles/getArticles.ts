import { promises as fs } from 'fs'
import path from 'path'

import { serialize } from 'next-mdx-remote/serialize'

import type { Article } from './types'

import { ARTICLE_PATH } from '@/utils/constants'

export async function getArticles(): Promise<Article[]> {
  const entries = await fs.readdir(ARTICLE_PATH, { withFileTypes: true })
  const categories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const nested = await Promise.all(
    categories.map(async (category) => {
      const categoryDir = path.join(ARTICLE_PATH, category)
      const allFiles = await fs.readdir(categoryDir)
      const mdxFiles = allFiles.filter((file) =>
        file.toLowerCase().endsWith('.mdx'),
      )

      return Promise.all(
        mdxFiles.map(async (fileName) => {
          const fullPath = path.join(categoryDir, fileName)
          const source = await fs.readFile(fullPath, 'utf8')
          const { frontmatter } = await serialize(source, {
            parseFrontmatter: true,
          })

          const slug = `${category}/${path.basename(fileName, '.mdx')}`

          return {
            ...frontmatter,
            fileName,
            fullPath,
            category,
            slug,
          } as Article
        }),
      )
    }),
  )

  const articles = nested.flat()
  return articles
    .filter((article) => Boolean(article.published))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
