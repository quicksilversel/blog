import { promises as fs } from 'fs'

import matter from 'gray-matter'
import readingTime from 'reading-time'

export type ParsedMarkdown = {
  frontmatter: Record<string, unknown>
  content: string
  readingTime: string
}

export async function parseMarkdownFile(
  filePath: string,
): Promise<ParsedMarkdown> {
  const source = await fs.readFile(filePath, 'utf8')
  const { data: frontmatter, content } = matter(source)

  return {
    frontmatter,
    content,
    readingTime: readingTime(source).text,
  }
}

export function parseMarkdownString(source: string): ParsedMarkdown {
  const { data: frontmatter, content } = matter(source)

  return {
    frontmatter,
    content,
    readingTime: readingTime(source).text,
  }
}

export function filterMarkdownFiles(
  files: string[],
  options?: { excludeIndex?: boolean },
): string[] {
  return files.filter((file) => {
    const isMdx = file.toLowerCase().endsWith('.mdx')
    if (!isMdx) return false
    if (options?.excludeIndex && file === 'index.mdx') return false
    return true
  })
}
