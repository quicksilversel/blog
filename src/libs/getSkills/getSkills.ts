import type { SkillCategory } from './types'
import type { Article } from '../getArticles/types'
import type { Project } from '../getProjects/types'

import { CATEGORY_CONFIG } from './data'

const CATEGORY_DISPLAY_LIMIT = 6

export function getSkills(
  articles: Article[],
  projects: Project[],
): SkillCategory[] {
  const categoryCounts: Record<string, number> = {}
  const categoryTechs: Record<string, Set<string>> = {}

  articles.forEach((article) => {
    const category = article.category || 'other'
    categoryCounts[category] = (categoryCounts[category] || 0) + 1

    if (!categoryTechs[category]) {
      categoryTechs[category] = new Set()
    }

    if (article.topics) {
      article.topics.forEach((topic) => {
        categoryTechs[category].add(topic)
      })
    }
  })

  projects.forEach((project) => {
    const category = project.category || 'other'
    categoryCounts[category] =
      (categoryCounts[category] || 0) + project.articles.length

    if (!categoryTechs[category]) {
      categoryTechs[category] = new Set()
    }

    if (project.topics) {
      project.topics.forEach((topic) => {
        categoryTechs[category].add(topic)
      })
    }

    project.articles.forEach((article) => {
      if (article.topics) {
        article.topics.forEach((topic) => {
          categoryTechs[category].add(topic)
        })
      }
    })
  })

  const skills: SkillCategory[] = Object.keys(categoryCounts)
    .filter((category) => category !== 'other')
    .map((category) => {
      const config = CATEGORY_CONFIG[category] || {
        displayName: category,
        description: '',
        icon: 'FileText',
        techKeywords: [],
      }

      const allTechs = Array.from(categoryTechs[category] || [])
      const relevantTechs = [
        ...new Set([
          ...allTechs,
          ...config.techKeywords.filter((keyword) =>
            allTechs.some((tech) =>
              tech.toLowerCase().includes(keyword.toLowerCase()),
            ),
          ),
        ]),
      ]
        .slice(0, CATEGORY_DISPLAY_LIMIT)
        .sort()

      return {
        name: category,
        displayName: config.displayName,
        description: config.description,
        count: categoryCounts[category],
        technologies: relevantTechs,
        icon: config.icon,
      }
    })
    .sort((a, b) => b.count - a.count)

  return skills
}
