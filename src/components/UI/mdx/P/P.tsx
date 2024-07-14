import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const P = ({ children }: { children?: ReactNode }) => {
  return <StyledP className="mdx-p">{children}</StyledP>
}

const StyledP = styled.p`
  margin-top: 16px;
  font-size: var(--font-size-small);
`
