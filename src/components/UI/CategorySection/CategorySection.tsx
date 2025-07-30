/** @jsxImportSource @emotion/react */
import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article, Category } from '@/utils/types/article'

import { Box } from '@/components/Layout/Box'
import { Grid } from '@/components/Layout/Grid'
import { Card } from '@/components/UI/Card'
import { TopicFilter } from '@/components/UI/TopicFilter'
import { getCategoryDisplayName } from '@/modules/categories'
import { extractAllTopics, filterArticlesByTopic } from '@/modules/topics'

type Props = {
  category: Category
  articles: Article[]
}

const ARTICLE_LIMIT = 4

export const CategorySection = ({ category, articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  const displayedArticles = filteredArticles.slice(0, ARTICLE_LIMIT)
  const hasMore = filteredArticles.length > ARTICLE_LIMIT

  return (
    <Box>
      <Box.Title>{getCategoryDisplayName(category)}</Box.Title>
      <TopicFilter
        topics={availableTopics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />

      <Grid>
        {displayedArticles.map((article) => (
          <Card key={article.slug} {...article} />
        ))}
      </Grid>
      {hasMore && (
        <ShowMoreContainer>
          <Link href={`/categories/${category}`}>
            <ShowMoreButton>
              Show more {getCategoryDisplayName(category).toLowerCase()}{' '}
              articles →
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
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`
