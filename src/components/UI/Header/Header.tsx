import styled from '@emotion/styled'
import CodeIcon from '@mui/icons-material/Code'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import InventoryIcon from '@mui/icons-material/Inventory'
import LightModeIcon from '@mui/icons-material/LightMode'
import Link from 'next/link'

import type { ThemeContext } from '@/pages/_app'

export const Header = ({ theme, setTheme }: ThemeContext) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Container>
      <StyledLink href="/">
        <StyledImage src="/icon.png" alt="Logo" isLight={theme === 'light'} />
      </StyledLink>
      <ButtonContainer>
        <StyledLink href="/snippets">
          <CodeIcon />
        </StyledLink>
        <StyledLink href="/archive">
          <InventoryIcon />
        </StyledLink>
        <Button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'switch to light mode' : 'switch to dark mode'
          }
        >
          {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.header`
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
  background: linear-gradient(
    to top,
    transparent 0%,
    ${({ theme }) => theme.background} 100%
  );
  backdrop-filter: blur(4px);
`

const StyledImage = styled.img<{ isLight: boolean }>`
  object-fit: cover;
  height: 36px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`
