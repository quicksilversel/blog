'use client'

import fs from 'fs'
import path from 'path'

import { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'

import type { Article, Category } from '@/utils/types/article'

import { Box } from '@/components/Layout/Box'
import { Grid } from '@/components/Layout/Grid'
import { Card } from '@/components/UI/Card'
import { TopicFilter } from '@/components/UI/TopicFilter'
import { normalizeCategory, getCategoryDisplayName } from '@/modules/categories'
import { extractAllTopics, filterArticlesByTopic } from '@/modules/topics'
import { ARTICLE_PATH } from '@/utils/constants'
import { metadata } from '@/utils/constants/meta'

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: Category[] = ['sre', 'frontend', 'other']
  
  const paths = categories.map(category => ({
    params: { category: [category] }
  }))
  
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryParam = params?.category?.[0] as string
  const category = categoryParam as Category
  
  if (!['sre', 'frontend', 'other'].includes(category)) {
    return { notFound: true }
  }
  
  const articleFilePaths = fs
    .readdirSync(ARTICLE_PATH)
    .filter((articleFilePath) => {
      return path.extname(articleFilePath).toLowerCase() === '.mdx'
    })

  const allArticles: Article[] = await Promise.all(
    articleFilePaths.map(async (articleFilePath) => {
      const articleFile = fs.readFileSync(
        `${ARTICLE_PATH}/${articleFilePath}`,
        'utf8',
      )

      const serializedArticle = await serialize(articleFile, {
        parseFrontmatter: true,
      })

      return {
        ...serializedArticle.frontmatter,
        slug: articleFilePath.replace('.mdx', ''),
      } as Article
    })
  )

  const articles = allArticles
    .filter(article => article.published && normalizeCategory(article.category) === category)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

  return {
    props: {
      articles,
      category,
    },
    revalidate: 60,
  }
}

export default function CategoryPage({
  articles,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  
  const availableTopics = useMemo(
    () => extractAllTopics(articles),
    [articles]
  )
  
  const filteredArticles = useMemo(
    () => filterArticlesByTopic(articles, selectedTopic),
    [articles, selectedTopic]
  )
  
  const categoryName = getCategoryDisplayName(category)
  
  return (
    <>
      <Head>
        <title>{categoryName} Articles - {metadata.title}</title>
        <meta name="description" content={`${categoryName} articles from ${metadata.description}`} />
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
              <Card key={article.slug} {...article} />
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