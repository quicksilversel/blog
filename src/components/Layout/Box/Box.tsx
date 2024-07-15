import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Box = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
  padding-inline: 32px;
  margin-inline: auto;

  @media (max-width: 35.1875rem) {
    padding-inline: 16px;
  }

  &:not(:first-of-type) {
    margin-top: 64px;
  }
`

const Title = styled.h2`
  padding-left: 16px;
  padding-bottom: 16px;
  font-size: var(--font-size-small);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.primary};
`

Box.Title = Title
