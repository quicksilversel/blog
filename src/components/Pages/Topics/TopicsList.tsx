'use client'

import type { TopicSummary } from '@/libs/getTopics'

import { Box } from '@/components/UI/Box'
import { SectionHeader } from '@/components/UI/SectionHeader'
import { TopicTags } from '@/components/UI/TopicTags'

type Props = {
  topics: TopicSummary[]
}

export const TopicsList = ({ topics }: Props) => {
  return (
    <Box>
      <SectionHeader title="Topics" imageUrl="/cat-working.png" width={100} />
      <TopicTags topics={topics} />
    </Box>
  )
}
