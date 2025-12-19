import styled from '@emotion/styled'

type Props = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export function Slider({ min, max, value, onChange }: Props) {
  return (
    <Container>
      <StyledSlider
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 0.5rem;
`

const StyledSlider = styled.input`
  width: 100%;
  height: 6px;
  appearance: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.muted};
  border-radius: 3px;

  &::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    appearance: none;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
  }
`
