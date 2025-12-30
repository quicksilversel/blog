'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import * as Markup from '@/components/Pages/Article/ArticleDetail/Markup'

type Props = {
  content: string
}

export const MarkdownRenderer = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: Markup.H1,
        h2: Markup.H2,
        h3: Markup.H3,
        p: Markup.P,
        pre: Markup.HighlightedCode,
        code: Markup.Code,
        blockquote: Markup.Blockquote,
        ol: Markup.Ol,
        ul: Markup.Ul,
        li: Markup.Li,
        a: Markup.Anchor,
        img: Markup.Img,
        table: Markup.Table,
        thead: Markup.Thead,
        tbody: Markup.Tbody,
        tr: Markup.Tr,
        th: Markup.Th,
        td: Markup.Td,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
