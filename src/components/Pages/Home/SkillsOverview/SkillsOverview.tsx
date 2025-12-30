import type { SkillCategory } from '@/libs/getSkills'

import { Box, BoxSectionHeader, BoxTitle, BoxLink } from '@/components/UI/Box'

import { Chart } from './Chart'
import { SkillCards } from './SkillCards'

type Props = {
  skills: SkillCategory[]
}

export const SkillsOverview = ({ skills }: Props) => {
  const totalArticles = skills.reduce((sum, skill) => sum + skill.count, 0)

  return (
    <Box>
      <BoxSectionHeader>
        <BoxTitle>Skills & Expertise</BoxTitle>
        <BoxLink href="/articles">View All Categories</BoxLink>
      </BoxSectionHeader>
      <Chart skills={skills} totalArticles={totalArticles} />
      <SkillCards skills={skills} />
    </Box>
  )
}
