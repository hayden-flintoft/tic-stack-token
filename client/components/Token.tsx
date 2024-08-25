import { Paper, Typography } from '@mui/material'

type TokenProps = {
  number: number
  color: 'red' | 'black'
  onClick: () => void
  available: boolean
  selected: boolean
}

const Token = ({ number, color, onClick, available, selected }: TokenProps) => {
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
        backgroundColor: selected
          ? color === 'red'
            ? '#d32f2f' // Darker red when selected
            : '#0a1520' // Darker black when selected
          : color === 'red'
            ? '#f44336'
            : '#0a1520',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: selected ? '3px solid yellow' : '2px solid #fff',
        cursor: available ? 'pointer' : 'not-allowed',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: available ? 'scale(1.1)' : 'none',
        },
        opacity: available ? 1 : 0.5, // Dull appearance when unavailable
      }}
    >
      <Typography variant="h4" component="span">
        {number}
      </Typography>
    </Paper>
  )
}

export default Token
