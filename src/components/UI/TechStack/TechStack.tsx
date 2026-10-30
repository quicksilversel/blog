import styled from '@emotion/styled'
import { Layers } from 'lucide-react'

import type { TechStackData } from './parseTechStack'

export const TechStack = ({
  title = 'Stack at a glance',
  items,
}: TechStackData) => {
  const groups = [...new Set(items.map((item) => item.group))]

  return (
    <Container aria-label={title}>
      <Header>
        <Layers size={18} aria-hidden />
        <span>{title}</span>
      </Header>
      {groups.map((group, groupIndex) => {
        const technologies = items.filter((item) => item.group === group)

        return (
          <Group key={group ?? 'ungrouped'}>
            {group && (
              <GroupLabel $highlight={groupIndex === 0}>{group}</GroupLabel>
            )}
            <Technologies role="list">
              {technologies.map((item, index) => (
                <Technology key={`${item.name}-${index}`}>
                  {item.role && <Role>{item.role}</Role>}
                  <Name>{item.name}</Name>
                  {item.detail && <Detail>{item.detail}</Detail>}
                </Technology>
              ))}
            </Technologies>
          </Group>
        )
      })}
    </Container>
  )
}

const Container = styled.aside`
  margin: 1.5rem 0 2rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.syntaxBackground};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 1rem;
`

const Header = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.floating};
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};

  svg {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const Group = styled.div`
  padding: 1rem 1.25rem;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.muted};
  }
`

const GroupLabel = styled.div<{ $highlight: boolean }>`
  display: flex;
  gap: 0.375rem;
  align-items: center;
  margin-bottom: 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme, $highlight }) =>
    $highlight ? theme.colors.secondary : theme.colors.mutedText};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const Technologies = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (width <= 40rem) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const Technology = styled.li`
  min-width: 0;
`

const Role = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.mutedText};
`

const Name = styled.span`
  display: block;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const Detail = styled.span`
  display: block;
  margin: 0.375rem 0 0;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 0.7rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
  overflow-wrap: anywhere;
`
