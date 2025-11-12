import type { ComponentProps } from 'react'

import Head from 'next/head'

import { Hero } from './Hero'
import { Projects } from './Projects'
import { RecentArticles } from './RecentArticles'
import { SkillsOverview } from './SkillsOverview'

type Props = {
  projects: ComponentProps<typeof Projects>['projects']
  articles: ComponentProps<typeof RecentArticles>['articles']
  skills: ComponentProps<typeof SkillsOverview>['skills']
}

export const HomePage = ({ projects, articles, skills }: Props) => {
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
        <SkillsOverview skills={skills} />
      </main>
    </>
  )
}
