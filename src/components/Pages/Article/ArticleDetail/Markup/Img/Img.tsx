'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  src?: string
  alt?: string
  title?: string
  width?: number | string
  height?: number | string
}

const SIZES = '(max-width: 1000px) 100vw, 1000px'

const toDimension = (
  value: number | string | undefined,
): number | undefined => {
  const parsed = typeof value === 'string' ? Number(value) : value
  return typeof parsed === 'number' && Number.isFinite(parsed) && parsed > 0
    ? parsed
    : undefined
}

export const Img = ({ src, alt, title, width, height }: Props) => {
  if (!src) return null

  const measuredWidth = toDimension(width)
  const measuredHeight = toDimension(height)

  return (
    <Figure>
      {measuredWidth && measuredHeight ? (
        <OptimizedImage
          src={src}
          alt={alt ?? ''}
          width={measuredWidth}
          height={measuredHeight}
          sizes={SIZES}
        />
      ) : (
        <FallbackImage
          src={src}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
        />
      )}
      {title && <Caption>{title}</Caption>}
    </Figure>
  )
}

const Figure = styled.figure`
  margin: 2rem 0;
`

const imageStyles = `
  display: block;
  width: 100%;
  height: auto;
  margin-inline: auto;
  border-radius: 8px;
`

const OptimizedImage = styled(Image)`
  ${imageStyles}
  background: ${({ theme }) => theme.colors.floating};
`

const FallbackImage = styled.img`
  ${imageStyles}
  background: ${({ theme }) => theme.colors.floating};
`

const Caption = styled.figcaption`
  margin-top: 0.75rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`
