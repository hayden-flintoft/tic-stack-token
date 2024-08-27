import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    playerOne: Palette['primary']
    playerTwo: Palette['primary']
  }

  interface PaletteOptions {
    playerOne?: PaletteOptions['primary']
    playerTwo?: PaletteOptions['primary']
  }

  interface Theme {
    customSizes: {
      componentWidth: number
    }
  }
  interface ThemeOptions {
    customSizes?: {
      componentWidth?: number
    }
  }
}
