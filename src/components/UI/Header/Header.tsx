import { css } from '@emotion/react'
import styled from '@emotion/styled'
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
      <Link href="/">
        <StyledImage src="/logo.png" alt="Logo" isLight={theme === 'light'} />
      </Link>
      <ButtonContainer>
        <Link href="/archive">
          <InventoryIcon />
        </Link>
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
  ${({ isLight }) =>
    isLight &&
    css`
      filter: brightness(1) invert(1);
    `}
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Button = styled.button`
  cursor: pointer;
`
