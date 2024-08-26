import React from 'react'
import { Paper, Typography, useTheme } from '@mui/material'

type TokenProps = {
  number: number
  color: 'red' | 'black'
  onClick: () => void
  available: boolean
  selected: boolean
}

const Token = ({ number, color, onClick, available, selected }: TokenProps) => {
  const theme = useTheme()

  return (
    <Paper
      // elevation={20}
      onClick={onClick}
      sx={{
        height: '80px',
        width: '80px',
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
        fontSize: '1.5rem',
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
          // background: `linear-gradient(145deg, ${theme.palette.playerOne.dark}, ${theme.palette.playerOne.dark})`,

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
