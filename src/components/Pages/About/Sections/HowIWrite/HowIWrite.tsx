import styled from '@emotion/styled'

import { Section } from '../../UI/Section'

export const HowIWrite = () => {
  return (
    <Section id="how-i-write" title="How I write these">
      <Paragraph>
        Everything here describes things I actually did. The sessions, the bugs,
        the numbers, and the screenshots are mine.
      </Paragraph>
      <Paragraph>
        Some posts are working notes, written mainly so I would not forget how
        something worked. I use AI to help draft those from my own notes and
        session logs. I write the longer posts and evaluations myself, taking
        the time to work through what happened and what I think about it.
      </Paragraph>
      <Paragraph>
        I review every post before publishing. If I&rsquo;ve gotten something
        wrong, I&rsquo;d like to hear about it.
      </Paragraph>
    </Section>
  )
}

const Paragraph = styled.p`
  margin: 0 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.mutedText};

  &:last-of-type {
    margin-bottom: 0;
  }
`
