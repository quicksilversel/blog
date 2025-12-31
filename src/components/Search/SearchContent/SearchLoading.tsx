import styled from '@emotion/styled'
import Image from 'next/image'

import { LoadingSpinner } from '@/components/UI/LoadingSpinner'

export function SearchLoading({ query }: { query: string }) {
  return (
    <LoadingContainer>
      <Image
        src="/cat-thinking.png"
        alt="Loading..."
        width={100}
        height={0}
        style={{
          height: 'auto',
        }}
      />
      <LoadingText>
        <LoadingSpinner aria-label="Searching..." />
        <span>Searching for &quot;{query}&quot;</span>
      </LoadingText>
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`

const LoadingText = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
`
