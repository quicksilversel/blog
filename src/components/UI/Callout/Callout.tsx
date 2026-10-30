import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import {
  Flame,
  Info,
  Lightbulb,
  NotebookPen,
  Scale,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'

type Variant = {
  label: string
  /** HSL parts, so the same value drives the accent and its tint. */
  accent: string
  Icon: typeof Info
}

const VARIANTS = {
  note: { label: 'Note', accent: '195deg, 100%, 65%', Icon: Info },
  tip: { label: 'Tip', accent: '137deg, 55%, 55%', Icon: Lightbulb },
  important: { label: 'Important', accent: '325deg, 90%, 72%', Icon: Sparkles },
  warning: { label: 'Warning', accent: '38deg, 95%, 62%', Icon: TriangleAlert },
  caution: { label: 'Caution', accent: '356deg, 75%, 65%', Icon: Flame },
  memo: { label: 'Memo', accent: '261deg, 70%, 72%', Icon: NotebookPen },
  disclosure: { label: 'Disclosure', accent: '230deg, 15%, 65%', Icon: Scale },
} as const satisfies Record<string, Variant>

export type CalloutType = keyof typeof VARIANTS

type Props = {
  /** Free-form so unknown markers degrade to the default style. */
  type?: string
  title?: string
  children?: ReactNode
}

const getVariant = (type?: string): Variant =>
  VARIANTS[type as CalloutType] ?? VARIANTS.note

export const Callout = ({ type, title, children }: Props) => {
  const variant = getVariant(type)

  return (
    <Wrapper accent={variant.accent}>
      <Header accent={variant.accent}>
        <variant.Icon size={16} aria-hidden />
        {title || variant.label}
      </Header>
      <Body>{children}</Body>
    </Wrapper>
  )
}

const Wrapper = styled.aside<{ accent: string }>`
  padding: 14px 16px;
  margin-block: 1.5rem;
  background: hsla(${({ accent }) => accent}, 0.08);
  border-left: 3px solid hsl(${({ accent }) => accent});
  border-radius: 8px;
`

const Body = styled.div`
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

const Header = styled.p<{ accent: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  line-height: 1.4;
  color: hsl(${({ accent }) => accent});
  letter-spacing: 0.01em;
`
