import React from 'react'

import Head from 'next/head'

import type { InferGetStaticPropsType } from 'next'

import { ProjectHome } from '@/components/Pages/Project'
import { getProjects } from '@/libs/getProjects'

export async function getStaticProps() {
  const projects = await getProjects()

  return {
    props: {
      projects,
    },
  }
}

export default function ProjectsIndex({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Projects - Zoe.log()</title>
        <meta name="description" content="Browse all project series" />
      </Head>
      <ProjectHome projects={projects} />
    </>
  )
}
