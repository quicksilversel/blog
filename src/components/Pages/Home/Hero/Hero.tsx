import styled from '@emotion/styled'
import { Github, Linkedin } from 'lucide-react'
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
              <CodePenIcon
                fill="currentColor"
                className="w-5 h-5"
                viewBox="18 20 82 78"
                role="img"
              >
                <title>Codepen icon</title>
                <path d="M97.071,48.281c-0.007-0.047-0.019-0.092-0.026-0.139c-0.016-0.09-0.032-0.18-0.056-0.267 c-0.014-0.053-0.033-0.104-0.05-0.154c-0.025-0.078-0.051-0.156-0.082-0.232c-0.021-0.053-0.047-0.105-0.071-0.156 c-0.033-0.072-0.068-0.142-0.108-0.21c-0.029-0.051-0.061-0.1-0.091-0.148c-0.043-0.066-0.087-0.131-0.135-0.193 c-0.035-0.047-0.072-0.093-0.109-0.138c-0.051-0.059-0.104-0.117-0.159-0.172c-0.042-0.043-0.083-0.086-0.127-0.125 c-0.059-0.053-0.119-0.104-0.18-0.152c-0.048-0.037-0.095-0.074-0.145-0.109c-0.019-0.012-0.035-0.027-0.053-0.039L61.769,23.438 c-1.071-0.714-2.466-0.714-3.537,0L24.321,46.045c-0.018,0.012-0.034,0.027-0.053,0.039c-0.05,0.035-0.097,0.072-0.144,0.109 c-0.062,0.049-0.123,0.1-0.181,0.152c-0.045,0.039-0.086,0.082-0.128,0.125c-0.055,0.055-0.108,0.113-0.158,0.172 c-0.038,0.045-0.075,0.091-0.11,0.138c-0.047,0.062-0.092,0.127-0.134,0.193c-0.032,0.049-0.062,0.098-0.092,0.148 c-0.039,0.068-0.074,0.139-0.108,0.21c-0.024,0.051-0.049,0.104-0.071,0.156c-0.031,0.076-0.057,0.154-0.082,0.232 c-0.017,0.051-0.035,0.102-0.05,0.154c-0.023,0.087-0.039,0.177-0.056,0.267c-0.008,0.047-0.02,0.092-0.025,0.139 c-0.019,0.137-0.029,0.275-0.029,0.416v22.607c0,0.141,0.011,0.279,0.029,0.418c0.006,0.045,0.018,0.092,0.025,0.137 c0.017,0.09,0.032,0.18,0.056,0.268c0.015,0.053,0.033,0.104,0.05,0.154c0.025,0.078,0.051,0.155,0.082,0.233 c0.021,0.053,0.047,0.104,0.071,0.154c0.034,0.072,0.069,0.143,0.108,0.213c0.029,0.049,0.06,0.098,0.092,0.146 c0.042,0.066,0.087,0.131,0.134,0.193c0.035,0.049,0.072,0.094,0.11,0.139c0.05,0.059,0.103,0.117,0.158,0.172 c0.042,0.043,0.083,0.086,0.128,0.124c0.058,0.053,0.118,0.104,0.181,0.152c0.047,0.037,0.094,0.074,0.144,0.109 c0.019,0.012,0.035,0.027,0.053,0.039l33.911,22.607c0.536,0.357,1.152,0.537,1.769,0.537c0.616,0,1.233-0.18,1.768-0.537 L95.68,73.956c0.018-0.012,0.034-0.027,0.053-0.039c0.05-0.035,0.097-0.072,0.145-0.109c0.061-0.049,0.121-0.1,0.18-0.152 c0.044-0.038,0.085-0.081,0.127-0.124c0.056-0.055,0.108-0.113,0.159-0.172c0.037-0.045,0.074-0.09,0.109-0.139 c0.048-0.062,0.092-0.127,0.135-0.193c0.03-0.049,0.062-0.098,0.091-0.146c0.04-0.07,0.075-0.141,0.108-0.213 c0.024-0.051,0.05-0.102,0.071-0.154c0.031-0.078,0.057-0.155,0.082-0.233c0.017-0.051,0.036-0.102,0.05-0.154 c0.023-0.088,0.04-0.178,0.056-0.268c0.008-0.045,0.02-0.092,0.026-0.137c0.018-0.139,0.028-0.277,0.028-0.418V48.697 C97.1,48.557,97.089,48.418,97.071,48.281z M63.188,32.048L88.17,48.701l-11.158,7.465l-13.823-9.247V32.048z M56.812,32.048 v14.871l-13.822,9.247l-11.159-7.465L56.812,32.048z M29.278,54.665L37.255,60l-7.977,5.335V54.665z M56.812,87.953L31.831,71.3 l11.159-7.463l13.822,9.245V87.953z M60,67.543L48.723,60L60,52.458L71.276,60L60,67.543z M63.188,87.953V73.082l13.823-9.245 L88.17,71.3L63.188,87.953z M90.723,65.336L82.746,60l7.977-5.335V65.336z" />
              </CodePenIcon>
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

const CodePenIcon = styled.svg`
  width: 25px;
  height: 25px;
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
