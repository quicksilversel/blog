export type ExperienceItem = {
  role: string
  org: string
  period: string
  description?: string
}

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: 'Frontend, SRE and Developer Productivity',
    org: 'ZOZO, Inc.',
    period: '2023 to present',
    description:
      'Built customer-facing Next.js features, operated AWS and Kubernetes services, and improved observability and operational tooling. Now working on developer productivity: tooling and workflows for engineering teams.',
  },
  {
    role: 'BSc in Computer Science',
    org: 'KAIST',
    period: '2018 to 2022',
  },
]
