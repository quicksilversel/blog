import fs from 'fs'
import path from 'path'

import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getArticles } from '@/libs/getArticles'
import { getRelatedArticles } from '@/libs/getArticles/getRelatedArticles'
import { ARTICLE_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  const articleFiles = await getArticles(ARTICLE_PATH)

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

    const mdxSource = await serialize(postFile, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    })

    const stats = readingTime(postFile)

    const relatedArticles = await getRelatedArticles(
      `${category}/${fileName}`,
      mdxSource.frontmatter.topics as string[] | undefined,
      category,
      3,
    )

    return {
      props: {
        source: mdxSource,
        rawContent: postFile,
        category,
        relatedArticles,
        readingTime: stats.text,
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

export default function Articles({
  source,
  rawContent,
  category,
  relatedArticles,
  readingTime,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const keywords = Array.isArray(source.frontmatter.topics)
    ? source.frontmatter.topics.join(', ')
    : ''

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
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <ArticleDetail
        source={source}
        rawContent={rawContent}
        relatedArticles={relatedArticles}
        readingTime={readingTime}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles' },
          {
            label: category,
            href: `/articles/${category}`,
          },
          { label: String(source.frontmatter.title) },
        ]}
      />
    </>
  )
}
