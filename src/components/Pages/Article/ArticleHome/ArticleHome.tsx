import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'

import { TopicFilter } from './TopicFilter'

type Props = {
  category: string
  articles: Article[]
}

const ARTICLE_LIMIT = 2

const extractAllTopics = (articles: Article[]): string[] => {
  const topicsSet = new Set<string>()

  articles.forEach((article) => {
    if (article.topics) {
      article.topics.forEach((topic) => topicsSet.add(topic))
    }
  })

  return Array.from(topicsSet).sort()
}

const filterArticlesByTopic = (
  articles: Article[],
  selectedTopic: string | null,
): Article[] => {
  if (!selectedTopic) return articles

  return articles.filter(
    (article) => article.topics && article.topics.includes(selectedTopic),
  )
}

export const ArticleHome = ({ category, articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  const shouldShowMoreContents = filteredArticles.length > ARTICLE_LIMIT

  return (
    <Box>
      <Box.SectionHeader>
        <Box.Title>{category}</Box.Title>
      </Box.SectionHeader>
      <TopicFilter
        topics={availableTopics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />
      <Grid>
        {filteredArticles.map((article) => (
          <Card
            key={article.slug}
            title={article.title}
            description={article.description}
            topics={article.topics}
            link={`/articles/${article.slug}`}
          />
        ))}
      </Grid>
      {shouldShowMoreContents && (
        <ShowMoreContainer>
          <Link href={`/articles/${category}`}>
            <ShowMoreButton>
              Show more {category.toLowerCase()} articles →
            </ShowMoreButton>
          </Link>
        </ShowMoreContainer>
      )}
    </Box>
  )
}

const ShowMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const ShowMoreButton = styled.button`
  color: ${({ theme }) => theme.primary};
  border: none;
  font-size: var(--font-size-extra-small);
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
