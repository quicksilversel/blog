import fs from 'fs'

import React from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { H1 } from '@/components/mdx/H1'
import { ARTICLE_PATH } from '@/utils/constants'

export default function Article({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{source.frontmatter.title as string}</title>
      </Head>
      <MDXRemote
        {...source}
        components={{
          h1: H1,
        }}
      />
    </>
  )
}
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
