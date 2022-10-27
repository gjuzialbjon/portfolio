import { Card } from './card'

export interface Groups {
  singles: Card[]
  pairs: Card[][]
  triples: Card[][]
  bombs: Card[][]
  straights: Card[][]
  flushes: Card[][]
}
