export type Article = {
  title: string
  description?: string
  topics?: string[]
  published?: boolean
  date: string
  slug: string
  fileName: string
  fullPath: string
  category: string
  readingTime?: string
}
