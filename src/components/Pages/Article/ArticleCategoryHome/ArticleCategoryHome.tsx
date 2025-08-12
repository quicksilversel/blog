import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Stack } from '@/components/UI/Stack'

type Props = {
  category: string
  articles: Article[]
}

export const ArticleCategoryHome = ({ category, articles }: Props) => {
  return (
    <Box>
      <Box.SectionHeader>
        <Box.Title>{category}</Box.Title>
      </Box.SectionHeader>

      <Stack>
        {articles.map((article) => (
          <Card
            key={article.slug}
            title={article.title}
            description={article.description}
            topics={article.topics}
            link={`/articles/${article.slug}`}
          />
        ))}
      </Stack>
    </Box>
  )
}
