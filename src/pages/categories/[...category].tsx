'use client'

import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import Head from 'next/head'

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import { ArticleCard } from '@/components/Pages/Home/Articles/ArticleCard'
import { TopicFilter } from '@/components/Pages/Home/Articles/TopicFilter'
import { Box } from '@/components/UI/Box'
import { Grid } from '@/components/UI/Grid'
import {
  getCategoryDisplayName,
  extractAllTopics,
  filterArticlesByTopic,
} from '@/modules/articles'
import { getCategories } from '@/modules/articles/server'
import { metadata } from '@/utils/constants/meta'

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = getCategories()
  const paths = categoryList.map((category) => ({
    params: { category: [category.value] },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryParam = params?.category?.[0] as string
  const { getCategories, getArticlesByCategory } = await import(
    '@/modules/articles/server'
  )
  const categoryList = getCategories()

  if (
    !categoryParam ||
    !categoryList.some((cat) => cat.value === categoryParam)
  ) {
    return { notFound: true }
  }

  const articles = await getArticlesByCategory(categoryParam)

  return {
    props: {
      articles,
      category: categoryParam,
    },
    revalidate: 60,
  }
}

export default function CategoryPage({
  articles,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const availableTopics = useMemo(() => extractAllTopics(articles), [articles])

  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic],
  )

  const categoryName = getCategoryDisplayName(category)

  if (!categoryName) {
    return (
      <main>
        <Box>
          <NoArticlesMessage>Category not found</NoArticlesMessage>
        </Box>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>
          {categoryName} Articles - {metadata.title}
        </title>
        <meta
          name="description"
          content={`${categoryName} articles from ${metadata.description}`}
        />
      </Head>
      <main>
        <Box>
          <Box.Title>{categoryName} Articles</Box.Title>
          <TopicFilter
            topics={availableTopics}
            selectedTopic={selectedTopic}
            onTopicSelect={setSelectedTopic}
          />
          <Grid>
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </Grid>
          {filteredArticles.length === 0 && (
            <NoArticlesMessage>
              No {categoryName.toLowerCase()} articles found
              {selectedTopic && ` with topic "${selectedTopic}"`}.
            </NoArticlesMessage>
          )}
        </Box>
      </main>
    </>
  )
}

const NoArticlesMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.1rem;
  margin-top: 3rem;
`
