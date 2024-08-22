import { Paper } from '@mui/material'

const Tile = ({ value }: { value: string }) => {
  return (
    <Paper
      elevation={12}
      sx={{
        height: '100px',
        width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
          backgroundColor: 'secondary.main',
          color: 'white',
          transform: 'scale(1.05)',
        },
      }}
    >
      {value}
    </Paper>
  )
}

export default Tile
