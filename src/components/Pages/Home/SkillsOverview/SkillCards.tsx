import styled from '@emotion/styled'
import { Monitor, Server, Cloud, BarChart3, LucideIcon } from 'lucide-react'
import Link from 'next/link'

import type { SkillCategory } from '@/libs/getSkills'

type Props = {
  skills: SkillCategory[]
}

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Cloud,
  BarChart3,
}

export const SkillCards = ({ skills }: Props) => {
  return (
    <SkillsGrid>
      {skills.map((skill) => {
        const IconComponent = iconMap[skill.icon]
        return (
          <SkillCardLink key={skill.name} href={`/articles/${skill.name}`}>
            <SkillCard>
              <SkillHeader>
                <SkillIconWrapper>
                  {IconComponent && <IconComponent size={32} />}
                </SkillIconWrapper>
                <SkillInfo>
                  <SkillName>{skill.displayName}</SkillName>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillInfo>
              </SkillHeader>
              <SkillStats>
                <ArticleCount>
                  {skill.count} article{skill.count !== 1 ? 's' : ''}
                </ArticleCount>
              </SkillStats>
              <TechList>
                {skill.technologies.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechList>
            </SkillCard>
          </SkillCardLink>
        )
      })}
    </SkillsGrid>
  )
}

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 16px;

  @media (width <= 35.1875rem) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const SkillCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
`

const SkillCard = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.2s ease;
  height: 100%;

  ${SkillCardLink}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SkillHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`

const SkillIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`

const SkillInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const SkillName = styled.h3`
  font-size: var(--font-size-medium);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`

const SkillDescription = styled.p`
  font-size: var(--font-size-extra-small);
  margin: 0;
  color: ${({ theme }) => theme.colors.mutedText};
`

const SkillStats = styled.div`
  margin-bottom: 12px;
`

const ArticleCount = styled.span`
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TechTag = styled.span`
  font-size: var(--font-size-extra-small);
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.syntaxBackground};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`
