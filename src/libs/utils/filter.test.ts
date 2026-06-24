import { describe, expect, it } from 'vitest'

import { filterPublished, isPublished } from './filter'

describe('isPublished', () => {
  it('treats a missing published flag as published', () => {
    expect(isPublished({})).toBe(true)
  })

  it('respects an explicit published flag', () => {
    expect(isPublished({ published: true })).toBe(true)
    expect(isPublished({ published: false })).toBe(false)
  })
})

describe('filterPublished', () => {
  it('drops only items explicitly marked unpublished', () => {
    const items = [
      { slug: 'a' },
      { slug: 'b', published: false },
      { slug: 'c', published: true },
    ]

    expect(filterPublished(items).map((i) => i.slug)).toEqual(['a', 'c'])
  })
})
