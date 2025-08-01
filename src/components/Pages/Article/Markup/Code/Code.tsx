import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Code = ({ children }: { children?: ReactNode }) => {
  return <StyledCode>{children}</StyledCode>
}

const StyledCode = styled.code`
  padding: 6px;
  font-size: var(--font-size-extra-small);
  font-family: var(--font-family-mono);
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.muted};
  border-radius: 8px;
`
