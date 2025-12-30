'use client'

import { useState } from 'react'

import type { Article } from '@/libs/getArticles/types'

import { Box, BoxSectionHeader, BoxTitle } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Stack } from '@/components/UI/Stack'

import { Pagination } from './Pagination'

type Props = {
  category: string
  articles: Article[]
}

const ARTICLES_PER_PAGE = 5

export const ArticleCategoryHome = ({ category, articles }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const currentArticles = articles.slice(startIndex, endIndex)

  return (
    <Box>
      <BoxSectionHeader>
        <BoxTitle>{category}</BoxTitle>
      </BoxSectionHeader>
      <Stack>
        {currentArticles.map((article) => {
          const isProjectArticle = 'project' in article
          const link = isProjectArticle
            ? `/projects/${article.slug}`
            : `/articles/${article.slug}`

          return (
            <Card
              key={article.slug}
              title={article.title}
              subtitle={article.readingTime}
              description={article.description}
              topics={article.topics}
              link={link}
            />
          )
        })}
      </Stack>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  )
}
