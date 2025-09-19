import type { SearchResult } from '../types'

import { NoResult } from './NoResult'
import { QuickLinks } from './QuickLinks'
import { SearchLoading } from './SearchLoading'
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
    return <SearchLoading query={query} />
  }

  if (!query) {
    return <QuickLinks onClose={onClose} />
  }

  if (query && results.length === 0) {
    return <NoResult query={query} />
  }

  return <SearchResults results={results} onClose={onClose} />
}
