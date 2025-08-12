import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const ArticleBody = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  margin-top: 2rem;

  @media (max-width: 35.1875rem) {
    margin-top: 1rem;
  }
`
