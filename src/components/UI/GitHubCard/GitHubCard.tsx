'use client'

import { Fragment, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import {
  Archive,
  BookMarked,
  CircleCheck,
  CircleDot,
  CircleSlash,
  GitFork,
  GitMerge,
  GitPullRequestArrow,
  GitPullRequestClosed,
  GitPullRequestDraft,
  MessageSquare,
  Star,
} from 'lucide-react'

import type {
  GitHubIssueReference,
  GitHubReference,
  GitHubRepoReference,
} from '@/libs/utils'

import { formatDate } from '@/libs/utils'

type GitHubIssue = {
  title: string
  state: 'open' | 'closed'
  state_reason?: 'completed' | 'not_planned' | 'reopened' | null
  draft?: boolean
  pull_request?: { merged_at: string | null }
  user: { login: string } | null
  comments: number
  created_at: string
}

type GitHubRepo = {
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  archived: boolean
  fork: boolean
}

type Props = {
  url: string
  reference: GitHubReference
  fallback: ReactNode
}

type Status = {
  label: string
  tone: 'open' | 'done' | 'closed' | 'muted'
  Icon: typeof CircleDot
}

type CardProps<T extends GitHubReference> = Omit<Props, 'reference'> & {
  reference: T
}

type MetaEntry = {
  key: string
  node: ReactNode
}

const getIssueStatus = (issue: GitHubIssue): Status => {
  if (issue.pull_request) {
    if (issue.pull_request.merged_at)
      return { label: 'Merged', tone: 'done', Icon: GitMerge }
    if (issue.state === 'closed')
      return { label: 'Closed', tone: 'closed', Icon: GitPullRequestClosed }
    if (issue.draft)
      return { label: 'Draft', tone: 'muted', Icon: GitPullRequestDraft }
    return { label: 'Open', tone: 'open', Icon: GitPullRequestArrow }
  }
  if (issue.state === 'closed') {
    if (issue.state_reason === 'not_planned')
      return { label: 'Closed', tone: 'muted', Icon: CircleSlash }
    return { label: 'Closed', tone: 'done', Icon: CircleCheck }
  }
  return { label: 'Open', tone: 'open', Icon: CircleDot }
}

const getRepoStatus = (repo: GitHubRepo): Status => {
  if (repo.archived) return { label: 'Archived', tone: 'muted', Icon: Archive }
  if (repo.fork) return { label: 'Fork', tone: 'muted', Icon: GitFork }
  return { label: 'Repository', tone: 'muted', Icon: BookMarked }
}

const formatCount = (count: number): string =>
  count >= 1000
    ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`
    : `${count}`

const resourceCache = new Map<string, Promise<unknown>>()

const fetchResource = <T,>(apiUrl: string): Promise<T> => {
  const cached = resourceCache.get(apiUrl)
  if (cached) return cached as Promise<T>

  const request = fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github+json' },
  }).then((response) => {
    if (!response.ok) {
      resourceCache.delete(apiUrl)
      throw new Error(`GitHub API responded with ${response.status}`)
    }
    return response.json() as Promise<T>
  })

  resourceCache.set(apiUrl, request)
  return request
}

const useGitHubResource = <T,>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    fetchResource<T>(apiUrl)
      .then((resource) => {
        if (active) setData(resource)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [apiUrl])

  return { data, failed }
}

export const GitHubCard = ({ url, reference, fallback }: Props) =>
  reference.kind === 'repo' ? (
    <RepoCard url={url} reference={reference} fallback={fallback} />
  ) : (
    <IssueCard url={url} reference={reference} fallback={fallback} />
  )

const IssueCard = ({
  url,
  reference,
  fallback,
}: CardProps<GitHubIssueReference>) => {
  const { data: issue, failed } = useGitHubResource<GitHubIssue>(
    `https://api.github.com/repos/${reference.owner}/${reference.repo}/issues/${reference.number}`,
  )

  if (failed) return <>{fallback}</>

  const context = `${reference.owner}/${reference.repo} #${reference.number}`

  if (!issue) return <CardSkeleton url={url} context={context} />

  const status = getIssueStatus(issue)
  const meta: MetaEntry[] = [
    {
      key: 'status',
      node: <StatusLabel tone={status.tone}>{status.label}</StatusLabel>,
    },
    ...(issue.user ? [{ key: 'user', node: `by ${issue.user.login}` }] : []),
    { key: 'created', node: formatDate(issue.created_at) },
    ...(issue.comments > 0
      ? [
          {
            key: 'comments',
            node: (
              <MetaCount>
                <MessageSquare size={13} aria-hidden />
                {formatCount(issue.comments)}
              </MetaCount>
            ),
          },
        ]
      : []),
  ]

  return (
    <CardLink href={url} target="_blank" rel="noopener noreferrer">
      <Context>{context}</Context>
      <TitleRow>
        <StatusIcon tone={status.tone}>
          <status.Icon size={18} aria-label={status.label} />
        </StatusIcon>
        <Title>{issue.title}</Title>
      </TitleRow>
      <MetaList entries={meta} />
    </CardLink>
  )
}

const RepoCard = ({
  url,
  reference,
  fallback,
}: CardProps<GitHubRepoReference>) => {
  const { data: repo, failed } = useGitHubResource<GitHubRepo>(
    `https://api.github.com/repos/${reference.owner}/${reference.repo}`,
  )

  if (failed) return <>{fallback}</>

  if (!repo) return <CardSkeleton url={url} context={reference.owner} />

  const status = getRepoStatus(repo)
  const meta: MetaEntry[] = [
    ...(repo.archived || repo.fork
      ? [
          {
            key: 'status',
            node: <StatusLabel tone={status.tone}>{status.label}</StatusLabel>,
          },
        ]
      : []),
    ...(repo.language ? [{ key: 'language', node: repo.language }] : []),
    ...(repo.stargazers_count > 0
      ? [
          {
            key: 'stars',
            node: (
              <MetaCount>
                <Star size={13} aria-hidden />
                {formatCount(repo.stargazers_count)}
              </MetaCount>
            ),
          },
        ]
      : []),
    ...(repo.forks_count > 0
      ? [
          {
            key: 'forks',
            node: (
              <MetaCount>
                <GitFork size={13} aria-hidden />
                {formatCount(repo.forks_count)}
              </MetaCount>
            ),
          },
        ]
      : []),
  ]

  return (
    <CardLink href={url} target="_blank" rel="noopener noreferrer">
      <Context>{reference.owner}</Context>
      <TitleRow>
        <StatusIcon tone={status.tone}>
          <status.Icon size={18} aria-label={status.label} />
        </StatusIcon>
        <Title>{reference.repo}</Title>
      </TitleRow>
      {repo.description && <Description>{repo.description}</Description>}
      <MetaList entries={meta} />
    </CardLink>
  )
}

const CardSkeleton = ({ url, context }: { url: string; context: string }) => (
  <CardLink href={url} target="_blank" rel="noopener noreferrer">
    <Context>{context}</Context>
    <SkeletonTitle aria-hidden />
  </CardLink>
)

const MetaList = ({ entries }: { entries: MetaEntry[] }) => {
  if (entries.length === 0) return null

  return (
    <Meta>
      {entries.map((entry, index) => (
        <Fragment key={entry.key}>
          {index > 0 && <Separator aria-hidden>·</Separator>}
          {entry.node}
        </Fragment>
      ))}
    </Meta>
  )
}

const toneColors = {
  open: 'hsl(137deg, 55%, 55%)',
  done: 'hsl(261deg, 70%, 72%)',
  closed: 'hsl(356deg, 75%, 65%)',
  muted: '',
} as const

const CardLink = styled.a`
  display: block;
  padding: 16px;
  margin-block: 1rem;
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Context = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const TitleRow = styled.span`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-top: 8px;
`

const StatusIcon = styled.span<{ tone: keyof typeof toneColors }>`
  display: inline-flex;
  flex-shrink: 0;
  margin-top: 2px;
  color: ${({ theme, tone }) => toneColors[tone] || theme.colors.mutedText};
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`

const Description = styled.span`
  display: block;
  margin-top: 6px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.mutedText};
`

const Meta = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.mutedText};
`

const StatusLabel = styled.span<{ tone: keyof typeof toneColors }>`
  font-weight: bold;
  color: ${({ theme, tone }) => toneColors[tone] || theme.colors.mutedText};
`

const MetaCount = styled.span`
  display: inline-flex;
  gap: 4px;
  align-items: center;
`

const SkeletonTitle = styled.span`
  display: block;
  width: 60%;
  height: 1rem;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
`
