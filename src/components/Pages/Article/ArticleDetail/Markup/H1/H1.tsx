import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H1 = ({ children }: { children?: ReactNode }) => {
  return <StyledH1>{children}</StyledH1>
}

const StyledH1 = styled.h1`
  font-size: var(--font-size-extra-large);
  font-weight: 700;
  margin: 1rem 0;

  @media (max-width: 35.1875rem) {
    font-size: var(--font-size-large);
  }
`
