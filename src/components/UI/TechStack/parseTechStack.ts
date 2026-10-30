export type TechStackItem = {
  name: string
  role?: string
  detail?: string
  group?: string
}

export type TechStackData = {
  title?: string
  items: TechStackItem[]
}

const isOptionalText = (value: unknown): value is string | undefined =>
  value === undefined || (typeof value === 'string' && value.trim().length > 0)

const isTechStackItem = (value: unknown): value is TechStackItem => {
  if (typeof value !== 'object' || value === null) return false

  return (
    'name' in value &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    (!('role' in value) || isOptionalText(value.role)) &&
    (!('detail' in value) || isOptionalText(value.detail)) &&
    (!('group' in value) || isOptionalText(value.group))
  )
}

export const parseTechStack = (source: string): TechStackData | null => {
  try {
    const value: unknown = JSON.parse(source)
    let title: string | undefined
    let candidate: unknown = value

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (!('items' in value)) return null
      candidate = value.items
      if ('title' in value) {
        if (!isOptionalText(value.title)) return null
        title = value.title
      }
    }

    if (!Array.isArray(candidate) || candidate.length === 0) return null
    const items: unknown[] = candidate
    return items.every(isTechStackItem) ? { title, items } : null
  } catch {
    return null
  }
}
