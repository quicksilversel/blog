import { describe, expect, it } from 'vitest'

import { parseCodeMeta } from './parseCodeMeta'

describe('parseCodeMeta', () => {
  it('defaults to line numbers and no decoration', () => {
    expect(parseCodeMeta()).toEqual({
      title: undefined,
      highlightedLines: new Set(),
      showLineNumbers: true,
    })
  })

  it('reads a title under either key', () => {
    expect(parseCodeMeta('title="src/app/page.tsx"').title).toBe(
      'src/app/page.tsx',
    )
    expect(parseCodeMeta('filename="next.config.ts"').title).toBe(
      'next.config.ts',
    )
  })

  it('expands single lines and ranges', () => {
    const { highlightedLines } = parseCodeMeta('{1,3-5}')

    expect([...highlightedLines]).toEqual([1, 3, 4, 5])
  })

  it('drops out-of-range and reversed entries, keeping the valid ones', () => {
    expect([...parseCodeMeta('{0,9-4,2}').highlightedLines]).toEqual([2])
  })

  it('ignores a range block it cannot parse at all', () => {
    expect([...parseCodeMeta('{abc}').highlightedLines]).toEqual([])
  })

  it('turns line numbers off on request', () => {
    expect(parseCodeMeta('noLineNumbers').showLineNumbers).toBe(false)
  })

  it('reads every option off one meta string', () => {
    const meta = parseCodeMeta('title="server.ts" {2} noLineNumbers')

    expect(meta.title).toBe('server.ts')
    expect([...meta.highlightedLines]).toEqual([2])
    expect(meta.showLineNumbers).toBe(false)
  })
})
