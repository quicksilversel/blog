'use client'

import { ReactNode, isValidElement, useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { Clipboard, ClipboardCheck } from 'lucide-react'

import { parseCodeMeta } from '@/libs/markdown/parseCodeMeta'
import { highlightCode } from '@/libs/shiki'

type Props = {
  children?: ReactNode
}

type CodeProps = {
  children?: string
  className?: string
  'data-meta'?: string
}

export const HighlightedCode = ({ children }: Props) => {
  const [copied, setCopied] = useState(false)

  const codeElement = isValidElement<CodeProps>(children) ? children : null
  const codeContent = codeElement?.props.children
  const code = typeof codeContent === 'string' ? codeContent.trim() : ''
  const language =
    codeElement?.props.className?.replace('language-', '').trim() || 'text'

  const { title, highlightedLines, showLineNumbers } = useMemo(
    () => parseCodeMeta(codeElement?.props['data-meta']),
    [codeElement],
  )

  const tokens = useMemo(
    () => (code ? highlightCode(code, language) : []),
    [code, language],
  )

  if (!code) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <CodeContainer>
      {title && <TitleBar>{title}</TitleBar>}
      <CopyButton
        onClick={handleCopy}
        hasTitle={Boolean(title)}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? <ClipboardCheck /> : <Clipboard />}
      </CopyButton>
      <Pre hasTitle={Boolean(title)}>
        <CodeWrapper>
          {tokens.map((line, lineIndex) => (
            <Line
              key={`line-${lineIndex}`}
              highlighted={highlightedLines.has(lineIndex + 1)}
            >
              {showLineNumbers && <LineNumber>{lineIndex + 1}</LineNumber>}
              <LineContent indented={!showLineNumbers}>
                {line.map((token, tokenIndex) => (
                  <span
                    key={`token-${tokenIndex}`}
                    style={{
                      color: token.color,
                      fontStyle: token.fontStyle === 1 ? 'italic' : undefined,
                    }}
                  >
                    {token.content}
                  </span>
                ))}
              </LineContent>
            </Line>
          ))}
        </CodeWrapper>
      </Pre>
    </CodeContainer>
  )
}

const CodeContainer = styled.div`
  position: relative;
  margin: 16px 0;
`

const TitleBar = styled.div`
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
  background-color: ${({ theme }) => theme.colors.floating};
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px 8px 0 0;
`

const CopyButton = styled.button<{ hasTitle: boolean }>`
  position: absolute;
  top: ${({ hasTitle }) => (hasTitle ? '2px' : '8px')};
  right: 8px;
  z-index: 1;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  opacity: 0.6;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background-color: rgb(255, 255, 255, 0.1);
    opacity: 1;
  }

  svg {
    font-size: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Pre = styled.pre<{ hasTitle: boolean }>`
  margin: 0;
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  line-height: 1.6;
  background-color: ${({ theme }) => theme.colors.syntaxBackground};
  border-radius: ${({ hasTitle }) => (hasTitle ? '0 0 8px 8px' : '8px')};
`

const CodeWrapper = styled.div`
  display: table;
  min-width: 100%;
  padding: 16px 0;
`

const Line = styled.div<{ highlighted: boolean }>`
  display: table-row;
  background-color: ${({ highlighted }) =>
    highlighted ? 'rgb(255, 255, 255, 0.08)' : 'transparent'};

  & > :first-of-type {
    box-shadow: ${({ highlighted, theme }) =>
      highlighted ? `inset 3px 0 0 ${theme.colors.primary}` : 'none'};
  }

  &:hover {
    background-color: ${({ highlighted }) =>
      highlighted ? 'rgb(255, 255, 255, 0.12)' : 'rgb(255, 255, 255, 0.05)'};
  }
`

const LineNumber = styled.span`
  display: table-cell;
  min-width: 40px;
  padding: 0 16px;
  padding-left: 16px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  text-align: right;
  white-space: nowrap;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span<{ indented: boolean }>`
  display: table-cell;
  width: 100%;
  padding-right: 16px;
  padding-left: ${({ indented }) => (indented ? '16px' : '0')};
  font-size: inherit;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  -webkit-text-size-adjust: none;
`
