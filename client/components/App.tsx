import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Board from './Board.tsx'
import Feedback from './Feedback.tsx'
import Bench from './Bench.tsx'
import History from './History.tsx'

export type Player = 'red' | 'black'

export type Token = {
  number: number
  color: Player
  played: boolean
  selected: boolean
  available: boolean
}

export type MoveLog = {
  player?: Player
  token?: Token
  position?: [number, number]
  replacedToken?: { token: Token; replacedBy: Player }
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
  const [moveLog, setMoveLog] = useState<MoveLog[]>([])
  const [redTokens, setRedTokens] = useState<Token[]>([
    {
      number: 1,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 2,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 3,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 4,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 5,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 6,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const [blackTokens, setBlackTokens] = useState<Token[]>([
    {
      number: 1,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 2,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 3,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 4,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 5,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      number: 6,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const [boardState, setBoardState] = useState<(Token | null)[][]>(
    Array(3).fill(Array(3).fill(null)),
  )

  useEffect(() => {
    switch (gameState) {
      case 'START':
        setFeedbackMessage('Game Start! Player Red, select your token')
        setGameState('SELECT_TOKEN')
        break

      case 'SELECT_TOKEN':
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, select your token.`,
        )
        break

      case 'SELECT_TILE':
        setFeedbackMessage(
          `Player ${currentPlayer === 'red' ? 'Red' : 'Black'}, place your token.`,
        )
        break

      case 'PLACE_TOKEN':
        setGameState('CHECK_WIN')
        break

      case 'CHECK_WIN': {
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
        resetTokensAvailability() // Reset available tokens for the next player
        setGameState('SELECT_TOKEN')
        break

      case 'END':
        setFeedbackMessage(
          `Game Over. Player ${currentPlayer === 'red' ? 'Red' : 'Black'} wins!`,
        )
        break

      default:
        break
    }
  }, [gameState, currentPlayer])

  const resetTokensAvailability = () => {
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
    if (token.played || !token.available) return // Do nothing if the token is played or unavailable

    if (
      selectedToken &&
      selectedToken.number === token.number &&
      selectedToken.color === token.color
    ) {
      // Deselect the current token and reset availability
      console.log(`Deselecting token: ${token.number}`)
      setSelectedToken(null)
      resetTokensAvailability()
    } else {
      console.log(`Selecting token: ${token.number}`)
      setSelectedToken(token)
      const updateTokens = (tokens: Token[]) =>
        tokens.map((t) => ({
          ...t,
          selected: t === token,
          available: t === token, // Only the selected token remains available
        }))

      if (currentPlayer === 'red') {
        setRedTokens(updateTokens(redTokens))
      } else {
        setBlackTokens(updateTokens(blackTokens))
      }

      setGameState('SELECT_TILE')
    }
  }

  const handlePlaceToken = (row: number, col: number) => {
    if (gameState !== 'SELECT_TILE' || !selectedToken) return

    const currentCell = boardState[row][col]
    let replacedToken: { token: Token; replacedBy: Player } | undefined

    if (currentCell !== null && selectedToken.number > currentCell.number) {
      replacedToken = {
        token: { ...currentCell },
        replacedBy: currentPlayer,
      }
    }

    if (currentCell === null || selectedToken.number > currentCell.number) {
      const updatedBoard = boardState.map((r, rIndex) =>
        r.map((c, cIndex) => {
          if (rIndex === row && cIndex === col) {
            return { ...selectedToken, played: true }
          }
          return c
        }),
      )

      setBoardState(updatedBoard)

      const updateTokens = (tokens: Token[]) =>
        tokens.map((t) =>
          t.number === selectedToken.number && t.color === selectedToken.color
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
        token: { ...selectedToken },
        position: [row, col],
        replacedToken: replacedToken,
      }

      setMoveLog((prevLog) => [...prevLog, newMove])

      setSelectedToken(null)
      setGameState('CHECK_WIN')

      console.log('Move Log:', [...moveLog, newMove])
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
        <Bench
          tokens={currentPlayer === 'red' ? redTokens : blackTokens}
          onTokenClick={handleTokenClick}
        />
        <Feedback message={feedbackMessage} />
        <History moveLog={moveLog} currentPlayer={currentPlayer} />
        <Footer />
      </Box>
    </React.Fragment>
  )
}

export default App
