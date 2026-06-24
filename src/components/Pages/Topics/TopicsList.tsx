'use client'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { TopicSummary } from '@/libs/getTopics'

import { Box } from '@/components/UI/Box'
import { SectionHeader } from '@/components/UI/SectionHeader'

type Props = {
  topics: TopicSummary[]
}

export const TopicsList = ({ topics }: Props) => {
  return (
    <Box>
      <SectionHeader title="Topics" imageUrl="/cat-working.png" width={100} />
      <TagCloud>
        {topics.map(({ topic, slug, count }) => (
          <Tag key={slug} href={`/topics/${slug}`}>
            {topic}
            <Count>{count}</Count>
          </Tag>
        ))}
      </TagCloud>
    </Box>
  )
}

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const Tag = styled(Link)`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.4rem 0.9rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 1rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.primary};
`
