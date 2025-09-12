import styled from '@emotion/styled'
import CodeIcon from '@mui/icons-material/Code'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import InventoryIcon from '@mui/icons-material/Inventory'
import LightModeIcon from '@mui/icons-material/LightMode'
import PetsIcon from '@mui/icons-material/Pets'
import Link from 'next/link'

import type { ThemeContext } from '@/pages/_app'

export const Header = ({ theme, setTheme }: ThemeContext) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Container>
      <StyledLink href="/" title="Home">
        <StyledImage src="/icon.png" alt="Logo" isLight={theme === 'light'} />
      </StyledLink>
      <ButtonContainer>
        <StyledLink href="/about" title="About me">
          <PetsIcon />
        </StyledLink>
        <StyledLink href="/snippets" title="Code snippets">
          <CodeIcon />
        </StyledLink>
        <StyledLink href="/archive" title="Archive">
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
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  font-size: 24px;
  background: linear-gradient(
    to top,
    transparent 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  backdrop-filter: blur(4px);
`

const StyledImage = styled.img<{ isLight: boolean }>`
  height: 36px;
  object-fit: cover;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
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

  &:hover::after {
    position: absolute;
    bottom: -24px;
    padding: 4px 8px;
    font-size: var(--font-size-extra-small);
    color: ${({ theme }) => theme.colors.text};
    content: attr(title);
    background-color: ${({ theme }) => theme.colors.floating};
    border-radius: 4px;
  }
`
