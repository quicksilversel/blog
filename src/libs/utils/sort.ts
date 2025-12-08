type WithDate = { date: string }

export function sortByDateDesc<T extends WithDate>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function sortByDateAsc<T extends WithDate>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )
}
