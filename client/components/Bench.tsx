// client/components/Bench.tsx

import React from 'react'
import { Box, Grid, Paper, useTheme } from '@mui/material'
import Token from './Token'
import { Token as TokenType } from '../types'

type BenchProps = {
  tokens: TokenType[]
  onTokenClick: (token: TokenType) => void
  isAIThinking: boolean
}

const Bench = ({ tokens, onTokenClick, isAIThinking }: BenchProps) => {
  const theme = useTheme()
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        my: 2,
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
            width: tokens.length === 6 ? 'fit-content' : '80%',
            minWidth: { xs: '280px', sm: '420px' }, // Adjusted for smaller screens
          }}
        >
          {tokens.map(
            (token, index) =>
              !token.played && (
                <Grid
                  item
                  key={token.id} // Use unique id as key
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flex: '1 1 auto',
                  }}
                >
                  <Token
                    number={token.number}
                    color={token.color}
                    onClick={() => {
                      if (!isAIThinking) {
                        console.log(
                          `Bench Token Clicked: Number ${token.number}, Color ${token.color}`,
                        )
                        onTokenClick(token)
                      } else {
                        console.log(
                          'Bench Token Click attempted during AI thinking. Ignored.',
                        )
                      }
                    }} // Disable click if AI is thinking
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
