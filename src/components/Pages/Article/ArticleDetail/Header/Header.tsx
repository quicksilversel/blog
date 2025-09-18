import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  title: string
  date?: string
  topics?: string[]
  readingTime?: string
}

export const ArticleHeader = ({ title, date, topics, readingTime }: Props) => {
  const formattedDate = date
    ? new globalThis.Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

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
        {readingTime && <ReadingTime>☕ {readingTime}</ReadingTime>}
        {topics && topics.length > 0 && (
          <Topics>
            {topics.map((topic) => (
              <Topic key={topic}>{topic}</Topic>
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
  font-size: var(--font-size-extra-large);
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
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.text};
`

const ReadingTime = styled.span`
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`

const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Topic = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: var(--font-size-extra-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
`
