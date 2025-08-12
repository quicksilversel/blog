import { ReactNode } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

export const Box = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  padding: 32px;
  margin-inline: auto;

  @media (max-width: 35.1875rem) {
    padding: 24px;
  }
`

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 1rem;
  font-size: var(--font-size-small);
`

const Title = styled.h2`
  font-size: var(--font-size-small);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.primary};
`

const StyledLink = styled(Link)`
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

Box.Title = Title
Box.Link = StyledLink
Box.SectionHeader = SectionHeader
