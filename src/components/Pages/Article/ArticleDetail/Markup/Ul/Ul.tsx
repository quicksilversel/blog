import type { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Ul = ({ children }: { children?: ReactNode }) => {
  return <StyledUl>{children}</StyledUl>
}

const StyledUl = styled.ul`
  padding-left: 2rem;
  margin: 1rem 0;

  li {
    position: relative;
    margin-top: 0.5rem;
    font-size: var(--font-size-small);
    list-style: none;

    &::before {
      position: absolute;
      left: -1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
      content: '•';
    }

    &:first-child {
      margin-top: 0;
    }
  }
`
