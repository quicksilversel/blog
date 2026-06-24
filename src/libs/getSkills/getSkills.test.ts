import { describe, expect, it } from 'vitest'

import type { Article } from '../getArticles/types'
import type { Project } from '../getProjects/types'

import { getSkills } from './getSkills'

function article(category: string, topics: string[] = []): Article {
  return {
    title: `Post in ${category}`,
    date: '2024-01-01',
    slug: `${category}/post`,
    fileName: 'post.mdx',
    fullPath: `/${category}/post.mdx`,
    category,
    topics,
  }
}

const project: Project = {
  slug: 'infra-project',
  title: 'Infra Project',
  category: 'infrastructure',
  articles: [
    { ...article('infrastructure', ['Docker']), project: 'infra-project' },
  ],
}

describe('getSkills', () => {
  const skills = getSkills(
    [
      article('frontend', ['React']),
      article('frontend', ['Next.js']),
      article('backend', ['Node.js']),
      article('other'),
    ],
    [project],
  )

  it('counts articles per category, including project articles', () => {
    const byName = Object.fromEntries(skills.map((s) => [s.name, s.count]))
    expect(byName.frontend).toBe(2)
    expect(byName.backend).toBe(1)
    expect(byName.infrastructure).toBe(1)
  })

  it('excludes the "other" catch-all category', () => {
    expect(skills.some((s) => s.name === 'other')).toBe(false)
  })

  it('sorts categories by descending count', () => {
    const counts = skills.map((s) => s.count)
    expect(counts).toEqual([...counts].sort((a, b) => b - a))
  })

  it('resolves the display name and technologies from config', () => {
    const frontend = skills.find((s) => s.name === 'frontend')
    expect(frontend?.displayName).toBe('Frontend')
    expect(frontend?.technologies.length).toBeGreaterThan(0)
  })
})
