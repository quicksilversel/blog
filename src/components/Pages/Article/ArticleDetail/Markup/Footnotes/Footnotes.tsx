'use client'

import type { ReactNode } from 'react'

import styled from '@emotion/styled'

type SupProps = {
  children?: ReactNode
}

type SectionProps = {
  children?: ReactNode
  'data-footnotes'?: boolean | string
}

export const Sup = ({ children }: SupProps) => <StyledSup>{children}</StyledSup>

export const Section = ({ children, ...rest }: SectionProps) => {
  if (rest['data-footnotes'] === undefined) return <section>{children}</section>

  return <Footnotes {...rest}>{children}</Footnotes>
}

const StyledSup = styled.sup`
  font-size: 0.75em;
  line-height: 0;

  a {
    padding: 0 0.15em;
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    text-decoration: underline;
  }
`

const Footnotes = styled.section`
  padding-top: 1.5rem;
  margin-top: 3rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.mutedText};
  border-top: 1px solid ${({ theme }) => theme.colors.muted};

  ol {
    padding-left: 1.25rem;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
    scroll-margin-top: 80px;
  }

  li:target {
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    display: inline;
    margin: 0;
  }

  [data-footnote-backref] {
    margin-left: 0.4em;
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }
`
