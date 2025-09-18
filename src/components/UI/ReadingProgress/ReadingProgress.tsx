import { useState, useEffect, useCallback } from 'react'

import styled from '@emotion/styled'

interface ReadingProgressProps {
  height?: number
}

export function ReadingProgress({ height = 4 }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const calculateProgress = useCallback(() => {
    const element = document.documentElement
    const windowHeight = window.innerHeight
    const documentHeight = element.scrollHeight - windowHeight
    const scrollTop = window.pageYOffset || element.scrollTop

    const scrollProgress =
      documentHeight > 0
        ? Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100)
        : 0

    setProgress(scrollProgress)

    setIsVisible(scrollTop > 100)
  }, [])

  useEffect(() => {
    calculateProgress()

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [calculateProgress])

  return (
    <ProgressContainer height={height} isVisible={isVisible}>
      <ProgressBar $progress={progress} />
      {height >= 20 && <ProgressText>{Math.round(progress)}%</ProgressText>}
    </ProgressContainer>
  )
}

export function useReadingProgress(target?: HTMLElement | null) {
  const [progress, setProgress] = useState(0)

  const calculateProgress = useCallback(() => {
    const element = target || document.documentElement
    const windowHeight = window.innerHeight
    const documentHeight = element.scrollHeight - windowHeight
    const scrollTop = window.pageYOffset || element.scrollTop

    const scrollProgress =
      documentHeight > 0
        ? Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100)
        : 0

    setProgress(scrollProgress)
  }, [target])

  useEffect(() => {
    calculateProgress()

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [calculateProgress])

  return progress
}

const ProgressContainer = styled('div')<{
  height: number
  isVisible: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.floating};
  z-index: 100;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`

const ProgressBar = styled('div')<{
  $progress: number
}>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40;
`

const ProgressText = styled('span')`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
`
