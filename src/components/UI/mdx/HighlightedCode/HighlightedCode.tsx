import { ReactNode, isValidElement } from 'react'

import styled from '@emotion/styled'
import { Highlight } from 'prism-react-renderer'

type Props = {
  children?: ReactNode
}

export const HighlightedCode = ({ children }: Props) => {
  if (
    !isValidElement(children) ||
    typeof children.props.children !== 'string'
  ) {
    return null
  }

  const code = children.props.children

  if (!code) return null

  const language = children.props.className?.replace('language-', '').trim()

  return (
    <Highlight code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre>
          <CodeWrapper>
            {tokens.map((line, index) => (
              <div key={`token-${index}`} {...getLineProps({ line })}>
                {line.map((token, index) => (
                  <span key={`line-${index}`} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </CodeWrapper>
        </pre>
      )}
    </Highlight>
  )
}

const CodeWrapper = styled.div`
  position: relative;
  padding: 16px;
  margin-top: 16px;
  background-color: hsl(var(--color-syntax-background));
  border-radius: 8px;
`
