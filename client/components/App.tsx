import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Board from './Board.tsx'
import Feedback from './Feedback.tsx'
import Bench from './Bench.tsx'
// TODO: Split code out into functions with seperation of concerns, DRY and single purpose methods.
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

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>('red')
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

  const handleTokenClick = (token: Token) => {
    // TODO: token logic goes here:

    // If the token is on the board then do nothing
    if (token.isPlayed) return

    // If the token is in the bench:
    // Make the token state selected && unselect any other token.
    const updateTokens = (tokens: Token[]) => {
      // TODO:
      return {}
    }

    if (currentPlayer === 'red') {
      setRedTokens(updateTokens(redTokens))
    } else {
      setblackTokens(updateTokens(blackTokens))
    }

    // Use Conditional (ternary) operator to set player
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red')
  }

  const handlePlaceToken = (row: number, col: number) => {
    // TODO:
    return {}
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
        <Board boardState={boardState} onPlaceToken={handleTokenClick} />
        <Feedback />
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
