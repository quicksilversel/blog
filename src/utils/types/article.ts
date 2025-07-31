import { CATEGORY_LIST } from '../constants'

export type Category = (typeof CATEGORY_LIST)[number]['value']

export type Article = {
  title: string
  description?: string
  topics?: string[]
  category?: Category
  published?: boolean
  date: string
  slug: string
}
