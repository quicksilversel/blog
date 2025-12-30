'use client'

import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Grid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <Container {...(className && { className })}>{children}</Container>
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;

  @media (width <= 35.1875rem) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`
