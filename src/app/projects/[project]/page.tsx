import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ProjectDetail } from '@/components/Pages/Project'
import { getProjects } from '@/libs/getProjects'

type Props = {
  params: Promise<{ project: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.map((project) => ({
    project: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === projectSlug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} - Projects`,
    description:
      project.description ||
      `Browse all articles in the ${project.title} series`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { project: projectSlug } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === projectSlug)

  if (!project || project.articles.length === 0) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
