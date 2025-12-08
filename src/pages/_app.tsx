import { useState, useEffect } from 'react'

import { cache } from '@emotion/css'
import { ThemeProvider, CacheProvider } from '@emotion/react'

import type { AppProps } from 'next/app'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { GlobalStyles } from '@/components/Styles'
import { lightTheme, darkTheme } from '@/components/Styles/themes'
import { Footer } from '@/components/UI/Footer'
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <ErrorBoundary>
          <Header theme={theme} setTheme={setTheme} />
          <Component {...pageProps} />
          <Footer />
        </ErrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
