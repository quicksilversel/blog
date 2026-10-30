export type GitHubIssueReference = {
  kind: 'issue'
  owner: string
  repo: string
  type: 'issues' | 'pull'
  number: number
}

export type GitHubRepoReference = {
  kind: 'repo'
  owner: string
  repo: string
}

export type GitHubReference = GitHubIssueReference | GitHubRepoReference

const ISSUE_PATTERN =
  /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/(issues|pull)\/(\d+)\/?$/

const REPO_PATTERN = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/

/** First path segments that belong to GitHub itself, not to an account. */
const RESERVED_SEGMENTS = new Set([
  'about',
  'apps',
  'collections',
  'enterprise',
  'events',
  'explore',
  'features',
  'login',
  'marketplace',
  'new',
  'notifications',
  'orgs',
  'pricing',
  'search',
  'settings',
  'sponsors',
  'topics',
  'users',
])

export function parseGitHubReference(url: string): GitHubReference | null {
  const issueMatch = url.match(ISSUE_PATTERN)
  if (issueMatch) {
    const [, owner, repo, type, number] = issueMatch
    return {
      kind: 'issue',
      owner,
      repo,
      type: type as GitHubIssueReference['type'],
      number: Number(number),
    }
  }

  const repoMatch = url.match(REPO_PATTERN)
  if (repoMatch) {
    const [, owner, repo] = repoMatch
    if (RESERVED_SEGMENTS.has(owner.toLowerCase())) return null
    return { kind: 'repo', owner, repo }
  }

  return null
}
