import styled from '@emotion/styled'
import { Mail } from 'lucide-react'

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
        I love a good writing collaboration, especially the kind where I put a
        tool through a real project and write up honestly how it went. Email is
        the fastest way to reach me.
      </Invitation>
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
  margin: 0 0 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.mutedText};
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
