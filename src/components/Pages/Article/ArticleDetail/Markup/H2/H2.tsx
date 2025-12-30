import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

export const H2 = ({ children }: { children?: ReactNode }) => {
  const textContent =
    typeof children === 'string' ? children : children?.toString() || ''

  const id = textContent
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

  return (
    <StyledH2 id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </StyledH2>
  )
}

const StyledH2 = styled.h2`
  padding-top: 2rem;
  margin-block: 2rem 1rem;
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
  scroll-margin-top: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};

  table + & {
    border-top: none;
  }
`
