import { Injectable } from '@angular/core'
import { CardSuits } from '@app/core/enums/card-suits'
import { CardValues } from '@app/core/enums/card-values'
import { Players } from '@app/core/enums/players'
import { Card } from '@app/core/models/card'
import { Groups } from '@app/core/models/groups'

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  //* For "AI" players only
  groupCards(cs: Card[], turn: Players) {
    let cards = this.getSortedDeepCopy(cs)

    const groups: Groups = {
      singles: [],
      pairs: [],
      triples: [],
      bombs: [],
      straights: [],
      flushes: [],
    }

    //* Get all possible pairs
    if (cards.length >= 2) {
      for (let i = 0; i < cards.length - 1; i++) {
        if (this.areCardsSameValue(cards.slice(i, i + 2))) {
          groups.pairs.push([cards[i], cards[i + 1]])
        }
      }
    }

    //* Get all possible triples
    if (cards.length >= 3) {
      for (let i = 0; i < cards.length - 2; i++) {
        if (this.areCardsSameValue(cards.slice(i, i + 3))) {
          groups.triples.push([cards[i], cards[i + 1], cards[i + 2]])
        }
      }
    }

    //* Get all possible bombs
    if (cards.length >= 4) {
      for (let i = 0; i < cards.length - 3; i++) {
        if (this.areCardsSameValue(cards.slice(i, i + 4))) {
          groups.bombs.push([cards[i], cards[i + 1], cards[i + 2], cards[i + 3]])
        }
      }
    }

    //* Get all possible straights
    const straightsCopy = this.getSortedDeepCopy(cards, 'value')
    const filteredRepeated = straightsCopy.filter((c, i, a) => a.findIndex((c2) => c2.value === c.value) === i)

    if (filteredRepeated.length >= 5) {
      for (let i = 0; i < filteredRepeated.length - 3; i++) {
        for (let j = filteredRepeated.length; j > i + 4; j--) {
          const isStraight = this.isStraight(filteredRepeated.slice(i, j))
          if (isStraight.length > 1) {
            groups.straights.push(isStraight)
          }
        }
      }
    }

    //* Get all possible flushes
    if (cards.length >= 5 && groups.straights.length > 0) {
      const hearts = straightsCopy.filter((c) => c.suit === CardSuits.heart)
      const diamonds = straightsCopy.filter((c) => c.suit === CardSuits.diamond)
      const clubs = straightsCopy.filter((c) => c.suit === CardSuits.club)
      const spades = straightsCopy.filter((c) => c.suit === CardSuits.spade)

      if (hearts.length >= 5) {
        for (let i = 0; i < hearts.length - 4; i++) {
          for (let j = hearts.length; j > i + 4; j--) {
            const isFlush = this.isStraight(hearts.slice(i, j), false)
            if (isFlush.length > 1) {
              groups.flushes.push(isFlush)
            }
          }
        }
      }

      if (diamonds.length >= 5) {
        for (let i = 0; i < diamonds.length - 4; i++) {
          for (let j = diamonds.length; j > i + 4; j--) {
            const isFlush = this.isStraight(diamonds.slice(i, j), false)
            if (isFlush.length > 1) {
              groups.flushes.push(isFlush)
            }
          }
        }
      }

      if (spades.length >= 5) {
        for (let i = 0; i < spades.length - 4; i++) {
          for (let j = spades.length; j > i + 4; j--) {
            const isFlush = this.isStraight(spades.slice(i, j), false)
            if (isFlush.length > 1) {
              groups.flushes.push(isFlush)
            }
          }
        }
      }

      if (clubs.length >= 5) {
        for (let i = 0; i < clubs.length - 4; i++) {
          for (let j = clubs.length; j > i + 4; j--) {
            const isFlush = this.isStraight(clubs.slice(i, j), false)
            if (isFlush.length > 1) {
              groups.flushes.push(isFlush)
            }
          }
        }
      }
    }

    //* Get all singles
    const allSingles = []
    for (const singles of cards) {
      let found = false

      for (const group of Object.values(groups)) {
        for (const arr of group) {
          for (const ccard of arr) {
            if (ccard.suit === singles.suit && ccard.value === singles.value) {
              found = true
              break
            }
          }
          if (found) break
        }
      }

      if (!found) {
        allSingles.push(singles)
      }
    }

    groups.singles = allSingles

    console.log(groups)

    return groups
  }

  getSortedDeepCopy(cards: Card[], property = 'playValue') {
    const callbackF = property === 'value' ? (x: Card, y: Card) => x.value - y.value : (x: Card, y: Card) => x.playValue - y.playValue
    return (JSON.parse(JSON.stringify(cards)) as Card[]).sort(callbackF)
  }

  canHaveStraightWithBomb(cards: Card[]) {}
  isCardPartOfBombOrFlush(card: Card, bombs: Card[][], flushes: Card[][]) {
    return false
  }
  isPairPartOfTriple(value: number, cards: Card[]) {}
  isPairPartOfBomb(value: number, cards: Card[]) {}
  isTriplePartOfBomb(value: number, cards: Card[]) {}
  canRemoveAceFromStraight(straight: Card[], cards: Card[]) {}
  canRemoveTwoFromStraight(straight: Card[], cards: Card[]) {}
  canRemoveCardAndStillBeFlush(card: Card, flush: Card[]) {}

  //* For both types of players
  generateAndShuffleCards() {
    const deck = []

    for (const suit in CardSuits) {
      for (const v of Object.values(CardValues)) {
        const value = +v
        let playValue = value <= +CardValues.Two ? value + 13 : value
        deck.push({ value, suit, playValue })
      }
    }

    const blackJoker = { value: 14, suit: 'club', playValue: 16 }
    const redJoker = { value: 14, suit: 'heart', playValue: 17 }

    deck.push(...[redJoker, blackJoker])
    deck.sort(() => 0.5 - Math.random()) //* Shuffle cards

    return deck
  }

  isStraight(cards: Card[], sort = true) {
    if (sort) {
      cards.sort((x, y) => x.value - y.value)
    }

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
    return cards.every((c) => c.value === cards[0].value && c.value !== 14) //! No pair of Jokers
  }

  areCardsSameSuit(cards: Card[]) {
    return cards.every((c) => c.suit === cards[0].suit)
  }
}
