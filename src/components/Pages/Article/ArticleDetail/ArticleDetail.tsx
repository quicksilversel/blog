import React from 'react'
import { ComponentProps } from 'react'

import styled from '@emotion/styled'
import { MDXRemote } from 'next-mdx-remote'

import type { ProjectArticle } from '@/libs/getProjects'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { ArticleBody } from '@/components/Pages/Article/ArticleDetail/Body'
import { ArticleHeader } from '@/components/Pages/Article/ArticleDetail/Header'
import * as Markup from '@/components/Pages/Article/ArticleDetail/Markup'
import { TableOfContents } from '@/components/Pages/Article/ArticleDetail/TableOfContents'
import { Breadcrumb } from '@/components/UI/Breadcrumb'

import { ProjectNavigation } from '../../Project/ProjectNavigation'

type ArticleProps =
  | {
      isProject?: false
      project?: never
    }
  | {
      isProject: true
      project: {
        title: string
        articles: ProjectArticle[]
        currentSlug: string
      }
    }

type Props = {
  source: MDXRemoteSerializeResult
  rawContent?: string
  breadcrumbItems?: ComponentProps<typeof Breadcrumb>['items']
} & ArticleProps

export const ArticleDetail = ({
  source,
  rawContent,
  isProject,
  project,
  breadcrumbItems,
}: Props) => {
  return (
    <Container>
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
      <ArticleHeader
        title={String(source.frontmatter.title)}
        date={
          source.frontmatter.date ? String(source.frontmatter.date) : undefined
        }
        topics={
          source.frontmatter.topics
            ? (source.frontmatter.topics as string[])
            : undefined
        }
      />
      {isProject && project && <ProjectNavigation {...project} />}
      {!isProject && rawContent && <TableOfContents content={rawContent} />}
      <ArticleBody>
        <MDXRemote
          {...source}
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
        />
      </ArticleBody>
    </Container>
  )
}

const Container = styled.article`
  max-width: 900px;
  padding: 0 24px;
  margin: 0 auto;
`
