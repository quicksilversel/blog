import type { Article } from '@/libs/getArticles/types'

export type ArchiveItem = Article & { isProject: boolean }

export type ChartData = {
  categories: string[]
  months: string[]
  cumulativeData: Record<string, Record<string, number>>
  maxCount: number
}
