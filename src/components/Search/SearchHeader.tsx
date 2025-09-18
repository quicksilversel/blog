import { useRef } from 'react'

import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  query: string
  setQuery: (query: string) => void
  onClose: () => void
}

export const SearchHeader = ({ query, setQuery, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Container>
      <StyledSearchIcon />
      <SearchInput
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?"
        aria-label="Search"
      />
      {query && (
        <ClearButton
          onClick={() => setQuery('')}
          aria-label="Clear search"
          type="button"
        >
          <CloseIcon fontSize="small" />
        </ClearButton>
      )}
      <EscapeKey onClick={onClose}>ESC</EscapeKey>
    </Container>
  )
}

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  gap: 12px;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  color: ${({ theme }) => theme.colors.mutedText};
  background: ${({ theme }) => theme.colors.background};
`

const StyledSearchIcon = styled(SearchIcon)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`

const SearchInput = styled.input`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  background: transparent;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }
`

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: ${({ theme }) => theme.colors.mutedText};
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const EscapeKey = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mutedText};
  cursor: pointer;
`
