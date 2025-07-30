import { ReactNode, isValidElement, useState } from 'react'

import styled from '@emotion/styled'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'
import { Highlight } from 'prism-react-renderer'

type Props = {
  children?: ReactNode
}

export const HighlightedCode = ({ children }: Props) => {
  const [copied, setCopied] = useState(false)

  if (
    !isValidElement(children) ||
    typeof children.props.children !== 'string'
  ) {
    return null
  }

  const code = children.props.children.trim()

  if (!code) return null

  const language = children.props.className?.replace('language-', '').trim()

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
            {copied ? <DoneIcon /> : <ContentCopyIcon />}
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
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 18px;
  }
`

const Pre = styled.pre`
  margin: 0;
  background-color: ${({ theme }) => theme.syntaxBackground};
  border-radius: 8px;
  overflow-x: auto;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-extra-small);
  line-height: 1.6;
`

const CodeWrapper = styled.div`
  display: table;
  min-width: 100%;
  padding: 16px 0;
`

const Line = styled.div`
  display: table-row;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const LineNumber = styled.span`
  display: table-cell;
  padding: 0 16px;
  padding-left: 16px;
  text-align: right;
  user-select: none;
  opacity: 0.5;
  white-space: nowrap;
  font-family: var(--font-family-mono);
  min-width: 40px;
`

const LineContent = styled.span`
  display: table-cell;
  padding-right: 16px;
  padding-left: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
`
