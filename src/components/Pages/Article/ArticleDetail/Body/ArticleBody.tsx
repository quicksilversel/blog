import type { ReactNode } from 'react'

import styled from '@emotion/styled'

export const ArticleBody = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.article`
  margin-top: 2rem;
  line-height: 1.7;

  @media (width <= 35.1875rem) {
    margin-top: 1rem;
  }
`
