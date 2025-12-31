'use client'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import EmotionRegistry from '@/components/Providers/EmotionRegistry'
import { customTheme } from '@/styles/themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <EmotionThemeProvider theme={customTheme}>
        {children}
      </EmotionThemeProvider>
    </EmotionRegistry>
  )
}
