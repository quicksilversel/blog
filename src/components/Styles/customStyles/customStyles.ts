import { css } from '@emotion/react'

export const customStyles = css`
  body {
    color: hsl(var(--color-text));
    background: hsl(var(--color-background));
    font-family: var(--font-family);
  }

  a:hover {
    color: hsl(var(--color-primary));
  }
`
