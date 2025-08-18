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
  margin-bottom: 6rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 4rem;
  }
`

const SectionNumber = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.2;
  line-height: 1;
  position: sticky;
  top: 68px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const SectionContent = styled.div`
  flex: 1;
  max-width: 800px;
`

const SectionTitle = styled.h2`
  font-size: var(--font-size-extra-large);
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;
  font-weight: 700;
`

const Paragraph = styled.p`
  font-size: var(--font-size-normal);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

Section.Number = SectionNumber
Section.Content = SectionContent
Section.Title = SectionTitle
Section.Paragraph = Paragraph
