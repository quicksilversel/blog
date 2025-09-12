import type { ReactNode } from 'react'

import styled from '@emotion/styled'

type Props = {
  id: string
  children: ReactNode
  className?: string
}

export const Section = ({ id, children, className }: Props) => {
  return (
    <Container {...(className && { className })} id={id}>
      {children}
    </Container>
  )
}

export const Container = styled.section`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 6rem;

  @media (width <= 768px) {
    gap: 1.5rem;
    margin-bottom: 4rem;
  }
`

const SectionNumber = styled.div`
  position: sticky;
  top: 68px;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.2;

  @media (width <= 768px) {
    font-size: 2.5rem;
  }
`

const SectionContent = styled.div`
  flex: 1;
  max-width: 800px;
`

const SectionTitle = styled.h2`
  margin: 0 0 2rem;
  font-size: var(--font-size-extra-large);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: var(--font-size-normal);
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
`

Section.Number = SectionNumber
Section.Content = SectionContent
Section.Title = SectionTitle
Section.Paragraph = Paragraph
