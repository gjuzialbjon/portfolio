import { moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Card } from '@app/core/models/card'
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
      this.murlan.userCards$.pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
    }
  }

  drop(event: any) {
    if (!this.isTable) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex)
    }
  }

  selectCard(i: number) {
    this.cards[i].selected = !this.cards[i].selected
    this.changedSelected.emit(this.cards.filter((c) => c.selected).slice())
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}



