// client/components/Header.tsx

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Popover,
  IconButton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Player } from '../types' // Import Player type

type HeaderProps = {
  isAIEnabled: boolean
  setIsAIEnabled: (val: boolean) => void
  aiPlayer: Player
  setAIPlayer: (player: Player) => void
  humanPlayer: Player
  setHumanPlayer: (player: Player) => void
}

const Header = ({
  isAIEnabled,
  setIsAIEnabled,
  aiPlayer,
  setAIPlayer,
  humanPlayer,
  setHumanPlayer,
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  // Handle AI Player Assignment
  const handleAIEnabledChange = (value: string) => {
    setIsAIEnabled(value === 'ai')
    if (value === 'ai') {
      setHumanPlayer('red') // Automatically set human player to red
      setAIPlayer('black') // Automatically set AI to black
    }
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent background
        color: 'white',
        padding: { xs: '8px', sm: '16px' }, // Responsive padding
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        margin: 0, // Ensure no margin
      }}
    >
      <Typography
        variant={{ xs: 'h4', sm: 'h3' }}
        sx={{ fontWeight: 'bold', marginBottom: { xs: '4px', sm: '8px' } }}
      >
        Tic-Stack-Token
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <IconButton
            aria-label="How to play"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            sx={{ color: 'white', padding: 0, marginRight: '8px' }}
          >
            <HelpOutlineIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            How to play
          </Typography>
        </Box>

        {/* AI Settings */}
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="game-mode"
            name="game-mode"
            value={isAIEnabled ? 'ai' : 'human'}
            onChange={(e) => handleAIEnabledChange(e.target.value)}
          >
            <FormControlLabel
              value="human"
              control={<Radio />}
              label="Two Players"
            />
            <FormControlLabel
              value="ai"
              control={<Radio />}
              label="Play vs AI"
            />
          </RadioGroup>
        </FormControl>

        {isAIEnabled && (
          <FormControl component="fieldset">
            <Typography variant="body2" sx={{ mb: 1 }}>
              You are Red
            </Typography>
            {/* Removed "You: Black" option */}
          </FormControl>
        )}
      </Box>

      <Popover
        id="instructions-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker transparent for the popover
            color: 'white',
            maxWidth: '300px',
            textAlign: 'left',
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', marginBottom: '8px', color: '#f0f0f0' }} // Lighter text for better contrast
          >
            How to play
          </Typography>
          <Typography variant="body2" sx={{ color: '#dcdcdc' }}>
            The rules play like Tic Tac Toe but with a twist. You can stack your
            tokens on top of each other to win. Place your token over any played
            token with a lower number. The first player to get 3 in a line wins!
            <br />
            <br />
            To reset the game, just refresh the page.
          </Typography>
        </Box>
      </Popover>
    </Box>
  )
}

export default Header
