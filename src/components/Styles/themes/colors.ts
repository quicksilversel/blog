const commonTheme = {
  primary: 'hsl(320deg 100% 40%)',
  secondary: 'hsl(230deg, 100%, 69%)',
  syntaxBackground: 'hsl(210deg, 30%, 12%)',
}

export const darkTheme = {
  ...commonTheme,
  background: 'hsl(210deg, 30%, 8%)',
  text: 'hsl(0deg, 0%, 100%)',
  muted: 'hsl(210deg, 38%, 15%)',
  floating: 'hsl(210deg, 22%, 15%)',
  backgroundhsl: '210deg, 30%, 8%',
  colors: {
    ...commonTheme,
    background: 'hsl(210deg, 30%, 8%)',
    text: 'hsl(0deg, 0%, 100%)',
    muted: 'hsl(210deg, 38%, 15%)',
    floating: 'hsl(210deg, 22%, 15%)',
    backgroundhsl: '210deg, 30%, 8%',
  }
}

export const lightTheme = {
  ...commonTheme,
  background: 'hsl(0deg, 0%, 100%)',
  text: 'hsl(222deg, 22%, 5%)',
  muted: 'hsl(210deg, 55%, 92%)',
  floating: 'hsl(0deg, 0%, 95%)',
  backgroundhsl: '0deg, 0%, 100%',
  colors: {
    ...commonTheme,
    background: 'hsl(0deg, 0%, 100%)',
    text: 'hsl(222deg, 22%, 5%)',
    muted: 'hsl(210deg, 55%, 92%)',
    floating: 'hsl(0deg, 0%, 95%)',
    backgroundhsl: '0deg, 0%, 100%',
  }
}
