import styled from '@emotion/styled'
import Link from 'next/link'

export const Header = () => {
  return (
    <Container>
      <Link href="/">Home</Link>
    </Container>
  )
}

const Container = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  padding: 16px;
  font-size: 24px;
  background: hsl(var(--color-background) / 65%);
  backdrop-filter: blur(4px);
`
