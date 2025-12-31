import styled from '@emotion/styled'

import { CATEGORY_COLORS } from './constants'

type Props = {
  categories: string[]
  cumulativeData: Record<string, Record<string, number>>
  currentMonth: string
  selectedCategory: string | null
  onCategoryClick: (category: string | null) => void
}

export function Legend({
  categories,
  cumulativeData,
  currentMonth,
  selectedCategory,
  onCategoryClick,
}: Props) {
  const handleClick = (category: string) => {
    if (selectedCategory === category) {
      onCategoryClick(null)
    } else {
      onCategoryClick(category)
    }
  }

  return (
    <Container>
      {categories.map((category) => {
        const isSelected = selectedCategory === category
        const isInactive = selectedCategory !== null && !isSelected

        return (
          <LegendItem
            key={category}
            onClick={() => handleClick(category)}
            isSelected={isSelected}
            isInactive={isInactive}
          >
            <LegendColor color={CATEGORY_COLORS[category] || '#888'} />
            <LegendLabel>{category}</LegendLabel>
            <LegendCount>
              {cumulativeData[category][currentMonth]} articles
            </LegendCount>
          </LegendItem>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  @media (width <= 35.1875rem) {
    gap: 0.75rem;
  }
`

const LegendItem = styled.button<{ isSelected: boolean; isInactive: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.muted : 'transparent'};
  border: none;
  border-radius: 4px;
  opacity: ${({ isInactive }) => (isInactive ? 0.4 : 1)};
  transition:
    opacity 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background: ${({ color }) => color};
  border-radius: 2px;
`

const LegendLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`

const LegendCount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`
