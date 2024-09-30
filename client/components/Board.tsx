// client/components/Board.tsx

import { Box, Grid } from '@mui/material'
import Tile from './Tile'
import TokenComponent from './Token'
import { Token, Player } from '../types'

type BoardProps = {
  boardState: (Token | null)[][]
  onPlaceToken: (row: number, col: number) => void
  currentPlayer: Player
}

const Board = ({ boardState, onPlaceToken, currentPlayer }: BoardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 300,
        }} // Adjusted for smaller screens
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
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: { xs: 80, sm: 100 }, // Responsive tile size
                  height: { xs: 80, sm: 100 },
                }}
                onClick={() => {
                  console.log(
                    `Tile Clicked at Row ${rowIndex}, Column ${colIndex}`,
                  )
                  onPlaceToken(rowIndex, colIndex)
                }}
              >
                <Tile currentPlayer={currentPlayer}>
                  {cell && (
                    <TokenComponent
                      number={cell.number}
                      color={cell.color}
                      available={cell.available}
                      selected={cell.selected}
                      onClick={() => {
                        console.log(
                          `Token Clicked on Board: Number ${cell.number}, Color ${cell.color}`,
                        )
                        // Handle token click if needed
                      }}
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
