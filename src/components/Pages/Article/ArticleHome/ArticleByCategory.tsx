'use client'

import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

import { BoxSectionHeader, BoxTitle } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'

import { TopicFilter } from './TopicFilter'

type Props = {
  category: string
  articles: Article[]
}

const ARTICLE_LIMIT = 4

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

export const ArticleByCategory = ({ category, articles }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  return (
    <Container>
      <BoxSectionHeader>
        <BoxTitle>{category}</BoxTitle>
      </BoxSectionHeader>
      <TopicFilter
        topics={availableTopics}
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
      <ShowMoreContainer>
        <Link href={`/articles/${category}`}>
          See all {category.toLowerCase()} articles →
        </Link>
      </ShowMoreContainer>
    </Container>
  )
}

const Container = styled.section`
  margin-top: 2rem;
`

const ShowMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: var(--font-size-extra-small);
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
