import { promises as fs } from 'fs'
import path from 'path'

import type { Article } from './types'

import { filterMarkdownFiles, parseMarkdownFile } from '@/libs/markdown'
import { filterPublished, sortByDateDesc } from '@/libs/utils'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getArticles(
  basePath: string = ARTICLE_PATH,
): Promise<Article[]> {
  const absolutePath = path.isAbsolute(basePath)
    ? basePath
    : path.join(process.cwd(), basePath)

  const entries = await fs.readdir(absolutePath, { withFileTypes: true })
  const categories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const nested = await Promise.all(
    categories.map(async (category) => {
      const categoryDir = path.join(absolutePath, category)
      const allFiles = await fs.readdir(categoryDir)
      const mdxFiles = filterMarkdownFiles(allFiles)

      return Promise.all(
        mdxFiles.map(async (fileName) => {
          const fullPath = path.join(categoryDir, fileName)
          const { frontmatter, readingTime } = await parseMarkdownFile(fullPath)

          const slug = `${category}/${path.basename(fileName, '.mdx')}`

          return {
            ...frontmatter,
            fileName,
            fullPath,
            category,
            slug,
            readingTime,
          } as Article
        }),
      )
    }),
  )

  const articles = nested.flat()
  return sortByDateDesc(filterPublished(articles))
}
