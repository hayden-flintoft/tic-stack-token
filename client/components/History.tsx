// client/components/History.tsx

import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { MoveLog, Player } from '../types'

type HistoryProps = {
  moveLog: MoveLog[]
  currentPlayer: Player
}

const History = ({ moveLog, currentPlayer }: HistoryProps) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: 600,
        maxWidth: '100%',
        mx: 'auto',
        my: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Move History
      </Typography>
      {moveLog.length === 0 ? (
        <Typography variant="body2">No moves yet.</Typography>
      ) : (
        <Box
          component="ol"
          sx={{
            paddingLeft: '1.5rem',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {moveLog.map((move, index) => (
            <Typography component="li" variant="body2" key={index}>
              {move.player} placed token {move.token?.id} (Number{' '}
              {move.token?.number}) at{' '}
              {move.position
                ? `[${move.position[0] + 1}, ${move.position[1] + 1}]`
                : ''}
              {move.replacedToken
                ? `, replacing token ${move.replacedToken.token.id} (Number ${move.replacedToken.token.number}) with ${move.replacedToken.replacedBy}`
                : ''}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  )
}

export default History
