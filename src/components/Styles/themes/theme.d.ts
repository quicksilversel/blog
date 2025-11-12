import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string
      text: string
      muted: string
      mutedText: string
      floating: string
      primary: string
      secondary: string
      syntaxBackground: string
      backgroundhsl: string
    }
  }
}
