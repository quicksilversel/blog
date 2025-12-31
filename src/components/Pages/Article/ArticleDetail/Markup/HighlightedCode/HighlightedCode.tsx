'use client'

import { ReactNode, isValidElement, useState } from 'react'

import styled from '@emotion/styled'
import { Clipboard, ClipboardCheck } from 'lucide-react'
import { Highlight } from 'prism-react-renderer'

type Props = {
  children?: ReactNode
}

type CodeProps = {
  children?: string
  className?: string
}

export const HighlightedCode = ({ children }: Props) => {
  const [copied, setCopied] = useState(false)

  if (!isValidElement<CodeProps>(children)) {
    return null
  }

  const codeContent = children.props.children
  if (typeof codeContent !== 'string') {
    return null
  }

  const code = codeContent.trim()

  if (!code) return null

  const language =
    children.props.className?.replace('language-', '').trim() || 'text'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Highlight code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <CodeContainer>
          <CopyButton
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <ClipboardCheck /> : <Clipboard />}
          </CopyButton>
          <Pre>
            <CodeWrapper>
              {tokens.map((line, index) => (
                <Line key={`token-${index}`} {...getLineProps({ line })}>
                  <LineNumber>{index + 1}</LineNumber>
                  <LineContent>
                    {line.map((token, index) => (
                      <span
                        key={`line-${index}`}
                        {...getTokenProps({ token })}
                      />
                    ))}
                    {line.length === 0 && '\n'}
                  </LineContent>
                </Line>
              ))}
            </CodeWrapper>
          </Pre>
        </CodeContainer>
      )}
    </Highlight>
  )
}

const CodeContainer = styled.div`
  position: relative;
  margin: 16px 0;
`

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
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
`

const Pre = styled.pre`
  margin: 0;
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  line-height: 1.6;
  background-color: ${({ theme }) => theme.colors.syntaxBackground};
  border-radius: 8px;
`

const CodeWrapper = styled.div`
  display: table;
  min-width: 100%;
  padding: 16px 0;
`

const Line = styled.div`
  display: table-row;

  &:hover {
    background-color: rgb(255, 255, 255, 0.05);
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

const LineContent = styled.span`
  display: table-cell;
  width: 100%;
  padding-right: 16px;
  padding-left: 0;
  font-size: inherit;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  -webkit-text-size-adjust: none;
`
