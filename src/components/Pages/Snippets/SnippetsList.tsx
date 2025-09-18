import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'

import type { Article } from '@/libs/getArticles/types'

interface SnippetsListProps {
  snippets: Article[]
}

export function SnippetsList({ snippets }: SnippetsListProps) {
  const router = useRouter()
  const sortedSnippets = [...snippets].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const handleRowClick = (slug: string) => {
    router.push(`/snippets/${slug}`)
  }
  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src="/hero-balcony.png"
          alt="Snippets Hero Image"
          fill
          loading="eager"
          priority
        />
      </ImageContainer>
      <Title>Snippets</Title>
      <Table>
        <Thead>
          <tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Category</Th>
          </tr>
        </Thead>
        <tbody>
          {sortedSnippets.map((snippet) => (
            <Tr key={snippet.slug} onClick={() => handleRowClick(snippet.slug)}>
              <TitleCell>{snippet.title}</TitleCell>
              <DescriptionCell>{snippet.description}</DescriptionCell>
              <CategoryCell>{snippet.category}</CategoryCell>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0;
  margin: 0 auto;

  @media (width <= 768px) {
    padding: 0 24px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 836/557;
  margin-bottom: 2rem;

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: var(--font-size-large);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  @media (width <= 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const Table = styled.table`
  width: 100%;
  font-size: var(--font-size-extra-small);
  border-collapse: collapse;
`

const Thead = styled.thead`
  text-transform: uppercase;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  @media (width <= 35.1875rem) {
    display: none;
  }
`

const Th = styled.th`
  padding: 0.75rem;
  font-size: var(--font-size-extra-small);
  font-weight: bold;
  text-align: left;
`

const Tr = styled.tr`
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  @media (width <= 35.1875rem) {
    display: block;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.muted};
  }
`

const Td = styled.td`
  padding: 0.75rem;

  @media (width <= 35.1875rem) {
    display: block;
    width: 100%;
  }
`

const TitleCell = styled(Td)`
  flex: 0 0 30%;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`

const DescriptionCell = styled(Td)`
  flex: 1;

  @media (width <= 35.1875rem) {
    border-top: 1px solid ${({ theme }) => theme.colors.muted};
  }
`

const CategoryCell = styled(Td)`
  flex: 0 0 15%;
  text-transform: uppercase;

  @media (width <= 35.1875rem) {
    display: none;
  }
`
