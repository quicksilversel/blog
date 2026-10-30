import styled from '@emotion/styled'
import Image from 'next/image'

const JOURNEY = ['Born in Korea', 'Raised in the States', 'Living in Japan']

export const Intro = () => {
  return (
    <Container>
      <Header>
        <Avatar src="/cat.png" alt="" width={112} height={112} priority />
        <Headline>
          <Greeting>Hi, I&rsquo;m Zoe</Greeting>
          <Lead>
            I&rsquo;m Sueun, but everyone calls me Zoe. I&rsquo;m a developer in
            Japan, working on the tools and workflows other engineers build
            with.
          </Lead>
        </Headline>
      </Header>
      <Journey>
        {JOURNEY.map((step, index) => (
          <Step key={step}>
            {index > 0 && <Arrow aria-hidden>→</Arrow>}
            {step}
          </Step>
        ))}
      </Journey>
      <Paragraph>
        I started out writing frontend code and picked up SRE work along the
        way. The overlap turned out to be my favorite part: a slow page, a noisy
        alert, and a deploy nobody trusts are usually the same problem wearing
        different clothes.
      </Paragraph>
      <Paragraph>
        This blog is where I think out loud about that work: Next.js on one end,
        Python and cloud plumbing on the other, CI pipelines holding the two
        together, and the occasional bug that took three days and one line to
        fix.
      </Paragraph>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Header = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (width <= 35.1875rem) {
    gap: 1rem;
    align-items: flex-start;
  }
`

const Avatar = styled(Image)`
  flex-shrink: 0;
  object-fit: contain;

  @media (width <= 35.1875rem) {
    width: 72px;
    height: 72px;
  }
`

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Greeting = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  font-weight: bold;
  line-height: 1.2;
`

const Lead = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.7;
`

const Journey = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  color: ${({ theme }) => theme.colors.mutedText};
`

const Step = styled.span`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
`

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const Paragraph = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.mutedText};
`
