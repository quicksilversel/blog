import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import Image from 'next/image'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

type GroupedArticles = {
  [key: string]: Article[]
}

type Props = {
  groupedArticles: GroupedArticles
}

export function Archive({ groupedArticles }: Props) {
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set(Object.keys(groupedArticles)),
  )

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(monthKey)) {
        newSet.delete(monthKey)
      } else {
        newSet.add(monthKey)
      }
      return newSet
    })
  }

  const totalArticles = useMemo(
    () =>
      Object.values(groupedArticles).reduce(
        (sum, articles) => sum + articles.length,
        0,
      ),
    [groupedArticles],
  )

  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src="/hero-lofi.png"
          alt="Archive Hero Image"
          fill
          loading="eager"
          priority
        />
      </ImageContainer>
      <Header>
        <Title>Archive</Title>
        <TotalCount>{totalArticles} posts</TotalCount>
      </Header>
      <Timeline>
        {Object.entries(groupedArticles).map(([monthKey, articles]) => {
          const [year, month] = monthKey.split('-')
          const monthName = new Date(`${year}-${month}-01`).toLocaleDateString(
            'en-US',
            {
              month: 'long',
              year: 'numeric',
            },
          )
          return (
            <MonthSection key={monthKey}>
              <MonthHeader onClick={() => toggleMonth(monthKey)}>
                <MonthTitle>
                  <ToggleIcon isExpanded={expandedMonths.has(monthKey)}>
                    ▶
                  </ToggleIcon>
                  {monthName}
                </MonthTitle>
                <PostCount>{articles.length} posts</PostCount>
              </MonthHeader>
              {expandedMonths.has(monthKey) && (
                <ArticleList>
                  {articles.map((article) => (
                    <ArticleItem key={article.slug}>
                      <DateLabel>
                        {new Date(article.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </DateLabel>
                      <ArticleLink href={`/articles/${article.slug}`}>
                        {article.title}
                      </ArticleLink>
                    </ArticleItem>
                  ))}
                </ArticleList>
              )}
            </MonthSection>
          )
        })}
      </Timeline>
    </Container>
  )
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 836/557;
  margin-bottom: 2rem;

  @media (max-width: 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const StyledImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  font-size: var(--font-size-large);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const TotalCount = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Timeline = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.muted};
  }
`

const MonthSection = styled.section`
  margin-bottom: 2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: -4px;
    top: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.background};
  }

  @media (max-width: 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const MonthHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    opacity: 0.8;
  }
`

const MonthTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-medium);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const ToggleIcon = styled(ExpandCircleDownIcon)<{ isExpanded: boolean }>`
  display: inline-block;
  transform: ${({ isExpanded }) =>
    !isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  font-size: var(--font-size-medium);
`

const PostCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 2rem;
`

const ArticleItem = styled.li`
  display: flex;
  align-items: baseline;
  font-size: var(--font-size-small);
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const DateLabel = styled.span`
  flex-shrink: 0;
  width: 3.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`

const ArticleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
