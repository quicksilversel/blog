import { describe, expect, it } from 'vitest'

import { getProjects } from '@/libs/getProjects/getProjects'
import { ARTICLE_PATH, SNIPPETS_PATH } from '@/utils/constants'

import { getArticles } from './getArticles'

// `date` may arrive as a string or, for unquoted YAML dates, a Date object.
// The invariant that matters is that it parses to a real calendar date.
function expectValidDate(value: unknown, label: string) {
  const time = new Date(value as string | Date).getTime()
  expect(Number.isNaN(time), `${label} should parse to a valid date`).toBe(
    false,
  )
}

// Runs against the real content tree, so it also validates that every
// published article and project has well-formed frontmatter.
describe('content frontmatter integrity', () => {
  it('every article has a title, valid date, category, and slug', async () => {
    const articles = await getArticles(ARTICLE_PATH)
    expect(articles.length).toBeGreaterThan(0)

    for (const article of articles) {
      expect(article.title, `${article.slug} title`).toBeTruthy()
      expectValidDate(article.date, `${article.slug} date`)
      expect(article.category, `${article.slug} category`).toBeTruthy()
      expect(article.slug, 'slug shape').toContain('/')
    }
  })

  it('returns articles sorted newest first', async () => {
    const articles = await getArticles(ARTICLE_PATH)
    const dates = articles.map((a) => new Date(a.date).getTime())
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })

  it('every snippet has well-formed frontmatter', async () => {
    const snippets = await getArticles(SNIPPETS_PATH)
    for (const snippet of snippets) {
      expect(snippet.title, `${snippet.slug} title`).toBeTruthy()
      expectValidDate(snippet.date, `${snippet.slug} date`)
    }
  })

  it('every project article has a date and resolves a category', async () => {
    const projects = await getProjects()
    expect(projects.length).toBeGreaterThan(0)

    for (const project of projects.flatMap((p) => p.articles)) {
      expect(project.title, `${project.slug} title`).toBeTruthy()
      expectValidDate(project.date, `${project.slug} date`)
      expect(project.category, `${project.slug} category`).toBeTruthy()
    }
  })
})
