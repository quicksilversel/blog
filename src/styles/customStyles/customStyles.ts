import { css } from '@emotion/react'

import type { Theme } from '@emotion/react'

export const customStyles = (theme: Theme) => css`
  body {
    max-width: 1000px;
    margin: 0 auto;
    color: ${theme.colors.text};
    accent-color: ${theme.colors.primary};
    background: ${theme.colors.background};
    transition:
      background 0.2s ease-in,
      color 0.2s ease-in;
  }

  a:hover,
  button:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`
