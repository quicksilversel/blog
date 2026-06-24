'use client'

import React, { useState } from 'react'

import styled from '@emotion/styled'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import type { ProjectArticle } from '@/libs/getProjects'

import { H2 } from '../Article/ArticleDetail/Markup'

type Props = {
  articles: ProjectArticle[]
  currentSlug: string
  title: string
}

export function ProjectNavigation({ articles, currentSlug, title }: Props) {
  const [isExpanded, setIsExpanded] = useState(true)

  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug,
  )
  const currentPart = currentIndex >= 0 ? currentIndex + 1 : 0
  const progress =
    articles.length > 0 ? (currentPart / articles.length) * 100 : 0

  return (
    <>
      <H2>Project Navigation</H2>
      <Container>
        <Header onClick={() => setIsExpanded(!isExpanded)}>
          <TitleGroup>
            <Title>Series: {title}</Title>
            {currentPart > 0 && (
              <Progress>
                Part {currentPart} of {articles.length}
              </Progress>
            )}
          </TitleGroup>
          <ToggleIcon isExpanded={isExpanded} />
        </Header>
        <ProgressTrack>
          <ProgressBar progress={progress} />
        </ProgressTrack>
        {isExpanded && (
          <ArticleList>
            {articles.map((article, index) => {
              const isCurrentArticle = article.slug === currentSlug
              return (
                <ArticleItem key={article.slug} isActive={isCurrentArticle}>
                  <ArticleLink
                    href={`/projects/${article.slug}`}
                    isActive={isCurrentArticle}
                  >
                    <ArticleNumber>{index + 1}.</ArticleNumber>
                    <ArticleTitle>{article.title}</ArticleTitle>
                  </ArticleLink>
                </ArticleItem>
              )
            })}
          </ArticleList>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 2rem auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
`

const Header = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
`

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`

const Progress = styled.span`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const ProgressTrack = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.muted};
`

const ProgressBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'progress',
})<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`

const ToggleIcon = styled(ChevronDown, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: transform 0.2s ease;
`

const ArticleList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
`

const ArticleItem = styled.li<{ isActive: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const ArticleLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.text};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.floating : 'transparent'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`

const ArticleNumber = styled.span`
  margin-right: 0.75rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`

const ArticleTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
`
