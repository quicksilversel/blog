import { promises as fs } from 'fs'
import path from 'path'

import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

import type { ProjectArticle } from './types'

import { PROJECTS_PATH } from '@/utils/constants'

export async function getProjectArticles(
  projectName: string,
  basePath: string = PROJECTS_PATH,
): Promise<ProjectArticle[]> {
  const projectDir = path.join(basePath, projectName)

  try {
    const allFiles = await fs.readdir(projectDir)
    const mdxFiles = allFiles.filter(
      (file) => file.toLowerCase().endsWith('.mdx') && file !== 'index.mdx',
    )

    const articles = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const fullPath = path.join(projectDir, fileName)
        const source = await fs.readFile(fullPath, 'utf8')
        const { frontmatter } = await serialize(source, {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        })

        const slug = `${projectName}/${path.basename(fileName, '.mdx')}`

        return {
          ...frontmatter,
          fileName,
          fullPath,
          project: projectName,
          category: 'project' as const,
          slug,
        } as ProjectArticle
      }),
    )

    return articles
      .filter((article) => article.published !== false)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } catch (error) {
    return []
  }
}
