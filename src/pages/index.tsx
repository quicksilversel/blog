import type { InferGetStaticPropsType } from 'next'

import { HomePage } from '@/components/Pages/Home'
import { getArticles } from '@/libs/getArticles'
import { getProjects } from '@/libs/getProjects'

export async function getStaticProps() {
  const articles = await getArticles()
  const projects = await getProjects()

  return {
    props: {
      articles,
      projects,
    },
  }
}

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return <HomePage {...props} />
}
