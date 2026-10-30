import { describe, expect, it } from 'vitest'

import { parseGitHubReference } from './github'

describe('parseGitHubReference', () => {
  it('parses an issue url', () => {
    expect(
      parseGitHubReference('https://github.com/vercel/next.js/issues/12345'),
    ).toEqual({
      kind: 'issue',
      owner: 'vercel',
      repo: 'next.js',
      type: 'issues',
      number: 12345,
    })
  })

  it('parses a pull request url', () => {
    expect(
      parseGitHubReference('https://github.com/facebook/react/pull/42'),
    ).toEqual({
      kind: 'issue',
      owner: 'facebook',
      repo: 'react',
      type: 'pull',
      number: 42,
    })
  })

  it('parses a repository url', () => {
    expect(parseGitHubReference('https://github.com/vercel/next.js')).toEqual({
      kind: 'repo',
      owner: 'vercel',
      repo: 'next.js',
    })
  })

  it('allows a trailing slash', () => {
    expect(
      parseGitHubReference('https://github.com/facebook/react/pull/42/'),
    ).not.toBeNull()
    expect(
      parseGitHubReference('https://github.com/facebook/react/'),
    ).not.toBeNull()
  })

  it('rejects github pages that are not repositories', () => {
    expect(parseGitHubReference('https://github.com/vercel')).toBeNull()
    expect(parseGitHubReference('https://github.com/orgs/vercel')).toBeNull()
    expect(
      parseGitHubReference('https://github.com/topics/typescript'),
    ).toBeNull()
  })

  it('rejects non-github and unsupported urls', () => {
    expect(parseGitHubReference('https://example.com/a/b/issues/1')).toBeNull()
    expect(
      parseGitHubReference('https://github.com/vercel/next.js/discussions/1'),
    ).toBeNull()
    expect(
      parseGitHubReference('https://github.com/vercel/next.js/pull/42/files'),
    ).toBeNull()
    expect(
      parseGitHubReference('http://github.com/vercel/next.js/pull/42'),
    ).toBeNull()
  })
})
