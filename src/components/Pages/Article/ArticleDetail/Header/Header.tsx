import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

import { slugifyTopic } from '@/libs/getTopics/slugify'
import { formatDate } from '@/libs/utils'

type Props = {
  title: string
  date?: string
  updated?: string
  topics?: string[]
  readingTime?: string
}

export const ArticleHeader = ({
  title,
  date,
  updated,
  topics,
  readingTime,
}: Props) => {
  const formattedDate = date ? formatDate(date) : null
  const showUpdated = updated && updated !== date

  return (
    <Container>
      <ImageContainer>
        <Image
          src="/cat.png"
          alt=""
          width={80}
          height={80}
          aria-hidden
          priority
          loading="eager"
        />
      </ImageContainer>
      <Title>{title}</Title>
      <MetaInfo>
        {formattedDate && <Date>{formattedDate}</Date>}
        {showUpdated && <Updated>Updated {formatDate(updated)}</Updated>}
        {readingTime && <ReadingTime>☕ {readingTime}</ReadingTime>}
        {topics && topics.length > 0 && (
          <Topics>
            {topics.map((topic) => (
              <Topic key={topic} href={`/topics/${slugifyTopic(topic)}`}>
                {topic}
              </Topic>
            ))}
          </Topics>
        )}
      </MetaInfo>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;

  @media (width <= 35.1875rem) {
    margin-top: 1rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
`

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Date = styled.time`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
`

const Updated = styled.time`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`

const ReadingTime = styled.span`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`

const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Topic = styled(Link)`
  padding: 0.25rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
