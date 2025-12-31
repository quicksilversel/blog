import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

import { OGImage } from '@/components/OG'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)

  const title = searchParams.get('title') ?? 'Zoe.log()'
  const date = searchParams.get('date')
  const topicsParam = searchParams.get('topics')
  const topics = topicsParam ? topicsParam.split(',').slice(0, 3) : []

  const iconUrl = `${origin}/icon.png`

  return new ImageResponse(
    <OGImage title={title} date={date} topics={topics} iconUrl={iconUrl} />,
    {
      width: 1200,
      height: 630,
    },
  )
}
