import { useMemo } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  subtitle?: string
  description?: string
  topics?: string[]
  link: string
  size?: 'medium' | 'large'
}

export const Card = ({
  title,
  subtitle,
  description,
  topics,
  link,
  size = 'medium',
}: Props) => {
  const showImage = useMemo(() => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash + title.charCodeAt(i)) & 0xffffffff
    }
    return Math.abs(hash) % 3 === 0
  }, [title])

  return (
    <Container>
      <Link href={link}>
        <Contents>
          <Title size={size}>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {description && <Description>{description}</Description>}
          {topics?.length && (
            <TopicList>
              {topics.map((topic) => (
                <Topic key={topic}>{topic}</Topic>
              ))}
            </TopicList>
          )}
        </Contents>
        {showImage && (
          <ImageContainer>
            <Image
              src="/cat-black.png"
              alt=""
              width={size === 'large' ? 80 : 60}
              height={0}
              style={{
                width: 'auto',
                height: 'auto',
              }}
              aria-hidden
              priority
              loading="eager"
            />
          </ImageContainer>
        )}
      </Link>
    </Container>
  )
}
const Container = styled.article`
  position: relative;
  background-color: ${({ theme }) => theme.floating};
  border-radius: 8px;
`

const Contents = styled.div`
  position: relative;
  padding: 24px;
  z-index: 2;

  @media (max-width: 35.1875rem) {
    padding: 16px;
  }
`

const Title = styled.h3<{ size: Props['size'] }>`
  font-size: ${({ size }) =>
    size === 'large' ? 'var(--font-size-medium)' : 'var(--font-size-small)'};
  font-weight: bold;

  @media (max-width: 35.1875rem) {
    font-size: var(--font-size-small);
  }
`

const Subtitle = styled.span`
  display: block;
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
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

const ImageContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;

  @media (max-width: 35.1875rem) {
    max-width: 80px;
  }
`
