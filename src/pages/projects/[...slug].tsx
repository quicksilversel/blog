import fs from 'fs'
import path from 'path'

import React from 'react'

import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ArticleDetail } from '@/components/Pages/Article/ArticleDetail'
import { getProjects } from '@/libs/getProjects'
import { PROJECTS_PATH } from '@/utils/constants'

export async function getStaticPaths() {
  const projects = await getProjects()

  const paths = projects.flatMap((project) =>
    project.articles.map((article) => ({
      params: {
        slug: article.slug.split('/'),
      },
    })),
  )

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[]

  if (!slug || slug.length !== 2) {
    return {
      notFound: true,
    }
  }

  const [projectName, fileName] = slug
  const filePath = path.join(PROJECTS_PATH, projectName, `${fileName}.mdx`)

  try {
    const postFile = fs.readFileSync(filePath, 'utf8')
    const mdxSource = await serialize(postFile, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    })

    const projects = await getProjects()
    const project = projects.find((p) => p.slug === projectName)

    return {
      props: {
        source: mdxSource,
        project,
        currentSlug: slug.join('/'),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default function ProjectArticle({
  source,
  project,
  currentSlug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{String(source.frontmatter.title)} - Project</title>
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

      <ArticleDetail
        source={source}
        isProject
        project={{
          ...project,
          currentSlug,
        }}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title, href: `/projects/${project.slug}` },
          { label: String(source.frontmatter.title) },
        ]}
      />
    </>
  )
}
