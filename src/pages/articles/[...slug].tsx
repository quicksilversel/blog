import fs from 'fs'

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
import { ARTICLE_PATH } from '@/utils/constants'

const getAllPages = () => {
  const pages = fs.readdirSync(ARTICLE_PATH).map((page) => {
    return {
      params: {
        slug: page.replace('.mdx', '').split('/'),
      },
    }
  })

  return pages
}

export async function getStaticPaths() {
  const paths = getAllPages()
  return { paths, fallback: false }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string
  }>,
) {
  const slug = ctx.params?.slug

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const postFile = fs.readFileSync(`${ARTICLE_PATH}/${slug}.mdx`, 'utf8')

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
