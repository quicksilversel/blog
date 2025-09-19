import { useEffect, useState } from 'react'

import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

import { SearchContent } from './SearchContent'
import { SearchHeader } from './SearchHeader'
import { useSearch } from './useSearch'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [shouldRender, setShouldRender] = useState(false)
  const { query, setQuery, results, loading } = useSearch(isOpen, onClose)

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setShouldRender(true)
      })
    } else {
      const timer = setTimeout(() => setShouldRender(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (typeof window === 'undefined' || !shouldRender) {
    return null
  }

  return createPortal(
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <Modal isOpen={isOpen}>
        <ModalContent>
          <SearchHeader query={query} setQuery={setQuery} onClose={onClose} />
          <Divider />
          <ResultsSection>
            <SearchContent
              loading={loading}
              query={query}
              results={results}
              onClose={onClose}
            />
          </ResultsSection>
        </ModalContent>
      </Modal>
    </>,
    document.body,
  )
}

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 98;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background: rgb(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: opacity 0.2s ease;
  will-change: opacity;
  -webkit-font-smoothing: antialiased;
`

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 20vh;
  left: 50%;
  z-index: 99;
  display: flex;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  flex-direction: column;
  width: min(640px, calc(100vw - 32px));
  max-height: 60vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow:
    0 20px 25px -5px rgb(0, 0, 0, 0.1),
    0 10px 10px -5px rgb(0, 0, 0, 0.04);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  -webkit-overflow-scrolling: touch;
  transform: ${({ isOpen }) =>
    isOpen ? 'translate3d(-50%, 0, 0)' : 'translate3d(-50%, 0, 0) scale(0.96)'};
  backface-visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  animation: ${({ isOpen }) => (isOpen ? scaleIn : 'none')} 0.2s ease;
  will-change: opacity, transform;
  -webkit-font-smoothing: antialiased;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.floating};
`

const ResultsSection = styled.div`
  flex: 1;
  min-height: 200px;
  overflow-y: auto;
`
