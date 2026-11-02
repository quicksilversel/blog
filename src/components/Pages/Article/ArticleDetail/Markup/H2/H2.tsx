'use client'

import type { ReactNode } from 'react'

import styled from '@emotion/styled'

import { HeadingAnchor } from '../HeadingAnchor'

type Props = {
  id?: string
  className?: string
  children?: ReactNode
}

export const H2 = ({ id, className, children }: Props) => {
  if (className?.includes('sr-only')) {
    return <VisuallyHiddenH2 id={id}>{children}</VisuallyHiddenH2>
  }

  return (
    <StyledH2 id={id}>
      {children}
      <HeadingAnchor id={id} />
    </StyledH2>
  )
}

const VisuallyHiddenH2 = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
`

const StyledH2 = styled.h2`
  clear: both;
  padding-top: 2rem;
  margin-block: 2rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.primary};
  scroll-margin-top: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};

  table + & {
    border-top: none;
  }

  &:hover a[data-heading-anchor],
  a[data-heading-anchor]:focus-visible {
    opacity: 1;
  }
`
