// client/utils/ai.ts

import { Token, Player, Move } from '../types'
import {
  cloneBoard,
  generateAllPossibleMoves,
  checkWinCondition,
  checkStalemate,
} from './game'

/**
 * Evaluates the board state.
 */
const evaluateBoard = (
  boardState: (Token | null)[][],
  aiPlayer: Player,
  humanPlayer: Player,
): number => {
  if (checkWinCondition(boardState, aiPlayer)) return 10
  if (checkWinCondition(boardState, humanPlayer)) return -10

  // Potential lines (rows, columns, diagonals)
  let score = 0

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

  winPatterns.forEach((pattern) => {
    let aiCount = 0
    let humanCount = 0

    pattern.forEach(([r, c]) => {
      const cell = boardState[r][c]
      if (cell?.color === aiPlayer) aiCount++
      else if (cell?.color === humanPlayer) humanCount++
    })

    if (aiCount > 0 && humanCount === 0) {
      score += Math.pow(10, aiCount)
    } else if (humanCount > 0 && aiCount === 0) {
      score -= Math.pow(10, humanCount)
    }
  })

  return score
}

/**
 * Minimax algorithm with alpha-beta pruning.
 */
const minimax = (
  boardState: (Token | null)[][],
  aiTokens: Token[],
  humanTokens: Token[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player,
  alpha: number,
  beta: number,
): number => {
  const score = evaluateBoard(boardState, aiPlayer, humanPlayer)
  if (score === 10 || score === -10) {
    console.log(`Minimax Base Case: score=${score}, depth=${depth}`)
    return score
  }
  if (depth === 0 || checkStalemate(boardState, aiTokens, humanTokens)) {
    console.log(`Minimax Stalemate or Depth 0: score=0, depth=${depth}`)
    return 0
  }

  if (isMaximizing) {
    let maxEval = -Infinity
    const moves = generateAllPossibleMoves(boardState, aiTokens)
    console.log(
      `Minimax (Maximizing): Depth ${depth}, AI Player ${aiPlayer}, Possible Moves:`,
      moves.map((move) => move.token.id),
    )
    for (const move of moves) {
      const newBoard = cloneBoard(boardState)
      newBoard[move.position[0]][move.position[1]] = {
        ...move.token,
        color: aiPlayer,
        played: true,
      }
      const updatedAITokens = aiTokens.map((t) =>
        t.id === move.token.id ? { ...t, played: true } : t,
      )
      const evalScore = minimax(
        newBoard,
        updatedAITokens,
        humanTokens,
        depth - 1,
        false,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
      )
      console.log(
        `Minimax (Maximizing): Evaluated Move ${move.token.id} at [${move.position}], Score: ${evalScore}`,
      )
      maxEval = Math.max(maxEval, evalScore)
      alpha = Math.max(alpha, evalScore)
      if (beta <= alpha) {
        console.log('Minimax (Maximizing): Pruning...')
        break
      }
    }
    return maxEval
  } else {
    let minEval = Infinity
    const moves = generateAllPossibleMoves(boardState, humanTokens)
    console.log(
      `Minimax (Minimizing): Depth ${depth}, Human Player ${humanPlayer}, Possible Moves:`,
      moves.map((move) => move.token.id),
    )
    for (const move of moves) {
      const newBoard = cloneBoard(boardState)
      newBoard[move.position[0]][move.position[1]] = {
        ...move.token,
        color: humanPlayer,
        played: true,
      }
      const updatedHumanTokens = humanTokens.map((t) =>
        t.id === move.token.id ? { ...t, played: true } : t,
      )
      const evalScore = minimax(
        newBoard,
        aiTokens,
        updatedHumanTokens,
        depth - 1,
        true,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
      )
      console.log(
        `Minimax (Minimizing): Evaluated Move ${move.token.id} at [${move.position}], Score: ${evalScore}`,
      )
      minEval = Math.min(minEval, evalScore)
      beta = Math.min(beta, evalScore)
      if (beta <= alpha) {
        console.log('Minimax (Minimizing): Pruning...')
        break
      }
    }
    return minEval
  }
}

/**
 * Finds the best move for the AI.
 */
export const findBestMove = (
  boardState: (Token | null)[][],
  aiTokens: Token[],
  humanTokens: Token[],
  aiPlayer: Player,
  humanPlayer: Player,
): Move | null => {
  let bestScore = -Infinity
  let bestMove: Move | null = null

  const moves = generateAllPossibleMoves(boardState, aiTokens)

  console.log(
    'AI Possible Moves:',
    moves.map((move) => move.token.id),
  ) // Debugging line

  for (const move of moves) {
    const newBoard = cloneBoard(boardState)
    newBoard[move.position[0]][move.position[1]] = {
      ...move.token,
      color: aiPlayer,
      played: true,
    }

    const updatedAITokens = aiTokens.map((t) =>
      t.id === move.token.id ? { ...t, played: true } : t,
    )

    const score = minimax(
      newBoard,
      updatedAITokens,
      humanTokens,
      4, // Depth can be adjusted for difficulty
      false,
      aiPlayer,
      humanPlayer,
      -Infinity,
      Infinity,
    )

    console.log(
      `Move: ${move.token.id} (Number ${move.token.number}) at [${move.position}], Score: ${score}`,
    ) // Debugging line

    if (score > bestScore) {
      bestScore = score
      bestMove = move
      console.log(
        `New Best Move Found: ${move.token.id} (Number ${move.token.number}) at [${move.position}], Score: ${score}`,
      )
    }
  }

  console.log('AI Selected Move:', bestMove) // Debugging line

  return bestMove
}
