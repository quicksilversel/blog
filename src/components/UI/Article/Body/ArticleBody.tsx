import { ReactNode } from 'react'

import styled from '@emotion/styled'

export const ArticleBody = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.section`
  padding: 32px;

  *::selection {
    background: ${({ theme }) => theme.secondary};
  }
`
