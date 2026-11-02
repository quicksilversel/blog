import { describe, expect, it } from 'vitest'

import { getHeadings } from './getHeadings'

describe('getHeadings', () => {
  it('collects h2 and h3 headings by default', () => {
    const headings = getHeadings(
      ['# Title', '## First', '### Nested', '#### Too deep'].join('\n'),
    )

    expect(headings).toEqual([
      { id: 'first', text: 'First', level: 2 },
      { id: 'nested', text: 'Nested', level: 3 },
    ])
  })

  it('ignores hash lines inside fenced code blocks', () => {
    const headings = getHeadings(
      ['## Real', '```bash', '# not a heading', '```', '## Also real'].join(
        '\n',
      ),
    )

    expect(headings.map((heading) => heading.text)).toEqual([
      'Real',
      'Also real',
    ])
  })

  it('strips inline markdown so ids match the rendered text', () => {
    const headings = getHeadings(
      ['## Using `useMemo` and **memo**', '## A [link](/somewhere) here'].join(
        '\n',
      ),
    )

    expect(headings).toEqual([
      {
        id: 'using-usememo-and-memo',
        text: 'Using useMemo and memo',
        level: 2,
      },
      { id: 'a-link-here', text: 'A link here', level: 2 },
    ])
  })

  it('keeps underscores that live inside a code span', () => {
    const headings = getHeadings('## On `heap_size_limit` Increasing')

    expect(headings).toEqual([
      {
        id: 'on-heap_size_limit-increasing',
        text: 'On heap_size_limit Increasing',
        level: 2,
      },
    ])
  })

  it('still strips emphasis around a code span', () => {
    const headings = getHeadings('## _Why_ `a_b` **matters**')

    expect(headings[0].text).toBe('Why a_b matters')
  })

  it('leaves intraword underscores alone, as CommonMark does', () => {
    const headings = getHeadings(
      '## 1. httpcode_elb_5xx vs httpcode_target_5xx',
    )

    expect(headings).toEqual([
      {
        id: '1-httpcode_elb_5xx-vs-httpcode_target_5xx',
        text: '1. httpcode_elb_5xx vs httpcode_target_5xx',
        level: 2,
      },
    ])
  })

  it('suffixes duplicate headings the way rehype-slug does', () => {
    const headings = getHeadings(
      ['## Setup', '## Setup', '## Setup'].join('\n'),
    )

    expect(headings.map((heading) => heading.id)).toEqual([
      'setup',
      'setup-1',
      'setup-2',
    ])
  })

  it('keeps the slugger in step with headings it does not return', () => {
    const headings = getHeadings(['# Setup', '## Setup'].join('\n'))

    expect(headings).toEqual([{ id: 'setup-1', text: 'Setup', level: 2 }])
  })
})
