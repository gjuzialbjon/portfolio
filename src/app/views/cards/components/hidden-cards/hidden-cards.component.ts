import { Component, EventEmitter, Input, OnInit } from '@angular/core'
import { Phases } from '@app/core/enums/phase'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { MurlanService } from '../../murlan.service'

@Component({
  selector: 'app-hidden-cards',
  templateUrl: './hidden-cards.component.html',
  styles: [],
})
export class HiddenCardsComponent implements OnInit {
  @Input() playerNumber = 0
  @Input() vertical = true
  hiddenCards: any[] = []

  destroyed$ = new Subject()

  constructor(private murlan: MurlanService) {
  
  }

  ngOnInit(): void {
    if (this.playerNumber === 1) {
      this.murlan.UserOneCards.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((cards) => (this.hiddenCards = cards))
    } else if (this.playerNumber === 2) {
      this.murlan.UserTwoCards.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((cards) => (this.hiddenCards = cards))
    } else if (this.playerNumber === 3) {
      this.murlan.UserThreeCards.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((cards) => (this.hiddenCards = cards))
    }

    this.murlan.Game.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((step) => {
      if(step && step.phase === Phases.throw) {
        
      }


      // if (res && res.player === this.playerNumber) {
      //   console.log(res)
      //   const cardsToThrow = this.hiddenCards.slice(0, res?.cards.length)
      //   console.log('cards to throw ', cardsToThrow)
      //   const hiddenCardsLI: (HTMLElement | null)[] = []
      //   cardsToThrow.forEach((c, i) => {
      //     hiddenCardsLI.push(document.getElementById('hidden' + this.playerNumber + i))
      //   })
      //   hiddenCardsLI.forEach((c) => {
      //     c?.classList.add('thrown')
      //   })
      //   setTimeout(
      //     () => {
      //       this.hiddenCards.splice(0, res?.cards.length)
      //     },
      //     this.playerNumber === 2 ? 500 : 1000
      //   )
      //   console.log('Throwing ', cardsToThrow, hiddenCardsLI)
      // }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
