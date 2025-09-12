import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import Image from 'next/image'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'

type ArchiveItem = Article & {
  isProject: boolean
}
type Props = {
  articles: Record<string, ArchiveItem[]>
}

export function Archive({ articles }: Props) {
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set(Object.keys(articles)),
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
      Object.values(articles).reduce(
        (sum, articles) => sum + articles.length,
        0,
      ),
    [articles],
  )

  return (
    <Box>
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
        {Object.entries(articles).map(([monthKey, articles]) => {
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
                      <ArticleLink
                        href={
                          article.isProject
                            ? `/projects/${article.slug}`
                            : `/articles/${article.slug}`
                        }
                      >
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
    </Box>
  )
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 836/557;
  margin-bottom: 2rem;

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`

const Header = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 2rem;

  @media (width <= 35.1875rem) {
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

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    content: '';
    background: ${({ theme }) => theme.colors.muted};
  }
`

const MonthSection = styled.section`
  position: relative;
  margin-bottom: 2rem;

  &::before {
    position: absolute;
    top: 8px;
    left: -4px;
    width: 10px;
    height: 10px;
    content: '';
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
  }

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const MonthHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`

const MonthTitle = styled.h2`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: var(--font-size-medium);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const ToggleIcon = styled(ExpandCircleDownIcon, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{
  isExpanded: boolean
}>`
  display: inline-block;
  font-size: var(--font-size-medium);
  transform: ${({ isExpanded }) =>
    !isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`

const PostCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`

const ArticleList = styled.ul`
  padding: 0;
  margin: 1rem 0 0 2rem;
  list-style: none;
`

const ArticleItem = styled.li`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding: 0.5rem 0;
  font-size: var(--font-size-small);
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const DateLabel = styled.span`
  flex-shrink: 0;
  width: 3.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`

const ArticleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`
