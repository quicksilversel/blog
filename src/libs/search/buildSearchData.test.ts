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
  '',
  '> [!TIP] Callout title',
  '> Callout body.',
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

  it('strips callout markers but keeps their text', () => {
    expect(result).not.toContain('[!TIP]')
    expect(result).toContain('Callout title')
    expect(result).toContain('Callout body')
  })

  it('collapses whitespace into single spaces', () => {
    expect(result).not.toMatch(/\s{2,}/)
  })

  it('strips MDX component tags but indexes what they wrap', () => {
    const mdx = toPlainText(
      ['<Sidenote>', 'An aside worth finding.', '</Sidenote>'].join('\n'),
    )

    expect(mdx).not.toContain('Sidenote')
    expect(mdx).toContain('An aside worth finding.')
  })

  it('leaves self-closing components out of the indexed text', () => {
    expect(toPlainText('Before <Demo rows={10} /> after')).toBe('Before after')
  })
})
