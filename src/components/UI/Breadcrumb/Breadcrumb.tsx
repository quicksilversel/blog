import React from 'react'

import styled from '@emotion/styled'
import Link from 'next/link'

type Path = {
  label: string
  href?: string
  onClick?: (event: MouseEvent) => void
}

type Props = {
  items: [Path, ...Path[]]
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbCurrent aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </BreadcrumbCurrent>
                )}
              </BreadcrumbItem>
              {!isLast && <Separator aria-hidden="true">/</Separator>}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </nav>
  )
}

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: auto hidden;
  font-size: var(--font-size-extra-small);
  white-space: nowrap;
  list-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const BreadcrumbItem = styled.li`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  white-space: nowrap;
`

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  text-transform: capitalize;
  white-space: nowrap;
`

const Separator = styled.span`
  flex-shrink: 0; /* Prevent separator from shrinking */
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.muted};
`
