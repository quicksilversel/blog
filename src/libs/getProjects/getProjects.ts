import { promises as fs } from 'fs'
import path from 'path'

import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

import type { Project } from './types'

import { PROJECTS_PATH } from '@/utils/constants'

import { getProjectArticles } from './getProjectArticles'

export async function getProjects(
  basePath: string = PROJECTS_PATH,
): Promise<Project[]> {
  const entries = await fs.readdir(basePath, { withFileTypes: true })
  const projectDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const projects = await Promise.all(
    projectDirs.map(async (projectName) => {
      let projectMeta: {
        title?: string
        description?: string
        topics?: string[]
        category?: string
      } = {}
      try {
        const indexPath = path.join(basePath, projectName, 'index.mdx')
        const indexContent = await fs.readFile(indexPath, 'utf8')
        const { frontmatter } = await serialize(indexContent, {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        })
        projectMeta = {
          title: frontmatter.title as string | undefined,
          description: frontmatter.description as string | undefined,
          topics: frontmatter.topics as string[] | undefined,
          category: frontmatter.category as string | undefined,
        }
      } catch (error) {
        console.warn(
          `No index.mdx found for project ${projectName}, using default metadata: ${error}`,
        )
      }

      const articles = await getProjectArticles(
        projectName,
        basePath,
        projectMeta.category,
      )

      return {
        slug: projectName,
        title: projectMeta.title ?? projectName,
        description: projectMeta.description,
        topics: projectMeta.topics,
        category: projectMeta.category,
        articles,
      }
    }),
  )

  return projects.filter((project) => project.articles.length > 0)
}
