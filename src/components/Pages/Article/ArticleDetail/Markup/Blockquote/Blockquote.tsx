import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Blockquote = ({ children }: { children?: ReactNode }) => {
  return <StyledBlockquote>{children}</StyledBlockquote>
}

const StyledBlockquote = styled.blockquote`
  padding: 16px;
  margin-top: 16px;
  background: ${({ theme }) => theme.floating};
  border-left: 3px solid ${({ theme }) => theme.skylineBlue};
  border-radius: 4px;

  > p {
    margin: 0;
  }
`
