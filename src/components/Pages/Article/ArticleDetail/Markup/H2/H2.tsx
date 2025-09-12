import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H2 = ({ children }: { children?: ReactNode }) => {
  return <StyledH2>{children}</StyledH2>
}

const StyledH2 = styled.h2`
  padding-top: 2rem;
  margin-block: 2rem 1rem;
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};

  table + & {
    border-top: none;
  }
`
