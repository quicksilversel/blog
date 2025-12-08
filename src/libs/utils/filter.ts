type WithPublished = { published?: boolean }

export function isPublished<T extends WithPublished>(article: T): boolean {
  return article.published !== false
}

export function filterPublished<T extends WithPublished>(articles: T[]): T[] {
  return articles.filter(isPublished)
}
