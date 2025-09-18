import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search'

export const NoResult = ({ query }: { query: string }) => {
  return (
    <NoResults>
      <NoResultsIcon>
        <SearchIcon />
      </NoResultsIcon>
      <NoResultsText>
        No results for &quot;<strong>{query}</strong>&quot;
      </NoResultsText>
      <NoResultsSubtext>Try searching for something else</NoResultsSubtext>
    </NoResults>
  )
}

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`

const NoResultsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.mutedText};
`

const NoResultsText = styled.p`
  margin: 0 0 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const NoResultsSubtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`
