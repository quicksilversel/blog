import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  title: string
  date?: string
  topics?: string[]
}

export const ArticleHeader = ({ title, date, topics }: Props) => {
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
        <Image src="/cat.png" alt="" width={80} height={80} aria-hidden />
      </ImageContainer>
      <Title>{title}</Title>
      <MetaInfo>
        {formattedDate && <Date>{formattedDate}</Date>}
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
  padding: 0 1rem;

  @media (max-width: 35.1875rem) {
    margin-top: 1rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: var(--font-size-extra-large);
  margin-bottom: 1rem;
`

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`

const Date = styled.time`
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.text};
`

const Topics = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const Topic = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  font-size: var(--font-size-extra-small);
  font-weight: 500;
`
