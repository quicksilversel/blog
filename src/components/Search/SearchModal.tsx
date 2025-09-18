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
  const [mounted, setMounted] = useState(false)
  const { query, setQuery, results, loading } = useSearch(isOpen, onClose)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof window === 'undefined') {
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

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
  backdrop-filter: blur(4px);
  transition: opacity 0.2s ease;
  animation: ${({ isOpen }) => (isOpen ? fadeIn : 'none')} 0.2s ease;
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
  transform: translateX(-50%);
  transition: opacity 0.2s ease;
  animation: ${({ isOpen }) => (isOpen ? scaleIn : 'none')} 0.2s ease;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.muted}20;
`

const ResultsSection = styled.div`
  flex: 1;
  min-height: 200px;
  overflow-y: auto;
`
