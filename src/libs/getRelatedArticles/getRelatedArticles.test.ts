import { describe, expect, it } from 'vitest'

import type { Article } from '../getArticles/types'

import {
  calculateSimilarity,
  calculateTopicIDF,
  getArticlesByTopic,
} from './getRelatedArticles'

function article(
  slug: string,
  topics: string[],
  category = 'frontend',
  date = '2024-01-01',
): Article {
  return {
    title: slug,
    date,
    slug,
    fileName: `${slug}.mdx`,
    fullPath: `/${slug}.mdx`,
    category,
    topics,
  }
}

describe('calculateTopicIDF', () => {
  it('weights rare topics higher than common ones', () => {
    const idf = calculateTopicIDF([
      article('a', ['common']),
      article('b', ['common']),
      article('c', ['common']),
      article('d', ['common', 'rare']),
    ])

    expect(idf.get('common')).toBeCloseTo(0)
    expect(idf.get('rare')).toBeGreaterThan(idf.get('common') ?? 0)
  })
})

describe('calculateSimilarity', () => {
  const current = { slug: 'cur', topics: ['x', 'y'], category: 'frontend' }
  const idf = new Map<string, number>() // default weight of 1 per topic

  it('scores full topic overlap above partial above none', () => {
    const full = calculateSimilarity(current, article('s', ['x', 'y']), idf)
    const partial = calculateSimilarity(
      current,
      article('p', ['x'], 'backend'),
      idf,
    )
    const none = calculateSimilarity(current, article('n', []), idf)

    expect(full).toBeGreaterThan(partial)
    expect(partial).toBeGreaterThan(none)
    expect(none).toBe(0)
  })

  it('gives a small boost when categories match', () => {
    const sameCategory = calculateSimilarity(
      current,
      article('s', ['x'], 'frontend'),
      idf,
    )
    const otherCategory = calculateSimilarity(
      current,
      article('o', ['x'], 'backend'),
      idf,
    )

    expect(sameCategory).toBeGreaterThan(otherCategory)
  })
})

describe('getArticlesByTopic', () => {
  const all = [
    article('a', ['react'], 'frontend', '2024-01-01'),
    article('b', ['react'], 'frontend', '2024-03-01'),
    article('c', ['vue'], 'frontend', '2024-02-01'),
  ]

  it('returns matching articles newest first', () => {
    expect(getArticlesByTopic('react', all).map((a) => a.slug)).toEqual([
      'b',
      'a',
    ])
  })

  it('honors the exclude slug', () => {
    expect(getArticlesByTopic('react', all, 'b').map((a) => a.slug)).toEqual([
      'a',
    ])
  })
})
