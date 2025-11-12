import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Monitor, Server, Cloud, BarChart3, LucideIcon } from 'lucide-react'

import type { SkillCategory } from '@/libs/getSkills'

type Props = {
  skills: SkillCategory[]
  totalArticles: number
}

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Cloud,
  BarChart3,
}

const getOpacity = (index: number) => {
  const opacities = [1, 0.8, 0.6, 0.5]
  return opacities[index % opacities.length]
}

export const Chart = ({ skills, totalArticles }: Props) => {
  return (
    <DistributionChart>
      <ChartTitle>Content Distribution ({totalArticles} articles)</ChartTitle>
      <ChartBarContainer>
        {skills.map((skill, index) => {
          const percentage = ((skill.count / totalArticles) * 100).toFixed(1)
          const IconComponent = iconMap[skill.icon]
          const opacity = getOpacity(index)
          const useSecondary = index % 2 === 1

          return (
            <ChartSegment
              key={skill.name}
              percentage={parseFloat(percentage)}
              opacity={opacity}
              useSecondary={useSecondary}
              animationDelay={index * 0.1}
              title={`${skill.displayName}: ${skill.count} articles (${percentage}%)`}
            >
              <SegmentLabel animationDelay={index * 0.1}>
                {IconComponent && <IconComponent size={14} />}
                <PercentageText>{percentage}%</PercentageText>
              </SegmentLabel>
            </ChartSegment>
          )
        })}
      </ChartBarContainer>
      <ChartLegend>
        {skills.map((skill, index) => {
          const percentage = ((skill.count / totalArticles) * 100).toFixed(0)
          const IconComponent = iconMap[skill.icon]
          return (
            <LegendItem key={skill.name} animationDelay={index * 0.1 + 0.3}>
              <LegendIconWrapper>
                {IconComponent && <IconComponent size={24} />}
              </LegendIconWrapper>
              <LegendText>
                <LegendName>{skill.displayName}</LegendName>
                <LegendStats>
                  {skill.count} articles • {percentage}%
                </LegendStats>
              </LegendText>
            </LegendItem>
          )
        })}
      </ChartLegend>
    </DistributionChart>
  )
}

const growWidth = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const DistributionChart = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};

  @media (width <= 35.1875rem) {
    padding: 16px;
  }
`

const ChartTitle = styled.h3`
  font-size: var(--font-size-small);
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
`

const ChartBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ChartSegment = styled.div<{
  percentage: number
  opacity: number
  useSecondary: boolean
  animationDelay: number
}>`
  --target-width: ${({ percentage }) => percentage}%;
  width: 0%;
  background: ${({ theme, useSecondary, opacity }) => {
    const color = useSecondary ? theme.colors.secondary : theme.colors.primary
    return color.replace('hsl(', `hsla(`).replace(')', `, ${opacity})`)
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: opacity 0.2s ease;
  animation: ${growWidth} 1s ease-out forwards;
  animation-delay: ${({ animationDelay }) => animationDelay}s;

  &:hover {
    opacity: 0.8;
  }

  &:not(:last-child) {
    border-right: 2px solid ${({ theme }) => theme.colors.background};
  }
`

const SegmentLabel = styled.span<{ animationDelay?: number }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-extra-small);
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: calc(${({ animationDelay }) => animationDelay ?? 0}s + 0.5s);
`

const PercentageText = styled.span`
  @media (width <= 768px) {
    display: none;
  }
`

const ChartLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;

  @media (width <= 35.1875rem) {
    grid-template-columns: 1fr;
  }
`

const LegendItem = styled.div<{ animationDelay: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ animationDelay }) => animationDelay}s;
`

const LegendIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`

const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`

const LegendName = styled.span`
  font-size: var(--font-size-extra-small);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const LegendStats = styled.span`
  font-size: var(--font-size-extra-small);
  color: ${({ theme }) => theme.colors.mutedText};
`
