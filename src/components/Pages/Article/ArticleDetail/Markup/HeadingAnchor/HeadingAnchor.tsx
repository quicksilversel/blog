'use client'

import styled from '@emotion/styled'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export const HeadingAnchor = ({ id }: { id?: string }) => {
  if (!id) return null

  return (
    <Anchor
      href={`#${id}`}
      data-heading-anchor
      aria-label="Permalink to this section"
    >
      <LinkIcon size="0.7em" aria-hidden />
    </Anchor>
  )
}

const Anchor = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-left: 0.4em;
  vertical-align: baseline;
  color: inherit;
  opacity: 0;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
