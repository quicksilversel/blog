import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

type TocItem = {
  id: string
  text: string
  level: number
}

type Props = {
  content: string
}

export function TableOfContents({ content }: Props) {
  const headings = useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const extractedHeadings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].replace(/[*_`]/g, '') // Remove markdown formatting
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

      extractedHeadings.push({ id, text, level })
    }

    return extractedHeadings
  }, [content])

  if (headings.length === 0) {
    return null
  }

  return (
    <Details>
      <Summary aria-label="Toggle table of contents">
        <Title id="toc-title">Table of Contents</Title>
        <StyledChevronDown aria-hidden="true" />
      </Summary>
      <HeadingList role="navigation" aria-labelledby="toc-title">
        {headings.map((heading) => {
          return (
            <HeadingItem key={heading.id} level={heading.level}>
              <HeadingLink
                href={`#${heading.id}`}
                level={heading.level}
                aria-label={`Navigate to ${heading.text} section`}
              >
                <HeadingText>{heading.text}</HeadingText>
              </HeadingLink>
            </HeadingItem>
          )
        })}
      </HeadingList>
    </Details>
  )
}

const StyledChevronDown = styled(ChevronDown)`
  color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Details = styled.details`
  margin: 2rem auto;
  overflow: hidden;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;

  &[open] ${StyledChevronDown} {
    transform: rotate(180deg);
  }
`

const Summary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  cursor: pointer;
  list-style: none;
  background: none;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::marker {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Title = styled.h3`
  margin: 0;
  font-size: var(--font-size-normal);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

const HeadingList = styled.ul`
  max-height: 300px;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};

  /* Improve scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.floating};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.muted};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`

const HeadingItem = styled.li<{ level: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const HeadingLink = styled(Link)<{ level: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  padding-left: ${({ level }) => (level === 2 ? '1.5rem' : '2.5rem')};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const HeadingText = styled.span`
  font-size: var(--font-size-small);
`
