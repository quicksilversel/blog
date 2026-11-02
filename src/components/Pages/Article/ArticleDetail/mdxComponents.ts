import type { MDXComponents } from 'mdx/types'

import * as Markup from '@/components/Pages/Article/ArticleDetail/Markup'
import { Callout } from '@/components/UI/Callout'
import { Sidenote } from '@/components/UI/Sidenote'

import { ArticleCodeBlock } from './ArticleCodeBlock'

export const mdxComponents: MDXComponents = {
  h1: Markup.H1,
  h2: Markup.H2,
  h3: Markup.H3,
  p: Markup.P,
  pre: ArticleCodeBlock,
  code: Markup.Code,
  blockquote: Markup.Blockquote,
  ol: Markup.Ol,
  ul: Markup.Ul,
  li: Markup.Li,
  a: Markup.Anchor,
  img: Markup.Img,
  sup: Markup.Sup,
  section: Markup.Section,
  table: Markup.Table,
  thead: Markup.Thead,
  tbody: Markup.Tbody,
  tr: Markup.Tr,
  th: Markup.Th,
  td: Markup.Td,

  Callout,
  Sidenote,
}
