import { Component, OnInit } from '@angular/core'
import { ThemeService } from '@app/core/layout/theme.service'
import { Card } from '@app/core/models/card'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { MurlanService } from '../../murlan.service'
import { RulesComponent } from '../rules/rules.component'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
})
export class TableComponent implements OnInit {
  validThrow$!: Observable<boolean>

  selectedCount = 0
  selectedCards: Card[] = []
  selectedCardsLI: HTMLLIElement[] = []
  cardsOnTable: Card[] = []

  destroyed$ = new Subject()

  constructor(private murlan: MurlanService, private modalService: NgbModal, private themeService: ThemeService) {}

  ngOnInit(): void {
    // this.openRules()
    this.shuffleAgain()
    this.validThrow$ = this.murlan.ValidThrow.pipe(takeUntil(this.destroyed$))

    this.murlan.Game.pipe(takeUntil(this.destroyed$)).subscribe((step) => {
      // console.log(step)
    })
  }

  shuffleAgain() {
    this.murlan.startGame([])
  }

  openRules() {
    const modalRef = this.modalService.open(RulesComponent, {
      scrollable: true,
      centered: true,
      backdrop: 'static',
      keyboard: false,
    })

    modalRef.result
      .then((rules) => {
        if (rules) {
          console.log('Starting the game with the rules ', rules)
          this.murlan.startGame(rules)
        } else {
          console.warn('No rules specified')
        }
      })
      .catch((err) => console.warn(err))
  }

  sortCards() {
    this.murlan.sortPlayersCards()
  }

  pass() {
    this.murlan.pass()
  }

  throw() {
    this.murlan.throwPlayerCards()
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }
}
