'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

import { H1 } from '@/components/Pages/Article/ArticleDetail/Markup'

type Props = {
  title: string
  titleTag?: 'h1' | 'h2'
  description?: string
  imageUrl?: string
  width?: number
  className?: string
}

export const SectionHeader = ({
  title,
  titleTag = 'h1',
  description,
  imageUrl,
  width,
  className,
}: Props) => {
  return (
    <Container className={className}>
      {imageUrl && (
        <ImageContainer>
          <Image
            src={imageUrl}
            alt=""
            width={width ?? 100}
            height={0}
            style={{
              height: 'auto',
            }}
            aria-hidden
            priority
            loading="eager"
          />
        </ImageContainer>
      )}
      {titleTag === 'h1' ? <H1>{title}</H1> : <H2>{title}</H2>}
      {description && <Description>{description}</Description>}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;
`

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;

  @media (width <= 35.1875rem) {
    max-width: 80px;
  }
`

const H2 = styled.h2`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.primary};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
`
