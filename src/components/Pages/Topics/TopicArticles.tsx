'use client'

import type { ArticleWithHref } from '@/libs/getTopics'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'
import { SectionHeader } from '@/components/UI/SectionHeader'

type Props = {
  topic: string
  articles: ArticleWithHref[]
}

export const TopicArticles = ({ topic, articles }: Props) => {
  return (
    <Box>
      <SectionHeader
        title={`#${topic}`}
        description={`${articles.length} ${articles.length === 1 ? 'post' : 'posts'} tagged ${topic}`}
      />
      <Grid>
        {articles.map((article) => (
          <Card
            key={article.slug}
            title={article.title}
            subtitle={article.readingTime}
            description={article.description}
            topics={article.topics}
            link={article.href}
          />
        ))}
      </Grid>
    </Box>
  )
}
