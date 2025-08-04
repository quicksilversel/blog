import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H2 = ({ children }: { children?: ReactNode }) => {
  return <StyledH2>{children}</StyledH2>
}

const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: var(--font-size-large);
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
  padding-top: 2rem;
  margin-block: 2rem 1rem;
  text-transform: capitalize;

  table + & {
    border-top: none;
  }
`
