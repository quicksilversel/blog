import type { AnchorHTMLAttributes, ReactNode } from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

import { GitHubCard } from '@/components/UI/GitHubCard'
import { parseGitHubReference } from '@/libs/utils'

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

const getPlainText = (children: ReactNode): string | null => {
  if (typeof children === 'string') return children
  if (
    Array.isArray(children) &&
    children.length === 1 &&
    typeof children[0] === 'string'
  ) {
    return children[0]
  }
  return null
}

export const Anchor = ({ children, href, ...rest }: AnchorProps) => {
  if (!href) return null

  if (isAbsoluteUrl(href)) {
    const externalAnchor = (
      <StyledAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </StyledAnchor>
    )

    const reference = parseGitHubReference(href)
    if (reference && getPlainText(children) === href) {
      return (
        <GitHubCard
          url={href}
          reference={reference}
          fallback={externalAnchor}
        />
      )
    }

    return externalAnchor
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
