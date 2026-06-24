import { describe, expect, it } from 'vitest'

import type { SearchDocument } from './searchIndex'

import { ArticleSearchIndex } from './searchIndex'

function doc(overrides: Partial<SearchDocument>): SearchDocument {
  return {
    title: 'Untitled',
    date: '2024-01-01',
    slug: 'frontend/untitled',
    fileName: 'untitled.mdx',
    category: 'frontend',
    type: 'article',
    ...overrides,
  }
}

describe('ArticleSearchIndex', () => {
  it('returns no results for an empty or whitespace query', () => {
    const index = new ArticleSearchIndex([doc({ title: 'React hooks' })])

    expect(index.search('')).toEqual([])
    expect(index.search('   ')).toEqual([])
  })

  it('matches across title, description, topics, and content', () => {
    const index = new ArticleSearchIndex([
      doc({ slug: 'a/title', title: 'Caching' }),
      doc({ slug: 'a/desc', title: 'X', description: 'about caching' }),
      doc({ slug: 'a/topic', title: 'Y', topics: ['caching'] }),
      doc({
        slug: 'a/content',
        title: 'Z',
        content: 'we discuss caching here',
      }),
      doc({ slug: 'a/none', title: 'Unrelated' }),
    ])

    const slugs = index.search('caching').map((r) => r.slug)

    expect(slugs).toContain('a/title')
    expect(slugs).toContain('a/desc')
    expect(slugs).toContain('a/topic')
    expect(slugs).toContain('a/content')
    expect(slugs).not.toContain('a/none')
  })

  it('ranks title matches above content-only matches', () => {
    const index = new ArticleSearchIndex([
      doc({ slug: 'a/content', title: 'Misc', content: 'a note on docker' }),
      doc({ slug: 'a/title', title: 'Docker basics' }),
    ])

    const results = index.search('docker')

    expect(results[0].slug).toBe('a/title')
  })

  it('does not throw on queries containing regex metacharacters', () => {
    const index = new ArticleSearchIndex([
      doc({ slug: 'a/regex', title: 'Release (beta) notes' }),
      doc({ slug: 'a/plus', title: 'Learning C++' }),
    ])

    expect(() => index.search('(beta)')).not.toThrow()
    expect(index.search('(beta)').map((r) => r.slug)).toContain('a/regex')
    expect(() => index.search('c++')).not.toThrow()
    expect(index.search('c++').map((r) => r.slug)).toContain('a/plus')
  })

  it('respects the result limit', () => {
    const docs = Array.from({ length: 5 }, (_, i) =>
      doc({ slug: `a/${i}`, title: `caching ${i}` }),
    )
    const index = new ArticleSearchIndex(docs)

    expect(index.search('caching', 3)).toHaveLength(3)
  })

  it('strips content from results but preserves the project field', () => {
    const index = new ArticleSearchIndex([
      doc({
        slug: 'proj/one',
        title: 'caching',
        content: 'secret body text',
        project: 'my-project',
      }),
    ])

    const [result] = index.search('caching')

    expect('content' in result).toBe(false)
    expect(result.project).toBe('my-project')
  })
})
