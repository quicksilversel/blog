import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const P = ({ children }: { children?: ReactNode }) => {
  return <StyledP>{children}</StyledP>
}

const StyledP = styled.p`
  margin-block: 1rem;
  font-size: var(--font-size-small);
`
