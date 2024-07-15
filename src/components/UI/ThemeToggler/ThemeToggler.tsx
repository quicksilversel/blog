import { useContext } from 'react'

import styled from '@emotion/styled'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { ThemeContext } from '@/components/Functional/ThemeProvider/ThemeProvider'

export const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(updatedTheme)
    localStorage.setItem('theme', theme)
  }

  return (
    <Button type="button" onClick={toggleTheme}>
      {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  )
}

const Button = styled.button`
  cursor: pointer;
`
