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
  color: hsl(var(--color-primary));
  text-underline-offset: 4px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
