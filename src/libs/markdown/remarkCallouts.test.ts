import { describe, expect, it } from 'vitest'

import type { Blockquote, Paragraph, Root } from 'mdast'

import { remarkCallouts } from './remarkCallouts'

/**
 * Remark parses `> [!NOTE]\n> Body` into a single blockquote > paragraph >
 * text node whose value keeps the soft line break.
 */
const quote = (...children: Blockquote['children']): Root => ({
  type: 'root',
  children: [{ type: 'blockquote', children }],
})

const paragraph = (value: string): Paragraph => ({
  type: 'paragraph',
  children: [{ type: 'text', value }],
})

const transform = (tree: Root): Blockquote => {
  remarkCallouts()(tree)
  return tree.children[0] as Blockquote
}

describe('remarkCallouts', () => {
  it('tags the blockquote and strips the marker line', () => {
    const blockquote = transform(quote(paragraph('[!NOTE]\nBody text.')))

    expect(blockquote.data?.hProperties).toEqual({ 'data-callout': 'note' })
    expect(blockquote.children).toEqual([paragraph('Body text.')])
  })

  it('lowercases the type and reads a custom title', () => {
    const blockquote = transform(quote(paragraph('[!TIP] Prior art\nBody.')))

    expect(blockquote.data?.hProperties).toEqual({
      'data-callout': 'tip',
      'data-callout-title': 'Prior art',
    })
    expect(blockquote.children).toEqual([paragraph('Body.')])
  })

  it('drops the paragraph when the marker was its only content', () => {
    const blockquote = transform(
      quote(paragraph('[!WARNING] Heads up'), paragraph('Body.')),
    )

    expect(blockquote.data?.hProperties).toEqual({
      'data-callout': 'warning',
      'data-callout-title': 'Heads up',
    })
    expect(blockquote.children).toEqual([paragraph('Body.')])
  })

  it('keeps inline nodes that follow the marker line', () => {
    const blockquote = transform(
      quote({
        type: 'paragraph',
        children: [
          { type: 'text', value: '[!CAUTION]\nMind the ' },
          { type: 'strong', children: [{ type: 'text', value: 'gap' }] },
        ],
      }),
    )

    expect(blockquote.children[0]).toEqual({
      type: 'paragraph',
      children: [
        { type: 'text', value: 'Mind the ' },
        { type: 'strong', children: [{ type: 'text', value: 'gap' }] },
      ],
    })
  })

  it('leaves plain blockquotes alone', () => {
    const blockquote = transform(quote(paragraph('Just a quote.')))

    expect(blockquote.data).toBeUndefined()
    expect(blockquote.children).toEqual([paragraph('Just a quote.')])
  })
})
