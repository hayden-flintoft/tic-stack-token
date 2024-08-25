import { Box, Typography } from '@mui/material'

type FeedbackProps = {
  message: string
}

const Feedback = ({ message }: FeedbackProps) => {
  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  )
}

export default Feedback
