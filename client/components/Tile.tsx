import { Paper } from '@mui/material'
import React from 'react'
import { alpha, useTheme } from '@mui/material/styles'

type TileProps = {
  value: string
  children?: React.ReactNode
  currentPlayer: 'red' | 'black'
}

const Tile = ({ children, currentPlayer }: TileProps) => {
  const theme = useTheme()
  return (
    <Paper
      elevation={12}
      sx={{
        height: '100px',
        width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
          backgroundColor:
            currentPlayer === 'red'
              ? alpha(theme.palette.playerOne.main, 0.5)
              : alpha(theme.palette.playerTwo.main, 0.5),
          color: 'white',
          transform: 'scale(1.05)',
        },
      }}
    >
      {children}
    </Paper>
  )
}

export default Tile
