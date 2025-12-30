import type { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Li = ({ children }: { children?: ReactNode }) => {
  return <StyledLi>{children}</StyledLi>
}

const StyledLi = styled.li`
  position: relative;
  margin-top: 0.5rem;
  font-size: var(--font-size-small);
  list-style: none;
  counter-increment: ol-counter;

  &::before {
    position: absolute;
    left: -1.5rem;
    font-weight: 600;
    font-feature-settings: 'tnum';
    color: ${({ theme }) => theme.colors.primary};
    content: counter(ol-counter) '.';
  }

  &:first-child {
    margin-top: 0;
  }
`
