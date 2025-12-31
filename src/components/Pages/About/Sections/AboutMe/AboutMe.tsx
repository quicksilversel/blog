import styled from '@emotion/styled'

import { Section } from '../../UI/Section'

export const AboutMe = () => {
  return (
    <Section id="about">
      <Section.Number>01</Section.Number>
      <Section.Content>
        <Section.Title>About Me</Section.Title>
        <Section.Paragraph>
          Hi! I’m Zoe — a frontend engineer with a strong SRE background,
          passionate about building fast, reliable, and thoughtfully designed
          web experiences.
          <br />
          <br />
          I work with React and Next.js to craft clean, user-friendly
          interfaces, while drawing on my experience with AWS, Kubernetes, and
          Terraform to make sure systems scale smoothly.
          <br />
          <br />I enjoy blending design and engineering, from performance tuning
          on the frontend to building tools that improve reliability behind the
          scenes.
        </Section.Paragraph>
        <ContactGrid>
          <ContactLink href="mailto:quicksilversel@gmail.com">
            Email: quicksilversel@gmail.com
          </ContactLink>
          <ContactLink
            href="https://github.com/quicksilversel"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub: @quicksilversel
          </ContactLink>
          <ContactLink
            href="https://www.linkedin.com/in/sueun-lee"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn: /in/sueun-lee
          </ContactLink>
          <ContactLink
            href="https://zenn.dev/quicksilversel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zenn: @quicksilversel
          </ContactLink>

          <ContactLink
            href="https://qiita.com/quicksilversel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qiita: @quicksilversel
          </ContactLink>
        </ContactGrid>
      </Section.Content>
    </Section>
  )
}

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`

const ContactLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
