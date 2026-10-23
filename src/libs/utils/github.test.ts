import { describe, expect, it } from 'vitest'

import { parseGitHubReference } from './github'

describe('parseGitHubReference', () => {
  it('parses an issue url', () => {
    expect(
      parseGitHubReference('https://github.com/vercel/next.js/issues/12345'),
    ).toEqual({
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
      owner: 'facebook',
      repo: 'react',
      type: 'pull',
      number: 42,
    })
  })

  it('allows a trailing slash', () => {
    expect(
      parseGitHubReference('https://github.com/facebook/react/pull/42/'),
    ).not.toBeNull()
  })

  it('rejects non-github and non-issue urls', () => {
    expect(parseGitHubReference('https://example.com/a/b/issues/1')).toBeNull()
    expect(parseGitHubReference('https://github.com/vercel/next.js')).toBeNull()
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
