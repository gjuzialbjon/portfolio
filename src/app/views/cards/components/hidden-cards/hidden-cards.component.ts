import { Component, Input, OnInit } from '@angular/core'
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
  @Input() startCount = 14
  throwing = false
  hiddenCards: any[] = [...Array(this.startCount).keys()]

  destroyed$ = new Subject()

  constructor(private murlan: MurlanService) {}

  ngOnInit(): void {
    this.murlan.Game.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((res) => {
      if (res.player === this.playerNumber) {
        console.log(res)
        const cardsToThrow = this.hiddenCards.slice(0, res.cards.length)
        console.log('cards to throw ', cardsToThrow)

        const hiddenCardsLI: (HTMLElement | null)[] = []

        cardsToThrow.forEach((c, i) => {
          hiddenCardsLI.push(document.getElementById('hidden' + this.playerNumber + i))
        })

        hiddenCardsLI.forEach((c) => {
          c?.classList.add('thrown')
        })

        setTimeout(
          () => {
            this.hiddenCards.splice(0, res.cards.length)
          },
          this.playerNumber === 2 ? 500 : 1000
        )

        console.log('Throwing ', cardsToThrow, hiddenCardsLI)
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
