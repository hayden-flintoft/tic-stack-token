import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Board from './Board.tsx'
import Feedback from './Feedback.tsx'
import Bench from './Bench.tsx'
// TODO: Split code out into functions with separation of concerns, DRY and single purpose methods.
// TODO: Maybe add a game loop to handle all states.
// TODO: Research when to use functions and when to use arrow functions
// TODO: Implement Database to hold players and game stats.
// TODO: Add routing for player profiles and stats.

type Player = 'red' | 'black'

export type Token = {
  number: number
  color: Player
  isPlayed: boolean
  isSelected: boolean
}

type GameState =
  | 'START'
  | 'SELECT_TOKEN'
  | 'SELECT_TILE'
  | 'PLACE_TOKEN'
  | 'CHECK_WIN'
  | 'SWITCH_PLAYER'
  | 'END'

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>('red')
  const [gameState, setGameState] = useState<GameState>('START')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Game Start!')

  const [redTokens, setRedTokens] = useState<Token[]>([
    { number: 1, color: 'red', isPlayed: false, isSelected: false },
    { number: 2, color: 'red', isPlayed: false, isSelected: false },
    { number: 3, color: 'red', isPlayed: false, isSelected: false },
    { number: 4, color: 'red', isPlayed: false, isSelected: false },
    { number: 5, color: 'red', isPlayed: false, isSelected: false },
    { number: 6, color: 'red', isPlayed: false, isSelected: false },
  ])
  const [blackTokens, setblackTokens] = useState<Token[]>([
    { number: 1, color: 'black', isPlayed: false, isSelected: false },
    { number: 2, color: 'black', isPlayed: false, isSelected: false },
    { number: 3, color: 'black', isPlayed: false, isSelected: false },
    { number: 4, color: 'black', isPlayed: false, isSelected: false },
    { number: 5, color: 'black', isPlayed: false, isSelected: false },
    { number: 6, color: 'black', isPlayed: false, isSelected: false },
  ])
  const [boardState, setBoardState] = useState<(Token | null)[][]>(
    Array(3).fill(Array(3).fill(null)),
  )

  useEffect(() => {
    // TODO: Review feedback messages and remove redundant ones.
    switch (gameState) {
      case 'START':
        setFeedbackMessage('Game Start! Player Red, select your token')
        setGameState('SELECT_TOKEN')
        break

      case 'SELECT_TOKEN':
        // Wait for player to select a token
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, select your token.`,
        )
        break

      case 'SELECT_TILE':
        // Wait for player to select a tile
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, place your token.`, // TODO: Provide verbose info like which token is selected
        )
        break

      case 'PLACE_TOKEN':
        // Place the token on the board
        // Transition to CHECK_WIN
        setFeedbackMessage(`Placing token...`)
        setGameState('CHECK_WIN')
        break

      case 'CHECK_WIN': {
        // Check for win condition
        const isWin = checkWinCondition()
        if (isWin) {
          setFeedbackMessage(
            `Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
          )
          setGameState('END')
        } else {
          setFeedbackMessage(`No winner yet, switching player...`)
          setGameState('SWITCH_PLAYER')
        }
        break
      }
      case 'SWITCH_PLAYER':
        setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red')
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}'s turn.`,
        )
        setGameState('SELECT_TOKEN')
        break

      case 'END':
        // TODO: End of game logic
        setFeedbackMessage(
          `Game Over. Player ${currentPlayer === 'red' ? 'Red' : 'Black'}'wins!.`,
        )
        break

      default:
        break
    }
  }, [gameState, currentPlayer])

  const handleTokenClick = (token: Token) => {
    if (gameState !== 'SELECT_TOKEN' || token.isPlayed) return

    setSelectedToken(token)
    const updateTokens = (tokens: Token[]) => {
      return tokens.map((t) => ({ ...t, isSelected: t === token }))
    }

    if (currentPlayer === 'red') {
      setRedTokens(updateTokens(redTokens))
    } else {
      setblackTokens(updateTokens(blackTokens))
    }

    setGameState('SELECT_TILE')
  }

  const handlePlaceToken = (row: number, col: number) => {
    if (gameState !== 'SELECT_TILE' || !selectedToken) return

    // Check if the selected tile is vacant or occupied by a lower value token
    const currentCell = boardState[row][col]
    if (currentCell === null || selectedToken.number > currentCell.number) {
      const updatedBoard = [...boardState]
      updatedBoard[row][col] = { ...selectedToken, isPlayed: true }
      setBoardState(updatedBoard)

      // Mark the selected token as played
      const updateTokens = (tokens: Token[]) => {
        return tokens.map((t) =>
          t === selectedToken ? { ...t, isPlayed: true } : t,
        )
      }

      if (currentPlayer === 'red') {
        setRedTokens(updateTokens(redTokens))
      } else {
        setblackTokens(updateTokens(blackTokens))
      }

      setGameState('PLACE_TOKEN')
    }
  }

  const checkWinCondition = () => {
    // TODO: Implement win condition logic

    return false // Placeholder
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          color: 'primary.contrastText',
          backgroundColor: 'primary.light',
        }}
      >
        <Header />
        <Board boardState={boardState} onPlaceToken={handlePlaceToken} />
        <Feedback message={feedbackMessage} />
        <Bench
          tokens={currentPlayer === 'red' ? redTokens : blackTokens}
          onTokenClick={handleTokenClick}
        />
        <Footer />
      </Box>
    </React.Fragment>
  )
}

export default App
