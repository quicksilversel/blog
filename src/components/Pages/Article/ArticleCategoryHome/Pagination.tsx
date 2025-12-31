import styled from '@emotion/styled'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const handlePageChange = (page: number) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalPages <= 1) return null

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </PaginationButton>
      <PageNumbers>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PageNumber
            key={page}
            onClick={() => handlePageChange(page)}
            isActive={page === currentPage}
          >
            {page}
          </PageNumber>
        ))}
      </PageNumbers>
      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </PaginationButton>
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`

const PaginationButton = styled.button`
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }
`

const PageNumbers = styled.div`
  display: flex;
  gap: 8px;
`

const PageNumber = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.background : theme.colors.text};
  cursor: pointer;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : 'transparent'};
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : theme.colors.muted};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.background : theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`
