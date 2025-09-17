import type { ComponentProps } from 'react'

import Head from 'next/head'

import { Hero } from './Hero'
import { Projects } from './Projects'
import { RecentArticles } from './RecentArticles'

type Props = {
  projects: ComponentProps<typeof Projects>['projects']
  articles: ComponentProps<typeof RecentArticles>['articles']
}

export const HomePage = ({ projects, articles }: Props) => {
  return (
    <>
      <Head>
        <title>Zoe.log()</title>
        <meta
          name="description"
          content={
            'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.'
          }
        />
      </Head>
      <main>
        <Hero />
        <RecentArticles articles={articles} />
        <Projects projects={projects} />
      </main>
    </>
  )
}
