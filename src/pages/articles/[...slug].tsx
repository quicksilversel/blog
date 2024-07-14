import fs from 'fs'

import React from 'react'

import styled from '@emotion/styled'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { GlobalStyles } from '@/components/Styles'
import { ArticleBody } from '@/components/UI/Article/Body'
import { ArticleHeader } from '@/components/UI/Article/Header'
import { Header } from '@/components/UI/Header'
import {
  H1,
  H2,
  P,
  Code,
  HighlightedCode,
  Blockquote,
  Li,
  Anchor,
} from '@/components/UI/mdx'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string
  }>,
) {
  const { slug } = ctx.params!

  const postFile = fs.readFileSync(`${ARTICLE_PATH}/${slug}.mdx`)

  const mdxSource = await serialize(postFile, { parseFrontmatter: true })
  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  }
}

export default function Article({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{String(source.frontmatter.title)}</title>
      </Head>
      <main>
        <GlobalStyles />
        <Header />
        <Container>
          <ArticleHeader title={String(source.frontmatter.title)} />
          <ArticleBody>
            <MDXRemote
              {...source}
              components={{
                h1: H1,
                h2: H2,
                p: P,
                pre: HighlightedCode,
                code: Code,
                blockquote: Blockquote,
                li: Li,
                a: Anchor,
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
