import { Injectable } from '@angular/core'
import { Hands } from '@app/core/enums/hands'
import { Players } from '@app/core/enums/players'
import { Priorities } from '@app/core/enums/priorities'
import { Steps } from '@app/core/enums/steps'
import { Card } from '@app/core/models/card'
import { UserPossibleThrow } from '@app/core/models/user-throw'
import { BehaviorSubject } from 'rxjs'
import { single } from 'rxjs/operators'
import { PlayerThrow } from './enums/player-throw.interface'
import { HelpersService } from './helpers.service'

@Injectable({
  providedIn: 'root',
})
export class MurlanService {
  game = new BehaviorSubject<Steps | null>(null)
  rules: any[] = []

  leastCardsOnHands: number = 100
  playedCards: Card[] = []
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

  lastThrownUser!: number //* ID of user who played last
  currentTurnUser: number = Players.player //* ID of user who is currently playing

  handOnTable = Hands.empty
  selectedPlayerHand!: Hands

  constructor(private helpers: HelpersService) {}

  calculateNextThrow() {
    const possibleThrows: UserPossibleThrow[] = []
    const cards = this.currentTurnUser == 1 ? this.userOneCards : this.currentTurnUser == 2 ? this.userTwoCards : this.userThreeCards

    ////////////////! Start of o MESS //////////////////////
    const { singles, pairs, triples, bombs, straights, flushes } = this.helpers.groupCards(cards, Players.player)

    switch (this.handOnTable) {
      case Hands.single:
        //* Watch out for other players to not win if you can
        if (this.leastCardsOnHands === 1) {
        } else if (this.leastCardsOnHands === 2) {
        } else {
          if (bombs.length === 0 && flushes.length === 0) {
            if (singles.length) {
              //* Find lowest single to beat the single on table
              for (const single of singles) {
                if (single.playValue > this.cardsOnTable[0].playValue) {
                  possibleThrows.push({ priority: Priorities.single, cards: [single] })
                }
              }
            }
            //* If no single card bigger check pairs, triples or straights
            if (/*possibleThrows.length === 0*/ true) {
              if (pairs.length) {
                for (const pair of pairs) {
                  if (pair[0].playValue > this.cardsOnTable[0].playValue) {
                    possibleThrows.push({ priority: Priorities.singleFromPair, cards: [pair[0]], mightSkip: true })
                  }
                }
              }

              if (triples.length) {
                for (const triple of triples) {
                  if (triple[0].value > this.cardsOnTable[0].playValue && this.helpers.isCardPartOfBombOrFlush(triple[0], bombs, flushes)) {
                    possibleThrows.push({ priority: Priorities.singleFromTriple, cards: [triple[0]], mightSkip: true })
                  }
                }
              }

              if (straights.length) {
                for (const straight of straights) {
                  for (let i = 0; i < straight.length; i++) {
                    if (straight.length > 5) {
                      const newStraight = JSON.parse(JSON.stringify(straight)) as Card[]

                      if (newStraight.length >= 5) {
                        for (let j = 0; j < newStraight.length; j++) {
                          const card = straight[j]

                          if (card.playValue > this.cardsOnTable[0].playValue && this.helpers.isStraight(newStraight.splice(j, 1), false)) {
                            possibleThrows.push({ priority: Priorities.singleFromStraight, cards: [card], mightSkip: true })
                          }
                        }
                      }
                    }
                  }
                }
              }

              if (flushes.length) {
                for (const flush of flushes) {
                  for (let i = 0; i < flush.length; i++) {
                    if (flush.length > 5) {
                      const newFlush = JSON.parse(JSON.stringify(flush)) as Card[]

                      if (newFlush.length >= 5) {
                        for (let j = 0; j < newFlush.length; j++) {
                          const card = flush[j]

                          if (card.playValue > this.cardsOnTable[0].playValue && this.helpers.isStraight(newFlush.splice(j, 1), false)) {
                            possibleThrows.push({ priority: Priorities.singleFromFlush, cards: [card], mightSkip: true })
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else if (bombs.length > 1 && flushes.length === 0) {
          } else if (bombs.length === 0 && flushes.length === 1) {
          }
        }

        //* Add more cases
        break
      case Hands.pair:
        break
      case Hands.triple:
        break
      case Hands.bomb:
        break
      case Hands.straight:
        break
      case Hands.flush:
        break

      default:
        break
    }

    console.log('Possible throws ', possibleThrows)
  }

  throwUser(user: number, cards: Card[]) {
    // this.game.next({ player, cards })

    console.log('USER NR ', user, ' played ', cards)
  }

  throwPlayerCards() {
    let selected = this.playerCards.filter((c) => c.selected)

    let count = -(selected.length - 1) / 2
    selected.forEach((c) => {
      const el = document.getElementById('player' + c.value + c.suit) as HTMLLIElement
      el.style.marginLeft = count++ * 50 + 'px'
      c.throwing = true
    })

    this.validThrow$.next(false)
    this.handOnTable = this.selectedPlayerHand

    setTimeout(() => {
      selected.forEach((c) => {
        c.throwing = false
      })

      if (selected.length >= 5) {
        selected = this.helpers.isStraight(selected) as Card[]
      }

      this.cardsOnTable = [...selected]
      this.cardsOnTable$.next(this.cardsOnTable.slice())
      this.playerCards = this.playerCards.filter((c) => !c.selected)
      this.playerCards$.next(this.playerCards.slice())
      this.checkValidPlayerThrow()

      this.lastThrownUser = Players.player
      this.currentTurnUser = Players.two
      this.playedCards = [...this.playedCards, ...this.cardsOnTable]

      this.calculateNextThrow()
    }, 1000)
  }

  //* Game start procedure
  startGame(rules: any[]) {
    this.rules = rules
    this.handOnTable = Hands.empty
    this.currentTurnUser = Players.player
    this.playedCards = []
    this.cardsOnTable = []
    this.deckOfCards = this.helpers.generateAndShuffleCards()

    this.cardsOnTable$.next(this.cardsOnTable)
    this.validThrow$.next(false)

    this.playerCards = this.deckOfCards.slice(0, 14)
    this.userOneCards = this.deckOfCards.slice(14, 27)
    this.userTwoCards = this.deckOfCards.slice(27, 40)
    this.userThreeCards = this.deckOfCards.slice(40, 54)

    this.sortPlayersCards()

    // this.helpers.groupCards(this.userOneCards, Players.one)
    // this.helpers.groupCards(this.userTwoCards, Players.two)
    // this.helpers.groupCards(this.userThreeCards, Players.three)
    this.helpers.groupCards(this.playerCards, Players.player)
  }

  toggleCard(index: number) {
    const newCards = JSON.parse(JSON.stringify(this.playerCards)) //* Deep copy
    newCards[index].selected = !this.playerCards[index].selected
    this.playerCards = newCards
    this.playerCards$.next(newCards)

    this.checkValidPlayerThrow()
  }

  checkValidPlayerThrow() {
    if (this.currentTurnUser !== 4) {
      this.validThrow$.next(false)
      return
    }

    let selected = this.playerCards.filter((c) => c.selected)

    //* Two jokers in one
    if (selected.length > 1 && selected.find((c) => c.value === 14)) {
      this.validThrow$.next(false)
      return
    }

    this.selectedPlayerHand = Hands.empty

    if (selected.length >= 5) {
      selected = this.helpers.isStraight(selected)
      if (selected.length > 1) {
        this.selectedPlayerHand = this.helpers.areCardsSameSuit(selected) ? Hands.flush : Hands.straight
      }
    } else if (selected.length >= 2 && selected.length <= 4 && this.helpers.areCardsSameValue(selected)) {
      this.selectedPlayerHand = selected.length //* Same as pair, triple or bomb
    } else if (selected.length == 1) {
      this.selectedPlayerHand = Hands.single
    }

    //* If not player's hand, check what's on table
    if (this.lastThrownUser !== 4) {
      if (this.handOnTable !== Hands.empty) {
        switch (this.selectedPlayerHand) {
          case Hands.single:
            if (this.handOnTable !== Hands.single || selected[0].value <= this.cardsOnTable[0].value) {
              this.selectedPlayerHand = Hands.empty
            }
            break
          case Hands.pair:
            if (this.handOnTable !== Hands.pair || selected[0].value <= this.cardsOnTable[0].value) {
              this.selectedPlayerHand = Hands.empty
            }
            break
          case Hands.triple:
            if (this.handOnTable !== Hands.triple || selected[0].value < this.cardsOnTable[0].value) {
              this.selectedPlayerHand = Hands.empty
            }
            break
          case Hands.bomb:
            if (this.handOnTable === Hands.bomb) {
              if (selected[0].value < this.cardsOnTable[0].value) {
                this.selectedPlayerHand = Hands.empty
              }
            } else if (this.handOnTable === Hands.flush) {
              this.selectedPlayerHand = Hands.empty
            }
            break
          case Hands.flush:
            if (this.handOnTable === Hands.flush) {
              if (selected[0].value <= this.cardsOnTable[0].value) {
                this.selectedPlayerHand = Hands.empty
              }
            } else {
              this.selectedPlayerHand = Hands.empty
            }
            break
          default:
            break
        }
      }
    }

    this.validThrow$.next(this.selectedPlayerHand !== Hands.empty)
  }

  //* Helpers
  sortPlayersCards() {
    this.playerCards.sort((x, y) => x.playValue - y.playValue)
    this.userOneCards.sort((x, y) => x.playValue - y.playValue)
    this.userTwoCards.sort((x, y) => x.playValue - y.playValue)
    this.userThreeCards.sort((x, y) => x.playValue - y.playValue)

    console.log('cards ', this.playedCards)

    this.playerCards$.next(this.playerCards.slice())
    this.userOneCards$.next(this.userOneCards.slice())
    this.userTwoCards$.next(this.userTwoCards.slice())
    this.userThreeCards$.next(this.userThreeCards.slice())
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
