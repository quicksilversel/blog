import { promises as fs } from 'fs'
import path from 'path'

import { NextApiRequest, NextApiResponse } from 'next'

import { getArticles } from '@/libs/getArticles/getArticles'
import { ArticleSearchIndex } from '@/libs/search/searchIndex'
import { ARTICLE_PATH, SNIPPETS_PATH } from '@/utils/constants'

let cachedIndex: ArticleSearchIndex | null = null
let lastIndexTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function loadContent(slug: string, basePath: string): Promise<string> {
  try {
    const [category, fileName] = slug.split('/')
    const absolutePath = path.isAbsolute(basePath)
      ? basePath
      : path.join(process.cwd(), basePath)
    const filePath = path.join(absolutePath, category, `${fileName}.mdx`)
    const source = await fs.readFile(filePath, 'utf8')

    const contentWithoutFrontmatter = source
      .replace(/^---[\s\S]*?---/, '')
      .trim()

    return contentWithoutFrontmatter
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error loading content for ${slug}:`, error)
    return ''
  }
}

async function buildSearchIndex() {
  try {
    const [articles, snippets] = await Promise.all([
      getArticles(ARTICLE_PATH),
      getArticles(SNIPPETS_PATH),
    ])

    const articlesWithContent = await Promise.all(
      articles.map(async (article) => ({
        ...article,
        type: 'article' as const,
        content: await loadContent(article.slug, ARTICLE_PATH),
      })),
    )

    const snippetsWithContent = await Promise.all(
      snippets.map(async (snippet) => ({
        ...snippet,
        type: 'snippet' as const,
        content: await loadContent(snippet.slug, SNIPPETS_PATH),
      })),
    )

    const allContent = [...articlesWithContent, ...snippetsWithContent]
    return new ArticleSearchIndex(allContent)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error building search index:', error)
    return new ArticleSearchIndex([])
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q: query, limit = '10' } = req.query

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' })
  }

  try {
    const now = Date.now()
    if (!cachedIndex || now - lastIndexTime > CACHE_DURATION) {
      cachedIndex = await buildSearchIndex()
      lastIndexTime = now
    }

    const results = cachedIndex.search(query, parseInt(limit as string, 10))

    const formattedResults = results.map((result) => ({
      ...result.article,
      content: undefined,
      score: result.score,
      highlights: result.highlights,
    }))

    res.status(200).json({
      results: formattedResults,
      query,
      count: formattedResults.length,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Search error:', error)
    res.status(500).json({ error: 'Failed to perform search' })
  }
}
