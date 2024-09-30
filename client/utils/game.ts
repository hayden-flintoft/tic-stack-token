// client/utils/game.ts

import { Token, Player, Move } from '../types'

/**
 * Clones the board state.
 */
export const cloneBoard = (board: (Token | null)[][]): (Token | null)[][] =>
  board.map((row) => row.map((cell) => (cell ? { ...cell } : null)))

/**
 * Generates all possible moves for a player.
 */
export const generateAllPossibleMoves = (
  boardState: (Token | null)[][],
  playerTokens: Token[],
): Move[] => {
  const moves: Move[] = []

  playerTokens.forEach((token) => {
    if (token.played) return

    boardState.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === null || (cell && token.number > cell.number)) {
          moves.push({
            token,
            position: [rowIndex, colIndex],
          })
        }
      })
    })
  })

  console.log(
    `Generated ${moves.length} possible moves for player ${playerTokens[0]?.color}:`,
    moves,
  )
  return moves
}

/**
 * Checks if the specified player has won.
 */
export const checkWinCondition = (
  boardState: (Token | null)[][],
  player: Player,
): boolean => {
  const winPatterns = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ]

  return winPatterns.some((pattern) =>
    pattern.every(
      ([r, c]) =>
        boardState[r][c] !== null && boardState[r][c]!.color === player,
    ),
  )
}

/**
 * Checks if the specified player has any playable tokens.
 */
export const hasPlayableTokens = (
  boardState: (Token | null)[][],
  playerTokens: Token[],
): boolean => {
  const hasTokensLeft = playerTokens.some((token) => !token.played)
  if (!hasTokensLeft) return false

  return playerTokens.some((token) => {
    if (token.played) return false
    return boardState.some((row) =>
      row.some((cell) => cell === null || (cell && token.number > cell.number)),
    )
  })
}

/**
 * Checks if the game is in a stalemate.
 */
export const checkStalemate = (
  boardState: (Token | null)[][],
  redTokens: Token[],
  blackTokens: Token[],
): boolean => {
  const canRedMove = hasPlayableTokens(boardState, redTokens)
  const canBlackMove = hasPlayableTokens(boardState, blackTokens)
  const allTokensPlayed =
    redTokens.every((t) => t.played) && blackTokens.every((t) => t.played)
  return (!canRedMove && !canBlackMove) || allTokensPlayed
}
