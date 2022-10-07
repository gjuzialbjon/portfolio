import { moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'al-cards',
  templateUrl: './cards.component.html',
  styles: [],
})
export class CardsComponent implements OnInit {
  positions = ['top', 'bottom flip']
  cards: Card[] = []
  suits = ['spade', 'diamond', 'heart', 'club']
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  selectedCount = 0
  isPlayersTurn = true
  isPlayersHand = false
  onTableCards: Card[] = []
  handOnTable = Hands.single
  currentHand!: Hands

  constructor() {}

  ngOnInit(): void {
    this.shuffle()
  }

  generateCards() {
    for (let s = 0; s < this.suits.length; s++) {
      for (let v = 0; v < this.values.length; v++) {
        const value = this.values[v]
        const suit = this.suits[s]
        this.cards.push({ value, suit })
      }
    }

    const blackJoker = { value: 14, suit: 'club' }
    const redJoker = { value: 14, suit: 'heart' }

    this.cards.push(...[redJoker, blackJoker])
  }

  drop(event: any) {		
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex)
  }

  shuffle() {
		this.cards = []
		this.selectedCount = 0
		this.generateCards()

    // Shuffle cards
    this.cards.sort(() => 0.5 - Math.random())

    // Get hand portion
    this.cards = this.cards.slice(0, 14)
	}

  selectCard(i: number) {
    this.cards[i].selected = !this.cards[i].selected
    this.cards[i].selected ? this.selectedCount++ : this.selectedCount--
  }

  playSelected() {
    let selected = this.cards.filter((card) => card.selected)

    if (selected.length >= 5) {
      const hand = this.isStraight(selected)
      if (hand && this.areCardsSameSuit(hand)) {
        this.currentHand = Hands.flush
        console.log('FLUSH ', hand)
      } else if (hand && !this.areCardsSameSuit(hand)) {
        console.log('STRAIGHT ', hand)
        this.currentHand = Hands.straight
      } else {
        console.log('NOT FLUSH OR STRAIGHT')
        this.currentHand = Hands.empty
      }
    } else if (selected.length == 4) {
      const hand = this.areCardsSameValue(selected)
      if (hand) {
        console.log(selected, 'BOMB')
        this.currentHand = Hands.bomb
      } else {
        console.log('NOT BOMB')
        this.currentHand = Hands.empty
      }
    } else if (selected.length == 3) {
      const hand = this.areCardsSameValue(selected)
      if (hand) {
        console.log(selected, 'TRIPLE')
        this.currentHand = Hands.triple
      } else {
        console.log('NOT TRIPLE')
        this.currentHand = Hands.empty
      }
    } else if (selected.length == 2) {
      const hand = this.areCardsSameValue(selected)
      if (hand) {
        console.log(selected, 'PAIR')
        this.currentHand = Hands.pair
      } else {
        console.log('NOT PAIR')
        this.currentHand = Hands.empty
      }
    } else if (selected.length == 1) {
      this.currentHand = Hands.single
    } else {
      console.log('NO CARD SELECTED')
      this.currentHand = Hands.empty
    }

    console.log('CURRENT HAND ', this.currentHand)
  }

  isStraight(cards: Card[]) {
    cards = cards.sort((x, y) => x.value - y.value)

    if (cards[cards.length - 1].value == 14) {
      this.setWarnTimeout(cards, [cards.length - 1])
      return false
    }

    let hasAce = cards[0].value == 1 && cards[cards.length - 1].value == 13

    for (let i = hasAce ? 2 : 1; i < cards.length; i++) {
      if (cards[i].value - cards[i - 1].value > 1 || cards[i].value == cards[i - 1].value) {
        this.setWarnTimeout(cards, [i, i - 1])
        return false
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

  throw(cards: Card[]) {
    this.onTableCards = [...cards]
    this.handOnTable = this.currentHand
    this.currentHand = Hands.empty
  }

  setWarnTimeout(cards: Card[], indeces: number[]) {
    for (const index of indeces) {
      cards[index].warn = true
    }

    setTimeout(() => {
      this.cards.forEach((c) => (c.warn = false))
    }, 1400)
  }
}

export interface Card {
  value: number
  suit: string
  selected?: boolean
  warn?: boolean
}

export enum Hands {
  empty = 0,
  single = 1,
  pair = 2,
  triple = 3,
  bomb = 4,
  straight = 5,
  flush = 6,
}
