import { createTheme, ThemeOptions } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#6573c3',
      main: '#3f51b5',
      dark: '#2c387e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5f52',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#000',
    },
    playerOne: {
      // Red
      light: '#ff5f52',
      main: '#A0100C',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    playerTwo: {
      // Black
      light: '#424242',
      main: '#000000',
      dark: '#000000',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336', // Red
    },
    warning: {
      main: '#ffa726', // Orange
    },
    info: {
      main: '#2196f3', // Light Blue
    },
    success: {
      main: '#4caf50', // Green
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      // color: '#d32f2f',
    },
    body1: {
      fontSize: '1rem',
    },
  },
} as ThemeOptions)

export default theme
