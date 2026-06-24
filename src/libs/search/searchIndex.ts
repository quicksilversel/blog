export type SearchDocument = {
  title: string
  description?: string
  topics?: string[]
  date: string
  slug: string
  fileName: string
  category: string
  readingTime?: string
  type: 'article' | 'snippet'
  project?: string
  content?: string
}

export type SearchResultItem = Omit<SearchDocument, 'content'>

const FIELD_WEIGHTS = {
  title: 3,
  description: 2,
  topics: 2,
  content: 1,
} as const

type WeightedField = keyof typeof FIELD_WEIGHTS

const SEARCH_FIELDS: WeightedField[] = [
  'title',
  'description',
  'topics',
  'content',
]

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

export class ArticleSearchIndex {
  private documents: SearchDocument[]

  constructor(documents: SearchDocument[]) {
    this.documents = documents
  }

  private fieldText(doc: SearchDocument, field: WeightedField): string {
    if (field === 'topics') return doc.topics?.join(' ') ?? ''
    const value = doc[field]
    return typeof value === 'string' ? value : ''
  }

  private scoreField(
    doc: SearchDocument,
    query: string,
    field: WeightedField,
  ): number {
    const haystack = normalize(this.fieldText(doc, field))
    if (!haystack) return 0

    const needle = normalize(query)
    if (!haystack.includes(needle)) return 0

    const base = FIELD_WEIGHTS[field]
    const exactMatchBoost = haystack === needle ? 2 : 1
    const prefixBoost = haystack.startsWith(needle) ? 1.5 : 1

    return base * exactMatchBoost * prefixBoost
  }

  search(query: string, limit: number = 10): SearchResultItem[] {
    const trimmed = query.trim()
    if (!trimmed) return []

    const scored: { item: SearchResultItem; score: number }[] = []

    for (const doc of this.documents) {
      let score = 0
      for (const field of SEARCH_FIELDS) {
        score += this.scoreField(doc, trimmed, field)
      }

      if (score > 0) {
        const { content: _content, ...item } = doc
        scored.push({ item, score })
      }
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((entry) => entry.item)
  }
}
