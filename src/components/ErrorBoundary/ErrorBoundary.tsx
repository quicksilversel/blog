import React, { Component, ErrorInfo, ReactNode } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorContainer role="alert" aria-live="assertive">
          <Image
            src={'/cat-oops.png'}
            alt=""
            width={100}
            height={0}
            style={{
              height: 'auto',
            }}
            aria-hidden
          />
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We encountered an unexpected error. Please try again.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry} type="button">
            Try Again
          </RetryButton>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80svh;
`

const ErrorTitle = styled.h2`
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.text};
`

const ErrorMessage = styled.p`
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.mutedText};
`

const RetryButton = styled.button`
  padding: 0.75rem 1.2rem;
  font-size: var(--font-size-small);
  color: white;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`
