import styled from '@emotion/styled'

import { TableWrapper } from '@/components/Pages/Article/ArticleDetail/Markup/Table'

import { EXPERIENCE_LIST } from './data'

import { Section } from '../../UI/Section'

export const Experience = () => {
  return (
    <Section id="experience">
      <Section.Number>02</Section.Number>
      <Section.Content>
        <Section.Title>Experience</Section.Title>
        <ExperienceItem>
          <JobTitle>Frontend Engineer & SRE</JobTitle>
          <Company>ZOZO, Inc • 2023 - Present</Company>
          <Description as="div">
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Area</Th>
                    <Th>Responsibilities</Th>
                  </Tr>
                </Thead>
                <tbody>
                  {EXPERIENCE_LIST.map((item) => (
                    <Tr key={item.title}>
                      <TitleCell>{item.title}</TitleCell>
                      <DescriptionCell>{item.description}</DescriptionCell>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </Description>
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

const Table = styled.table`
  width: 100%;
  font-size: var(--font-size-extra-small);
  border-collapse: collapse;
`

const Thead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media (width <= 35.1875rem) {
    display: none;
  }
`

const Th = styled.th`
  padding: 0.75rem;
  font-size: var(--font-size-extra-small);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
`

const Tr = styled.tr`
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  @media (width <= 35.1875rem) {
    display: block;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.muted};
  }
`

const Td = styled.td`
  padding: 0.75rem;

  @media (width <= 35.1875rem) {
    display: block;
    width: 100%;
  }
`

const TitleCell = styled(Td)`
  flex: 0 0 30%;
  font-weight: bold;
`

const DescriptionCell = styled(Td)`
  flex: 1;

  @media (width <= 35.1875rem) {
    border-top: 1px solid ${({ theme }) => theme.colors.muted};
  }
`
