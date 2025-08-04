import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Code = ({ children }: { children?: ReactNode }) => {
  return <StyledCode>{children}</StyledCode>
}

const StyledCode = styled.code`
  padding: 0.125rem 0.375rem;
  background: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0.25rem;
  font-size: 0.85em;
  font-family: 'Monaco', 'Consolas', monospace;
`
