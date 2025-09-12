import fs from 'fs'
import path from 'path'

import React from 'react'

import styled from '@emotion/styled'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
import { SNIPPETS_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  const snippetFiles = await getArticles(SNIPPETS_PATH)

  const paths = snippetFiles.map(({ category, fileName }) => {
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
  const filePath = path.join(SNIPPETS_PATH, category, `${fileName}.mdx`)

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')

    const mdxSource = await serialize(postFile, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    })
    return {
      props: {
        source: mdxSource,
        category,
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      notFound: true,
    }
  }
}

export default function Snippet({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{String(source.frontmatter.title)} - Code Snippet</title>
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
          <ArticleDetail
            source={source}
            breadcrumbItems={[
              { label: 'Home', href: '/' },
              { label: 'Snippets', href: '/snippets' },
              { label: String(source.frontmatter.title) },
            ]}
          />
        </Container>
      </main>
    </>
  )
}

const Container = styled.article`
  max-width: 900px;
  margin: 0 auto;
`
