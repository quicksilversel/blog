import { Global, css } from '@emotion/react'

import { colors } from './colors'
import { customStyles } from './customStyles'
import { resetCss } from './resetCss'
import { variables } from './variables'

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${resetCss}
        ${colors}
        ${customStyles}
        ${variables}
      `}
    />
  )
}
