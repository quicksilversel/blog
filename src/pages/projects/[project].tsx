import React from 'react'

import Head from 'next/head'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ProjectDetail } from '@/components/Pages/Project'
import { getProjects } from '@/libs/getProjects'

export async function getStaticPaths() {
  const projects = await getProjects()

  const paths = projects.map((project) => ({
    params: {
      project: project.slug,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectName = params?.project as string

  if (!projectName) {
    return {
      notFound: true,
    }
  }

  const projects = await getProjects()
  const project = projects.find((p) => p.slug === projectName)

  if (!project || project.articles.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
    },
  }
}

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{project.title} - Projects</title>
        <meta
          name="description"
          content={
            project.description ||
            `Browse all articles in the ${project.title} series`
          }
        />
      </Head>
      <ProjectDetail project={project} />
    </>
  )
}
