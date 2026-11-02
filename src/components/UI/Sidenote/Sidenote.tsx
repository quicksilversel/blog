'use client'

import type { ReactNode } from 'react'

import styled from '@emotion/styled'

type Props = {
  children?: ReactNode
}

export const Sidenote = ({ children }: Props) => {
  return <Aside>{children}</Aside>
}

const Aside = styled.aside`
  padding-left: 1rem;
  margin-block: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
  border-left: 2px solid ${({ theme }) => theme.colors.muted};

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  @media (width >= 60rem) {
    float: right;
    clear: right;
    width: 15rem;
    margin: 0.4rem 0 1rem 1.75rem;
  }
`
