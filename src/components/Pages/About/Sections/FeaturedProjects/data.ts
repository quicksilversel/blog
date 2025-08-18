type Project = {
  title: string
  description: string
  techStack?: string[]
  link: string
}

export const PROJECT_LIST: Project[] = [
  {
    title: 'Headless CMS Migration',
    description:
      'Migrated from legacy CMS to modern headless CMS, enabling full automation of page publishing from CMS to production.',
    techStack: ['Next.js', 'TypeScript', 'Akamai'],
    link: '/projects/akamai-cache-design',
  },
]
