import fs from 'fs'
import path from 'path'

import React from 'react'

import styled from '@emotion/styled'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { ArticleBody } from '@/components/Pages/Article/Body'
import { ArticleHeader } from '@/components/Pages/Article/Header'
import {
  H1,
  H2,
  H3,
  P,
  Code,
  HighlightedCode,
  Blockquote,
  Li,
  Anchor,
  Img,
} from '@/components/UI/mdx'
import { getArticleFiles } from '@/modules/articles/server'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  const articleFiles = getArticleFiles()

  const paths = articleFiles.map(({ category, fileName }) => {
    return {
      params: {
        slug: [category, fileName.replace('.mdx', '')],
      },
    }
  })

  return { paths, fallback: false }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string[]
  }>,
) {
  const slug = ctx.params?.slug

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
      revalidate: 60,
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
          <ArticleHeader title={String(source.frontmatter.title)} />
          <ArticleBody>
            <MDXRemote
              {...source}
              components={{
                h1: H1,
                h2: H2,
                h3: H3,
                p: P,
                pre: HighlightedCode,
                code: Code,
                blockquote: Blockquote,
                li: Li,
                a: Anchor,
                img: Img,
              }}
            />
          </ArticleBody>
        </Container>
      </main>
    </>
  )
}

const Container = styled.article`
  max-width: 1000px;
  margin: 0 auto;
`
