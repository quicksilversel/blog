'use client'

import type { ComponentProps } from 'react'

import styled from '@emotion/styled'

import type { Article } from '@/libs/getArticles/types'
import type { ProjectArticle } from '@/libs/getProjects'

import { ArticleBody } from '@/components/Pages/Article/ArticleDetail/Body'
import { ArticleHeader } from '@/components/Pages/Article/ArticleDetail/Header'
import { MarkdownRenderer } from '@/components/Pages/Article/ArticleDetail/MarkdownRenderer'
import { TableOfContents } from '@/components/Pages/Article/ArticleDetail/TableOfContents'
import { RelatedArticles } from '@/components/Pages/Article/RelatedArticles'
import { Breadcrumb } from '@/components/UI/Breadcrumb'
import { ReadingProgress } from '@/components/UI/ReadingProgress/ReadingProgress'

import { ProjectNavigation } from '../../Project/ProjectNavigation'

export type ArticleFrontmatter = {
  title: string
  date?: string
  topics?: string[]
}

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
  content: string
  frontmatter: ArticleFrontmatter
  rawContent?: string
  breadcrumbItems?: ComponentProps<typeof Breadcrumb>['items']
  relatedArticles?: Article[]
  readingTime?: string
} & ArticleProps

export const ArticleDetail = ({
  content,
  frontmatter,
  rawContent,
  isProject,
  project,
  breadcrumbItems,
  relatedArticles,
  readingTime,
}: Props) => {
  return (
    <>
      <ReadingProgress />
      <Container>
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <ArticleHeader
          title={frontmatter.title}
          date={frontmatter.date}
          topics={frontmatter.topics}
          readingTime={readingTime}
        />
        {rawContent && <TableOfContents content={rawContent} />}
        <ArticleBody>
          <MarkdownRenderer content={content} />
        </ArticleBody>
        {isProject && project && <ProjectNavigation {...project} />}
        {!isProject && relatedArticles && relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </Container>
    </>
  )
}

const Container = styled.main`
  @media (width <= 768px) {
    padding: 0 24px;
  }
`
