'use client'

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
      <Link href={link} aria-label={`Read more about ${title}`}>
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
  background-color: ${({ theme }) => theme.colors.floating};
  border-radius: 8px;
`

const Contents = styled.div`
  position: relative;
  z-index: 2;
  padding: 24px;

  @media (width <= 35.1875rem) {
    padding: 16px;
  }
`

const Title = styled.h3<{ size: Props['size'] }>`
  font-size: ${({ size, theme }) =>
    size === 'large' ? theme.fontSize.medium : theme.fontSize.small};
  font-weight: bold;
`

const Subtitle = styled.span`
  display: block;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.primary};
`

const Description = styled.p`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  white-space: preserve pretty;
`

const TopicList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

const Topic = styled.span`
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 4px;
`

const ImageContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 0;

  @media (width <= 35.1875rem) {
    max-width: 80px;
  }
`
