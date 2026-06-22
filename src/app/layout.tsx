import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist } from 'next/font/google'

import type { Metadata } from 'next'

import { Providers } from '@/components/Providers/Providers'
import { Footer } from '@/components/UI/Footer'
import { Header } from '@/components/UI/Header'
import { GoogleAnalytics } from '@/services/GoogleAnalytics'
import { GlobalStyles } from '@/styles'

const geist = Geist({
  subsets: ['latin'],
})

const SITE_URL = 'https://zoelog.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zoe.log()',
    template: '%s | Zoe.log()',
  },
  description:
    'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Zoe.log()',
    title: 'Zoe.log()',
    description:
      'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoe.log()',
    description:
      'A space to document thoughts, technical musings, and creative ideas for future reference by Zoe.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <Providers>
          <GlobalStyles />
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
