// client/hooks/useBoardState.ts
import { useState } from 'react'
import { Token } from '../types'
import { cloneBoard } from '../utils/game'

export const useBoardState = () => {
  const [boardState, setBoardState] = useState<(Token | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  )

  const handlePlaceToken = (row: number, col: number, token: Token) => {
    const currentCell = boardState[row][col]
    if (currentCell === null || token.number > currentCell.number) {
      const updatedBoard = cloneBoard(boardState)
      updatedBoard[row][col] = { ...token, played: true }
      setBoardState(updatedBoard)
    }
  }

  return {
    boardState,
    handlePlaceToken,
  }
}
