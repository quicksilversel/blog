import styled from '@emotion/styled'
import { Github, Linkedin, Codepen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Box } from '@/components/UI/Box'

export const Hero = () => {
  return (
    <Box>
      <ImageContainer>
        <StyledImage src="/hero.png" alt="Zoe" fill loading="eager" priority />
      </ImageContainer>
      <Information>
        <Wrapper>
          <Name>Zoe</Name>
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
        </Wrapper>
        <Description>
          Frontend engineer with SRE experience. Learning in public, debugging
          in private.
        </Description>
        <AboutLink href="/about">About me →</AboutLink>
      </Information>
    </Box>
  )
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 836/557;
  margin-bottom: 2rem;
`

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;

  @media (width <= 35.1875rem) {
    margin-top: 24px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Name = styled.h2`
  font-size: var(--font-size-large);
  font-weight: bold;
`

const Description = styled.p`
  font-size: var(--font-size-small);
`

const Links = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
  font-size: var(--font-size-small);

  a:hover {
    color: inherit;
    opacity: 0.6;
  }
`

const AboutLink = styled(Link)`
  margin-top: 16px;
  font-size: var(--font-size-small);
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
