import { Card } from './card'

export interface UserPossibleThrow {
  priority: number
  cards: Card[]
  mightSkip?: boolean
}
