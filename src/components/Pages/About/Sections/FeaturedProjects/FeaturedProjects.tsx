import styled from '@emotion/styled'
import Link from 'next/link'

import { PROJECT_LIST } from './data'

import { Section } from '../../UI/Section'

export const FeaturedProjects = () => {
  return (
    <Section id="projects">
      <Section.Number>03</Section.Number>
      <Section.Content>
        <Section.Title>Featured Projects</Section.Title>
        <ProjectGrid>
          {PROJECT_LIST.map((project) => (
            <ProjectLink href={project.link} key={project.title}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              {project.techStack && (
                <ProjectTech>{project.techStack.join(' • ')}</ProjectTech>
              )}
            </ProjectLink>
          ))}
        </ProjectGrid>
      </Section.Content>
    </Section>
  )
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const ProjectTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: var(--font-size-normal);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  font-size: var(--font-size-small);
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`

const ProjectTech = styled.p`
  margin-bottom: 1rem;
  font-size: var(--font-size-extra-small);
`

const ProjectLink = styled(Link)`
  display: block;
  padding: 1.5rem;
  font-size: var(--font-size-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    transition: background-color 0.2s ease;
  }
`
