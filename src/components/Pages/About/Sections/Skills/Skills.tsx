import styled from '@emotion/styled'

import { Section } from '../../UI/Section'

export const Skills = () => {
  return (
    <Section id="skills">
      <Section.Number>03</Section.Number>
      <Section.Content>
        <Section.Title>Skills & Technologies</Section.Title>
        <SkillsGrid>
          <div>
            <SkillTitle>Frontend</SkillTitle>
            <SkillList>
              <SkillItem>React / Next.js</SkillItem>
              <SkillItem>HTML / CSS</SkillItem>
              <SkillItem>TypeScript / JavaScript</SkillItem>
            </SkillList>
          </div>
          <div>
            <SkillTitle>Infrastructure & Backend</SkillTitle>
            <SkillList>
              <SkillItem>AWS</SkillItem>
              <SkillItem>Kubernetes (EKS)</SkillItem>
              <SkillItem>Terraform / IaC</SkillItem>
              <SkillItem>Docker</SkillItem>
            </SkillList>
          </div>
          <div>
            <SkillTitle>Observability & Ops</SkillTitle>
            <SkillList>
              <SkillItem>Datadog</SkillItem>
              <SkillItem>Splunk</SkillItem>
              <SkillItem>CI/CD (GitHub Actions, ArgoCD, Flagger)</SkillItem>
            </SkillList>
          </div>
        </SkillsGrid>
      </Section.Content>
    </Section>
  )
}

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`

const SkillTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: var(--font-size-normal);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const SkillList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const SkillItem = styled.li`
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.text};

  &::before {
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    content: '▸';
  }
`
