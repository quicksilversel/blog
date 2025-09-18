import React from 'react'

import styled from '@emotion/styled'

import { AboutMe } from './Sections/AboutMe'
import { Experience } from './Sections/Experience/Experience'
import { FeaturedProjects } from './Sections/FeaturedProjects'
import { Skills } from './Sections/Skills'

export const About = () => {
  return (
    <Container>
      <Content>
        <AboutMe />
        <Experience />
        <FeaturedProjects />
        <Skills />
      </Content>
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  display: flex;
  min-height: calc(100vh - 68px);
  margin: 0 auto;
`

const Content = styled.div`
  flex: 1;
  padding: 4rem 2rem;
  margin-left: 200px;

  @media (width <= 1024px) {
    padding: 2rem 1rem;
    margin-left: 0;
  }
`
