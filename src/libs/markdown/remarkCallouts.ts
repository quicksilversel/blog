import type { Paragraph, Root } from 'mdast'

import { visitNodes } from './visitNodes'

const MARKER_PATTERN = /^\[!(\w+)\]\s*(.*)$/

type Marker = {
  type: string
  title?: string
}

const takeMarker = (paragraph: Paragraph): Marker | null => {
  const [first] = paragraph.children
  if (first?.type !== 'text') return null

  const lineBreak = first.value.indexOf('\n')
  const firstLine =
    lineBreak === -1 ? first.value : first.value.slice(0, lineBreak)

  const match = firstLine.match(MARKER_PATTERN)
  if (!match) return null

  const [, type, title] = match
  const body = lineBreak === -1 ? '' : first.value.slice(lineBreak + 1)

  if (body) first.value = body
  else paragraph.children.shift()

  return { type: type.toLowerCase(), title: title.trim() || undefined }
}

export const remarkCallouts = () => (tree: Root) => {
  visitNodes(tree, 'blockquote', (blockquote) => {
    const [first] = blockquote.children
    if (first?.type !== 'paragraph') return

    const marker = takeMarker(first)
    if (!marker) return

    if (first.children.length === 0) blockquote.children.shift()

    blockquote.data = {
      ...blockquote.data,
      hProperties: {
        ...blockquote.data?.hProperties,
        'data-callout': marker.type,
        ...(marker.title ? { 'data-callout-title': marker.title } : {}),
      },
    }
  })
}
