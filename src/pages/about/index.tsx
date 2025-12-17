import Head from 'next/head'

import { About } from '@/components/Pages/About'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Zoe.log()</title>
        <meta
          name="description"
          content="Learn more about me, my experience, projects, and skills"
        />
        <meta property="og:title" content="About - Zoe.log()" />
        <meta
          property="og:description"
          content="Learn more about me, my experience, projects, and skills"
        />
      </Head>
      <About />
    </>
  )
}
