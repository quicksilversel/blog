import React from 'react'

import type { Project } from '@/libs/getProjects'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { SectionHeader } from '@/components/UI/SectionHeader'
import { Stack } from '@/components/UI/Stack'

type Props = {
  projects: Project[]
}

export const ProjectHome = ({ projects }: Props) => {
  return (
    <Box>
      <SectionHeader title="Projects" imageUrl="/cat-orange.png" width={100} />
      <Stack>
        {projects.map((project) => (
          <Card
            key={project.slug}
            title={project.title}
            subtitle={`${project.articles.length} article${project.articles.length > 1 ? 's' : ''}`}
            description={project.description}
            topics={project.topics}
            link={`/projects/${project.slug}`}
            size="large"
          />
        ))}
      </Stack>
    </Box>
  )
}
