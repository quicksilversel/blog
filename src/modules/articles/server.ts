import fs from 'fs'
import path from 'path'

import { serialize } from 'next-mdx-remote/serialize'

import type { CategoryInfo, ArticleFile } from './types'
import type { ArticleWithCategory } from '@/utils/types/article'

import { ARTICLE_PATH } from '@/utils/constants'

import { CATEGORY_LABELS } from './constants'
import { sortArticlesByDate, filterPublishedArticles } from './shared'

/**
 * Get all available categories from the directory structure
 */
export const getCategories = (): CategoryInfo[] => {
  const directories = fs
    .readdirSync(ARTICLE_PATH, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort()

  return directories.map((dir) => ({
    value: dir,
    label: CATEGORY_LABELS[dir] || dir.charAt(0).toUpperCase() + dir.slice(1),
  }))
}

/**
 * Get all article files with their category and path information
 */
export const getArticleFiles = (): ArticleFile[] => {
  const articles: ArticleFile[] = []

  const categories = fs
    .readdirSync(ARTICLE_PATH, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  categories.forEach((category) => {
    const categoryPath = path.join(ARTICLE_PATH, category)
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => path.extname(file).toLowerCase() === '.mdx')

    files.forEach((fileName) => {
      articles.push({
        category,
        fileName,
        fullPath: path.join(categoryPath, fileName),
      })
    })
  })

  return articles
}

/**
 * Load and parse all articles with their content and metadata
 */
export const loadAllArticles = async (): Promise<ArticleWithCategory[]> => {
  const articleFiles = getArticleFiles()

  const articles = await Promise.all(
    articleFiles.map(async ({ category, fileName, fullPath }) => {
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const serialized = await serialize(fileContent, {
        parseFrontmatter: true,
      })

      return {
        ...serialized.frontmatter,
        category,
        slug: `${category}/${fileName.replace('.mdx', '')}`,
      } as ArticleWithCategory
    }),
  )

  return articles
    .filter((article) => article.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

/**
 * Get articles filtered by category
 */
export const getArticlesByCategory = async (
  category: string,
): Promise<ArticleWithCategory[]> => {
  const allArticles = await loadAllArticles()
  const publishedInCategory = allArticles.filter(
    (article) => article.published && article.category === category,
  )
  return sortArticlesByDate(publishedInCategory)
}

/**
 * Get all published articles sorted by date
 */
export const getPublishedArticles = async (): Promise<
  ArticleWithCategory[]
> => {
  const allArticles = await loadAllArticles()
  const published = filterPublishedArticles(allArticles)
  return sortArticlesByDate(published)
}
