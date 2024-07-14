import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H2 = ({ children }: { children?: ReactNode }) => {
  return <StyledH2 className="mdx-h2">{children}</StyledH2>
}

const StyledH2 = styled.h2`
  color: hsl(var(--color-primary));
  font-size: var(--font-size-medium);

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`
