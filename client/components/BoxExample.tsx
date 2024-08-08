import React from 'react'
import { Box } from '@mui/material'

const BoxExample = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default BoxExample
