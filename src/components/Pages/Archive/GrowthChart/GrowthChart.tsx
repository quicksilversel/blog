'use client'

import { useMemo, useState } from 'react'

import styled from '@emotion/styled'

import type { ArchiveItem } from './types'

import { Chart } from './Chart'
import { Legend } from './Legend'
import { Slider } from './Slider'

type Props = {
  articles: Record<string, ArchiveItem[]>
}

export function GrowthChart({ articles }: Props) {
  const { categories, months, cumulativeData, maxCount } = useMemo(() => {
    const sortedMonths = Object.keys(articles).sort()

    const allCategories = new Set<string>()
    Object.values(articles)
      .flat()
      .forEach((article) => {
        if (article.category) {
          allCategories.add(article.category)
        }
      })
    const categoryList = Array.from(allCategories)

    const cumulative: Record<string, Record<string, number>> = {}
    categoryList.forEach((cat) => {
      cumulative[cat] = {}
    })

    const runningTotals: Record<string, number> = {}
    categoryList.forEach((cat) => {
      runningTotals[cat] = 0
    })

    sortedMonths.forEach((month) => {
      articles[month].forEach((article) => {
        if (article.category && runningTotals[article.category] !== undefined) {
          runningTotals[article.category]++
        }
      })

      categoryList.forEach((cat) => {
        cumulative[cat][month] = runningTotals[cat]
      })
    })

    let max = 0
    categoryList.forEach((cat) => {
      sortedMonths.forEach((month) => {
        max = Math.max(max, cumulative[cat][month])
      })
    })

    return {
      categories: categoryList,
      months: sortedMonths,
      cumulativeData: cumulative,
      maxCount: max,
    }
  }, [articles])

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    months.length - 1,
  )
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const visibleMonths = months.slice(0, selectedMonthIndex + 1)
  const currentMonth = months[selectedMonthIndex]

  if (months.length === 0) return null

  const formatMonthFull = (month: string) => {
    const date = new Date(month + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <Container>
      <ChartHeader>
        <ChartTitle>Articles Over Time</ChartTitle>
        <CurrentDate>{formatMonthFull(currentMonth)}</CurrentDate>
      </ChartHeader>
      <Chart
        categories={categories}
        months={months}
        visibleMonths={visibleMonths}
        cumulativeData={cumulativeData}
        maxCount={maxCount}
        selectedMonthIndex={selectedMonthIndex}
        selectedCategory={selectedCategory}
      />

      <Slider
        min={0}
        max={months.length - 1}
        value={selectedMonthIndex}
        onChange={setSelectedMonthIndex}
      />

      <Legend
        categories={categories}
        cumulativeData={cumulativeData}
        currentMonth={currentMonth}
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
      />
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 3rem;

  @media (width <= 35.1875rem) {
    margin-bottom: 2rem;
  }
`

const ChartHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const CurrentDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`
