import type { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Code = ({ children }: { children?: ReactNode }) => {
  return <StyledCode>{children}</StyledCode>
}

const StyledCode = styled.code`
  padding: 0.125rem 0.375rem;
  font-family: Monaco, Consolas, monospace;
  font-size: 0.85em;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.muted};
  border-radius: 0.25rem;
`
