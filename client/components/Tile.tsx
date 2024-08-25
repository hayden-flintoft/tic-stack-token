import { Paper } from '@mui/material'
import React from 'react'

type TileProps = {
  value: string
  children?: React.ReactNode
}

const Tile = ({ children }: TileProps) => {
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
          backgroundColor: 'secondary.main',
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
