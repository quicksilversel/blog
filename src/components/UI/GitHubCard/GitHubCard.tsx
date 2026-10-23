'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import styled from '@emotion/styled'
import {
  CircleCheck,
  CircleDot,
  CircleSlash,
  GitMerge,
  GitPullRequestArrow,
  GitPullRequestClosed,
  GitPullRequestDraft,
  MessageSquare,
} from 'lucide-react'

import type { GitHubReference } from '@/libs/utils'

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

const getStatus = (issue: GitHubIssue): Status => {
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

const issueCache = new Map<string, Promise<GitHubIssue>>()

const fetchIssue = (apiUrl: string): Promise<GitHubIssue> => {
  const cached = issueCache.get(apiUrl)
  if (cached) return cached

  const request = fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github+json' },
  }).then((response) => {
    if (!response.ok) {
      issueCache.delete(apiUrl)
      throw new Error(`GitHub API responded with ${response.status}`)
    }
    return response.json() as Promise<GitHubIssue>
  })

  issueCache.set(apiUrl, request)
  return request
}

export const GitHubCard = ({ url, reference, fallback }: Props) => {
  const [issue, setIssue] = useState<GitHubIssue | null>(null)
  const [failed, setFailed] = useState(false)

  const apiUrl = `https://api.github.com/repos/${reference.owner}/${reference.repo}/issues/${reference.number}`

  useEffect(() => {
    let active = true
    fetchIssue(apiUrl)
      .then((data) => {
        if (active) setIssue(data)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [apiUrl])

  if (failed) return <>{fallback}</>

  if (!issue) {
    return (
      <CardLink href={url} target="_blank" rel="noopener noreferrer">
        <Repo>
          {reference.owner}/{reference.repo} #{reference.number}
        </Repo>
        <SkeletonTitle aria-hidden />
      </CardLink>
    )
  }

  const status = getStatus(issue)

  return (
    <CardLink href={url} target="_blank" rel="noopener noreferrer">
      <Repo>
        {reference.owner}/{reference.repo} #{reference.number}
      </Repo>
      <TitleRow>
        <StatusIcon tone={status.tone}>
          <status.Icon size={18} aria-label={status.label} />
        </StatusIcon>
        <Title>{issue.title}</Title>
      </TitleRow>
      <Meta>
        <StatusLabel tone={status.tone}>{status.label}</StatusLabel>
        {issue.user && <MetaItem>by {issue.user.login}</MetaItem>}
        <MetaItem>{formatDate(issue.created_at)}</MetaItem>
        {issue.comments > 0 && (
          <Comments>
            <MessageSquare size={13} aria-hidden />
            {issue.comments}
          </Comments>
        )}
      </Meta>
    </CardLink>
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

const Repo = styled.span`
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

const Meta = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const StatusLabel = styled.span<{ tone: keyof typeof toneColors }>`
  font-weight: bold;
  color: ${({ theme, tone }) => toneColors[tone] || theme.colors.mutedText};
`

const MetaItem = styled.span`
  &::before {
    margin-right: 6px;
    content: '·';
  }
`

const Comments = styled.span`
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
