'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { StatusMessage } from '@/components/UI/StatusMessage'

type Props = {
  error: Error & { digest?: string }
  retry: () => void
}

export default function Error({ error, retry }: Props) {
  useEffect(() => {
    console.warn('Route error boundary caught an error:', error)
  }, [error])

  return (
    <StatusMessage
      image="/cat-oops.png"
      title="Something broke"
      message="That page failed to render. Trying again sometimes clears it up."
    >
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
      <Link href="/">Go home</Link>
    </StatusMessage>
  )
}
