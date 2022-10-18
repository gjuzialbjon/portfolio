import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Card } from './components/cards/cards.component'
import { PlayerThrow } from './enums/player-throw.interface'

@Injectable({
  providedIn: 'root',
})
export class MurlanService {
  play = new BehaviorSubject<PlayerThrow>({ player: -1, cards: [] })

  constructor() {}

  throw(player: number, cards: Card[]) {
    this.play.next({ player, cards })
  }

  get Game() {
    return this.play.asObservable()
  }
}
