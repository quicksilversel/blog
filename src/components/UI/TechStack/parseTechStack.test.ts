import { describe, expect, it } from 'vitest'

import { parseTechStack } from './parseTechStack'

describe('parseTechStack', () => {
  const item = {
    name: 'Prisma ORM 8 RC',
    role: 'Data access',
    detail: '@prisma/orm-postgres',
    group: 'Data layer',
  }

  it('accepts article-defined groups and preserves their content', () => {
    const items = ['Frontend', 'Data layer', 'AI tooling'].map((group) => ({
      ...item,
      group,
    }))
    expect(parseTechStack(JSON.stringify(items))).toEqual({ items })
  })

  it('accepts a minimal ungrouped stack', () => {
    expect(parseTechStack('[{"name":"React"}]')).toEqual({
      items: [{ name: 'React' }],
    })
  })

  it('accepts a custom title and mixed grouped and ungrouped items', () => {
    const stack = {
      title: 'Tools for this experiment',
      items: [item, { name: 'Fable 5' }],
    }
    expect(parseTechStack(JSON.stringify(stack))).toEqual(stack)
  })

  it.each([
    'invalid JSON',
    'null',
    '{}',
    '[]',
    '[null]',
    JSON.stringify([{ ...item, name: ' ' }]),
    JSON.stringify([{ ...item, role: 1 }]),
    JSON.stringify([{ ...item, detail: null }]),
    JSON.stringify([{ ...item, group: 1 }]),
    JSON.stringify([item, { role: 'Missing name' }]),
    JSON.stringify({ title: ' ', items: [item] }),
    JSON.stringify({ title: 'Stack', items: {} }),
  ])('rejects malformed blocks so they can fall back to code: %s', (source) => {
    expect(parseTechStack(source)).toBeNull()
  })
})
