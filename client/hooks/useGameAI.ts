// client/hooks/useGame.ts
import { useState, useEffect } from 'react'
import { Player, GameState, MoveLog } from '../types'
import { useBoardState } from './useBoardState'
import { useTokens } from './useTokens'
import { useGameAI } from './useGameAI'
import {
  hasPlayableTokens,
  checkWinCondition,
  checkStalemate,
} from '../utils/game'

const useGame = () => {
  const { boardState, handlePlaceToken } = useBoardState()
  const { redTokens, blackTokens, resetTokensAvailability, handleTokenClick } =
    useTokens()

  const { isAIEnabled, setIsAIEnabled, aiPlayer, humanPlayer, isAIThinking } =
    useGameAI({
      boardState,
      redTokens,
      blackTokens,
      handleTokenClick,
      handlePlaceToken,
      switchPlayer,
    })

  const [currentPlayer, setCurrentPlayer] = useState<Player>('red') // Ensure Red always starts
  const [gameState, setGameState] = useState<GameState>('START')
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Game Start!')
  const [moveLog, setMoveLog] = useState<MoveLog[]>([])

  // Switch between players
  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'red' ? 'black' : 'red'))
  }

  // Ensure game initializes with Red
  useEffect(() => {
    setCurrentPlayer('red')
  }, [])

  useEffect(() => {
    switch (gameState) {
      case 'START':
        setFeedbackMessage('Game Start! Player Red, select your token')
        setGameState('SELECT_TOKEN')
        break
      case 'SELECT_TOKEN':
        if (
          !hasPlayableTokens(
            boardState,
            currentPlayer === 'red' ? redTokens : blackTokens,
          )
        ) {
          const nextPlayer = currentPlayer === 'red' ? 'black' : 'red'
          if (
            !hasPlayableTokens(
              boardState,
              nextPlayer === 'red' ? redTokens : blackTokens,
            )
          ) {
            setFeedbackMessage('Stalemate! No valid moves for either player.')
            setGameState('END')
          } else {
            setFeedbackMessage(
              `Player ${currentPlayer} has no valid moves. Skipping turn.`,
            )
            setGameState('SWITCH_PLAYER')
          }
        } else {
          setFeedbackMessage(`Player ${currentPlayer}, select your token.`)
        }
        break
      case 'CHECK_WIN':
        const isWin = checkWinCondition(boardState, currentPlayer)
        const isStalemate = checkStalemate(boardState, redTokens, blackTokens)
        if (isWin) {
          setFeedbackMessage(
            `Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
          )
          setGameState('END')
        } else if (isStalemate) {
          setFeedbackMessage('Stalemate! No more valid moves.')
          setGameState('STALEMATE')
        } else {
          setFeedbackMessage('No winner yet, switching player...')
          setGameState('SWITCH_PLAYER')
        }
        break
      case 'SWITCH_PLAYER':
        switchPlayer()
        resetTokensAvailability(
          currentPlayer === 'red' ? redTokens : blackTokens,
        )
        setGameState('SELECT_TOKEN')
        break
      case 'END':
        setFeedbackMessage(
          `Game Over. Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
        )
        break
      case 'STALEMATE':
        setFeedbackMessage('Stalemate! No valid moves.')
        break
      default:
        break
    }
  }, [gameState, currentPlayer, boardState, redTokens, blackTokens])

  return {
    currentPlayer,
    feedbackMessage,
    moveLog,
    redTokens,
    blackTokens,
    boardState,
    handleTokenClick,
    handlePlaceToken,
    setIsAIEnabled,
    isAIThinking,
    aiPlayer,
    humanPlayer,
  }
}

export default useGame
