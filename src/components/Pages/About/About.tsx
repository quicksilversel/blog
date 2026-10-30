'use client'

import styled from '@emotion/styled'

import type { TopicSummary } from '@/libs/getTopics'

import { Contact } from './Sections/Contact'
import { Experience } from './Sections/Experience'
import { Intro } from './Sections/Intro'
import { Writing } from './Sections/Writing'

type Props = {
  topics: TopicSummary[]
}

export const About = ({ topics }: Props) => {
  return (
    <Container>
      <Intro />
      <Experience />
      <Writing topics={topics} />
      <Contact />
    </Container>
  )
}

const Container = styled.main`
  max-width: 720px;
  padding: 3rem 0 4rem;
  margin: 0 auto;

  @media (width <= 768px) {
    padding: 2rem 1rem 3rem;
  }
`
