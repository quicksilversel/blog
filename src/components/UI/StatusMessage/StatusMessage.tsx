'use client'

import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  image: string
  title: string
  message: string
  children?: ReactNode
}

export const StatusMessage = ({ image, title, message, children }: Props) => {
  return (
    <Container role="alert">
      <Illustration src={image} alt="" width={160} height={160} aria-hidden />
      <Title>{title}</Title>
      <Message>{message}</Message>
      {children && <Actions>{children}</Actions>}
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 24px 6rem;
  text-align: center;
`

const Illustration = styled(Image)`
  width: 160px;
  height: auto;
`

const Title = styled.h1`
  margin-top: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  color: ${({ theme }) => theme.colors.primary};
`

const Message = styled.p`
  max-width: 34rem;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.mutedText};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 2rem;

  a,
  button {
    padding: 0.6rem 1.2rem;
    font: inherit;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    background: ${({ theme }) => theme.colors.floating};
    border: 1px solid ${({ theme }) => theme.colors.muted};
    border-radius: 8px;
  }

  a:hover,
  button:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`
