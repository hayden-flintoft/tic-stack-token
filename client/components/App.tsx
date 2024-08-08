import React from 'react'
import Box from '@mui/material/Box'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Board from './Board.tsx'
import Feedback from './Feedback.tsx'
import Bench from './Bench.tsx'

function App() {
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
        <Board />
        <Feedback />
        <Bench />
        <Footer />
      </Box>
    </React.Fragment>
  )
}

export default App
