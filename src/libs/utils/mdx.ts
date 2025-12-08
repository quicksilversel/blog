import { promises as fs } from 'fs'

import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'

export type ParsedMdx = {
  frontmatter: Record<string, unknown>
  source: string
  readingTime: string
}

export async function parseMdxFile(filePath: string): Promise<ParsedMdx> {
  const source = await fs.readFile(filePath, 'utf8')
  const { frontmatter } = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  return {
    frontmatter: frontmatter as Record<string, unknown>,
    source,
    readingTime: readingTime(source).text,
  }
}

export function filterMdxFiles(
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
