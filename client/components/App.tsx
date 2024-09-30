// client/components/App.tsx

import React from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import Footer from './Footer'
import Board from './Board'
import Feedback from './Feedback'
import Bench from './Bench'
import History from './History'
import { useTheme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
// import WelcomeModal from './WelcomeModal';
import useGame from '../hooks/useGame'

function App() {
  const theme = useTheme()
  const {
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
  } = useGame()

  return (
    <React.Fragment>
      {/* <WelcomeModal /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          color: 'primary.contrastText',
          paddingTop: '0',
          marginTop: '0',
          backgroundColor:
            currentPlayer === 'red'
              ? alpha(theme.palette.playerOne.main, 0.9)
              : alpha(theme.palette.playerTwo.main, 0.9),
          transition: 'background-color 0.5s ease',
        }}
      >
        <Header
          isAIEnabled={isAIEnabled}
          setIsAIEnabled={setIsAIEnabled}
          aiPlayer={aiPlayer}
          setAIPlayer={setAIPlayer}
          humanPlayer={humanPlayer}
          setHumanPlayer={setHumanPlayer}
        />

        <Board
          boardState={boardState}
          onPlaceToken={handlePlaceToken}
          currentPlayer={currentPlayer}
        />
        <Bench
          tokens={currentPlayer === 'red' ? redTokens : blackTokens}
          onTokenClick={handleTokenClick}
          isAIThinking={isAIThinking} // Pass isAIThinking prop
        />
        <Feedback message={feedbackMessage} isAIThinking={isAIThinking} />
        {/* <History moveLog={moveLog} currentPlayer={currentPlayer} /> */}
        <Footer />
      </Box>
    </React.Fragment>
  )
}

export default App
