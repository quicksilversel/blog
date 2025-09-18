import type { Article } from '@/libs/getArticles/types'

export interface SearchableArticle extends Article {
  content?: string
  type?: 'article' | 'snippet'
}

export interface SearchResult {
  article: SearchableArticle
  score: number
  highlights: {
    title?: string
    description?: string
    content?: string[]
  }
}

export class ArticleSearchIndex {
  private articles: SearchableArticle[]

  constructor(articles: SearchableArticle[]) {
    this.articles = articles
  }

  private normalizeText(text: string): string {
    return text.toLowerCase().trim()
  }

  private calculateScore(
    article: SearchableArticle,
    query: string,
    field: string,
  ): number {
    const normalizedQuery = this.normalizeText(query)
    const fieldValue = String(article[field as keyof SearchableArticle] || '')
    const normalizedField = this.normalizeText(fieldValue)

    if (!normalizedField.includes(normalizedQuery)) return 0

    const fieldWeights: Record<string, number> = {
      title: 3,
      description: 2,
      topics: 2,
      content: 1,
    }

    const baseScore = fieldWeights[field] || 1

    const exactMatchBoost = normalizedField === normalizedQuery ? 2 : 1

    const positionBoost = normalizedField.startsWith(normalizedQuery) ? 1.5 : 1

    return baseScore * exactMatchBoost * positionBoost
  }

  private highlightText(text: string, query: string): string {
    const normalizedQuery = this.normalizeText(query)
    const regex = new RegExp(`(${normalizedQuery})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  private extractSnippets(
    content: string,
    query: string,
    maxSnippets: number = 3,
  ): string[] {
    const normalizedQuery = this.normalizeText(query)
    const sentences = content.split(/[.!?]+/)
    const snippets: string[] = []

    for (const sentence of sentences) {
      if (snippets.length >= maxSnippets) break
      if (this.normalizeText(sentence).includes(normalizedQuery)) {
        const highlighted = this.highlightText(sentence.trim(), query)
        snippets.push(highlighted + '.')
      }
    }

    return snippets
  }

  search(query: string, limit: number = 10): SearchResult[] {
    if (!query || query.trim().length === 0) return []

    const results: SearchResult[] = []

    for (const article of this.articles) {
      let totalScore = 0
      const highlights: SearchResult['highlights'] = {}

      const titleScore = this.calculateScore(article, query, 'title')
      if (titleScore > 0) {
        totalScore += titleScore
        highlights.title = this.highlightText(article.title, query)
      }

      if (article.description) {
        const descScore = this.calculateScore(article, query, 'description')
        if (descScore > 0) {
          totalScore += descScore
          highlights.description = this.highlightText(
            article.description,
            query,
          )
        }
      }

      if (article.content) {
        const contentScore = this.calculateScore(article, query, 'content')
        if (contentScore > 0) {
          totalScore += contentScore
          highlights.content = this.extractSnippets(article.content, query)
        }
      }

      if (article.topics) {
        const topicsText = article.topics.join(' ')
        const topicsScore = this.calculateScore(
          { ...article, topics: topicsText } as any,
          query,
          'topics',
        )
        totalScore += topicsScore
      }

      if (totalScore > 0) {
        results.push({
          article,
          score: totalScore,
          highlights,
        })
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, limit)
  }

  getSuggestions(query: string, limit: number = 5): string[] {
    const normalizedQuery = this.normalizeText(query)
    const suggestions = new Set<string>()

    for (const article of this.articles) {
      if (this.normalizeText(article.title).includes(normalizedQuery)) {
        suggestions.add(article.title)
      }

      if (article.topics) {
        for (const topic of article.topics) {
          if (this.normalizeText(topic).includes(normalizedQuery)) {
            suggestions.add(topic)
          }
        }
      }
    }

    return Array.from(suggestions).slice(0, limit)
  }
}
