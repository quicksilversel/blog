import fs from 'fs'
import path from 'path'

import React from 'react'

import styled from '@emotion/styled'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ArticleBody } from '@/components/Pages/Article/Body'
import { ArticleHeader } from '@/components/Pages/Article/Header'
import * as Markup from '@/components/Pages/Article/Markup'
import { getArticles } from '@/libs/getArticles'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  const articleFiles = await getArticles()

  const paths = articleFiles.map(({ category, fileName }) => {
    return {
      params: {
        slug: [category, fileName.replace('.mdx', '')],
      },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[]

  if (!slug || slug.length !== 2) {
    return {
      notFound: true,
    }
  }

  const [category, fileName] = slug
  const filePath = path.join(ARTICLE_PATH, category, `${fileName}.mdx`)

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')

    const mdxSource = await serialize(postFile, { parseFrontmatter: true })
    return {
      props: {
        source: mdxSource,
        category,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default function Article({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{String(source.frontmatter.title)}</title>
        <meta
          name="description"
          content={String(source.frontmatter.description)}
        />
        <meta property="og:title" content={String(source.frontmatter.title)} />
        <meta
          property="og:description"
          content={String(source.frontmatter.description)}
        />
      </Head>
      <main>
        <Container>
          <ArticleHeader
            title={String(source.frontmatter.title)}
            date={
              source.frontmatter.date
                ? String(source.frontmatter.date)
                : undefined
            }
            topics={
              source.frontmatter.topics
                ? (source.frontmatter.topics as string[])
                : undefined
            }
          />
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
                li: Markup.Li,
                a: Markup.Anchor,
                img: Markup.Img,
              }}
            />
          </ArticleBody>
        </Container>
      </main>
    </>
  )
}

const Container = styled.article`
  max-width: 900px;
  margin: 0 auto;
`
