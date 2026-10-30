import styled from '@emotion/styled'

import { EXPERIENCE_LIST } from './data'

import { Section } from '../../UI/Section'

export const Experience = () => {
  return (
    <Section id="experience" title="Experience">
      <List>
        {EXPERIENCE_LIST.map((item) => (
          <Item key={`${item.org}-${item.role}`}>
            <Period>{item.period}</Period>
            <Details>
              <Role>
                {item.role} <Org>{item.org}</Org>
              </Role>
              {item.description && (
                <Description>{item.description}</Description>
              )}
            </Details>
          </Item>
        ))}
      </List>
    </Section>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

const Item = styled.div`
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1rem;
  align-items: baseline;

  @media (width <= 768px) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
`

const Period = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Role = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
`

const Org = styled.span`
  font-weight: normal;
  color: ${({ theme }) => theme.colors.secondary};

  &::before {
    margin-right: 0.35rem;
    color: ${({ theme }) => theme.colors.mutedText};
    content: '·';
  }
`

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.mutedText};
`
