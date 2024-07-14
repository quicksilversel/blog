import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Code = ({ children }: { children?: ReactNode }) => {
  return <StyledCode>{children}</StyledCode>
}

const StyledCode = styled.code`
  padding: 4px;
  font-size: 0.9rem;
  font-family: var(--font-family-mono);
  background: hsl(var(--color-syntax-background));
  border-radius: 4px;
`
