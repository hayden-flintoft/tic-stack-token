import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const WelcomeModal = () => {
  const [open, setOpen] = useState(true) // Modal opens by default on load

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // Ensures the modal opens on component mount
    setOpen(true)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="welcome-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'background.default', // Use theme background color
          padding: '24px',
          width: '100%',
          maxWidth: '500px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" id="welcome-dialog-title">
          Welcome!
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ padding: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Hi, welcome to my portfolio site! It’s still under construction, but
          in the meantime, enjoy this game I built using React, Material UI, and
          Vite.
        </Typography>
        <Typography variant="body1" gutterBottom>
          This game is also a work in progress. Some features I'm currently
          developing include:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: '1.5rem', marginTop: '10px' }}>
          <Typography component="li" variant="body2">
            User profiles
          </Typography>
          <Typography component="li" variant="body2">
            Scoreboards
          </Typography>
          <Typography component="li" variant="body2">
            AI opponents
          </Typography>
          <Typography component="li" variant="body2">
            Drag and drop functionality
          </Typography>
          <Typography component="li" variant="body2">
            A reset game button
          </Typography>
        </Box>
        <br />
        <Typography variant="body1" gutterBottom>
          In the meantime, grab someone close by and enjoy playing Tic Stack
          Token together!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WelcomeModal
