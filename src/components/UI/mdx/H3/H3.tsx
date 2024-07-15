import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H3 = ({ children }: { children?: ReactNode }) => {
  return <StyledH3>{children}</StyledH3>
}

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.secondary};
  font-size: var(--font-size-medium);

  * + & {
    margin-top: 16px;
  }
`
