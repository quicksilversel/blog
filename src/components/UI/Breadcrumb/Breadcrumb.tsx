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
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--font-size-extra-small);
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`

const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
`

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;
  text-transform: capitalize;
  white-space: nowrap;

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
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.muted};
  flex-shrink: 0; /* Prevent separator from shrinking */
`
