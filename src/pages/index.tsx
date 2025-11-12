import type { InferGetStaticPropsType } from 'next'

import { HomePage } from '@/components/Pages/Home'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'
import { getSkills } from '@/libs/getSkills'

export async function getStaticProps() {
  const articles = await getArticles()
  const projects = await getProjects()

  const projectArticles = projects.flatMap((project) => project.articles)
  const allArticles = [...articles, ...projectArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const skills = getSkills(articles, projects)

  return {
    props: {
      articles: allArticles,
      projects,
      skills,
    },
  }
}

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return <HomePage {...props} />
}
