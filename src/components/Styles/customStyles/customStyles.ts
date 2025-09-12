import { css } from '@emotion/react'

import type { Theme } from '@emotion/react'

export const customStyles = (theme: Theme) => css`
  body {
    font-family: var(--font-family);
    color: ${theme.colors.text};
    accent-color: ${theme.colors.primary};
    background: ${theme.colors.background};
    transition:
      background 0.2s ease-in,
      color 0.2s ease-in;
  }

  a:hover,
  button:hover {
    color: ${theme.colors.primary};
    transition: color 0.2s ease-in;
  }
`
