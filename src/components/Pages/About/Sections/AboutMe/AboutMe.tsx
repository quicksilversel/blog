import styled from '@emotion/styled'

import { Section } from '../../UI/Section'

export const AboutMe = () => {
  return (
    <Section id="about">
      <Section.Number>01</Section.Number>
      <Section.Content>
        <Section.Title>About Me</Section.Title>
        <Section.Paragraph>
          Hi! I’m Zoe — a Site Reliability Engineer with a frontend background,
          passionate about building systems that are not only reliable but also
          thoughtfully designed. I love bridging the gap between infrastructure
          and user experience.
          <br />
          <br />
          By day, I focus on cloud architecture (AWS, Kubernetes, Terraform),
          observability (Datadog, Splunk), and automation — making sure
          platforms scale smoothly and stay resilient. By night, I’m a frontend
          developer at heart, building with React and Next.js for personal
          projects like my blog.
          <br />
          <br />
          I enjoy designing infrastructures that scale, debugging tricky
          production issues, and just as much, crafting clean interfaces and
          delightful user experiences. For me, SRE and frontend aren’t separate
          worlds — they complement each other, and I’m most excited about
          opportunities where I can do both.
          <br />
          <br />
          Outside of work, you’ll often find me experimenting with new tech,
          writing about SRE practices, or designing my blog’s branding — always
          chasing that sweet spot between creativity and efficiency.
          <br />
          <br />
          I’m always open to new opportunities and collaborations where
          infrastructure meets user experience. Whether you have a question, a
          project idea, or just want to say hi, feel free to reach out!
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
  font-size: var(--font-size-normal);
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
