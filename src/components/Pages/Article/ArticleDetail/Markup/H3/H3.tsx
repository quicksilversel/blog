import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

export const H3 = ({ children }: { children?: ReactNode }) => {
  const textContent =
    typeof children === 'string' ? children : children?.toString() || ''

  const id = textContent
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

  return (
    <StyledH3 id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </StyledH3>
  )
}

const StyledH3 = styled.h3`
  font-size: var(--font-size-medium);
  color: ${({ theme }) => theme.colors.secondary};
  scroll-margin-top: 60px;

  &:not(:first-child) {
    margin-top: 16px;
  }
`
