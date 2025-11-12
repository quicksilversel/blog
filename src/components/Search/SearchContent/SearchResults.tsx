import styled from '@emotion/styled'
import Link from 'next/link'

import type { Article } from '@/libs/getArticles/types'

interface SearchModalProps {
  results: SearchResult[]
  onClose: () => void
}

interface SearchResult extends Article {
  type: 'article' | 'snippet'
}

export const SearchResults = ({ results, onClose }: SearchModalProps) => {
  return (
    <ResultsList>
      {results.map((result) => {
        const isProjectArticle = 'project' in result
        const href =
          result.type === 'snippet'
            ? `/snippets/${result.slug}`
            : isProjectArticle
              ? `/projects/${result.slug}`
              : `/articles/${result.slug}`

        return (
          <ResultItem
            key={`${result.type}-${result.slug}`}
            href={href}
            onClick={onClose}
          >
            <ResultContent>
              <ResultTitle>
                {result.title}
                {result.type === 'snippet' && <ResultBadge>Snippet</ResultBadge>}
              </ResultTitle>
              {result.description && (
                <ResultDescription>{result.description}</ResultDescription>
              )}
              <ResultPath>
                {result.type === 'snippet' ? 'Snippets' : 'Articles'} /{' '}
                {result.category}
              </ResultPath>
            </ResultContent>
          </ResultItem>
        )
      })}
    </ResultsList>
  )
}

const ResultsList = styled.div`
  padding: 8px;
`

const ResultItem = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-bottom: 2px;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
`

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`

const ResultTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

const ResultBadge = styled.span`
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: 4px;
`

const ResultDescription = styled.div`
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
  white-space: nowrap;
`

const ResultPath = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`
