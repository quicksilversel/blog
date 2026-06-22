import type { Metadata } from 'next'

import { HomePage } from '@/components/Pages/Home'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'
import { getSkills } from '@/libs/getSkills'

export const metadata: Metadata = {
  title: 'Zoe.log()',
  description:
    'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
  },
}

export default async function Page() {
  const articles = await getArticles()
  const projects = await getProjects()

  const projectArticles = projects.flatMap((project) => project.articles)
  const allArticles = [...articles, ...projectArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const skills = getSkills(articles, projects)

  return <HomePage articles={allArticles} projects={projects} skills={skills} />
}
