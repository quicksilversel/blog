'use client'

import styled from '@emotion/styled'
import { Codepen, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Container>
      <Links>
        <Link
          href="https://github.com/quicksilversel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github />
        </Link>
        <Link
          href="https://www.linkedin.com/in/sueun-lee"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin />
        </Link>
        <Link
          href="https://codepen.io/quicksilversel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CodePen"
        >
          <Codepen />
        </Link>
      </Links>
      <Copyright>© 2024-present Zoe</Copyright>
    </Container>
  )
}
const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 0;
  margin: 0 auto;
  text-align: center;
`

const Links = styled.div`
  display: flex;
  gap: 16px;
  margin: 4px auto 0;
  font-size: ${({ theme }) => theme.fontSize.small};

  a:hover {
    color: inherit;
    opacity: 0.6;
  }
`

const Copyright = styled.span`
  margin-top: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`
