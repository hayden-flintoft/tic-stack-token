// client/hooks/useGame.ts

import { useState, useEffect } from 'react'
import { Player, Token, GameState, MoveLog, Move } from '../types'
import {
  checkWinCondition,
  checkStalemate,
  cloneBoard,
  hasPlayableTokens,
} from '../utils/game'
import { findBestMove } from '../utils/ai'

const useGame = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>('red')
  const [gameState, setGameState] = useState<GameState>('START')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Game Start!')
  const [moveLog, setMoveLog] = useState<MoveLog[]>([])
  const [redTokens, setRedTokens] = useState<Token[]>([
    {
      id: 'red-1',
      number: 1,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-2',
      number: 2,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-3',
      number: 3,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-4',
      number: 4,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-5',
      number: 5,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-6',
      number: 6,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const [blackTokens, setBlackTokens] = useState<Token[]>([
    {
      id: 'black-1',
      number: 1,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-2',
      number: 2,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-3',
      number: 3,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-4',
      number: 4,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-5',
      number: 5,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-6',
      number: 6,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const [boardState, setBoardState] = useState<(Token | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  )

  const [isAIEnabled, setIsAIEnabled] = useState<boolean>(false) // To toggle AI
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false)
  const [aiPlayer, setAIPlayer] = useState<Player>('black') // Default AI as black
  const [humanPlayer, setHumanPlayer] = useState<Player>('red')

  const [pendingAIMove, setPendingAIMove] = useState<Move | null>(null) // New state

  console.log('Initializing useGame Hook...')
  console.log(
    `AI Enabled: ${isAIEnabled}, AI Player: ${aiPlayer}, Human Player: ${humanPlayer}`,
  )

  useEffect(() => {
    console.log(
      `Game State Changed: ${gameState}, Current Player: ${currentPlayer}`,
    )

    switch (gameState) {
      case 'START':
        console.log('Initializing Game...')
        setFeedbackMessage('Game Start! Player Red, select your token')
        setGameState('SELECT_TOKEN')
        break

      case 'SELECT_TOKEN':
        console.log(`Player ${currentPlayer} needs to select a token.`)
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
            console.log('Stalemate detected.')
            setFeedbackMessage('Stalemate! No valid moves for either player.')
            setGameState('END')
          } else {
            console.log(
              `Player ${currentPlayer} has no valid moves. Skipping turn.`,
            )
            setFeedbackMessage(
              `Player ${currentPlayer === 'red' ? 'Red' : 'Black'} has no valid moves. Skipping turn.`,
            )
            setGameState('SWITCH_PLAYER')
          }
        } else {
          setFeedbackMessage(
            `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, select your token.`,
          )
        }
        break

      case 'SELECT_TILE':
        console.log(
          `Player ${currentPlayer} needs to select a tile to place the token.`,
        )
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, place your token.`,
        )
        break

      case 'PLACE_TOKEN':
        console.log('Placing Token...')
        setGameState('CHECK_WIN')
        break

      case 'CHECK_WIN': {
        console.log('Checking for win or stalemate...')
        const isWin = checkWinCondition(boardState, currentPlayer)
        const isStalemate = checkStalemate(boardState, redTokens, blackTokens)
        if (isWin) {
          console.log(`Player ${currentPlayer} has won the game!`)
          setFeedbackMessage(
            `Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
          )
          setGameState('END')
        } else if (isStalemate) {
          console.log('Stalemate detected after move.')
          setFeedbackMessage('Stalemate! No more valid moves.')
          setGameState('STALEMATE')
        } else {
          console.log('No win or stalemate. Switching player.')
          setFeedbackMessage('No winner yet, switching player...')
          setGameState('SWITCH_PLAYER')
        }
        break
      }

      case 'SWITCH_PLAYER':
        const nextPlayer = currentPlayer === 'red' ? 'black' : 'red'
        console.log(`Switching turn to ${nextPlayer}.`)
        setCurrentPlayer(nextPlayer)
        resetTokensAvailability() // Reset available tokens for the next player
        setGameState('SELECT_TOKEN')
        break

      case 'END':
        console.log('Game Ended.')
        setFeedbackMessage(
          `Game Over. Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
        )
        break

      case 'STALEMATE':
        console.log('Game ended in a stalemate.')
        setFeedbackMessage('Stalemate! No valid moves.')
        break

      default:
        console.log('Unhandled game state.')
        break
    }
  }, [gameState, currentPlayer, boardState, redTokens, blackTokens])

  useEffect(() => {
    console.log(
      `isAIEnabled: ${isAIEnabled}, currentPlayer: ${currentPlayer}, aiPlayer: ${aiPlayer}, gameState: ${gameState}`,
    )
    if (
      isAIEnabled &&
      currentPlayer === aiPlayer &&
      gameState === 'SELECT_TOKEN'
    ) {
      console.log('AI is about to make a move.')
      setIsAIThinking(true)
      const timer = setTimeout(() => {
        makeAIMove()
      }, 1000) // Simulate AI thinking time

      return () => clearTimeout(timer)
    }
  }, [isAIEnabled, currentPlayer, aiPlayer, gameState])

  useEffect(() => {
    if (
      pendingAIMove &&
      selectedToken &&
      selectedToken.id === pendingAIMove.token.id &&
      isAIThinking
    ) {
      // AI has selected the token, now place it
      console.log(
        `AI is placing token ${pendingAIMove.token.id} at [${pendingAIMove.position[0]}, ${pendingAIMove.position[1]}]`,
      )
      handlePlaceToken(
        pendingAIMove.position[0],
        pendingAIMove.position[1],
        pendingAIMove.token, // Pass the token directly
      )
      setPendingAIMove(null)
      setIsAIThinking(false)
    }
  }, [selectedToken, pendingAIMove, isAIThinking])

  const resetTokensAvailability = () => {
    console.log(`Resetting token availability for player ${currentPlayer}.`)
    const updateTokens = (tokens: Token[]) =>
      tokens.map((t) =>
        !t.played ? { ...t, available: true, selected: false } : t,
      )

    if (currentPlayer === 'red') {
      setRedTokens(updateTokens(redTokens))
    } else {
      setBlackTokens(updateTokens(blackTokens))
    }
  }

  const handleTokenClick = (token: Token) => {
    console.log(`Token Clicked: Number ${token.number}, Color ${token.color}`)

    if (token.played || !token.available) {
      console.log('Clicked token is either already played or unavailable.')
      return // Do nothing if the token is played or unavailable
    }

    if (selectedToken && selectedToken.id === token.id) {
      // Deselect the current token and reset availability
      console.log(
        `Deselecting token: Number ${token.number}, Color ${token.color}`,
      )
      setSelectedToken(null)
      resetTokensAvailability()
    } else {
      console.log(
        `Selecting token: Number ${token.number}, Color ${token.color}`,
      )
      setSelectedToken(token)
      const updateTokens = (tokens: Token[]) =>
        tokens.map((t) => ({
          ...t,
          selected: t.id === token.id, // Correct comparison using unique ID
          available: t.id === token.id, // Correct comparison using unique ID
        }))

      if (currentPlayer === 'red') {
        setRedTokens(updateTokens(redTokens))
      } else {
        setBlackTokens(updateTokens(blackTokens))
      }

      setGameState('SELECT_TILE')
    }
  }

  const handlePlaceToken = (row: number, col: number, token?: Token) => {
    console.log(`Attempting to place token at Row ${row}, Column ${col}`)

    const tokenToPlace = token || selectedToken

    if (gameState !== 'SELECT_TILE' || !tokenToPlace) {
      console.log(
        'Cannot place token: Incorrect game state or no token selected.',
      )
      return
    }

    const currentCell = boardState[row][col]
    let replacedToken: { token: Token; replacedBy: Player } | undefined

    if (currentCell !== null && tokenToPlace.number > currentCell.number) {
      replacedToken = {
        token: { ...currentCell },
        replacedBy: currentPlayer,
      }
      console.log(
        `Replacing token ${currentCell.id} (Number ${currentCell.number}) with token ${tokenToPlace.id} (Number ${tokenToPlace.number})`,
      )
    }

    if (
      currentCell === null ||
      (currentCell && tokenToPlace.number > currentCell.number)
    ) {
      const updatedBoard = cloneBoard(boardState)
      updatedBoard[row][col] = { ...tokenToPlace, played: true }

      setBoardState(updatedBoard)
      console.log(
        `Token placed: ${tokenToPlace.id} (Number ${tokenToPlace.number}), Color ${tokenToPlace.color} at [${row}, ${col}]`,
      )

      const updateTokens = (tokens: Token[]) =>
        tokens.map((t) =>
          t.id === tokenToPlace.id
            ? { ...t, played: true, selected: false, available: false }
            : t,
        )

      if (currentPlayer === 'red') {
        setRedTokens(updateTokens(redTokens))
      } else {
        setBlackTokens(updateTokens(blackTokens))
      }

      const newMove: MoveLog = {
        player: currentPlayer,
        token: { ...tokenToPlace },
        position: [row, col],
        replacedToken: replacedToken,
      }

      setMoveLog((prevLog) => [...prevLog, newMove])
      console.log('Move Log Updated:', newMove)

      setSelectedToken(null)
      setGameState('CHECK_WIN')
    } else {
      console.log(
        'Cannot place token: Position occupied by a higher or equal token.',
      )
    }
  }

  const makeAIMove = () => {
    console.log('AI is making a move...')
    const aiTokens = aiPlayer === 'red' ? redTokens : blackTokens
    const humanTokensList = humanPlayer === 'red' ? redTokens : blackTokens

    // Find the best move
    const bestMove: Move | null = findBestMove(
      boardState,
      aiTokens,
      humanTokensList,
      aiPlayer,
      humanPlayer,
    )

    console.log('AI Best Move Calculated:', bestMove) // Debugging line

    if (bestMove) {
      // Step 1: Select the token
      console.log(
        `AI is selecting token ${bestMove.token.id} (Number ${bestMove.token.number}), Color ${bestMove.token.color}`,
      )
      handleTokenClick(bestMove.token)

      // Store the pending AI move
      setPendingAIMove(bestMove)
    } else {
      // AI has no valid moves, switch player
      console.log('AI has no valid moves. Skipping turn.')
      setFeedbackMessage('AI has no valid moves. Skipping turn.')
      setIsAIThinking(false)
      setGameState('SWITCH_PLAYER')
    }
  }

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
    isAIEnabled,
    isAIThinking,
    aiPlayer,
    setAIPlayer,
    humanPlayer,
    setHumanPlayer,
  }
}

export default useGame
