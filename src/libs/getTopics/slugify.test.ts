import { describe, expect, it } from 'vitest'

import { slugifyTopic } from './slugify'

describe('slugifyTopic', () => {
  it('lowercases and replaces runs of non-alphanumerics with a single hyphen', () => {
    expect(slugifyTopic('Next.js')).toBe('next-js')
    expect(slugifyTopic('CI/CD')).toBe('ci-cd')
    expect(slugifyTopic('React 19')).toBe('react-19')
    expect(slugifyTopic('Node.js')).toBe('node-js')
  })

  it('trims leading and trailing separators', () => {
    expect(slugifyTopic('  spaces  ')).toBe('spaces')
    expect(slugifyTopic('C++')).toBe('c')
  })

  it('is stable: slugifying a slug returns itself', () => {
    const slug = slugifyTopic('Some Topic')
    expect(slugifyTopic(slug)).toBe(slug)
  })
})
