import styled from '@emotion/styled'

import { Section } from '../../UI/Section'

export const Experience = () => {
  return (
    <Section id="experience">
      <Section.Number>02</Section.Number>
      <Section.Content>
        <Section.Title>Experience</Section.Title>
        <ExperienceItem>
          <JobTitle>Site Reliability Engineer</JobTitle>
          <Company>ZOZO, Inc • 2025 - Present</Company>
          <Description>
            Operating large-scale services in AWS + Kubernetes environments.
            Focused on observability, scalability, and reliability — from
            designing resilient architectures to debugging production issues.
            Contributed to infra automation with Terraform and built internal
            tooling to improve deployment and monitoring workflows.
          </Description>
          <TechList>
            <TechItem>AWS</TechItem>
            <TechItem>Kubernetes (EKS)</TechItem>
            <TechItem>Docker</TechItem>
            <TechItem>Terraform</TechItem>
            <TechItem>Datadog</TechItem>
            <TechItem>Splunk</TechItem>
          </TechList>
        </ExperienceItem>
        <ExperienceItem>
          <JobTitle>Frontend Engineer</JobTitle>
          <Company>ZOZO, Inc • 2022 - 2023</Company>
          <Description>
            Developed and maintained customer-facing features in Next.js
            applications, optimized performance for high-traffic e-commerce
            pages, and collaborated with backend/SRE teams to ensure smooth
            production deployments.
          </Description>
          <TechList>
            <TechItem>React</TechItem>
            <TechItem>Next.js</TechItem>
            <TechItem>TypeScript</TechItem>
            <TechItem>Node.js</TechItem>
            <TechItem>HTML/CSS</TechItem>
          </TechList>
        </ExperienceItem>
        <ExperienceItem>
          <JobTitle>BSc. Computer Science </JobTitle>
          <Company>KAIST • 2018 - 2022</Company>
        </ExperienceItem>
      </Section.Content>
    </Section>
  )
}

const ExperienceItem = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const JobTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: var(--font-size-large);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`

const Company = styled.p`
  margin: 0 0 1rem;
  font-size: var(--font-size-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`

const Description = styled.p`
  margin-bottom: 1rem;
  font-size: var(--font-size-normal);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TechItem = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: var(--font-size-extra-small);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
`
