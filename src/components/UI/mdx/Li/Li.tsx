import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Li = ({ children }: { children?: ReactNode }) => {
  return <StyledLi>{children}</StyledLi>
}

const StyledLi = styled.li`
  margin-top: 16px;
  counter-increment: counts;

  &::before {
    content: counter(counts) '.';
    font-feature-settings: 'tnum';
    font-weight: bold;
    color: hsl(var(--color-primary));
    padding-right: 8px;
  }

  & + & {
    margin-top: 8px;
  }
`
