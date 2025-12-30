'use client'

import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import { CircleChevronDown } from 'lucide-react'
import { PawPrint } from 'lucide-react'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

import { Box } from '@/components/UI/Box'

import { GrowthChart } from './GrowthChart'

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

  // Group articles by year
  const articlesByYear = useMemo(() => {
    const grouped: Record<string, Record<string, ArchiveItem[]>> = {}

    Object.entries(articles).forEach(([monthKey, articles]) => {
      const [year] = monthKey.split('-')
      if (!grouped[year]) {
        grouped[year] = {}
      }
      grouped[year][monthKey] = articles
    })

    return grouped
  }, [articles])

  return (
    <Box>
      <Header>
        <StyledPawPrint />
        <Title>Archive</Title>
        <TotalCount>{totalArticles} posts</TotalCount>
      </Header>
      <GrowthChart articles={articles} />
      {Object.entries(articlesByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, monthsData]) => {
          const yearPostCount = Object.values(monthsData).reduce(
            (sum, articles) => sum + articles.length,
            0,
          )

          return (
            <YearSection key={year}>
              <YearHeader>
                <YearTitle>{year}</YearTitle>
                <YearPostCount>{yearPostCount} posts</YearPostCount>
              </YearHeader>
              <Timeline>
                {Object.entries(monthsData).map(([monthKey, articles]) => {
                  const [, month] = monthKey.split('-')
                  const monthName = new Date(
                    `${year}-${month}-01`,
                  ).toLocaleDateString('en-US', {
                    month: 'long',
                  })
                  return (
                    <MonthSection key={monthKey}>
                      <MonthHeader onClick={() => toggleMonth(monthKey)}>
                        <MonthTitle>
                          <ToggleIcon
                            isExpanded={expandedMonths.has(monthKey)}
                          />
                          {monthName}
                        </MonthTitle>
                        <PostCount>{articles.length} posts</PostCount>
                      </MonthHeader>
                      {expandedMonths.has(monthKey) && (
                        <ArticleList>
                          {articles.map((article) => (
                            <ArticleItem key={article.slug}>
                              <DateLabel>
                                {new Date(article.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    day: 'numeric',
                                    month: 'short',
                                  },
                                )}
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
            </YearSection>
          )
        })}
    </Box>
  )
}

const Header = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 2rem;

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const StyledPawPrint = styled(PawPrint)`
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  font-size: var(--font-size-large);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const TotalCount = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.mutedText};
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  @media (hover: none) {
    &:hover {
      background-color: transparent;
    }
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

const ToggleIcon = styled(CircleChevronDown, {
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
  color: ${({ theme }) => theme.colors.mutedText};
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
  color: ${({ theme }) => theme.colors.mutedText};
`

const ArticleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`

const YearSection = styled.section`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (width <= 35.1875rem) {
    margin-bottom: 2rem;
  }
`

const YearHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const YearTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const YearPostCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.mutedText};
`
