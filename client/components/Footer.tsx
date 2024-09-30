// client/components/Footer.tsx

import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        position: 'relative',
        textAlign: 'center',
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Hayden's Personal Project. All rights
        reserved.
      </Typography>
    </Box>
  )
}

export default Footer
