/** @jsxImportSource @emotion/react */
import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'
import { Grid } from '@/components/UI/Grid'

import { ArticleCard } from './ArticleCard'
import { TopicFilter } from './TopicFilter'

type Props = {
  category: string
  articles: Article[]
  isCategoryPage?: boolean
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

/**
 * Filter articles by selected topic
 */
const filterArticlesByTopic = (
  articles: Article[],
  selectedTopic: string | null,
): Article[] => {
  if (!selectedTopic) return articles

  return articles.filter(
    (article) => article.topics && article.topics.includes(selectedTopic),
  )
}

export const ArticleSection = ({
  category,
  articles,
  isCategoryPage,
}: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  const shouldShowMoreContents = filteredArticles.length > ARTICLE_LIMIT

  return (
    <Box>
      <Box.Title>{category}</Box.Title>
      <TopicFilter
        topics={availableTopics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />
      <Grid>
        {(isCategoryPage
          ? filteredArticles
          : filteredArticles.slice(0, ARTICLE_LIMIT)
        ).map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </Grid>
      {!!isCategoryPage === false && shouldShowMoreContents && (
        <ShowMoreContainer>
          <Link href={`/categories/${category}`}>
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`
