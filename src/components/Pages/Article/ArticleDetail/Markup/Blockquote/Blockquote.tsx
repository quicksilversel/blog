import type { ReactNode } from 'react'

import styled from '@emotion/styled'

import { Callout } from '@/components/UI/Callout'

type Props = {
  children?: ReactNode
  /** Set by the remarkCallouts plugin for `> [!NOTE]` style blockquotes. */
  'data-callout'?: string
  'data-callout-title'?: string
}

export const Blockquote = ({ children, ...callout }: Props) => {
  const type = callout['data-callout']

  if (type) {
    return (
      <Callout type={type} title={callout['data-callout-title']}>
        {children}
      </Callout>
    )
  }

  return <StyledBlockquote>{children}</StyledBlockquote>
}

const StyledBlockquote = styled.blockquote`
  padding: 16px;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.floating};
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;

  > p {
    margin: 0;
  }
`
