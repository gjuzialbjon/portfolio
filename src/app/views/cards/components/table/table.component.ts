import { Component, OnInit } from '@angular/core'
import { Themes } from '@app/core/enums/themes'
import { ThemeService } from '@app/core/layout/theme.service'
import { Card } from '@app/core/models/card'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MurlanService } from '../../murlan.service'
import { RulesComponent } from '../rules/rules.component'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
})
export class TableComponent implements OnInit {
  selectedCount = 0
  selectedCards: Card[] = []
  selectedCardsLI: HTMLLIElement[] = []
  cardsOnTable: Card[] = []

  constructor(private murlan: MurlanService, private modalService: NgbModal, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.openRules()

    this.murlan.Game.subscribe((step) => {
      console.log(step)
    })
  }

  openRules() {
    const modalRef = this.modalService.open(RulesComponent, {
      scrollable: true,
      centered: true,
      backdrop: 'static',
      keyboard: false,
    })
    modalRef.componentInstance.name = 'World'

    modalRef.result
      .then((rules) => {
        if (rules) {
          console.log('Starting the game with the rules ', rules)
          this.murlan.startGame()
        } else {
          console.warn('No rules specified')
        }
      })
      .catch((err) => console.warn(err))
  }

  throw() {
    console.log('Pressed throw btn ')
  }

  changedSelected(cards: Card[]) {
    console.log('Selected cards ', cards)
    const selectedCardsLI: HTMLLIElement[] = []

    for (const card of cards) {
      selectedCardsLI.push(document.getElementById(card.value + card.suit) as HTMLLIElement)
    }

    this.selectedCards = cards
    this.selectedCardsLI = selectedCardsLI

    console.log('Selected LI', selectedCardsLI)
  }
}
