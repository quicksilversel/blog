export type CodeMeta = {
  title?: string
  highlightedLines: Set<number>
  showLineNumbers: boolean
}

const TITLE = /(?:title|filename)="([^"]*)"/
const LINE_RANGES = /\{([\d\s,-]+)\}/
const NO_LINE_NUMBERS = /\bnoLineNumbers\b/

const expandRanges = (ranges: string): Set<number> => {
  const lines = new Set<number>()

  for (const part of ranges.split(',')) {
    const [rawStart, rawEnd] = part.split('-').map((value) => value.trim())
    const start = Number(rawStart)
    if (!Number.isInteger(start) || start < 1) continue

    if (rawEnd === undefined) {
      lines.add(start)
      continue
    }

    const end = Number(rawEnd)
    if (!Number.isInteger(end) || end < start) continue

    for (let line = start; line <= end; line += 1) lines.add(line)
  }

  return lines
}

export const parseCodeMeta = (meta?: string): CodeMeta => {
  if (!meta) {
    return { highlightedLines: new Set(), showLineNumbers: true }
  }

  const ranges = meta.match(LINE_RANGES)

  return {
    title: meta.match(TITLE)?.[1] || undefined,
    highlightedLines: ranges ? expandRanges(ranges[1]) : new Set(),
    showLineNumbers: !NO_LINE_NUMBERS.test(meta),
  }
}
