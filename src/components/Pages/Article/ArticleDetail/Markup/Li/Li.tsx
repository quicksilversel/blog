import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Li = ({ children }: { children?: ReactNode }) => {
  return <StyledLi>{children}</StyledLi>
}

const StyledLi = styled.li`
  font-size: var(--font-size-small);
  margin-top: 0.5rem;
  counter-increment: ol-counter;
  list-style: none;
  position: relative;

  &::before {
    content: counter(ol-counter) '.';
    position: absolute;
    left: -1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    font-feature-settings: 'tnum';
  }

  &:first-child {
    margin-top: 0;
  }
`
