// client/components/Feedback.tsx

import React from 'react'
import { Paper, Typography } from '@mui/material'

type FeedbackProps = {
  message: string
  isAIThinking?: boolean
}

const Feedback = ({ message, isAIThinking = false }: FeedbackProps) => {
  return (
    <Paper
      elevation={12}
      sx={{
        textAlign: 'center',
        my: 2,
        mt: 3,
        width: '100%',
        maxWidth: 600,
        padding: '10px',
        margin: '10px auto',
        border: '1px solid black',
      }}
    >
      <Typography variant="h6">
        {message} {isAIThinking && <span>🤖 Thinking...</span>}
      </Typography>
    </Paper>
  )
}

export default Feedback
