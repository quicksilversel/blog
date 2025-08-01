import { css } from '@emotion/react'

import type { Theme } from '@emotion/react'

export const customStyles = (theme: Theme) => css`
  body {
    color: ${theme.text};
    background: ${theme.background};
    accent-color: ${theme.primary};
    font-family: var(--font-family);
    transition:
      background 0.2s ease-in,
      color 0.2s ease-in;
  }

  a:hover,
  button:hover {
    color: ${theme.primary};
    transition: color 0.2s ease-in;
  }
`
