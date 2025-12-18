import type { AnchorHTMLAttributes, ReactNode } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode
}

const isAbsoluteUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const Anchor = ({ children, href, ...rest }: AnchorProps) => {
  if (!href) return null

  if (isAbsoluteUrl(href)) {
    return (
      <StyledAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </StyledAnchor>
    )
  }

  return (
    <StyledAnchor href={href} {...rest}>
      {children}
    </StyledAnchor>
  )
}

const StyledAnchor = styled(Link)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-underline-offset: 4px;

  &:hover {
    text-decoration: underline;
  }
`
