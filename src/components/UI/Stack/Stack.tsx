'use client'

import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const Stack = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <Container {...(className && { className })}>{children}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
