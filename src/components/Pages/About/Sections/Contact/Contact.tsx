import styled from '@emotion/styled'
import { Mail } from 'lucide-react'
import Link from 'next/link'

import { CONTACT_EMAIL } from '@/utils/constants'

import { Section } from '../../UI/Section'

const PROFILES = [
  { label: 'GitHub', href: 'https://github.com/quicksilversel' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sueun-lee' },
  { label: 'Zenn', href: 'https://zenn.dev/quicksilversel' },
  { label: 'Qiita', href: 'https://qiita.com/quicksilversel' },
  { label: 'CodePen', href: 'https://codepen.io/quicksilversel' },
]

export const Contact = () => {
  return (
    <Section id="contact" title="Say hi">
      <Invitation>
        I&rsquo;m open to writing collaborations where I can try a tool on a
        real project and write about the experience. I write the articles myself
        and include the rough parts as well as what worked. Email is the best
        way to reach me.
      </Invitation>
      <ExampleLink href="/articles/fullstack/claude-code-migrates-recipe-app-to-prisma">
        A recent one: I Let Claude Code Migrate My Recipe App to Prisma &rarr;
      </ExampleLink>
      <EmailLink href={`mailto:${CONTACT_EMAIL}`}>
        <Mail size={16} aria-hidden />
        {CONTACT_EMAIL}
      </EmailLink>
      <Profiles>
        {PROFILES.map(({ label, href }) => (
          <Profile
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </Profile>
        ))}
      </Profiles>
    </Section>
  )
}

const Invitation = styled.p`
  margin: 0 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.mutedText};
`

const ExampleLink = styled(Link)`
  display: block;
  width: fit-content;
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

const EmailLink = styled.a`
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.7rem 1.1rem;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.floating};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`

const Profiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.5rem;
`

const Profile = styled.a`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
  text-underline-offset: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`
