/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

type Props = {
  topics: string[]
  selectedTopic: string | null
  onTopicSelect: (topic: string | null) => void
}

export const TopicFilter = ({
  topics,
  selectedTopic,
  onTopicSelect,
}: Props) => {
  return (
    <Container>
      <TagContainer>
        <Tag isActive={!selectedTopic} onClick={() => onTopicSelect(null)}>
          All
        </Tag>
        {topics.map((topic) => (
          <Tag
            key={topic}
            isActive={selectedTopic === topic}
            onClick={() => onTopicSelect(topic)}
          >
            {topic}
          </Tag>
        ))}
      </TagContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;

  @media (width <= 35.1875rem) {
    margin-bottom: 16px;
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  font-size: var(--font-size-extra-small);
  color: ${({ theme, isActive }) => (isActive ? 'white' : theme.colors.text)};
  cursor: pointer;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.muted};
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : theme.colors.muted};
  }
`
