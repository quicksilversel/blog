import { describe, expect, it } from 'vitest'

import { sortByDateAsc, sortByDateDesc } from './sort'

const items = [
  { date: '2024-03-01', slug: 'b' },
  { date: '2024-01-01', slug: 'a' },
  { date: '2024-06-01', slug: 'c' },
]

describe('sortByDateDesc', () => {
  it('orders newest first', () => {
    expect(sortByDateDesc(items).map((i) => i.slug)).toEqual(['c', 'b', 'a'])
  })

  it('does not mutate the input array', () => {
    const input = [...items]
    sortByDateDesc(input)
    expect(input.map((i) => i.slug)).toEqual(['b', 'a', 'c'])
  })
})

describe('sortByDateAsc', () => {
  it('orders oldest first', () => {
    expect(sortByDateAsc(items).map((i) => i.slug)).toEqual(['a', 'b', 'c'])
  })
})
