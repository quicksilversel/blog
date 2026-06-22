import type { MetadataRoute } from 'next'

import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'
import { ARTICLE_PATH, SNIPPETS_PATH } from '@/utils/constants'

const SITE_URL = 'https://zoelog.vercel.app'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, priority: 1 },
  { url: `${SITE_URL}/articles`, priority: 0.9 },
  { url: `${SITE_URL}/projects`, priority: 0.9 },
  { url: `${SITE_URL}/snippets`, priority: 0.8 },
  { url: `${SITE_URL}/about`, priority: 0.7 },
  { url: `${SITE_URL}/archive`, priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, snippets, projects] = await Promise.all([
    getArticles(ARTICLE_PATH),
    getArticles(SNIPPETS_PATH),
    getProjects(),
  ])

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    priority: 0.8,
  }))

  const snippetEntries: MetadataRoute.Sitemap = snippets.map((snippet) => ({
    url: `${SITE_URL}/snippets/${snippet.slug}`,
    lastModified: new Date(snippet.date),
    priority: 0.6,
  }))

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) => [
    {
      url: `${SITE_URL}/projects/${project.slug}`,
      priority: 0.8,
    },
    ...project.articles.map((article) => ({
      url: `${SITE_URL}/projects/${article.slug}`,
      lastModified: new Date(article.date),
      priority: 0.7,
    })),
  ])

  return [
    ...staticRoutes,
    ...articleEntries,
    ...snippetEntries,
    ...projectEntries,
  ]
}
