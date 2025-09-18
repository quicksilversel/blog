import styled from '@emotion/styled'

import type { SearchResult } from '../types'

import { LoadingSpinner } from '@/components/UI/LoadingSpinner'

import { NoResult } from './NoResult'
import { QuickLinks } from './QuickLinks'
import { SearchResults } from './SearchResults'

interface SearchContentProps {
  loading: boolean
  query: string
  results: SearchResult[]
  onClose: () => void
}

export function SearchContent({
  loading,
  query,
  results,
  onClose,
}: SearchContentProps) {
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner aria-label="Searching..." />
      </LoadingContainer>
    )
  }

  if (!query) {
    return <QuickLinks onClose={onClose} />
  }

  if (query && results.length === 0) {
    return <NoResult query={query} />
  }

  return <SearchResults results={results} onClose={onClose} />
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`
