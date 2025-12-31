import type { Theme } from '@emotion/react'

export const customTheme: Theme = {
  colors: {
    background: 'hsl(230deg, 30%, 8%)',
    text: 'hsl(0deg, 0%, 95%)',
    mutedText: 'hsl(230deg, 15%, 65%)',
    muted: 'hsl(230deg, 15%, 25%)',
    floating: 'hsl(230deg, 15%, 15%)',
    backgroundhsl: '230deg, 30%, 8%',
    primary: 'hsl(325deg, 90%, 72%)',
    secondary: 'hsl(195deg, 100%, 65%)',
    syntaxBackground: 'hsl(225deg, 15%, 12%)',
  },
  fontSize: {
    extraLarge: 'clamp(1.75rem, 1.5rem + 1vw, 2.25rem)',
    large: 'clamp(1.5rem, 1.25rem + 0.75vw, 1.75rem)',
    mediumLarge: 'clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)',
    medium: 'clamp(1.125rem, 1rem + 0.25vw, 1.25rem)',
    small: 'clamp(0.95rem, 0.9rem + 0.1vw, 1rem)',
    extraSmall: 'clamp(0.85rem, 0.8rem + 0.1vw, 0.875rem)',
  },
  fontFamily: {
    mono: "'Geist Mono', 'Fira Mono', monospace",
  },
}
