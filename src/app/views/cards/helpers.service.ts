import { Injectable } from '@angular/core'
import { Card } from '@app/core/models/card'

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  suits = ['spade', 'diamond', 'heart', 'club']
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  constructor() {}

  generateAndShuffleCards() {
    const deck = []

    for (let s = 0; s < this.suits.length; s++) {
      for (let v = 0; v < this.values.length; v++) {
        const value = this.values[v]
        const suit = this.suits[s]

        let playValue = value

        if (playValue === 2) {
          playValue = 15
        } else if (playValue === 1) {
          playValue = 14
        }

        deck.push({ value, suit, playValue })
      }
    }

    const blackJoker = { value: 14, suit: 'club', playValue: 16 }
    const redJoker = { value: 14, suit: 'heart', playValue: 17 }

    deck.push(...[redJoker, blackJoker])
    deck.sort(() => 0.5 - Math.random()) //* Shuffle cards

    return deck
  }

  isStraight(cards: Card[]) {
    cards = cards.sort((x, y) => x.value - y.value)

    if (cards[cards.length - 1].value == 14) {
      return []
    }

    let hasAce = cards[0].value == 1 && cards[cards.length - 1].value == 13

    for (let i = hasAce ? 2 : 1; i < cards.length; i++) {
      if (cards[i].value - cards[i - 1].value > 1 || cards[i].value == cards[i - 1].value) {
        return []
      }
    }

    if (hasAce) {
      cards.push(cards.shift() as Card)
    }

    return cards
  }

  areCardsSameValue(cards: Card[]) {
    return cards.every((c) => c.value === cards[0].value)
  }

  areCardsSameSuit(cards: Card[]) {
    return cards.every((c) => c.suit === cards[0].suit)
  }
}
