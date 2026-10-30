import type { ReactNode } from 'react'

import styled from '@emotion/styled'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export const Section = ({ id, title, children }: Props) => {
  return (
    <Container id={id}>
      <Title>{title}</Title>
      {children}
    </Container>
  )
}

const Container = styled.section`
  margin-top: 3.5rem;

  @media (width <= 768px) {
    margin-top: 2.5rem;
  }
`

const Title = styled.h2`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;

  &::after {
    flex: 1;
    height: 1px;
    content: '';
    background-color: ${({ theme }) => theme.colors.muted};
  }
`
