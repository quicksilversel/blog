import { useEffect, useRef } from 'react'

import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus()
    }
  }, [isOpen])

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <>
      <Overlay
        ref={overlayRef}
        isOpen={isOpen}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <DrawerContent
        ref={drawerRef}
        isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </DrawerContent>
    </>,
    document.body,
  )
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background-color: rgb(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  backdrop-filter: blur(4px);
  transition: opacity 0.2s ease;
`

const DrawerContent = styled.div<{
  isOpen: boolean
}>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: min(300px, 80vw);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: -2px 0 10px rgb(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.2s ease;
`
