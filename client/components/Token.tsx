import { Paper, Typography } from '@mui/material'

type TokenProps = {
  number: number
  color: 'red' | 'black'
  onClick: () => void
}

const Token = ({ number, color, onClick }: TokenProps) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        height: '80px',
        width: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color === 'red' ? '#f44336' : '#0a1520',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: '2px solid #fff',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Typography variant="h4" component="span">
        {number}
      </Typography>
    </Paper>
  )
}

export default Token
