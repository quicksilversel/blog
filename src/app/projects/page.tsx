import type { Metadata } from 'next'

import { ProjectHome } from '@/components/Pages/Project'
import { getProjects } from '@/libs/getProjects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse all project series',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectHome projects={projects} />
}
