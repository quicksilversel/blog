'use client'

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
    <nav aria-label="Breadcrumb navigation">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink
                    href={item.href}
                    aria-label={`Go to ${item.label}`}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbCurrent
                    aria-current={isLast ? 'page' : undefined}
                    aria-label={
                      isLast ? `Current page: ${item.label}` : undefined
                    }
                  >
                    {item.label}
                  </BreadcrumbCurrent>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <Separator aria-hidden="true" role="presentation">
                  /
                </Separator>
              )}
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
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
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
`

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.mutedText};
  text-transform: capitalize;
  white-space: nowrap;
`

const Separator = styled.span`
  flex-shrink: 0;
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.muted};
`
