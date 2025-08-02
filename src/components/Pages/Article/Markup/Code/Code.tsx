import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Code = ({ children }: { children?: ReactNode }) => {
  return <StyledCode>{children}</StyledCode>
}

const StyledCode = styled.code`
  padding: 0.12rem 0.25rem;
  font-size: inherit;
  font-family: var(--font-family-mono);
  line-height: 1.2;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.muted};
  border-radius: 8px;
`
