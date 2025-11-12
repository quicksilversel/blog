import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Blockquote = ({ children }: { children?: ReactNode }) => {
  return <StyledBlockquote>{children}</StyledBlockquote>
}

const StyledBlockquote = styled.blockquote`
  padding: 16px;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.floating};
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;

  > p {
    margin: 0;
  }
`
