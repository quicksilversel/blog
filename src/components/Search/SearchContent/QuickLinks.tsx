import styled from '@emotion/styled'
import { PawPrint } from 'lucide-react'
import Link from 'next/link'

export const QuickLinks = ({ onClose }: { onClose: () => void }) => {
  const QUICK_LINKS = [
    { href: '/articles', label: 'All Articles' },
    { href: '/snippets', label: 'Code Snippets' },
    { href: '/archive', label: 'Archive' },
  ]
  return (
    <Container>
      <SectionTitle>Quick Links</SectionTitle>
      {QUICK_LINKS.map(({ href, label }) => (
        <QuickLink key={href} href={href} onClick={onClose}>
          <PawPrint />
          {label}
        </QuickLink>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
`

const SectionTitle = styled.h3`
  margin: 0 0 12px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mutedText};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const QuickLink = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s ease;
`
