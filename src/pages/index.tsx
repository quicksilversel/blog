'use client'

import fs from 'fs'
import path from 'path'

import { InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import type { Article } from '@/utils/types/article'

import { Box } from '@/components/Layout/Box'
import { Grid } from '@/components/Layout/Grid'
import { GlobalStyles } from '@/components/Styles'
import { Card } from '@/components/UI/Card'
import { Header } from '@/components/UI/Header'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticProps() {
  const articleFilePaths = fs
    .readdirSync(ARTICLE_PATH)
    .filter((articleFilePath) => {
      return path.extname(articleFilePath).toLowerCase() === '.mdx'
    })

  const articles: Article[] = []

  for (const articleFilePath of articleFilePaths) {
    const articleFile = fs.readFileSync(
      `${ARTICLE_PATH}/${articleFilePath}`,
      'utf8',
    )

    const serializedArticle = await serialize(articleFile, {
      parseFrontmatter: true,
    })

    articles.push({
      ...serializedArticle.frontmatter,
      slug: articleFilePath.replace('.mdx', ''),
    } as Article)
  }

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
  return (
    <>
      <GlobalStyles />
      <Header />
      <Box>
        <Box.Title>Articles</Box.Title>
        <Grid>
          {articles.map((article) => {
            return <Card key={article.slug} {...article} />
          })}
        </Grid>
      </Box>
    </>
  )
}
