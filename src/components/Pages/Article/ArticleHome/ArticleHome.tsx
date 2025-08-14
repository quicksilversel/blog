import { useMemo } from 'react'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'
import { SectionHeader } from '@/components/UI/SectionHeader'

import { ArticleByCategory } from './ArticleByCategory'

type Props = {
  articles: Record<string, Article[]>
}

export const ArticleHome = ({ articles }: Props) => {
  const categories = useMemo(
    () => Object.entries(articles).sort(([a], [b]) => a.localeCompare(b)),
    [articles],
  )

  return (
    <Box>
      <SectionHeader
        title="All Articles"
        imageUrl="/cat-working.png"
        width={100}
      />
      {categories.map(([category, articles]) => (
        <ArticleByCategory
          key={category}
          category={category}
          articles={articles}
        />
      ))}
    </Box>
  )
}
