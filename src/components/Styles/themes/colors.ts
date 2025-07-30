const commonTheme = {
  primary: 'hsl(325deg, 90%, 72%)', // accentPink (neon pink)
  secondary: 'hsl(195deg, 100%, 65%)', // glowCyan (neon blue/cyan)
  accentOrange: 'hsl(30deg, 95%, 60%)',
  accentLavender: 'hsl(270deg, 100%, 85%)',
  skylineBlue: 'hsl(220deg, 80%, 70%)',
  syntaxBackground: 'hsl(225deg, 15%, 12%)',
}

export const darkTheme = {
  ...commonTheme,
  background: 'hsl(230deg, 30%, 8%)', // deepNight
  text: 'hsl(0deg, 0%, 95%)', // off-white
  muted: 'hsl(230deg, 15%, 25%)', // soft dark gray-blue
  floating: 'hsl(230deg, 15%, 15%)',
  backgroundhsl: '230deg, 30%, 8%',
  colors: {
    ...commonTheme,
    background: 'hsl(230deg, 30%, 8%)',
    text: 'hsl(0deg, 0%, 95%)',
    muted: 'hsl(230deg, 15%, 25%)',
    floating: 'hsl(230deg, 15%, 15%)',
    backgroundhsl: '230deg, 30%, 8%',
  },
}

export const lightTheme = {
  ...commonTheme,
  background: 'hsl(0deg, 0%, 100%)',
  text: 'hsl(230deg, 30%, 15%)',
  muted: 'hsl(220deg, 20%, 85%)',
  floating: 'hsl(0deg, 0%, 95%)',
  backgroundhsl: '0deg, 0%, 100%',
  colors: {
    ...commonTheme,
    background: 'hsl(0deg, 0%, 100%)',
    text: 'hsl(230deg, 30%, 15%)',
    muted: 'hsl(220deg, 20%, 85%)',
    floating: 'hsl(0deg, 0%, 95%)',
    backgroundhsl: '0deg, 0%, 100%',
  },
}
