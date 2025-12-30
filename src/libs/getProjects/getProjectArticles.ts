import { promises as fs } from 'fs'
import path from 'path'

import type { ProjectArticle } from './types'

import {
  filterMarkdownFiles,
  filterPublished,
  parseMarkdownFile,
  sortByDateAsc,
} from '@/libs/utils'
import { PROJECTS_PATH } from '@/utils/constants'

export async function getProjectArticles(
  projectName: string,
  basePath: string = PROJECTS_PATH,
  projectCategory?: string,
): Promise<ProjectArticle[]> {
  const projectDir = path.join(basePath, projectName)

  try {
    const allFiles = await fs.readdir(projectDir)
    const mdxFiles = filterMarkdownFiles(allFiles, { excludeIndex: true })

    const articles = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const fullPath = path.join(projectDir, fileName)
        const { frontmatter, readingTime } = await parseMarkdownFile(fullPath)

        const slug = `${projectName}/${path.basename(fileName, '.mdx')}`

        return {
          ...frontmatter,
          fileName,
          fullPath,
          project: projectName,
          category:
            (frontmatter.category as string | undefined) ??
            projectCategory ??
            'project',
          slug,
          readingTime,
        } as ProjectArticle
      }),
    )

    return sortByDateAsc(filterPublished(articles))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting project articles:', error)
    return []
  }
}
