import type { CategoryConfig } from './types'

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  frontend: {
    displayName: 'Frontend',
    description: 'React, Next.js, TypeScript',
    icon: 'Monitor',
    techKeywords: [
      'React',
      'Next.js',
      'TypeScript',
      'Emotion',
      'MDX',
      'SSR',
      'ISG',
    ],
  },
  backend: {
    displayName: 'Backend',
    description: 'Node.js, Python',
    icon: 'Server',
    techKeywords: ['Node.js', 'Python', 'Flask'],
  },
  infrastructure: {
    displayName: 'Infrastructure',
    description: 'AWS, K8s, GHA, Docker',
    icon: 'Cloud',
    techKeywords: [
      'AWS',
      'Kubernetes',
      'Docker',
      'GHA',
      'GCP',
      'Akamai',
      'Terraform',
      'CI/CD',
    ],
  },
  observability: {
    displayName: 'Observability',
    description: 'Monitoring, Datadog',
    icon: 'BarChart3',
    techKeywords: ['Datadog'],
  },
}
