import { Card } from "./card"

export interface Throw {
  lastCardsThrownBy: number
  lastTurnOff: number
  nextTurn: number
  thrownCards: Card[]
}