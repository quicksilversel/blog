import styled from '@emotion/styled'

import {
  CATEGORY_COLORS,
  CHART_HEIGHT,
  CHART_PADDING,
  CHART_WIDTH,
} from './constants'

type Props = {
  categories: string[]
  months: string[]
  visibleMonths: string[]
  cumulativeData: Record<string, Record<string, number>>
  maxCount: number
  selectedMonthIndex: number
  selectedCategory: string | null
}

export function Chart({
  categories,
  months,
  visibleMonths,
  cumulativeData,
  maxCount,
  selectedMonthIndex,
  selectedCategory,
}: Props) {
  const innerWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right
  const innerHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom

  const xScale = (index: number) =>
    CHART_PADDING.left + (index / (months.length - 1 || 1)) * innerWidth

  const yScale = (value: number) =>
    CHART_PADDING.top + innerHeight - (value / (maxCount || 1)) * innerHeight

  const generatePath = (category: string) => {
    const points = visibleMonths.map((month, i) => {
      const actualIndex = months.indexOf(month)
      const x = xScale(actualIndex)
      const y = yScale(cumulativeData[category][month])
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    return points.join(' ')
  }

  const yTicks = []
  const tickCount = 4
  for (let i = 0; i <= tickCount; i++) {
    const value = Math.round((maxCount / tickCount) * i)
    yTicks.push(value)
  }

  const formatMonth = (month: string) => {
    const [year, m] = month.split('-')
    return `${m}/${year.slice(2)}`
  }

  const xLabelCount = 6
  const xLabelInterval = Math.max(1, Math.floor(months.length / xLabelCount))

  const visibleCategories = selectedCategory
    ? categories.filter((c) => c === selectedCategory)
    : categories

  const currentMonth = months[selectedMonthIndex]

  return (
    <ChartWrapper>
      <svg
        width="100%"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1={CHART_PADDING.left}
          y1={CHART_PADDING.top}
          x2={CHART_PADDING.left}
          y2={CHART_HEIGHT - CHART_PADDING.bottom}
          stroke="currentColor"
          strokeOpacity={0.2}
        />
        {yTicks.map((tick) => (
          <g key={tick}>
            <text
              x={CHART_PADDING.left - 8}
              y={yScale(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill="currentColor"
              opacity={0.6}
            >
              {tick}
            </text>
            <line
              x1={CHART_PADDING.left}
              y1={yScale(tick)}
              x2={CHART_WIDTH - CHART_PADDING.right}
              y2={yScale(tick)}
              stroke="currentColor"
              strokeOpacity={0.1}
            />
          </g>
        ))}
        <line
          x1={CHART_PADDING.left}
          y1={CHART_HEIGHT - CHART_PADDING.bottom}
          x2={CHART_WIDTH - CHART_PADDING.right}
          y2={CHART_HEIGHT - CHART_PADDING.bottom}
          stroke="currentColor"
          strokeOpacity={0.2}
        />
        {months.map((month, i) => {
          if (i % xLabelInterval !== 0 && i !== months.length - 1) return null
          return (
            <text
              key={month}
              x={xScale(i)}
              y={CHART_HEIGHT - CHART_PADDING.bottom + 20}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              opacity={0.6}
            >
              {formatMonth(month)}
            </text>
          )
        })}
        <line
          x1={xScale(selectedMonthIndex)}
          y1={CHART_PADDING.top}
          x2={xScale(selectedMonthIndex)}
          y2={CHART_HEIGHT - CHART_PADDING.bottom}
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeDasharray="4 4"
        />
        {visibleCategories.map((category) => (
          <g key={category}>
            <path
              d={generatePath(category)}
              fill="none"
              stroke={CATEGORY_COLORS[category] || '#888'}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={xScale(selectedMonthIndex)}
              cy={yScale(cumulativeData[category][currentMonth])}
              r={4}
              fill={CATEGORY_COLORS[category] || '#888'}
            />
          </g>
        ))}
      </svg>
    </ChartWrapper>
  )
}

const ChartWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
`
