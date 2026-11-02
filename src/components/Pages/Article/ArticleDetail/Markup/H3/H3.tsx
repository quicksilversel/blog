'use client'

import type { ReactNode } from 'react'

import styled from '@emotion/styled'

import { HeadingAnchor } from '../HeadingAnchor'

type Props = {
  id?: string
  children?: ReactNode
}

export const H3 = ({ id, children }: Props) => {
  return (
    <StyledH3 id={id}>
      {children}
      <HeadingAnchor id={id} />
    </StyledH3>
  )
}

const StyledH3 = styled.h3`
  clear: both;
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.secondary};
  scroll-margin-top: 60px;

  &:not(:first-child) {
    margin-top: 16px;
  }

  &:hover a[data-heading-anchor],
  a[data-heading-anchor]:focus-visible {
    opacity: 1;
  }
`
