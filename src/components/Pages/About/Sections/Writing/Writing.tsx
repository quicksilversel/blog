import styled from '@emotion/styled'
import Link from 'next/link'

import type { TopicSummary } from '@/libs/getTopics'

import { TopicTags } from '@/components/UI/TopicTags'

import { Section } from '../../UI/Section'

type Props = {
  topics: TopicSummary[]
}

export const Writing = ({ topics }: Props) => {
  return (
    <Section id="writing" title="What I write about">
      <TopicTags topics={topics} />
      <ArchiveLink href="/archive">Browse everything &rarr;</ArchiveLink>
    </Section>
  )
}

const ArchiveLink = styled(Link)`
  display: inline-block;
  margin-top: 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
