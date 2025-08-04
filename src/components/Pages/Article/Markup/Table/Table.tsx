import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.9rem;
  overflow-x: auto;
  display: block;

  @media (min-width: 768px) {
    display: table;
  }
`

export const Thead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

    &:hover {
      background: ${({ theme }) => theme.colors.floating};
    }
  }
`

export const Tr = styled.tr`
  transition: background 0.2s ease;
`

export const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
`

export const Td = styled.td`
  padding: 0.75rem 1rem;
  vertical-align: top;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  &:has(> :only-child:is(✅, ❌)) {
    text-align: center;
  }
`

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    margin: 1.5rem -1rem;
    padding: 0 1rem;

    background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.background} 30%,
        transparent
      ),
      linear-gradient(
        to left,
        ${({ theme }) => theme.colors.background} 30%,
        transparent
      );
    background-position: left, right;
    background-repeat: no-repeat;
    background-size: 20px 100%;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.floating};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.muted};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`
