import React, { Component, ErrorInfo, ReactNode } from 'react'

import styled from '@emotion/styled'

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
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We encountered an unexpected error. Please try again.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry} type="button">
            Try again
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
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  margin: 1rem 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
`

const ErrorTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.text};
`

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: var(--font-size-normal);
  color: ${({ theme }) => theme.colors.muted};
`

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-normal);
  color: white;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
