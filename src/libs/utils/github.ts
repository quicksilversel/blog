export type GitHubReference = {
  owner: string
  repo: string
  type: 'issues' | 'pull'
  number: number
}

const GITHUB_REFERENCE_PATTERN =
  /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/(issues|pull)\/(\d+)\/?$/

export function parseGitHubReference(url: string): GitHubReference | null {
  const match = url.match(GITHUB_REFERENCE_PATTERN)
  if (!match) return null

  const [, owner, repo, type, number] = match
  return {
    owner,
    repo,
    type: type as GitHubReference['type'],
    number: Number(number),
  }
}
