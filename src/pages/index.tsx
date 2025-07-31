'use client'

import fs from 'fs'
import path from 'path'

import { useState, useMemo } from 'react'

import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'

import type { Article, Category } from '@/utils/types/article'

import { ArticleSection } from '@/components/Pages/Home/Articles'
import { Hero } from '@/components/Pages/Home/Hero'
import { Box } from '@/components/UI/Box'
import { groupArticlesByCategory } from '@/modules/categories'
import { ARTICLE_PATH } from '@/utils/constants'
import { metadata } from '@/utils/constants/meta'

export async function getStaticProps() {
  const articleFilePaths = fs
    .readdirSync(ARTICLE_PATH)
    .filter((articleFilePath) => {
      return path.extname(articleFilePath).toLowerCase() === '.mdx'
    })

  const articles: Article[] = await Promise.all(
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
    }),
  )

  articles.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}

export default function Index({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const publishedArticles = useMemo(
    () => articles.filter((article) => !!article.published),
    [articles],
  )

  const articlesByCategory = useMemo(
    () => groupArticlesByCategory(publishedArticles),
    [publishedArticles],
  )

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <main>
        <Box>
          <Hero />
        </Box>
        {Object.entries(articlesByCategory).map(
          ([category, categoryArticles]) => (
            <ArticleSection
              key={category}
              category={category as Category}
              articles={categoryArticles}
            />
          ),
        )}
      </main>
    </>
  )
}
