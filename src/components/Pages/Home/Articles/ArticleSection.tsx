/** @jsxImportSource @emotion/react */
import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/utils/types/article'

import { Box } from '@/components/UI/Box'
import { Grid } from '@/components/UI/Grid'
import { getCategoryDisplayName, extractAllTopics, filterArticlesByTopic } from '@/modules/articles'

import { ArticleCard } from './ArticleCard'
import { TopicFilter } from './TopicFilter'

type Props = {
  category: string
  articles: Article[]
}

const ARTICLE_LIMIT = 4

export const ArticleSection = ({ category, articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  const shouldShowMoreContents = filteredArticles.length > ARTICLE_LIMIT

  return (
    <Box>
      <Box.Title>{getCategoryDisplayName(category)}</Box.Title>
      <TopicFilter
        topics={availableTopics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />
      <Grid>
        {filteredArticles.slice(0, ARTICLE_LIMIT).map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </Grid>
      {shouldShowMoreContents && (
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
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`
