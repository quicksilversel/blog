import { useState, useMemo } from 'react'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'

import { TopicFilter } from '../../Article/ArticleHome/TopicFilter'

type Props = {
  articles: Article[]
}

const ARTICLE_LIMIT = 6

export const RecentArticles = ({ articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const topics = useMemo(() => {
    return Array.from(
      new Set(articles.flatMap((article) => article.category || [])),
    ).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    return selectedTopic
      ? articles.filter((article) => article.category === selectedTopic)
      : articles
  }, [articles, selectedTopic])

  return (
    <Box>
      <Box.SectionHeader>
        <Box.Title>Recent Articles</Box.Title>
        <Box.Link href="/articles">View All Articles</Box.Link>
      </Box.SectionHeader>
      <TopicFilter
        topics={topics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />
      <Grid>
        {filteredArticles.slice(0, ARTICLE_LIMIT).map((article) => {
          const isProjectArticle = 'project' in article
          const link = isProjectArticle
            ? `/projects/${article.slug}`
            : `/articles/${article.slug}`

          return (
            <Card
              key={article.slug}
              title={article.title}
              subtitle={article.readingTime}
              description={article.description}
              topics={article.topics}
              link={link}
            />
          )
        })}
      </Grid>
    </Box>
  )
}
