import { isValidElement } from 'react'
import type { ReactNode } from 'react'

import { TechStack, parseTechStack } from '@/components/UI/TechStack'

import { HighlightedCode } from './Markup/HighlightedCode'

type CodeProps = {
  children?: ReactNode
  className?: string
}

export const ArticleCodeBlock = ({ children }: { children?: ReactNode }) => {
  if (
    isValidElement<CodeProps>(children) &&
    children.props.className === 'language-tech-stack' &&
    typeof children.props.children === 'string'
  ) {
    const stack = parseTechStack(children.props.children)
    if (stack) return <TechStack {...stack} />
  }

  return <HighlightedCode>{children}</HighlightedCode>
}
