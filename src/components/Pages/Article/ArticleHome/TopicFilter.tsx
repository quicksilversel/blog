'use client'
/** @jsxImportSource @emotion/react */

import { useState } from 'react'

import styled from '@emotion/styled'

const INITIAL_DISPLAY_LIMIT = 8

type Props = {
  topics: string[]
  selectedTopic: string | null
  onTopicSelect: (topic: string | null) => void
}

export const TopicFilter = ({
  topics,
  selectedTopic,
  onTopicSelect,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasMoreTopics = topics.length > INITIAL_DISPLAY_LIMIT
  const visibleTopics = isExpanded
    ? topics
    : topics.slice(0, INITIAL_DISPLAY_LIMIT)

  return (
    <Container>
      <TagContainer>
        <Tag isActive={!selectedTopic} onClick={() => onTopicSelect(null)}>
          All
        </Tag>
        {visibleTopics.map((topic) => (
          <Tag
            key={topic}
            isActive={selectedTopic === topic}
            onClick={() => onTopicSelect(topic)}
          >
            {topic}
          </Tag>
        ))}
        {hasMoreTopics && (
          <MoreButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded
              ? 'Show less'
              : `+${topics.length - INITIAL_DISPLAY_LIMIT} more`}
          </MoreButton>
        )}
      </TagContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;

  @media (width <= 35.1875rem) {
    margin-bottom: 16px;
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  font-size: var(--font-size-extra-small);
  color: ${({ theme, isActive }) => (isActive ? 'white' : theme.colors.text)};
  cursor: pointer;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.muted};
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : theme.colors.muted};
  }
`

const MoreButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  background: transparent;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`
