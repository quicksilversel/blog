export type ExperienceItem = {
  role: string
  org: string
  period: string
  description?: string
}

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: 'Developer',
    org: 'ZOZO, Inc.',
    period: 'Oct 2026 to present',
    description:
      'Developer productivity: tooling and workflows for engineering teams.',
  },
  {
    role: 'Frontend Engineer & SRE',
    org: 'ZOZO, Inc.',
    period: '2023 to Sep 2026',
    description:
      'Built customer-facing Next.js features, operated AWS and Kubernetes services, and improved observability and operational tooling.',
  },
  {
    role: 'BSc in Computer Science',
    org: 'KAIST',
    period: '2018 to 2022',
  },
]
