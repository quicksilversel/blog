import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Ul = ({ children }: { children?: ReactNode }) => {
  return <StyledUl>{children}</StyledUl>
}

const StyledUl = styled.ul`
  padding-left: 2rem;
  margin: 1rem 0;

  li {
    font-size: var(--font-size-small);
    margin-top: 0.5rem;
    list-style: none;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: -1rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`
