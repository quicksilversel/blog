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
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  &:last-child {
    border-bottom: none;
  }
`

const JobTitle = styled.h3`
  font-size: var(--font-size-large);
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
  font-weight: bold;
`

const Company = styled.p`
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 1rem 0;
  font-weight: 500;
`

const Description = styled.p`
  font-size: var(--font-size-normal);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TechItem = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  font-size: var(--font-size-extra-small);
  font-weight: 500;
`
