import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Li = ({ children }: { children?: ReactNode }) => {
  return <StyledLi>{children}</StyledLi>
}

const StyledLi = styled.li`
  font-size: var(--font-size-small);
  margin-top: 16px;
  counter-increment: counts;

  &::before {
    content: counter(counts) '.';
    font-feature-settings: 'tnum';
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    padding-right: 8px;
  }

  & + & {
    margin-top: 8px;
  }
`
