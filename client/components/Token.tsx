// client/components/Token.tsx

import React from 'react'
import { Paper, Typography, useTheme } from '@mui/material'
import { Token as TokenType, Player } from '../types'

type TokenProps = {
  number: number
  color: Player
  onClick: () => void
  available: boolean
  selected: boolean
}

const Token = ({ number, color, onClick, available, selected }: TokenProps) => {
  const theme = useTheme()

  return (
    <Paper
      onClick={onClick}
      sx={{
        height: { xs: '40px', sm: '60px', md: '80px' }, // Responsive heights
        width: { xs: '40px', sm: '60px', md: '80px' }, // Responsive widths
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected
          ? color === 'red'
            ? theme.palette.playerOne.dark
            : theme.palette.playerTwo.dark
          : color === 'red'
            ? theme.palette.playerOne.main
            : theme.palette.playerTwo.main,
        color:
          color === 'red'
            ? theme.palette.playerOne.contrastText
            : theme.palette.playerTwo.contrastText,
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Responsive font sizes
        fontWeight: 'bold',
        cursor: available ? 'pointer' : 'not-allowed',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: available ? 'scale(1.1)' : 'none',
        },
        opacity: available ? 1 : 0.5,
        position: 'relative',
        boxShadow: selected
          ? `inset 0px 3px 8px rgba(0, 0, 0, 0.7), inset 0px -3px 8px rgba(255, 255, 255, 0.3)`
          : `inset 0px 3px 8px rgba(0, 0, 0, 0.4), inset 0px -3px 8px rgba(255, 255, 255, 0.2)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          borderRadius: '50%',
          background: `linear-gradient(145deg, ${
            color === 'red'
              ? theme.palette.playerOne.dark
              : theme.palette.playerTwo.main
          }, ${
            color === 'red'
              ? theme.palette.playerOne.dark
              : theme.palette.playerTwo.main
          })`,
          boxShadow: 'inset 0px 3px 6px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Typography
        variant="h4"
        component="span"
        sx={{
          position: 'relative',
          zIndex: 2,
          textShadow: `1px 1px 2px ${
            color === 'red'
              ? theme.palette.playerOne.dark
              : theme.palette.playerTwo.dark
          }`,
          color:
            color === 'red'
              ? theme.palette.playerOne.contrastText
              : theme.palette.playerTwo.contrastText,
          fontWeight: '700',
        }}
      >
        {number}
      </Typography>
    </Paper>
  )
}

export default Token
