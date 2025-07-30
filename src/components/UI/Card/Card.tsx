import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/utils/types/article'

export const Card = ({ title, description, topics, slug }: Article) => {
  return (
    <Container>
      <Link href={`/articles/${slug}`}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Link>
      <TopicList>
        {topics?.length &&
          topics.map((topic) => <Topic key={topic}>{topic}</Topic>)}
      </TopicList>
    </Container>
  )
}
const Container = styled.article`
  padding: 24px;
  background-color: ${({ theme }) => theme.floating};
  border-radius: 8px;

  @media (max-width: 35.1875rem) {
    padding: 16px;
  }
`

const Title = styled.h3`
  font-size: var(--font-size-small);
  font-weight: bold;
`

const Description = styled.p`
  font-size: var(--font-size-extra-small);
  margin-top: 16px;
  white-space: preserve pretty;
`

const TopicList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

const Topic = styled.span`
  padding: 8px;
  font-size: var(--font-size-extra-small);
  background-color: ${({ theme }) => theme.muted};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
`
