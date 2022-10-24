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
  playerCards: Card[] = []
  userOneCards: Card[] = []
  userTwoCards: Card[] = []
  userThreeCards: Card[] = []

  cardsOnTable$ = new BehaviorSubject<Card[]>([])
  playerCards$ = new BehaviorSubject<Card[]>([])
  userOneCards$ = new BehaviorSubject<Card[]>([])
  userTwoCards$ = new BehaviorSubject<Card[]>([])
  userThreeCards$ = new BehaviorSubject<Card[]>([])

  validThrow$ = new BehaviorSubject<boolean>(false)

  deckOfCards: Card[] = []

  isPlayersTurn = true
  isPlayersHand = false
  handOnTable = Hands.empty
  selectedHand!: Hands

  suits = ['spade', 'diamond', 'heart', 'club']
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  constructor() {}

  throw(player: number, cards: Card[]) {
    // this.game.next({ player, cards })
  }

  throwCards() {
    let selected = this.playerCards.filter((c) => c.selected)

    let count = -(selected.length - 1) / 2
    selected.forEach((c) => {
      const el = document.getElementById('player' + c.value + c.suit) as HTMLLIElement
      el.style.marginLeft = count++ * 50 + 'px'
      c.throwing = true
    })

    setTimeout(() => {
      selected.forEach((c) => {
        c.throwing = false
      })

      if (selected.length >= 5) {
        selected = this.isStraight(selected) as Card[]
      }

      this.cardsOnTable = [...selected]
      this.handOnTable = this.selectedHand
      this.selectedHand = Hands.empty
      this.cardsOnTable$.next(this.cardsOnTable.slice())
      this.playerCards = this.playerCards.filter((c) => !c.selected)
      this.playerCards$.next(this.playerCards.slice())
    }, 1000)
  }

  //* Game start procedure
  startGame() {
    this.cardsOnTable = []
    this.generateCards()

    this.deckOfCards.sort(() => 0.5 - Math.random()) //* Shuffle cards

    this.playerCards = this.deckOfCards.slice(0, 14)
    this.userOneCards = this.deckOfCards.slice(14, 27)
    this.userTwoCards = this.deckOfCards.slice(27, 40)
    this.userThreeCards = this.deckOfCards.slice(40, 54)

    this.playerCards$.next(this.playerCards.slice())
    this.userOneCards$.next(this.userOneCards.slice())
    this.userTwoCards$.next(this.userTwoCards.slice())
    this.userThreeCards$.next(this.userThreeCards.slice())
  }

  toggleCard(index: number) {
    const newCards = JSON.parse(JSON.stringify(this.playerCards)) //* Deep copy
    newCards[index].selected = !this.playerCards[index].selected
    this.playerCards = newCards
    this.playerCards$.next(newCards)

    this.checkValidThrow()
  }

  checkValidThrow() {
    const selected = this.playerCards.filter((c) => c.selected)

    this.selectedHand = Hands.empty

    if (selected.length >= 5) {
      const hand = this.isStraight(selected)
      if (hand && this.areCardsSameSuit(hand)) {
        this.selectedHand = Hands.flush
      } else if (hand) {
        this.selectedHand = Hands.straight
      }
    } else if (selected.length == 4) {
      if (this.areCardsSameValue(selected)) {
        this.selectedHand = Hands.bomb
      }
    } else if (selected.length == 3) {
      if (this.areCardsSameValue(selected)) {
        this.selectedHand = Hands.triple
      }
    } else if (selected.length == 2) {
      if (this.areCardsSameValue(selected)) {
        this.selectedHand = Hands.pair
      }
    } else if (selected.length == 1) {
      this.selectedHand = Hands.single
    }

    console.log('CURRENT HAND ', this.selectedHand)

    this.validThrow$.next(this.selectedHand !== Hands.empty)
  }

  //* Helpers
  generateCards() {
    for (let s = 0; s < this.suits.length; s++) {
      for (let v = 0; v < this.values.length; v++) {
        const value = this.values[v]
        const suit = this.suits[s]
        this.deckOfCards.push({ value, suit })
      }
    }

    const blackJoker = { value: 14, suit: 'club' }
    const redJoker = { value: 14, suit: 'heart' }

    this.deckOfCards.push(...[redJoker, blackJoker])
  }

  isStraight(cards: Card[]) {
    cards = cards.sort((x, y) => x.value - y.value)

    if (cards[cards.length - 1].value == 14) {
      return false
    }

    let hasAce = cards[0].value == 1 && cards[cards.length - 1].value == 13

    for (let i = hasAce ? 2 : 1; i < cards.length; i++) {
      if (cards[i].value - cards[i - 1].value > 1 || cards[i].value == cards[i - 1].value) {
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

  //* Getters
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

  get PlayerCards() {
    return this.playerCards$.asObservable()
  }

  get TableCards() {
    return this.cardsOnTable$.asObservable()
  }

  get ValidThrow() {
    return this.validThrow$.asObservable()
  }
}
