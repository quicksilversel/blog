import { useState, useEffect } from 'react'

import { cache } from '@emotion/css'
import { ThemeProvider, CacheProvider } from '@emotion/react'
import { AppProps } from 'next/app'

import { GlobalStyles } from '@/components/Styles'
import { lightTheme, darkTheme } from '@/components/Styles/themes'
import { Header } from '@/components/UI/Header'

export type ThemeContext = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeContext['theme']>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches

    if (savedTheme) {
      setTheme(savedTheme === 'dark' ? 'dark' : 'light')
    }

    if (prefersLight) {
      setTheme('light')
    }
  }, [])

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Header theme={theme} setTheme={setTheme} />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
