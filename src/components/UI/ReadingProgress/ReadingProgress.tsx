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

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [calculateProgress])

  return (
    <ProgressContainer
      height={height}
      isVisible={isVisible}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(progress)}% read`}
    >
      <ProgressBar $progress={progress} aria-hidden="true" />
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
  right: 0;
  left: 0;
  z-index: 100;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.floating};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`

const ProgressBar = styled('div')<{
  $progress: number
}>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40;
  transition: width 0.1s ease-out;
`

const ProgressText = styled('span')`
  position: absolute;
  top: 50%;
  right: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  pointer-events: none;
  user-select: none;
  opacity: 0.6;
  transform: translateY(-50%);
`
