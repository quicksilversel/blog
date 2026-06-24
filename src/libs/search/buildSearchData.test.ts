import { describe, expect, it } from 'vitest'

import { toPlainText } from './buildSearchData'

const source = [
  '---',
  'title: Hidden Title',
  '---',
  '# Real Heading',
  'Some **bold** prose and `inlineCode` here.',
  '',
  '```js',
  'const secret = 42',
  '```',
  '',
  'A [link label](https://example.com) at the end.',
].join('\n')

describe('toPlainText', () => {
  const result = toPlainText(source)

  it('strips frontmatter', () => {
    expect(result).not.toContain('Hidden Title')
    expect(result).not.toContain('title:')
  })

  it('strips fenced code blocks and inline code', () => {
    expect(result).not.toContain('secret')
    expect(result).not.toContain('inlineCode')
    expect(result).not.toContain('`')
  })

  it('keeps prose and link text', () => {
    expect(result).toContain('Real Heading')
    expect(result).toContain('bold')
    expect(result).toContain('link label')
  })

  it('collapses whitespace into single spaces', () => {
    expect(result).not.toMatch(/\s{2,}/)
  })
})
