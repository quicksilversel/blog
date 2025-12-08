import type { SkillCategory } from './types'
import type { Article } from '../getArticles/types'
import type { Project } from '../getProjects/types'

import { sortByDateDesc } from '@/libs/utils'

import { CATEGORY_CONFIG } from './data'

const CATEGORY_DISPLAY_LIMIT = 6

export function getSkills(
  articles: Article[],
  projects: Project[],
): SkillCategory[] {
  const categoryCounts: Record<string, number> = {}
  const categoryTechs: Record<string, Set<string>> = {}

  const sortedArticles = sortByDateDesc(articles)

  sortedArticles.forEach((article) => {
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
    const projectCategory = project.category || 'other'

    const sortedProjectArticles = sortByDateDesc(project.articles)

    sortedProjectArticles.forEach((article) => {
      const category = article.category || projectCategory
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

      const techKeywords = config.techKeywords || []
      const articleTopics = Array.from(categoryTechs[category] || []).filter(
        (topic) =>
          !techKeywords.some((kw) => kw.toLowerCase() === topic.toLowerCase()),
      )

      const relevantTechs = [
        ...techKeywords.slice(0, CATEGORY_DISPLAY_LIMIT),
        ...articleTopics.slice(
          0,
          Math.max(0, CATEGORY_DISPLAY_LIMIT - techKeywords.length),
        ),
      ]

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
