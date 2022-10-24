import { Component, Input, OnInit } from '@angular/core'
import { Themes } from '@app/core/enums/themes'
import { ThemeService } from '@app/core/layout/theme.service'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styles: [],
})
export class RulesComponent implements OnInit {
  @Input() name!: string
  darkMode!: boolean

  rules = [
    {
      name: 'two_jokers',
      checked: true,
    },
    {
      name: 'straight_with_two',
      checked: false,
    },
    {
      name: 'straight_one_three_one',
      checked: true,
    },
    {
      name: 'straight_plus_one',
      checked: true,
    },
    // {
    //   name: 'rulename1',
    //   checked: false,
    // },
    // {
    //   name: 'rulename1',
    //   checked: true,
    // },
    // {
    //   name: 'rulename1',
    //   checked: false,
    // },
    // {
    //   name: 'rulename1',
    //   checked: true,
    // },
    // {
    //   name: 'rulename1',
    //   checked: false,
    // },
    // {
    //   name: 'rulename1',
    //   checked: true,
    // },
  ]

  constructor(public activeModal: NgbActiveModal, private themeService: ThemeService) {
    this.themeService.getTheme().subscribe((theme) => (this.darkMode = theme === Themes.dark))
  }

  ngOnInit(): void {}
}
