import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  title: string
  imageUrl?: string
  width?: number
  className?: string
}

export const SectionHeader = ({ title, imageUrl, width, className }: Props) => {
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
              width: 'auto',
              height: 'auto',
            }}
            aria-hidden
            priority
            loading="eager"
          />
        </ImageContainer>
      )}
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;
`

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;

  @media (max-width: 35.1875rem) {
    max-width: 80px;
  }
`

const Title = styled.h1`
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;
`
