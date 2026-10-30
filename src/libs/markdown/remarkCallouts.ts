import type { Blockquote, Nodes, Paragraph, Root } from 'mdast'

/**
 * Turns GitHub style alerts into callouts:
 *
 *     > [!NOTE]
 *     > Body text.
 *
 *     > [!TIP] Custom title
 *     > Body text.
 *
 * The marker is stripped from the content and the blockquote is tagged with
 * `data-callout` (and `data-callout-title`), which the Blockquote markup
 * component renders as a Callout. Unknown types fall back to the default
 * callout style, so no list of types is duplicated here.
 */
const MARKER_PATTERN = /^\[!(\w+)\]\s*(.*)$/

type Marker = {
  type: string
  title?: string
}

/**
 * Remark keeps a soft line break inside the text node, so the marker and the
 * first line of the body share one value: `"[!NOTE] Title\nBody"`. Strips the
 * marker line off that node and returns what it held.
 */
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

const forEachBlockquote = (
  node: Nodes,
  visitor: (blockquote: Blockquote) => void,
): void => {
  if (node.type === 'blockquote') visitor(node)
  if ('children' in node) {
    node.children.forEach((child) => forEachBlockquote(child, visitor))
  }
}

export const remarkCallouts = () => (tree: Root) => {
  forEachBlockquote(tree, (blockquote) => {
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
