// client/hooks/useTokens.ts
import { useState } from 'react'
import { Token, Player } from '../types'

export const useTokens = () => {
  const [redTokens, setRedTokens] = useState<Token[]>([
    {
      id: 'red-1',
      number: 1,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-2',
      number: 2,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-3',
      number: 3,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-4',
      number: 4,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-5',
      number: 5,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'red-6',
      number: 6,
      color: 'red',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const [blackTokens, setBlackTokens] = useState<Token[]>([
    {
      id: 'black-1',
      number: 1,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-2',
      number: 2,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-3',
      number: 3,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-4',
      number: 4,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-5',
      number: 5,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
    {
      id: 'black-6',
      number: 6,
      color: 'black',
      played: false,
      selected: false,
      available: true,
    },
  ])

  const handleTokenClick = (token: Token) => {
    if (token.color === 'red') {
      setRedTokens((prevTokens) =>
        prevTokens.map((t) =>
          t.id === token.id
            ? { ...t, selected: !t.selected }
            : { ...t, selected: false },
        ),
      )
    } else {
      setBlackTokens((prevTokens) =>
        prevTokens.map((t) =>
          t.id === token.id
            ? { ...t, selected: !t.selected }
            : { ...t, selected: false },
        ),
      )
    }
  }

  const resetTokensAvailability = (tokens: Token[]) => {
    return tokens.map((t) =>
      !t.played ? { ...t, available: true, selected: false } : t,
    )
  }

  return {
    redTokens,
    blackTokens,
    handleTokenClick,
    resetTokensAvailability,
  }
}
