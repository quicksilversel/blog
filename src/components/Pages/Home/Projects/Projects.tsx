import type { Project } from '@/libs/getProjects'

import { Box } from '@/components/UI/Box'
import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'

type Props = {
  projects: Project[]
}

export function Projects({ projects }: Props) {
  if (projects.length === 0) {
    return null
  }

  return (
    <Box>
      <Box.SectionHeader>
        <Box.Title>Projects</Box.Title>
        <Box.Link href="/projects">View All Projects</Box.Link>
      </Box.SectionHeader>
      <Grid>
        {projects.slice(0, 3).map((project) => (
          <Card
            key={project.slug}
            title={project.title}
            subtitle={`${project.articles.length} article${project.articles.length > 1 ? 's' : ''}`}
            description={project.description}
            topics={project.topics}
            link={`/projects/${project.slug}`}
          />
        ))}
      </Grid>
    </Box>
  )
}
