import { describe, expect, it } from 'vitest'

import { formatDate } from './date'

describe('formatDate', () => {
  it('formats an ISO date as a long US-style date', () => {
    // Asserts shape rather than an exact day to stay timezone-agnostic.
    expect(formatDate('2024-06-15')).toMatch(/^[A-Z][a-z]+ \d{1,2}, 2024$/)
  })

  it('includes the correct month and year', () => {
    const formatted = formatDate('2024-06-15')
    expect(formatted).toContain('June')
    expect(formatted).toContain('2024')
  })
})
