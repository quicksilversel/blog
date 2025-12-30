'use client'

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
  display: block;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`

const SkillCard = styled.div`
  height: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  transition: border-color 0.2s ease;

  ${SkillCardLink}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SkillHeader = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
`

const SkillIconWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`

const SkillInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`

const SkillName = styled.h3`
  margin: 0;
  font-size: var(--font-size-medium);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const SkillDescription = styled.p`
  margin: 0;
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.mutedText};
`

const SkillStats = styled.div`
  margin-bottom: 12px;
`

const ArticleCount = styled.span`
  font-size: var(--font-size-extra-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TechTag = styled.span`
  padding: 4px 12px;
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.syntaxBackground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
`
