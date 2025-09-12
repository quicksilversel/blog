import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Anchor = ({ children, ...rest }: { children?: ReactNode }) => {
  return (
    <StyledAnchor target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </StyledAnchor>
  )
}

const StyledAnchor = styled.a`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-underline-offset: 4px;

  &:hover {
    text-decoration: underline;
  }
`
