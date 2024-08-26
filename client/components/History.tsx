import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import { Player, MoveLog } from './App'

type HistoryProps = {
  moveLog: MoveLog[]
  currentPlayer: Player
}

const History: React.FC<HistoryProps> = ({ moveLog, currentPlayer }) => {
  const totalTurns = 12 // Ensures the table always shows 12 turns
  const displayedMoves = [...moveLog]

  // Fill in empty rows to ensure the table has exactly 12 rows
  while (displayedMoves.length < totalTurns) {
    displayedMoves.push({
      player: undefined,
      token: undefined,
      position: undefined,
    })
  }

  return (
    <TableContainer
      component={Paper}
      elevation={12}
      sx={{
        mt: 3,
        maxWidth: 500,
        margin: '0 auto',
        border: '1px solid black',
      }}
    >
      <Typography variant="h6">History</Typography>
      <Table size="small" aria-label="Move History">
        <TableHead>
          <TableRow>
            <TableCell align="center">Turn</TableCell>
            <TableCell align="center">Red</TableCell>
            <TableCell align="center">Black</TableCell>
            <TableCell align="center">To Tile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedMoves.map((move, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor:
                  index === moveLog.length
                    ? currentPlayer === 'red'
                      ? 'rgba(255, 0, 0, 0.2)' // Light red for red's turn
                      : 'rgba(0, 0, 0, 0.2)' // Light grey for black's turn
                    : 'inherit',
              }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">
                {move.player === 'red' ? (
                  move.replacedToken &&
                  move.replacedToken.replacedBy === 'black' ? (
                    <span
                      style={{ textDecoration: 'line-through', color: 'black' }}
                    >
                      {move.token?.number ?? ''}
                    </span>
                  ) : (
                    (move.token?.number ?? '')
                  )
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell align="center">
                {move.player === 'black' ? (
                  move.replacedToken &&
                  move.replacedToken.replacedBy === 'red' ? (
                    <span
                      style={{ textDecoration: 'line-through', color: 'red' }}
                    >
                      {move.token?.number ?? ''}
                    </span>
                  ) : (
                    (move.token?.number ?? '')
                  )
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell align="center">
                {move.position
                  ? `(${move.position[0] + 1}, ${move.position[1] + 1})`
                  : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default History
