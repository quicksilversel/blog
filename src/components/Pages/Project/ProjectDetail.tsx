'use client'

import styled from '@emotion/styled'
import Link from 'next/link'

import type { Project as ProjectType } from '@/libs/getProjects'

import { Box } from '@/components/UI/Box'
import { Breadcrumb } from '@/components/UI/Breadcrumb'
import { SectionHeader } from '@/components/UI/SectionHeader'
import { type ProjectArticle } from '@/libs/getProjects'

type Props = {
  project: ProjectType
}

export const ProjectDetail = ({ project }: Props) => {
  return (
    <main>
      <Box>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.title },
          ]}
        />
        <SectionHeader
          title={project.title}
          imageUrl="/cat-ragdoll.png"
          width={80}
        />
        <TimelineContainer>
          <TimelineList>
            {project.articles.map((article: ProjectArticle, index: number) => (
              <TimelineItem key={article.slug}>
                <TimelineMarker>
                  <MarkerDot />
                  <TimelineLine />
                </TimelineMarker>
                <TimelineContent>
                  <TimelineDate>{article.date}</TimelineDate>
                  <ActivityCard href={`/projects/${article.slug}`}>
                    <CardHeader>
                      <PartLabel>Part {index + 1}</PartLabel>
                      <CardTitle>{article.title}</CardTitle>
                    </CardHeader>
                  </ActivityCard>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineList>
        </TimelineContainer>
      </Box>
    </main>
  )
}

const TimelineContainer = styled.div`
  position: relative;
`

const TimelineList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const TimelineItem = styled.li`
  position: relative;
  display: flex;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const TimelineMarker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
  margin-right: 1rem;
`

const MarkerDot = styled.div`
  z-index: 1;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.muted};
  border-radius: 50%;
`

const TimelineLine = styled.div`
  position: absolute;
  top: 16px;
  width: 2px;
  height: calc(100% + 1rem);
  background-color: ${({ theme }) => theme.colors.muted};
  opacity: 0.3;
`

const TimelineContent = styled.div`
  flex: 1;
  padding-top: 0;
`

const TimelineDate = styled.time`
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--font-size-extra-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
`

const ActivityCard = styled(Link)`
  display: block;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`

const CardHeader = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  margin-bottom: 0.5rem;
`

const PartLabel = styled.span`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: var(--font-size-extra-small);
  font-weight: 600;
  color: white;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
`

const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--font-size-normal);
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
`
