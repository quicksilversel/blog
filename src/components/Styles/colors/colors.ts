import { css } from '@emotion/react'

export const colors = css`
  :root {
    --color-background: 0deg, 0%, 100%;
    --color-text: 222deg, 22%, 5%;
    --color-floating: 0deg, 0%, 100%;
    --color-primary: 245deg, 100%, 60%;
    --color-secondary: 333deg, 100%, 45%;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: 210deg, 30%, 8%;
      --color-text: 0deg, 0%, 100%;
      --color-floating: 210deg, 22%, 15%;
    }

    html {
      color-scheme: dark;
    }
  }
`
