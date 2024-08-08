import React from 'react'
import { Box, Grid } from '@mui/material'
import Tile from './Tile.tsx'

const Board = () => {
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
        spacing={0}
        sx={{ display: 'flex', justifyContent: 'center', width: 'fit-content' }}
      >
        {Array.from({ length: 3 }).map((_, row) => (
          <Grid
            container
            item
            spacing={0}
            key={row}
            sx={{ justifyContent: 'center' }}
          >
            {Array.from({ length: 3 }).map((_, col) => (
              <Grid
                item
                key={col}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Tile value={`Cell ${row + 1}-${col + 1}`} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Board
