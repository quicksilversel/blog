import styled from '@emotion/styled'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'

export const About = () => {
  return (
    <Container>
      <StyledImage src="/icon.jpg" alt="Zoe" />
      <Information>
        <Name>Zoe</Name>
        <Description>Frontend Developer</Description>
        <Links>
          <Link
            href="https://github.com/quicksilversel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </Link>
          <Link
            href="https://codepen.io/quicksilversel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codepen
          </Link>
        </Links>
      </Information>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;

  @media (max-width: 35.1875rem) {
    gap: 16px;
    padding: 16px;
  }
`

const StyledImage = styled.img`
  width: 10rem;
  aspect-ratio: 1/1;
  border-radius: 100%;

  @media (max-width: 35.1875rem) {
    width: 8rem;
  }
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  margin-top: 4px;
  gap: 16px;
  font-size: var(--font-size-small);

  a:hover {
    color: inherit;
    opacity: 0.6;
  }
`
