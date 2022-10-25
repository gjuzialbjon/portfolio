import { moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Card } from '@app/core/models/card'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { MurlanService } from '../../murlan.service'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: [],
})
export class CardsComponent implements OnInit {
  cards!: Card[]
  @Input() isTable = false
  @Output() changedSelected = new EventEmitter()

  destroyed$ = new Subject()

  constructor(private murlan: MurlanService) {}

  ngOnInit(): void {
    if (!this.isTable) {
      this.murlan.PlayerCards.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((cards) => {
        this.cards = cards
      })
    } else {
      this.murlan.TableCards.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((cards) => {
        this.cards = cards
      })
    }
  }

  drop(event: any) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex)
  }

  toggleCard(index: number) {
    this.murlan.toggleCard(index)
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
