import { Paper, Typography } from '@mui/material'

type FeedbackProps = {
  message: string
}

const Feedback = ({ message }: FeedbackProps) => {
  return (
    <Paper
      elevation={12}
      sx={{
        textAlign: 'center',
        my: 2,
        mt: 3,
        width: 500,
        padding: '10px',
        margin: '0 auto',
        border: '1px solid black',
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Paper>
  )
}

export default Feedback
