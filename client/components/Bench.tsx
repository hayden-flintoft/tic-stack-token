import { Box, Grid } from '@mui/material'
// import Tile from './Tile.tsx'
import Token from './Token.tsx'
import { Token as TokenType } from './App.tsx'

type BenchProps = {
  tokens: TokenType[]
  onTokenClick: (token: TokenType) => void
}

const Bench = ({ tokens, onTokenClick }: BenchProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ display: 'flex', justifyContent: 'center', width: 'fit-content' }}
      >
        {tokens.map(
          (token, index) =>
            !token.played && (
              <Grid
                item
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
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
  )
}

export default Bench
