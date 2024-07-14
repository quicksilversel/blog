import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const H1 = ({ children }: { children?: ReactNode }) => {
  return <StyledH1 className="mdx-h1">{children}</StyledH1>
}

const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0;
`
