import { describe, expect, it } from 'vitest'

import { filterMarkdownFiles } from './index'

const files = ['intro.mdx', 'notes.md', 'GUIDE.MDX', 'index.mdx', 'image.png']

describe('filterMarkdownFiles', () => {
  it('keeps only .mdx files, case-insensitively', () => {
    expect(filterMarkdownFiles(files)).toEqual([
      'intro.mdx',
      'GUIDE.MDX',
      'index.mdx',
    ])
  })

  it('excludes index.mdx when asked', () => {
    expect(filterMarkdownFiles(files, { excludeIndex: true })).toEqual([
      'intro.mdx',
      'GUIDE.MDX',
    ])
  })
})
