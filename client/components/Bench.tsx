import { Box, Grid, Paper, useTheme } from '@mui/material'
import Token from './Token.tsx'
import { Token as TokenType } from './App.tsx'

type BenchProps = {
  tokens: TokenType[]
  onTokenClick: (token: TokenType) => void
}

const Bench = ({ tokens, onTokenClick }: BenchProps) => {
  const theme = useTheme()
  return (
    <Paper
      elevation={4}
      sx={{
        // width: theme.customSizes.componentWidth,
        width: 600,
        maxWidth: '100%',
        mx: 'auto',
        my: 2,
        mt: 3,
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: 'inset 0px 3px 8px rgba(0, 0, 0, 0.4)',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'center',
            width: tokens.length === 6 ? 'fit-content' : '80%', // Ensure the bench remains consistent
            minWidth: '420px', // Adjust this to match the required width of the bench
          }}
        >
          {tokens.map(
            (token, index) =>
              !token.played && (
                <Grid
                  item
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flex: '1 1 auto',
                  }}
                >
                  <Token
                    number={token.number}
                    color={token.color}
                    onClick={() => onTokenClick(token)}
                    available={token.available}
                    selected={token.selected}
                  />
                </Grid>
              ),
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default Bench
