import styled from '@emotion/styled'
import { Github, Linkedin, Codepen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Box } from '@/components/UI/Box'

export const Hero = () => {
  return (
    <Box>
      <Information>
        <Wrapper>
          <Name>Zoe</Name>
          <Description>
            Frontend engineer with SRE experience. Learning in public, debugging
            in private.
          </Description>
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
          <AboutLink href="/about">About me →</AboutLink>
        </Wrapper>
        <ImageContainer>
          <StyledImage
            src="/cat-neon.png"
            alt="Zoe"
            width={128}
            height={0}
            style={{
              height: 'auto',
            }}
            loading="eager"
            priority
          />
        </ImageContainer>
      </Information>
    </Box>
  )
}

const Information = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 24px;
  align-items: start;

  @media (width <= 35.1875rem) {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    gap: 16px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ImageContainer = styled.div`
  position: relative;
  align-self: center;

  @media (width <= 35.1875rem) {
    order: -1;
    margin-bottom: 8px;
    align-self: flex-start;
  }
`

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`

const Name = styled.h2`
  font-size: var(--font-size-large);
  font-weight: bold;
  margin: 0;
`

const Description = styled.p`
  font-size: var(--font-size-small);
  margin: 0;
`

const Links = styled.div`
  display: flex;
  gap: 16px;
  font-size: var(--font-size-small);

  a:hover {
    color: inherit;
    opacity: 0.6;
  }
`

const AboutLink = styled(Link)`
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
