import type { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H1 = ({ children }: { children?: ReactNode }) => {
  return <StyledH1>{children}</StyledH1>
}

const StyledH1 = styled.h1`
  margin: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  font-weight: 700;
`
