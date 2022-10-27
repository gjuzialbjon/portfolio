export interface Card {
  value: number
  playValue: number
  suit: string
  throwing?: boolean
  selected?: boolean
  warn?: boolean
}
