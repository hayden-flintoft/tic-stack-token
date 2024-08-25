import { Box, Grid } from '@mui/material'
import Tile from './Tile.tsx'
import Token from './Token.tsx'
import { Token as TokenType } from './App.tsx'

type BoardProps = {
  boardState: (TokenType | null)[][]
  onPlaceToken: (row: number, col: number) => void
}

// TODO: This is hard to read and harder to write. Needs to be rewritten and refactored.
const Board = ({ boardState, onPlaceToken }: BoardProps) => {
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
        {boardState.map((row, rowIndex) => (
          <Grid
            container
            item
            spacing={1}
            key={rowIndex}
            sx={{ justifyContent: 'center' }}
          >
            {row.map((cell, colIndex) => (
              <Grid
                item
                key={colIndex}
                sx={{ display: 'flex', justifyContent: 'center' }}
                onClick={() => onPlaceToken(rowIndex, colIndex)}
              >
                <Tile value={`Cell ${rowIndex + 1}-${colIndex + 1}`}>
                  {cell && (
                    <Token
                      number={cell.number}
                      color={cell.color}
                      available={cell.available}
                      selected={cell.selected}
                      // No click function required.
                      onClick={() => {}}
                    />
                  )}
                </Tile>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Board
