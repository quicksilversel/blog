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

export const CategorySection = ({ category, articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  
  const availableTopics = useMemo(
    () => extractAllTopics(articles),
    [articles]
  )
  
  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic]
  )
  
  const displayedArticles = filteredArticles.slice(0, 2)
  const hasMore = filteredArticles.length > 2
  
  return (
    <Box>
      <CategoryTitle>{getCategoryDisplayName(category)}</CategoryTitle>
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
              Show more {getCategoryDisplayName(category).toLowerCase()} articles →
            </ShowMoreButton>
          </Link>
        </ShowMoreContainer>
      )}
    </Box>
  )
}

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`

const ShowMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const ShowMoreButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`