/* eslint-disable no-console */
import { promises as fs } from 'fs'
import path from 'path'

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, 'articles')
// Optional, gitignored. One term per line; blank lines and lines starting
// with `#` are ignored. Keep the real terms here so they never enter git.
const CONFIDENTIAL_FILE = path.join(ROOT, '.confidential-words')
const FENCE = /^\s*```/

// Prose-only patterns: checked outside fenced/inline code.
const PROSE_PATTERNS: { name: string; regex: RegExp; hint: string }[] = [
  {
    name: 'em-dash',
    regex: /—/,
    hint: 'Use commas, periods, or parentheses instead of an em dash.',
  },
]

type Violation = {
  file: string
  line: number
  rule: string
  hint: string
  text: string
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function loadConfidentialTerms(): Promise<
  { term: string; regex: RegExp }[]
> {
  try {
    const raw = await fs.readFile(CONFIDENTIAL_FILE, 'utf8')
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'))
      .map((term) => ({
        term,
        regex: new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i'),
      }))
  } catch {
    // No denylist present: the confidential check is simply inactive.
    return []
  }
}

async function findMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return findMdxFiles(fullPath)
      if (entry.isFile() && entry.name.endsWith('.mdx')) return [fullPath]
      return []
    }),
  )
  return files.flat()
}

function stripInlineCode(line: string): string {
  return line.replace(/`[^`]*`/g, ' ')
}

async function lintFile(
  filePath: string,
  confidentialTerms: { term: string; regex: RegExp }[],
): Promise<Violation[]> {
  const source = await fs.readFile(filePath, 'utf8')
  const lines = source.split('\n')
  const violations: Violation[] = []
  const file = path.relative(ROOT, filePath)
  let insideFence = false

  lines.forEach((rawLine, index) => {
    // Confidential terms are scanned everywhere, including code and
    // frontmatter, since a leaked name is a problem wherever it appears.
    for (const { term, regex } of confidentialTerms) {
      if (regex.test(rawLine)) {
        violations.push({
          file,
          line: index + 1,
          rule: 'confidential',
          hint: `Remove the confidential term "${term}" (replace with a generic equivalent).`,
          text: rawLine.trim(),
        })
      }
    }

    if (FENCE.test(rawLine)) {
      insideFence = !insideFence
      return
    }
    if (insideFence) return

    const line = stripInlineCode(rawLine)
    for (const pattern of PROSE_PATTERNS) {
      if (pattern.regex.test(line)) {
        violations.push({
          file,
          line: index + 1,
          rule: pattern.name,
          hint: pattern.hint,
          text: rawLine.trim(),
        })
      }
    }
  })

  return violations
}

async function lintContent() {
  const [files, confidentialTerms] = await Promise.all([
    findMdxFiles(CONTENT_DIR),
    loadConfidentialTerms(),
  ])

  const results = await Promise.all(
    files.map((file) => lintFile(file, confidentialTerms)),
  )
  const violations = results.flat()

  const checkedSuffix =
    confidentialTerms.length > 0
      ? ` (${confidentialTerms.length} confidential terms checked)`
      : ' (no .confidential-words file; confidential check inactive)'

  if (violations.length === 0) {
    console.log(
      `Content lint passed: ${files.length} files clean.${checkedSuffix}`,
    )
    return
  }

  for (const v of violations) {
    console.error(`${v.file}:${v.line}  [${v.rule}] ${v.hint}\n    ${v.text}`)
  }
  console.error(`\nContent lint failed: ${violations.length} violation(s).`)
  process.exit(1)
}

lintContent().catch((error) => {
  console.error(error)
  process.exit(1)
})
