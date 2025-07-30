export type Category = 'sre' | 'frontend' | 'other'

export type Article = {
  title: string
  description?: string
  topics?: string[]
  category?: Category
  published?: boolean
  date: string
  slug: string
}
