'use client'

import fs from 'fs'
import path from 'path'

import styled from '@emotion/styled'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'

import type { ArticlePreview } from '@/utils/types/article'
import type { Metadata } from 'next'

import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticProps() {
  const articleFilePaths = fs
    .readdirSync(ARTICLE_PATH)
    .filter((articleFilePath) => {
      return path.extname(articleFilePath).toLowerCase() === '.mdx'
    })

  const articles: ArticlePreview[] = []

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
    } as ArticlePreview)
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
    <DefaultLayout>
      {articles.map((article) => {
        return (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </Link>
        )
      })}
    </DefaultLayout>
  )
}

const DefaultLayout = styled.main`
  max-width: 1000px;
  margin: 0 auto;
`
