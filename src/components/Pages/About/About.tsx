import React from 'react'

import styled from '@emotion/styled'

import { AboutMe } from './Sections/AboutMe'
import { Experience } from './Sections/Experience/Experience'
import { FeaturedProjects } from './Sections/FeaturedProjects'
import { Skills } from './Sections/Skills'

const sections = [
  { id: 'about', label: 'About', icon: '01' },
  { id: 'experience', label: 'Experience', icon: '02' },
  { id: 'projects', label: 'Projects', icon: '03' },
  { id: 'skills', label: 'Skills', icon: '04' },
]

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
  display: flex;
  min-height: calc(100vh - 68px);
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`

const Content = styled.div`
  flex: 1;
  margin-left: 200px;
  padding: 4rem 2rem;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 2rem 1rem;
  }
`
