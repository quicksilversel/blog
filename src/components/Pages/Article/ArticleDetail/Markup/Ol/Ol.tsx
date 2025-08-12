import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Ol = ({ children }: { children?: ReactNode }) => {
  return <StyledOl>{children}</StyledOl>
}

const StyledOl = styled.ol`
  padding-left: 2rem;
  margin: 1rem 0;
  counter-reset: ol-counter;
`
