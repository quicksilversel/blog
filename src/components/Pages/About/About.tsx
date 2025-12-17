import styled from '@emotion/styled'

import { AboutMe } from './Sections/AboutMe'
import { Experience } from './Sections/Experience/Experience'
import { Skills } from './Sections/Skills'

export const About = () => {
  return (
    <Container>
      <Content>
        <AboutMe />
        <Experience />
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
  padding: 4rem 0;

  @media (width <= 1024px) {
    padding: 2rem 1rem;
    margin-left: 0;
  }
`
