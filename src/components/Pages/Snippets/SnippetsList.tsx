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
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 836/557;
  margin-bottom: 2rem;

  @media (max-width: 35.1875rem) {
    margin-bottom: 1rem;
  }
`

const StyledImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`

const Title = styled.h1`
  font-size: var(--font-size-large);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  margin-bottom: 2rem;

  @media (max-width: 35.1875rem) {
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

  @media (max-width: 35.1875rem) {
    display: none;
  }
`

const Th = styled.th`
  text-align: left;
  font-size: var(--font-size-extra-small);
  font-weight: bold;
  padding: 0.75rem;
`

const Tr = styled.tr`
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 35.1875rem) {
    display: block;
    margin-bottom: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.muted};
    overflow: hidden;
  }
`

const Td = styled.td`
  padding: 0.75rem;

  @media (max-width: 35.1875rem) {
    width: 100%;
    display: block;
  }
`

const TitleCell = styled(Td)`
  font-weight: bold;
  flex: 0 0 30%;
  color: ${({ theme }) => theme.colors.primary};
`

const DescriptionCell = styled(Td)`
  flex: 1;

  @media (max-width: 35.1875rem) {
    border-top: 1px solid ${({ theme }) => theme.colors.muted};
  }
`

const CategoryCell = styled(Td)`
  flex: 0 0 15%;
  text-transform: uppercase;

  @media (max-width: 35.1875rem) {
    display: none;
  }
`
