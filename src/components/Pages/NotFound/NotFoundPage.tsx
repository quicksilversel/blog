'use client'

import Link from 'next/link'

import { StatusMessage } from '@/components/UI/StatusMessage'

export const NotFoundPage = () => {
  return (
    <StatusMessage
      image="/cat-thinking.png"
      title="404"
      message="This page moved, or it never existed. Either way, the cat has no idea where it went."
    >
      <Link href="/">Go home</Link>
      <Link href="/articles">Browse articles</Link>
    </StatusMessage>
  )
}
