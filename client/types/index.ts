// client/types/index.ts

export type Player = 'red' | 'black'

export type Token = {
  id: string
  number: number
  color: Player
  played: boolean
  selected: boolean
  available: boolean
}

export type Move = {
  token: Token
  position: [number, number]
}

export type MoveLog = {
  player?: Player
  token?: Token
  position?: [number, number]
  replacedToken?: { token: Token; replacedBy: Player }
}

export type GameState =
  | 'START'
  | 'SELECT_TOKEN'
  | 'SELECT_TILE'
  | 'PLACE_TOKEN'
  | 'CHECK_WIN'
  | 'SWITCH_PLAYER'
  | 'END'
  | 'STALEMATE'
