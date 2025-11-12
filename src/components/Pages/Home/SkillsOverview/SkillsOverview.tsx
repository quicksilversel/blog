import type { SkillCategory } from '@/libs/getSkills'

import { Box } from '@/components/UI/Box'

import { Chart } from './Chart'
import { SkillCards } from './SkillCards'

type Props = {
  skills: SkillCategory[]
}

export const SkillsOverview = ({ skills }: Props) => {
  const totalArticles = skills.reduce((sum, skill) => sum + skill.count, 0)

  return (
    <Box>
      <Box.SectionHeader>
        <Box.Title>Skills & Expertise</Box.Title>
        <Box.Link href="/articles">View All Categories</Box.Link>
      </Box.SectionHeader>
      <Chart skills={skills} totalArticles={totalArticles} />
      <SkillCards skills={skills} />
    </Box>
  )
}
