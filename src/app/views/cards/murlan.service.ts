import { Injectable } from '@angular/core'
import { Hands } from '@app/core/enums/hands'
import { Phases } from '@app/core/enums/phase'
import { Steps } from '@app/core/enums/steps'
import { Card } from '@app/core/models/card'
import { BehaviorSubject } from 'rxjs'
import { PlayerThrow } from './enums/player-throw.interface'

@Injectable({
  providedIn: 'root',
})
export class MurlanService {
  game = new BehaviorSubject<Steps | null>(null)
  cardsOnTable: Card[] = []
  userCards: Card[] = []
  userOneCards: Card[] = []
  userTwoCards: Card[] = []
  userThreeCards: Card[] = []

  userCards$ = new BehaviorSubject<Card[]>([])
  userOneCards$ = new BehaviorSubject<Card[]>([])
  userTwoCards$ = new BehaviorSubject<Card[]>([])
  userThreeCards$ = new BehaviorSubject<Card[]>([])
  allCards: Card[] = []

  isPlayersTurn = true
  isPlayersHand = false
  onTableCards: Card[] = []
  handOnTable = Hands.empty
  currentHand!: Hands

  suits = ['spade', 'diamond', 'heart', 'club']
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  constructor() {}

  throw(player: number, cards: Card[]) {
    // this.game.next({ player, cards })
  }

  playSelected() {
    let selected = this.userCards.filter((card) => card.selected)

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

  throwCards(cards: Card[]) {
    this.onTableCards = [...cards]
    this.handOnTable = this.currentHand
    this.currentHand = Hands.empty
  }

  setWarnTimeout(cards: Card[], indeces: number[]) {
    for (const index of indeces) {
      cards[index].warn = true
    }

    setTimeout(() => {
      cards.forEach((c) => (c.warn = false))
    }, 1400)
  }

  // Game start procedure
  startGame() {
    this.cardsOnTable = []
    // this.selectedCount = 0
    this.generateCards()

    // Shuffle cards
    this.allCards.sort(() => 0.5 - Math.random())

    // Get hands portions
    this.userCards = this.allCards.slice(0, 14)
    this.userOneCards = this.allCards.slice(14, 27)
    this.userTwoCards = this.allCards.slice(27, 40)
    this.userThreeCards = this.allCards.slice(40, 54)

    this.userCards$.next(this.userCards)
    this.userOneCards$.next(this.userOneCards)
    this.userTwoCards$.next(this.userTwoCards)
    this.userThreeCards$.next(this.userThreeCards)
  }

  generateCards() {
    for (let s = 0; s < this.suits.length; s++) {
      for (let v = 0; v < this.values.length; v++) {
        const value = this.values[v]
        const suit = this.suits[s]
        this.allCards.push({ value, suit })
      }
    }

    const blackJoker = { value: 14, suit: 'club' }
    const redJoker = { value: 14, suit: 'heart' }

    this.allCards.push(...[redJoker, blackJoker])
  }

  // throw() {
  //   let count = -(this.selectedCardsLI.length - 1) / 2
  //   this.selectedCardsLI.forEach((c, i) => {
  //     c.classList.add('throwing')
  //     c.style.marginLeft = count++ * 50 + 'px'

  //     setTimeout(() => {
  //       c.classList.remove('throwing')

  //       if (i === this.selectedCardsLI.length - 1) {
  //         // this.moveToTable()
  //       }
  //     }, 1000)
  //   })

  //   setTimeout(() => {
  //     // this.murlan.throw(Math.floor(Math.random() * 3) + 1, this.selectedCards)
  //     // this.murlan.throw(2, this.selectedCards)
  //   }, 1000)
  // }

  // moveToTable() {
  //   this.cards = this.cards.filter((c) => !c.selected)
  //   this.cardsOnTable = this.selectedCards
  // }

  get Game() {
    return this.game.asObservable()
  }

  get UserOneCards() {
    return this.userOneCards$.asObservable()
  }

  get UserTwoCards() {
    return this.userTwoCards$.asObservable()
  }

  get UserThreeCards() {
    return this.userThreeCards$.asObservable()
  }

  get UserCards() {
    return this.userCards$.asObservable()
  }
}
