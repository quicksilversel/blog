import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface Props {
  size?: 'small' | 'medium' | 'large'
  'aria-label'?: string
}

export const LoadingSpinner = ({
  size = 'medium',
  'aria-label': ariaLabel,
}: Props) => {
  return (
    <SpinnerContainer aria-live="polite" aria-label={ariaLabel || 'Loading'}>
      <Spinner size={size} />
      <VisuallyHidden>{ariaLabel || 'Loading content'}</VisuallyHidden>
    </SpinnerContainer>
  )
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: inline-block;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '16px'
      case 'large':
        return '32px'
      default:
        return '20px'
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '16px'
      case 'large':
        return '32px'
      default:
        return '20px'
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.muted};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    border-top-color: ${({ theme }) => theme.colors.primary};
    animation: none;
  }
`

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip-path: inset(0);
`
