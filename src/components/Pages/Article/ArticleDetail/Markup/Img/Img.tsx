import { ReactNode } from 'react'
import { ImgHTMLAttributes } from 'react'

import styled from '@emotion/styled'

type Props = {
  children?: ReactNode
} & Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>

export const Img = ({ children, src, alt, ...rest }: Props) => {
  if (!src) return

  return (
    <StyledImage src={src} alt={alt ?? ''} {...rest}>
      {children}
    </StyledImage>
  )
}

const StyledImage = styled.img`
  display: block;
`
