import GithubSlugger from 'github-slugger'

export type Heading = {
  id: string
  text: string
  level: number
}

const FENCE = /^\s*(?:```|~~~)/
const ATX_HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/

const CODE_SPAN = /(`[^`]*`)/

const stripEmphasis = (markdown: string): string =>
  markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/(^|\W)__([^_]+)__(?=\W|$)/g, '$1$2')
    .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, '$1$2')

const toPlainText = (markdown: string): string =>
  markdown
    .split(CODE_SPAN)
    .map((segment) =>
      CODE_SPAN.test(segment) ? segment.slice(1, -1) : stripEmphasis(segment),
    )
    .join('')
    .trim()

export const getHeadings = (
  content: string,
  levels: number[] = [2, 3],
): Heading[] => {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  let insideFence = false

  for (const line of content.split('\n')) {
    if (FENCE.test(line)) {
      insideFence = !insideFence
      continue
    }
    if (insideFence) continue

    const match = line.match(ATX_HEADING)
    if (!match) continue

    const text = toPlainText(match[2])
    const id = slugger.slug(text)
    const level = match[1].length

    if (levels.includes(level)) headings.push({ id, text, level })
  }

  return headings
}
