import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H2 = ({ children }: { children?: ReactNode }) => {
  return <StyledH2>{children}</StyledH2>
}

const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: var(--font-size-medium);

  * + & {
    margin-top: 16px;
  }
`
