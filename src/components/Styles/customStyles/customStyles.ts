import { css } from '@emotion/react'

export const customStyles = css`
  body {
    color: hsl(var(--color-text));
    background: hsl(var(--color-background));
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
  }

  a:hover {
    color: hsl(var(--color-primary));
  }
`
