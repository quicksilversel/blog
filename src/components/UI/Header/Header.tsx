import styled from '@emotion/styled'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Link from 'next/link'

import type { ThemeContext } from '@/pages/_app'

export const Header = ({ theme, setTheme }: ThemeContext) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme)
  }

  return (
    <Container>
      <Link href="/">Home</Link>
      <Button type="button" onClick={toggleTheme}>
        {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </Button>
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
  background: hsl(${({ theme }) => theme.backgroundhsl} / 65%);
  backdrop-filter: blur(4px);
`

const Button = styled.button`
  cursor: pointer;
`
