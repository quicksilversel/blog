import styled from '@emotion/styled'

type Props = {
  title: string
}

export const ArticleHeader = ({ title }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.header`
  padding: 36px;
  text-align: center;

  @media (max-width: 35.1875rem) {
    padding: 16px;
  }
`

const Title = styled.h1`
  font-size: var(--font-size-large);
`
